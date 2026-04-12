import { create } from 'zustand';
import { AvatarConfig } from '@/lib/engine/profileTypes';

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
  // Joined profile data of the OTHER person
  name: string;
  avatar: AvatarConfig;
  bottle_caps: number;
  total_games_played: number;
}

interface FriendStore {
  friendships: Friendship[];
  loaded: boolean;

  load: (profileId: string) => Promise<void>;
  sendRequest: (requesterId: string, addresseeId: string) => Promise<boolean>;
  acceptRequest: (friendshipId: string) => Promise<void>;
  removeFriend: (friendshipId: string) => Promise<void>;
  getFriends: (myId: string) => Friendship[];
  getPendingRequests: (myId: string) => Friendship[];
  getSentRequests: (myId: string) => Friendship[];
}

export const useFriendStore = create<FriendStore>((set, get) => ({
  friendships: [],
  loaded: false,

  load: async (profileId) => {
    try {
      const res = await fetch(`/api/friends?profileId=${profileId}`);
      const rows = await res.json();
      set({ friendships: rows as Friendship[], loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  sendRequest: async (requesterId, addresseeId) => {
    const res = await fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requesterId, addresseeId }),
    });
    if (!res.ok) return false;
    // Reload to get full friendship data
    await get().load(requesterId);
    return true;
  },

  acceptRequest: async (friendshipId) => {
    await fetch(`/api/friends/${friendshipId}/accept`, { method: 'POST' });
    set({
      friendships: get().friendships.map(f =>
        f.id === friendshipId ? { ...f, status: 'accepted' as const } : f
      ),
    });
  },

  removeFriend: async (friendshipId) => {
    await fetch(`/api/friends/${friendshipId}`, { method: 'DELETE' });
    set({ friendships: get().friendships.filter(f => f.id !== friendshipId) });
  },

  getFriends: (myId) => {
    return get().friendships.filter(f =>
      f.status === 'accepted' && (f.requester_id === myId || f.addressee_id === myId)
    );
  },

  getPendingRequests: (myId) => {
    return get().friendships.filter(f => f.status === 'pending' && f.addressee_id === myId);
  },

  getSentRequests: (myId) => {
    return get().friendships.filter(f => f.status === 'pending' && f.requester_id === myId);
  },
}));
