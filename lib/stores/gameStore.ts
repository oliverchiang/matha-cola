import { create } from 'zustand';
import { GamePhase, Operation, Difficulty, TimesTable, MixedRange, MakeTarget, Question, AnswerResult } from '@/lib/engine/types';
import { generateQuestions, generateTimesTableQuestions, generateMakeTensQuestions } from '@/lib/engine/questionGenerator';
import { calculatePoints } from '@/lib/engine/scoring';
import { ChallengeConfig } from '@/lib/engine/challengeTypes';

interface GameStore {
  phase: GamePhase;
  operation: Operation | null;
  difficulty: Difficulty | null;
  timesTable: TimesTable | null;
  mixedRange: MixedRange | null;
  makeTarget: MakeTarget | null;
  questions: Question[];
  currentQuestionIndex: number;
  results: AnswerResult[];
  score: number;
  streak: number;
  bestStreak: number;
  questionStartTime: number;
  gameStartTime: number;
  gameEndTime: number;
  activeChallengeId: string | null;

  setOperation: (op: Operation) => void;
  setDifficulty: (diff: Difficulty) => void;
  startMultiplicationDifficultyMode: () => void;
  playAgain: () => void;
  setTimesTable: (table: TimesTable) => void;
  setMixedRange: (range: MixedRange) => void;
  setMakeTarget: (target: MakeTarget) => void;
  startCountdown: () => void;
  startPlaying: () => void;
  submitAnswer: (userAnswer: number | null) => void;
  startFromChallenge: (config: ChallengeConfig, challengeId: string, questions: Question[]) => void;
  reset: () => void;
  goBack: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'selectOperation',
  operation: null,
  difficulty: null,
  timesTable: null,
  mixedRange: null,
  makeTarget: null,
  questions: [],
  currentQuestionIndex: 0,
  results: [],
  score: 0,
  streak: 0,
  bestStreak: 0,
  questionStartTime: 0,
  gameStartTime: 0,
  gameEndTime: 0,
  activeChallengeId: null,

  setOperation: (operation) => {
    if (operation === 'multiplication') {
      set({ operation, phase: 'selectTimesTable' });
    } else if (operation === 'make-tens') {
      set({ operation, phase: 'selectTarget' });
    } else {
      set({ operation, phase: 'selectDifficulty' });
    }
  },

  setDifficulty: (difficulty) => {
    const { operation } = get();
    if (!operation) return;
    const questions = generateQuestions(operation, difficulty);
    set({ difficulty, questions, phase: 'countdown' });
  },

  // Multiplication "Mixed Difficulty" mode: play by difficulty instead of a
  // specific times table. Leaves timesTable null so the score is saved under
  // `multiplication_<difficulty>`.
  startMultiplicationDifficultyMode: () => {
    set({ phase: 'selectDifficulty', timesTable: null, mixedRange: null });
  },

  // Replay the current mode with fresh questions. Always a solo game (any
  // active challenge is cleared).
  playAgain: () => {
    const { operation, difficulty, timesTable, mixedRange, makeTarget } = get();
    let questions: Question[] = [];
    if (timesTable) {
      questions = generateTimesTableQuestions(timesTable, 10, mixedRange ?? undefined);
    } else if (makeTarget) {
      questions = generateMakeTensQuestions(makeTarget);
    } else if (operation && difficulty) {
      questions = generateQuestions(operation, difficulty);
    }
    set({
      phase: 'countdown',
      questions,
      currentQuestionIndex: 0,
      results: [],
      score: 0,
      streak: 0,
      bestStreak: 0,
      questionStartTime: 0,
      gameStartTime: 0,
      gameEndTime: 0,
      activeChallengeId: null,
    });
  },

  setTimesTable: (timesTable) => {
    if (timesTable === 'mixed') {
      set({ timesTable, phase: 'selectMixedRange' });
    } else {
      const questions = generateTimesTableQuestions(timesTable);
      set({ timesTable, questions, phase: 'countdown' });
    }
  },

  setMixedRange: (mixedRange) => {
    const questions = generateTimesTableQuestions('mixed', 10, mixedRange);
    set({ mixedRange, questions, phase: 'countdown' });
  },

  setMakeTarget: (makeTarget) => {
    const questions = generateMakeTensQuestions(makeTarget);
    set({ makeTarget, questions, phase: 'countdown' });
  },

  startCountdown: () => {
    set({ phase: 'countdown' });
  },

  startPlaying: () => {
    set({ phase: 'playing', questionStartTime: Date.now(), gameStartTime: Date.now() });
  },

  submitAnswer: (userAnswer) => {
    const { questions, currentQuestionIndex, results, score, streak, bestStreak, questionStartTime } = get();
    const question = questions[currentQuestionIndex];
    const timeMs = Date.now() - questionStartTime;
    const correct = userAnswer !== null && userAnswer === question.answer;
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
        ? { phase: 'finished', gameEndTime: Date.now() }
        : { currentQuestionIndex: currentQuestionIndex + 1, questionStartTime: Date.now() }),
    });
  },

  startFromChallenge: (config, challengeId, questions) => {
    set({
      phase: 'countdown',
      operation: config.operation,
      difficulty: config.difficulty,
      timesTable: config.timesTable,
      mixedRange: config.mixedRange,
      makeTarget: config.makeTarget ?? null,
      questions,
      currentQuestionIndex: 0,
      results: [],
      score: 0,
      streak: 0,
      bestStreak: 0,
      questionStartTime: 0,
      gameStartTime: 0,
      gameEndTime: 0,
      activeChallengeId: challengeId,
    });
  },

  reset: () => {
    set({
      phase: 'selectOperation',
      operation: null,
      difficulty: null,
      timesTable: null,
      mixedRange: null,
      makeTarget: null,
      questions: [],
      currentQuestionIndex: 0,
      results: [],
      score: 0,
      streak: 0,
      bestStreak: 0,
      questionStartTime: 0,
      gameStartTime: 0,
      gameEndTime: 0,
      activeChallengeId: null,
    });
  },

  goBack: () => {
    const { phase, operation, timesTable } = get();
    if (phase === 'selectDifficulty') {
      // Multiplication's difficulty screen is reached via the times-table screen.
      if (operation === 'multiplication') {
        set({ phase: 'selectTimesTable', difficulty: null });
      } else {
        set({ phase: 'selectOperation', operation: null });
      }
    } else if (phase === 'selectTimesTable') {
      set({ phase: 'selectOperation', operation: null });
    } else if (phase === 'selectTarget') {
      set({ phase: 'selectOperation', operation: null });
    } else if (phase === 'selectMixedRange') {
      set({ phase: 'selectTimesTable', timesTable: null, mixedRange: null });
    } else if (phase === 'countdown') {
      if (operation === 'multiplication') {
        if (timesTable === 'mixed') {
          set({ phase: 'selectMixedRange', questions: [] });
        } else if (timesTable === null) {
          // Mixed Difficulty mode
          set({ phase: 'selectDifficulty', difficulty: null, questions: [] });
        } else {
          set({ phase: 'selectTimesTable', timesTable: null, questions: [] });
        }
      } else if (operation === 'make-tens') {
        set({ phase: 'selectTarget', makeTarget: null, questions: [] });
      } else {
        set({ phase: 'selectDifficulty', difficulty: null, questions: [] });
      }
    }
  },
}));
