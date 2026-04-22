export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed' | 'word-problems' | 'make-tens' | 'word-based';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'super-hard';

export type MakeTarget = 10 | 20 | 30 | 40 | 50 | 'mixed';

export interface Question {
  id: number;
  operand1: number;
  operand2: number;
  operation: Exclude<Operation, 'mixed' | 'word-problems' | 'word-based'>;
  answer: number;
  wordProblem?: string;
  // For make-tens questions:
  target?: number;
  blankPosition?: 'left' | 'right';
}

export interface AnswerResult {
  question: Question;
  userAnswer: number | null;
  correct: boolean;
  timeMs: number;
  pointsEarned: number;
}

export type TimesTable = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'mixed';

export interface MixedRange {
  min: number;
  max: number;
}

export type GamePhase = 'selectOperation' | 'selectDifficulty' | 'selectTimesTable' | 'selectMixedRange' | 'selectTarget' | 'countdown' | 'playing' | 'finished';

export interface GameState {
  phase: GamePhase;
  operation: Operation | null;
  difficulty: Difficulty | null;
  questions: Question[];
  currentQuestionIndex: number;
  results: AnswerResult[];
  score: number;
  streak: number;
  bestStreak: number;
}

export interface HighScoreEntry {
  score: number;
  date: string;
  correct: number;
  total: number;
}

export type HighScores = Record<string, HighScoreEntry>;
