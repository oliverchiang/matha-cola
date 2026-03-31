import { create } from 'zustand';
import { HighScoreEntry, HighScores } from '@/lib/engine/types';

interface ScoreStore {
  highScores: HighScores;
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  loaded: boolean;
  load: () => void;
  saveScore: (key: string, entry: HighScoreEntry) => void;
  incrementStats: (correct: number) => void;
}

const STORAGE_KEY = 'matha-cola-scores';

function loadFromStorage(): { highScores: HighScores; totalGamesPlayed: number; totalCorrectAnswers: number } {
  if (typeof window === 'undefined') {
    return { highScores: {}, totalGamesPlayed: 0, totalCorrectAnswers: 0 };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return { highScores: {}, totalGamesPlayed: 0, totalCorrectAnswers: 0 };
}

function saveToStorage(highScores: HighScores, totalGamesPlayed: number, totalCorrectAnswers: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ highScores, totalGamesPlayed, totalCorrectAnswers }));
  } catch { /* ignore */ }
}

export const useScoreStore = create<ScoreStore>((set, get) => ({
  highScores: {},
  totalGamesPlayed: 0,
  totalCorrectAnswers: 0,
  loaded: false,

  load: () => {
    const data = loadFromStorage();
    set({ ...data, loaded: true });
  },

  saveScore: (key, entry) => {
    const { highScores } = get();
    const existing = highScores[key];
    if (!existing || entry.score > existing.score) {
      const newScores = { ...highScores, [key]: entry };
      set({ highScores: newScores });
      const { totalGamesPlayed, totalCorrectAnswers } = get();
      saveToStorage(newScores, totalGamesPlayed, totalCorrectAnswers);
    }
  },

  incrementStats: (correct) => {
    const { highScores, totalGamesPlayed, totalCorrectAnswers } = get();
    const newPlayed = totalGamesPlayed + 1;
    const newCorrect = totalCorrectAnswers + correct;
    set({ totalGamesPlayed: newPlayed, totalCorrectAnswers: newCorrect });
    saveToStorage(highScores, newPlayed, newCorrect);
  },
}));
