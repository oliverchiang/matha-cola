export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  operand1: number;
  operand2: number;
  operation: Exclude<Operation, 'mixed'>;
  answer: number;
}

export interface AnswerResult {
  question: Question;
  userAnswer: number | null;
  correct: boolean;
  timeMs: number;
  pointsEarned: number;
}

export type GamePhase = 'selectOperation' | 'selectDifficulty' | 'countdown' | 'playing' | 'finished';

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
