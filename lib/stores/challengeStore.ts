import { create } from 'zustand';
import { Challenge, ChallengeResult } from '@/lib/engine/challengeTypes';

interface ChallengeStore {
  challenges: Challenge[];
  loaded: boolean;

  load: (profileId?: string) => Promise<void>;
  createChallenge: (challenge: Challenge) => Promise<void>;
  completeChallenge: (id: string, result: ChallengeResult) => Promise<void>;
  getPendingForProfile: (profileId: string) => Challenge[];
  getCompletedForProfile: (profileId: string) => Challenge[];
  getChallengeById: (id: string) => Challenge | null;
  refreshChallenge: (id: string) => Promise<void>;
}

function dbRowToChallenge(row: Record<string, unknown>): Challenge {
  return {
    id: row.id as string,
    config: row.config as Challenge['config'],
    questions: row.questions as Challenge['questions'],
    challengerId: row.challenger_id as string,
    challengerName: row.challenger_name as string,
    challengeeId: row.challengee_id as string,
    challengeeName: row.challengee_name as string,
    challengerResult: row.challenger_result as Challenge['challengerResult'],
    challengeeResult: (row.challengee_result as Challenge['challengeeResult']) || null,
    status: row.status as Challenge['status'],
    createdAt: row.created_at as string,
    bonusAwarded: row.bonus_awarded as boolean,
  };
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challenges: [],
  loaded: false,

  load: async (profileId?: string) => {
    if (!profileId) {
      set({ loaded: true });
      return;
    }
    try {
      const res = await fetch(`/api/challenges?profileId=${profileId}`);
      const rows = await res.json();
      const challenges = (rows as Record<string, unknown>[]).map(dbRowToChallenge);
      set({ challenges, loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  createChallenge: async (challenge) => {
    await fetch('/api/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(challenge),
    });
    set({ challenges: [...get().challenges, challenge] });
  },

  completeChallenge: async (id, result) => {
    await fetch(`/api/challenges/${id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeeResult: result }),
    });
    set({
      challenges: get().challenges.map(c =>
        c.id === id ? { ...c, challengeeResult: result, status: 'completed' as const, bonusAwarded: true } : c
      ),
    });
  },

  getPendingForProfile: (profileId) => {
    return get().challenges.filter(c => c.challengeeId === profileId && c.status === 'pending');
  },

  getCompletedForProfile: (profileId) => {
    return get().challenges.filter(
      c => (c.challengerId === profileId || c.challengeeId === profileId) && c.status === 'completed'
    );
  },

  getChallengeById: (id) => {
    return get().challenges.find(c => c.id === id) || null;
  },

  refreshChallenge: async (id) => {
    const res = await fetch(`/api/challenges/${id}`);
    if (!res.ok) return;
    const row = await res.json();
    const updated = dbRowToChallenge(row);
    set({ challenges: get().challenges.map(c => c.id === id ? updated : c) });
  },
}));
