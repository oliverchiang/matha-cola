import { Difficulty, Operation } from './types';

interface Range {
  min: number;
  max: number;
}

interface DifficultyConfig {
  operand1: Range;
  operand2: Range;
}

const configs: Record<Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>, Record<Difficulty, DifficultyConfig>> = {
  addition: {
    easy:         { operand1: { min: 1, max: 10 },    operand2: { min: 1, max: 10 } },
    medium:       { operand1: { min: 10, max: 50 },   operand2: { min: 10, max: 50 } },
    hard:         { operand1: { min: 50, max: 200 },  operand2: { min: 50, max: 200 } },
    'super-hard': { operand1: { min: 500, max: 9999 }, operand2: { min: 500, max: 9999 } },
  },
  subtraction: {
    easy:         { operand1: { min: 1, max: 10 },     operand2: { min: 1, max: 10 } },
    medium:       { operand1: { min: 20, max: 50 },    operand2: { min: 1, max: 25 } },
    hard:         { operand1: { min: 100, max: 500 },  operand2: { min: 50, max: 250 } },
    'super-hard': { operand1: { min: 1000, max: 9999 }, operand2: { min: 500, max: 5000 } },
  },
  multiplication: {
    easy:         { operand1: { min: 1, max: 5 },   operand2: { min: 1, max: 5 } },
    medium:       { operand1: { min: 2, max: 10 },  operand2: { min: 2, max: 10 } },
    hard:         { operand1: { min: 5, max: 12 },  operand2: { min: 5, max: 12 } },
    'super-hard': { operand1: { min: 12, max: 50 }, operand2: { min: 12, max: 50 } },
  },
  division: {
    easy:         { operand1: { min: 1, max: 5 },   operand2: { min: 1, max: 5 } },
    medium:       { operand1: { min: 2, max: 10 },  operand2: { min: 2, max: 10 } },
    hard:         { operand1: { min: 5, max: 12 },  operand2: { min: 5, max: 12 } },
    'super-hard': { operand1: { min: 12, max: 50 }, operand2: { min: 12, max: 50 } },
  },
};

export function getDifficultyConfig(operation: Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>, difficulty: Difficulty): DifficultyConfig {
  return configs[operation][difficulty];
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'easy': return 'Easy';
    case 'medium': return 'Medium';
    case 'hard': return 'Hard';
    case 'super-hard': return 'Super Hard';
  }
}

export function getDifficultyDescription(operation: Operation, difficulty: Difficulty): string {
  if (operation === 'mixed') {
    return {
      easy: 'Small numbers, all operations',
      medium: 'Medium numbers, all operations',
      hard: 'Large numbers, all operations',
      'super-hard': 'Huge numbers, all operations',
    }[difficulty];
  }

  if (operation === 'word-problems') {
    return {
      easy: 'Simple stories, small numbers',
      medium: 'Multi-step problems, rounding',
      hard: 'Complex stories, big numbers',
      'super-hard': 'Multi-step nightmares!',
    }[difficulty];
  }

  if (operation === 'make-tens') {
    return {
      easy: 'Blank on the right',
      medium: 'Blank mostly on the right',
      hard: 'Blank on either side',
      'super-hard': 'Any blank, trickier numbers',
    }[difficulty];
  }

  if (operation === 'word-based') {
    return {
      easy: 'Double and half',
      medium: 'Triple, quarter, more/less than',
      hard: 'Times, sums, differences',
      'super-hard': 'Multi-step verbal problems',
    }[difficulty];
  }

  const config = configs[operation as Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>][difficulty];
  const op1 = `${config.operand1.min}-${config.operand1.max}`;
  const op2 = `${config.operand2.min}-${config.operand2.max}`;
  return `Numbers: ${op1} and ${op2}`;
}
