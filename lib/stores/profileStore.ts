import { create } from 'zustand';
import { Profile, AvatarConfig, AvatarSlot, DEFAULT_AVATAR } from '@/lib/engine/profileTypes';
import { getMarketplaceItem } from '@/lib/data/marketplaceItems';
import { HighScoreEntry } from '@/lib/engine/types';

interface ProfileStore {
  profiles: Profile[];
  activeProfileId: string | null;
  loaded: boolean;

  load: () => Promise<void>;
  createProfile: (name: string, pin: string) => Promise<Profile>;
  deleteProfile: (id: string, pin: string) => Promise<boolean>;
  selectProfile: (id: string, pin: string) => Promise<boolean>;
  logout: () => void;
  getActiveProfile: () => Profile | null;
  getProfileById: (id: string) => Profile | null;

  awardBottleCaps: (count: number) => Promise<void>;
  purchaseItem: (itemId: string) => Promise<boolean>;
  equipItem: (itemId: string) => Promise<void>;
  unequipSlot: (slot: AvatarSlot) => Promise<void>;

  saveScore: (key: string, entry: HighScoreEntry) => Promise<void>;
  incrementStats: (correct: number) => Promise<void>;
  refreshProfile: (id: string) => Promise<void>;
}

const MAX_PROFILES = 8;

function dbRowToProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    name: row.name as string,
    pin: '', // PIN is never sent from the server on list/get
    bottleCaps: row.bottle_caps as number,
    avatar: (row.avatar as AvatarConfig) || { ...DEFAULT_AVATAR },
    purchasedItems: (row.purchased_items as string[]) || [],
    createdAt: row.created_at as string,
    totalGamesPlayed: row.total_games_played as number,
    totalCorrectAnswers: row.total_correct_answers as number,
    highScores: (row.high_scores as Record<string, HighScoreEntry>) || {},
  };
}

function getActiveIdFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('matha-cola-active-profile');
  } catch { return null; }
}

function saveActiveIdToStorage(id: string | null) {
  try {
    if (id) localStorage.setItem('matha-cola-active-profile', id);
    else localStorage.removeItem('matha-cola-active-profile');
  } catch { /* ignore */ }
}

function setAvatarSlot(avatar: AvatarConfig, slot: string, value: string | null): AvatarConfig {
  switch (slot) {
    case 'hair': return { ...avatar, hair: value };
    case 'hat': return { ...avatar, hat: value };
    case 'shirt': return { ...avatar, shirt: value };
    case 'accessory': return { ...avatar, accessory: value };
    case 'bottleLabel': return { ...avatar, bottleLabel: value };
    case 'shoes': return { ...avatar, shoes: value };
    default: return avatar;
  }
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],
  activeProfileId: null,
  loaded: false,

  load: async () => {
    try {
      const res = await fetch('/api/profiles');
      const rows = await res.json();
      const profiles = (rows as Record<string, unknown>[]).map(dbRowToProfile);
      const activeId = getActiveIdFromStorage();
      set({ profiles, activeProfileId: activeId && profiles.some(p => p.id === activeId) ? activeId : null, loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  createProfile: async (name, pin) => {
    const { profiles } = get();
    if (profiles.length >= MAX_PROFILES) throw new Error('Maximum profiles reached');

    const profile: Profile = {
      id: crypto.randomUUID(),
      name: name.slice(0, 16),
      pin,
      bottleCaps: 0,
      avatar: { ...DEFAULT_AVATAR },
      purchasedItems: [],
      createdAt: new Date().toISOString(),
      totalGamesPlayed: 0,
      totalCorrectAnswers: 0,
      highScores: {},
    };

    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    const newProfiles = [...profiles, { ...profile, pin: '' }];
    set({ profiles: newProfiles, activeProfileId: profile.id });
    saveActiveIdToStorage(profile.id);
    return profile;
  },

  deleteProfile: async (id, pin) => {
    const res = await fetch(`/api/profiles/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (!res.ok) return false;

    const { profiles, activeProfileId } = get();
    const newProfiles = profiles.filter(p => p.id !== id);
    const newActiveId = activeProfileId === id ? null : activeProfileId;
    set({ profiles: newProfiles, activeProfileId: newActiveId });
    if (newActiveId !== activeProfileId) saveActiveIdToStorage(newActiveId);
    return true;
  },

  selectProfile: async (id, pin) => {
    try {
      const res = await fetch(`/api/profiles/${id}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (!data.ok) return false;
      set({ activeProfileId: id });
      saveActiveIdToStorage(id);
      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    set({ activeProfileId: null });
    saveActiveIdToStorage(null);
  },

  getActiveProfile: () => {
    const { profiles, activeProfileId } = get();
    return profiles.find(p => p.id === activeProfileId) || null;
  },

  getProfileById: (id) => {
    return get().profiles.find(p => p.id === id) || null;
  },

  refreshProfile: async (id) => {
    const res = await fetch(`/api/profiles/${id}`);
    if (!res.ok) return;
    const row = await res.json();
    const updated = dbRowToProfile(row);
    set({ profiles: get().profiles.map(p => p.id === id ? updated : p) });
  },

  awardBottleCaps: async (count) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile) return;

    const newCaps = profile.bottleCaps + count;
    set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, bottleCaps: newCaps } : p) });
    await fetch(`/api/profiles/${activeProfileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bottleCaps: newCaps }),
    });
  },

  purchaseItem: async (itemId) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return false;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile) return false;

    const item = getMarketplaceItem(itemId);
    if (!item || profile.purchasedItems.includes(itemId) || profile.bottleCaps < item.price) return false;

    const newCaps = profile.bottleCaps - item.price;
    const newItems = [...profile.purchasedItems, itemId];
    set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, bottleCaps: newCaps, purchasedItems: newItems } : p) });
    await fetch(`/api/profiles/${activeProfileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bottleCaps: newCaps, purchasedItems: newItems }),
    });
    return true;
  },

  equipItem: async (itemId) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile || !profile.purchasedItems.includes(itemId)) return;

    const item = getMarketplaceItem(itemId);
    if (!item) return;

    let newAvatar = { ...profile.avatar };
    if (item.category === 'skinColor' && item.previewColor) {
      newAvatar.skinColor = item.previewColor;
    } else if (item.category === 'bottleColor' && item.previewColor) {
      newAvatar.bottleColor = item.previewColor;
    } else {
      newAvatar = setAvatarSlot(newAvatar, item.category, itemId);
    }

    set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, avatar: newAvatar } : p) });
    await fetch(`/api/profiles/${activeProfileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: newAvatar }),
    });
  },

  unequipSlot: async (slot) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile) return;

    let newAvatar = { ...profile.avatar };
    if (slot === 'skinColor') newAvatar.skinColor = DEFAULT_AVATAR.skinColor;
    else if (slot === 'bottleColor') newAvatar.bottleColor = DEFAULT_AVATAR.bottleColor;
    else newAvatar = setAvatarSlot(newAvatar, slot, null);

    set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, avatar: newAvatar } : p) });
    await fetch(`/api/profiles/${activeProfileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: newAvatar }),
    });
  },

  saveScore: async (key, entry) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile) return;

    const existing = profile.highScores[key];
    if (!existing || entry.score > existing.score) {
      const newScores = { ...profile.highScores, [key]: entry };
      set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, highScores: newScores } : p) });
      await fetch(`/api/profiles/${activeProfileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ highScores: newScores }),
      });
    }
  },

  incrementStats: async (correct) => {
    const { profiles, activeProfileId } = get();
    if (!activeProfileId) return;
    const profile = profiles.find(p => p.id === activeProfileId);
    if (!profile) return;

    const newPlayed = profile.totalGamesPlayed + 1;
    const newCorrect = profile.totalCorrectAnswers + correct;
    set({ profiles: profiles.map(p => p.id === activeProfileId ? { ...p, totalGamesPlayed: newPlayed, totalCorrectAnswers: newCorrect } : p) });
    await fetch(`/api/profiles/${activeProfileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalGamesPlayed: newPlayed, totalCorrectAnswers: newCorrect }),
    });
  },
}));
