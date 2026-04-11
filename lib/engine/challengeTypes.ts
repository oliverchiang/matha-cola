import { Operation, Difficulty, TimesTable, MixedRange, Question } from './types';

export type ChallengeStatus = 'pending' | 'completed';

export interface ChallengeConfig {
  operation: Operation;
  difficulty: Difficulty | null;
  timesTable: TimesTable | null;
  mixedRange: MixedRange | null;
}

export interface ChallengeResult {
  profileId: string;
  profileName: string;
  score: number;
  correct: number;
  total: number;
}

export interface Challenge {
  id: string;
  config: ChallengeConfig;
  questions: Question[];
  challengerId: string;
  challengerName: string;
  challengeeId: string;
  challengeeName: string;
  challengerResult: ChallengeResult;
  challengeeResult: ChallengeResult | null;
  status: ChallengeStatus;
  createdAt: string;
  bonusAwarded: boolean;
}
