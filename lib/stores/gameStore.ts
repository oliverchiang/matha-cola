import { create } from 'zustand';
import { GamePhase, Operation, Difficulty, Question, AnswerResult } from '@/lib/engine/types';
import { generateQuestions } from '@/lib/engine/questionGenerator';
import { calculatePoints } from '@/lib/engine/scoring';

interface GameStore {
  phase: GamePhase;
  operation: Operation | null;
  difficulty: Difficulty | null;
  questions: Question[];
  currentQuestionIndex: number;
  results: AnswerResult[];
  score: number;
  streak: number;
  bestStreak: number;
  questionStartTime: number;

  setOperation: (op: Operation) => void;
  setDifficulty: (diff: Difficulty) => void;
  startCountdown: () => void;
  startPlaying: () => void;
  submitAnswer: (userAnswer: number) => void;
  reset: () => void;
  goBack: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'selectOperation',
  operation: null,
  difficulty: null,
  questions: [],
  currentQuestionIndex: 0,
  results: [],
  score: 0,
  streak: 0,
  bestStreak: 0,
  questionStartTime: 0,

  setOperation: (operation) => {
    set({ operation, phase: 'selectDifficulty' });
  },

  setDifficulty: (difficulty) => {
    const { operation } = get();
    if (!operation) return;
    const questions = generateQuestions(operation, difficulty);
    set({ difficulty, questions, phase: 'countdown' });
  },

  startCountdown: () => {
    set({ phase: 'countdown' });
  },

  startPlaying: () => {
    set({ phase: 'playing', questionStartTime: Date.now() });
  },

  submitAnswer: (userAnswer) => {
    const { questions, currentQuestionIndex, results, score, streak, bestStreak, questionStartTime } = get();
    const question = questions[currentQuestionIndex];
    const timeMs = Date.now() - questionStartTime;
    const correct = userAnswer === question.answer;
    const newStreak = correct ? streak + 1 : 0;
    const points = calculatePoints(correct, timeMs, streak);

    const result: AnswerResult = {
      question,
      userAnswer,
      correct,
      timeMs,
      pointsEarned: points,
    };

    const newResults = [...results, result];
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;

    set({
      results: newResults,
      score: score + points,
      streak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
      ...(isLastQuestion
        ? { phase: 'finished' }
        : { currentQuestionIndex: currentQuestionIndex + 1, questionStartTime: Date.now() }),
    });
  },

  reset: () => {
    set({
      phase: 'selectOperation',
      operation: null,
      difficulty: null,
      questions: [],
      currentQuestionIndex: 0,
      results: [],
      score: 0,
      streak: 0,
      bestStreak: 0,
      questionStartTime: 0,
    });
  },

  goBack: () => {
    const { phase } = get();
    if (phase === 'selectDifficulty') {
      set({ phase: 'selectOperation', operation: null });
    } else if (phase === 'countdown') {
      set({ phase: 'selectDifficulty', difficulty: null, questions: [] });
    }
  },
}));
