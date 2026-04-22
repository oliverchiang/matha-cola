import { Question, Difficulty } from './types';

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Template {
  generate: () => { text: string; answer: number; op1: number; op2: number; operation: Question['operation'] };
}

// ==================== EASY ====================
const easyTemplates: Template[] = [
  {
    // double n: n in 1..10
    generate: () => {
      const n = rand(1, 10);
      return { text: `What is double ${n}?`, answer: n * 2, op1: n, op2: 2, operation: 'multiplication' };
    },
  },
  {
    // half of even n, n in 2..20
    generate: () => {
      const half = rand(1, 10);
      const n = half * 2;
      return { text: `What is half of ${n}?`, answer: half, op1: n, op2: 2, operation: 'division' };
    },
  },
  {
    // "one more than n"
    generate: () => {
      const n = rand(1, 20);
      return { text: `What is one more than ${n}?`, answer: n + 1, op1: n, op2: 1, operation: 'addition' };
    },
  },
  {
    // "one less than n"
    generate: () => {
      const n = rand(2, 20);
      return { text: `What is one less than ${n}?`, answer: n - 1, op1: n, op2: 1, operation: 'subtraction' };
    },
  },
];

// ==================== MEDIUM ====================
const mediumTemplates: Template[] = [
  {
    // double n: n in 5..25
    generate: () => {
      const n = rand(5, 25);
      return { text: `What is double ${n}?`, answer: n * 2, op1: n, op2: 2, operation: 'multiplication' };
    },
  },
  {
    // half of even n up to 50
    generate: () => {
      const half = rand(5, 25);
      const n = half * 2;
      return { text: `What is half of ${n}?`, answer: half, op1: n, op2: 2, operation: 'division' };
    },
  },
  {
    // triple n: n in 2..10
    generate: () => {
      const n = rand(2, 10);
      return { text: `What is triple ${n}?`, answer: n * 3, op1: n, op2: 3, operation: 'multiplication' };
    },
  },
  {
    // quarter of n where n divisible by 4, n in 4..40
    generate: () => {
      const q = rand(1, 10);
      const n = q * 4;
      return { text: `What is a quarter of ${n}?`, answer: q, op1: n, op2: 4, operation: 'division' };
    },
  },
  {
    // "a more than b"
    generate: () => {
      const a = rand(2, 10), b = rand(5, 30);
      return { text: `What is ${a} more than ${b}?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    // "a less than b"
    generate: () => {
      const a = rand(2, 10), b = rand(a + 5, 40);
      return { text: `What is ${a} less than ${b}?`, answer: b - a, op1: b, op2: a, operation: 'subtraction' };
    },
  },
];

// ==================== HARD ====================
const hardTemplates: Template[] = [
  {
    // double n: n in 20..50
    generate: () => {
      const n = rand(20, 50);
      return { text: `What is double ${n}?`, answer: n * 2, op1: n, op2: 2, operation: 'multiplication' };
    },
  },
  {
    // half of even n, n in 20..100
    generate: () => {
      const half = rand(10, 50);
      const n = half * 2;
      return { text: `What is half of ${n}?`, answer: half, op1: n, op2: 2, operation: 'division' };
    },
  },
  {
    // triple n: n in 5..20
    generate: () => {
      const n = rand(5, 20);
      return { text: `What is triple ${n}?`, answer: n * 3, op1: n, op2: 3, operation: 'multiplication' };
    },
  },
  {
    // quarter of n where n divisible by 4, n in 20..100
    generate: () => {
      const q = rand(5, 25);
      const n = q * 4;
      return { text: `What is a quarter of ${n}?`, answer: q, op1: n, op2: 4, operation: 'division' };
    },
  },
  {
    // "a times b" — a in 2..10, b in 2..10
    generate: () => {
      const a = rand(2, 10), b = rand(2, 10);
      return { text: `What is ${a} times ${b}?`, answer: a * b, op1: a, op2: b, operation: 'multiplication' };
    },
  },
  {
    // "a more than b"
    generate: () => {
      const a = rand(5, 30), b = rand(10, 80);
      return { text: `What is ${a} more than ${b}?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    // "a less than b"
    generate: () => {
      const a = rand(5, 30), b = rand(a + 10, 100);
      return { text: `What is ${a} less than ${b}?`, answer: b - a, op1: b, op2: a, operation: 'subtraction' };
    },
  },
  {
    // "the sum of a and b"
    generate: () => {
      const a = rand(10, 50), b = rand(10, 50);
      return { text: `What is the sum of ${a} and ${b}?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    // "the difference between a and b"
    generate: () => {
      const b = rand(10, 40), a = rand(b + 5, 100);
      return { text: `What is the difference between ${a} and ${b}?`, answer: a - b, op1: a, op2: b, operation: 'subtraction' };
    },
  },
];

// ==================== SUPER HARD ====================
const superHardTemplates: Template[] = [
  {
    // "half of double n" — answer = n
    generate: () => {
      const n = rand(5, 50);
      return { text: `What is half of double ${n}?`, answer: n, op1: n, op2: 1, operation: 'multiplication' };
    },
  },
  {
    // "double half of n" — answer = n, requires n even
    generate: () => {
      const n = rand(5, 50) * 2;
      return { text: `What is double half of ${n}?`, answer: n, op1: n, op2: 1, operation: 'multiplication' };
    },
  },
  {
    // "a more than double b"
    generate: () => {
      const a = rand(3, 20), b = rand(5, 30);
      return { text: `What is ${a} more than double ${b}?`, answer: 2 * b + a, op1: b, op2: a, operation: 'addition' };
    },
  },
  {
    // "a less than triple b"
    generate: () => {
      const b = rand(5, 20), a = rand(3, 2 * b);
      return { text: `What is ${a} less than triple ${b}?`, answer: 3 * b - a, op1: b, op2: a, operation: 'subtraction' };
    },
  },
  {
    // "half of n plus m" — n even
    generate: () => {
      const half = rand(5, 30), n = half * 2, m = rand(5, 30);
      return { text: `What is half of ${n} plus ${m}?`, answer: half + m, op1: n, op2: m, operation: 'addition' };
    },
  },
  {
    // "triple n minus m"
    generate: () => {
      const n = rand(5, 20), m = rand(3, 2 * n);
      return { text: `What is triple ${n} minus ${m}?`, answer: 3 * n - m, op1: n, op2: m, operation: 'subtraction' };
    },
  },
  {
    // "a quarter of n" — n divisible by 4, up to 200
    generate: () => {
      const q = rand(10, 50), n = q * 4;
      return { text: `What is a quarter of ${n}?`, answer: q, op1: n, op2: 4, operation: 'division' };
    },
  },
  {
    // "double a plus triple b"
    generate: () => {
      const a = rand(5, 20), b = rand(5, 15);
      return { text: `What is double ${a} plus triple ${b}?`, answer: 2 * a + 3 * b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    // "a times b minus c"
    generate: () => {
      const a = rand(3, 10), b = rand(3, 10), c = rand(2, a * b - 1);
      return { text: `What is ${a} times ${b} minus ${c}?`, answer: a * b - c, op1: a, op2: b, operation: 'multiplication' };
    },
  },
];

function getTemplates(difficulty: Difficulty): Template[] {
  switch (difficulty) {
    case 'easy': return easyTemplates;
    case 'medium': return mediumTemplates;
    case 'hard': return hardTemplates;
    case 'super-hard': return superHardTemplates;
  }
}

export function generateWordBasedQuestions(difficulty: Difficulty, count: number = 10): Question[] {
  const templates = getTemplates(difficulty);
  const questions: Question[] = [];

  // Track recently-used templates to avoid immediate repeats
  const recent: Template[] = [];

  for (let i = 0; i < count; i++) {
    const available = templates.filter(t => !recent.includes(t));
    const template = available.length > 0 ? pick(available) : pick(templates);
    const { text, answer, op1, op2, operation } = template.generate();
    questions.push({
      id: i,
      operand1: op1,
      operand2: op2,
      operation,
      answer,
      wordProblem: text,
    });
    recent.push(template);
    if (recent.length > Math.min(3, templates.length - 1)) recent.shift();
  }

  return questions;
}
