import { Difficulty, Operation } from './types';

interface Range {
  min: number;
  max: number;
}

interface DifficultyConfig {
  operand1: Range;
  operand2: Range;
}

const configs: Record<Exclude<Operation, 'mixed'>, Record<Difficulty, DifficultyConfig>> = {
  addition: {
    easy:   { operand1: { min: 1, max: 10 },  operand2: { min: 1, max: 10 } },
    medium: { operand1: { min: 10, max: 50 },  operand2: { min: 10, max: 50 } },
    hard:   { operand1: { min: 50, max: 200 }, operand2: { min: 50, max: 200 } },
  },
  subtraction: {
    easy:   { operand1: { min: 1, max: 10 },  operand2: { min: 1, max: 10 } },
    medium: { operand1: { min: 20, max: 50 },  operand2: { min: 1, max: 25 } },
    hard:   { operand1: { min: 100, max: 500 }, operand2: { min: 50, max: 250 } },
  },
  multiplication: {
    easy:   { operand1: { min: 1, max: 5 },  operand2: { min: 1, max: 5 } },
    medium: { operand1: { min: 2, max: 10 }, operand2: { min: 2, max: 10 } },
    hard:   { operand1: { min: 5, max: 12 }, operand2: { min: 5, max: 12 } },
  },
  division: {
    easy:   { operand1: { min: 1, max: 5 },  operand2: { min: 1, max: 5 } },
    medium: { operand1: { min: 2, max: 10 }, operand2: { min: 2, max: 10 } },
    hard:   { operand1: { min: 5, max: 12 }, operand2: { min: 5, max: 12 } },
  },
};

export function getDifficultyConfig(operation: Exclude<Operation, 'mixed'>, difficulty: Difficulty): DifficultyConfig {
  return configs[operation][difficulty];
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'easy': return 'Easy';
    case 'medium': return 'Medium';
    case 'hard': return 'Hard';
  }
}

export function getDifficultyDescription(operation: Operation, difficulty: Difficulty): string {
  if (operation === 'mixed') {
    return {
      easy: 'Small numbers, all operations',
      medium: 'Medium numbers, all operations',
      hard: 'Large numbers, all operations',
    }[difficulty];
  }

  const config = configs[operation][difficulty];
  const op1 = `${config.operand1.min}-${config.operand1.max}`;
  const op2 = `${config.operand2.min}-${config.operand2.max}`;
  return `Numbers: ${op1} and ${op2}`;
}
