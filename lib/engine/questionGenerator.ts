import { Question, Operation, Difficulty } from './types';
import { getDifficultyConfig } from './difficulty';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSingleQuestion(
  operation: Exclude<Operation, 'mixed'>,
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

const singleOperations: Exclude<Operation, 'mixed'>[] = ['addition', 'subtraction', 'multiplication', 'division'];

export function generateQuestions(operation: Operation, difficulty: Difficulty, count: number = 10): Question[] {
  const questions: Question[] = [];

  if (operation === 'mixed') {
    // Guarantee at least 2 of each, remaining are random
    const ops: Exclude<Operation, 'mixed'>[] = [];
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
    for (let i = 0; i < count; i++) {
      questions.push(generateSingleQuestion(operation, difficulty, i));
    }
  }

  return questions;
}

export function getOperationSymbol(operation: Exclude<Operation, 'mixed'>): string {
  switch (operation) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '\u00d7';
    case 'division': return '\u00f7';
  }
}
