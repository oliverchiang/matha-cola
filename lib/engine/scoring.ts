export function calculatePoints(correct: boolean, timeMs: number, currentStreak: number): number {
  if (!correct) return 0;

  let points = 10;

  // Speed bonus
  if (timeMs < 3000) {
    points += 10;
  } else if (timeMs < 5000) {
    points += 5;
  }

  // Streak bonus (awarded when reaching the milestone)
  const newStreak = currentStreak + 1;
  if (newStreak === 10) {
    points += 25;
  } else if (newStreak === 5) {
    points += 10;
  } else if (newStreak === 3) {
    points += 5;
  }

  return points;
}

export function getStarCount(score: number): number {
  if (score >= 120) return 3;
  if (score >= 80) return 2;
  if (score >= 50) return 1;
  return 0;
}

import { Operation, Difficulty, TimesTable } from './types';

/**
 * Calculate bottle caps earned per correct answer based on difficulty.
 * Easy/low tables = 1 cap, hard/mixed = up to 5 caps.
 */
export function getCapsPerCorrect(
  operation: Operation | null,
  difficulty: Difficulty | null,
  timesTable: TimesTable | null,
): number {
  // Multiplication path — based on times table
  if (operation === 'multiplication' && timesTable !== null) {
    if (timesTable === 'mixed') return 3;
    const t = timesTable as number;
    if (t <= 1) return 0;
    if (t === 10 || t === 11) return 0;
    if (t <= 5) return 1;
    if (t <= 9) return 2;
    return 3; // 12
  }

  // Word problems get extra reward since they're harder
  if (operation === 'word-problems') {
    if (difficulty === 'hard') return 8;
    if (difficulty === 'medium') return 4;
    return 3;
  }

  // Difficulty-based path
  if (difficulty === 'hard') return 5;
  if (difficulty === 'medium') return 2;

  // Easy or fallback
  // Mixed operation gets a bump even on easy
  if (operation === 'mixed') return 2;
  return 1;
}

export function getEncouragingMessage(score: number, correct: number, total: number): string {
  const pct = correct / total;
  if (pct === 1) return "PERFECT! You're a math superstar!";
  if (pct >= 0.8) return "Amazing work! You're crushing it!";
  if (pct >= 0.6) return "Great job! Keep practicing!";
  if (pct >= 0.4) return "Nice try! You're getting better!";
  return "Good effort! Practice makes perfect!";
}
