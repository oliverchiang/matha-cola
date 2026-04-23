import { Question, Operation, Difficulty, TimesTable, MixedRange, MakeTarget } from './types';
import { getDifficultyConfig } from './difficulty';
import { generateWordProblems } from './wordProblemGenerator';
import { generateWordBasedQuestions } from './wordBasedGenerator';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSingleQuestion(
  operation: Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>,
  difficulty: Difficulty,
  id: number
): Question {
  const config = getDifficultyConfig(operation, difficulty);

  switch (operation) {
    case 'addition': {
      const a = randomInt(config.operand1.min, config.operand1.max);
      const b = randomInt(config.operand2.min, config.operand2.max);
      return { id, operand1: a, operand2: b, operation, answer: a + b };
    }
    case 'subtraction': {
      let a = randomInt(config.operand1.min, config.operand1.max);
      let b = randomInt(config.operand2.min, config.operand2.max);
      if (a < b) [a, b] = [b, a];
      return { id, operand1: a, operand2: b, operation, answer: a - b };
    }
    case 'multiplication': {
      const a = randomInt(config.operand1.min, config.operand1.max);
      const b = randomInt(config.operand2.min, config.operand2.max);
      return { id, operand1: a, operand2: b, operation, answer: a * b };
    }
    case 'division': {
      // Generate from multiplication to guarantee whole numbers
      const divisor = randomInt(config.operand1.min, config.operand1.max);
      const quotient = randomInt(config.operand2.min, config.operand2.max);
      const dividend = divisor * quotient;
      return { id, operand1: dividend, operand2: divisor, operation, answer: quotient };
    }
  }
}

const singleOperations: Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>[] = ['addition', 'subtraction', 'multiplication', 'division'];

export function generateQuestions(operation: Operation, difficulty: Difficulty, count: number = 10): Question[] {
  if (operation === 'word-problems') {
    return generateWordProblems(difficulty, count);
  }

  if (operation === 'word-based') {
    return generateWordBasedQuestions(difficulty, count);
  }

  const questions: Question[] = [];

  if (operation === 'mixed') {
    // Guarantee at least 2 of each, remaining are random
    const ops: Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>[] = [];
    for (const op of singleOperations) {
      ops.push(op, op);
    }
    while (ops.length < count) {
      ops.push(singleOperations[randomInt(0, singleOperations.length - 1)]);
    }
    // Shuffle
    for (let i = ops.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      [ops[i], ops[j]] = [ops[j], ops[i]];
    }
    for (let i = 0; i < count; i++) {
      questions.push(generateSingleQuestion(ops[i], difficulty, i));
    }
  } else {
    const op = operation as Exclude<Operation, 'mixed' | 'word-problems' | 'word-based' | 'make-tens'>;
    for (let i = 0; i < count; i++) {
      questions.push(generateSingleQuestion(op, difficulty, i));
    }
  }

  return questions;
}

export function generateTimesTableQuestions(timesTable: TimesTable, count: number = 10, mixedRange?: MixedRange): Question[] {
  const questions: Question[] = [];

  if (timesTable === 'mixed') {
    const min = mixedRange?.min ?? 1;
    const max = mixedRange?.max ?? 12;
    // Pick random tables and random multipliers
    for (let i = 0; i < count; i++) {
      const table = randomInt(min, max);
      const multiplier = randomInt(1, 12);
      questions.push({
        id: i,
        operand1: table,
        operand2: multiplier,
        operation: 'multiplication',
        answer: table * multiplier,
      });
    }
  } else {
    // Specific times table: N x 1 through N x 12, shuffled
    const multipliers: number[] = [];
    for (let m = 1; m <= 12; m++) {
      multipliers.push(m);
    }
    // Shuffle
    for (let i = multipliers.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      [multipliers[i], multipliers[j]] = [multipliers[j], multipliers[i]];
    }
    for (let i = 0; i < count; i++) {
      const m = multipliers[i % multipliers.length];
      questions.push({
        id: i,
        operand1: timesTable,
        operand2: m,
        operation: 'multiplication',
        answer: timesTable * m,
      });
    }
  }

  return questions;
}

export function getOperationSymbol(operation: Question['operation']): string {
  switch (operation) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '\u00d7';
    case 'division': return '\u00f7';
    case 'make-tens': return '+';
  }
}

const MAKE_TARGETS: number[] = [10, 20, 30, 40, 50];

function resolveMakeTarget(selected: MakeTarget): number {
  if (selected === 'mixed') {
    return MAKE_TARGETS[Math.floor(Math.random() * MAKE_TARGETS.length)];
  }
  return selected;
}

export function generateMakeTensQuestions(target: MakeTarget, count: number = 10): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const t = resolveMakeTarget(target);

    // Operand range: always 1..t-1 so the missing addend is positive
    const operand1 = randomInt(1, t - 1);
    const missing = t - operand1;

    // Blank position: roughly even split between left and right for variety.
    const blankPosition: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';

    questions.push({
      id: i,
      operand1,         // the visible operand
      operand2: missing, // the answer (shown as the blank)
      operation: 'make-tens',
      answer: missing,
      target: t,
      blankPosition,
    });
  }

  return questions;
}
