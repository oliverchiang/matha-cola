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

// ==================== EASY (ages 5-7) ====================
const easyTemplates: Template[] = [
  {
    generate: () => {
      const a = rand(2, 12), b = rand(2, 12);
      return { text: `You have ${a} apples. Your friend gives you ${b} more. How many apples do you have now?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const a = rand(3, 15), b = rand(1, a - 1);
      return { text: `There are ${a} birds on a tree. ${b} fly away. How many birds are left?`, answer: a - b, op1: a, op2: b, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const a = rand(2, 8), b = rand(2, 6);
      return { text: `Each bag has ${a} sweets. You have ${b} bags. How many sweets in total?`, answer: a * b, op1: a, op2: b, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const a = rand(3, 10), b = rand(2, 10);
      return { text: `You find ${a} coins on Monday and ${b} coins on Tuesday. How many coins do you have?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const a = rand(5, 18), b = rand(2, a - 1);
      return { text: `A farmer has ${a} cows. He sells ${b} of them. How many cows are left?`, answer: a - b, op1: a, op2: b, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const a = rand(2, 5), b = rand(2, 5);
      return { text: `There are ${a} plates on the table. Each plate has ${b} cookies. How many cookies in total?`, answer: a * b, op1: a, op2: b, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const b = rand(2, 5), answer = rand(2, 6), a = b * answer;
      return { text: `${a} children share equally into ${b} groups. How many children in each group?`, answer, op1: a, op2: b, operation: 'division' };
    },
  },
  {
    generate: () => {
      const a = rand(3, 10), b = rand(3, 10);
      const name = pick(['Sam', 'Mia', 'Leo', 'Zara', 'Max']);
      return { text: `You have ${a} stickers. ${name} has ${b} stickers. How many stickers together?`, answer: a + b, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const a = rand(10, 20), b = rand(2, a - 2);
      return { text: `There are ${a} fish in a pond. A cat catches ${b}. How many fish are left?`, answer: a - b, op1: a, op2: b, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const a = rand(2, 4), b = rand(3, 6);
      return { text: `${a} friends each bring ${b} toy cars. How many toy cars altogether?`, answer: a * b, op1: a, op2: b, operation: 'multiplication' };
    },
  },
];

// ==================== MEDIUM (ages 7-9) ====================
const mediumTemplates: Template[] = [
  {
    // Round-up division (the car example)
    generate: () => {
      const b = rand(3, 6), total = rand(b + 1, 30);
      const answer = Math.ceil(total / b);
      return { text: `${total} kids need a ride. Each car fits ${b} kids. How many cars are needed?`, answer, op1: total, op2: b, operation: 'division' };
    },
  },
  {
    generate: () => {
      const a = rand(15, 40), b = rand(3, 10), c = rand(3, 10);
      const name1 = pick(['Sam', 'Mia', 'Leo']), name2 = pick(['Zara', 'Max', 'Amy']);
      return { text: `You have ${a} stickers. You give ${b} to ${name1} and ${c} to ${name2}. How many do you have left?`, answer: a - b - c, op1: a, op2: b, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const a = rand(2, 5), b = rand(4, 8), c = rand(2, 8);
      return { text: `You have ${a} boxes of ${b} pencils each, plus ${c} loose pencils. How many pencils in total?`, answer: a * b + c, op1: a, op2: b, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const price = rand(3, 8), count = rand(2, 5);
      const total = price * count + rand(1, 10);
      return { text: `You have $${total}. You buy ${count} ice creams at $${price} each. How much money is left?`, answer: total - price * count, op1: total, op2: count, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const rows = rand(3, 6), cols = rand(4, 8);
      return { text: `A garden has ${rows} rows of flowers. Each row has ${cols} flowers. How many flowers in total?`, answer: rows * cols, op1: rows, op2: cols, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const b = rand(4, 8), total = rand(b * 3, b * 8);
      const answer = Math.ceil(total / b);
      return { text: `A bakery made ${total} cupcakes. Each box holds ${b}. How many boxes are needed to pack them all?`, answer, op1: total, op2: b, operation: 'division' };
    },
  },
  {
    generate: () => {
      const a = rand(10, 30), b = rand(5, 15), c = rand(3, 10);
      return { text: `A shop has ${a} apples. They get ${b} more delivered, then sell ${c}. How many apples now?`, answer: a + b - c, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const teams = rand(3, 6), perTeam = rand(3, 7), extras = rand(1, 5);
      return { text: `${teams} teams of ${perTeam} players each, plus ${extras} substitutes. How many players in total?`, answer: teams * perTeam + extras, op1: teams, op2: perTeam, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const a = rand(2, 6), b = rand(3, 5), c = rand(2, 4), d = rand(3, 6);
      return { text: `You buy ${a} packs of ${b} crayons and ${c} packs of ${d} markers. How many items in total?`, answer: a * b + c * d, op1: a, op2: b, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const b = rand(2, 5), answer = rand(3, 8), a = b * answer;
      const remainder = rand(1, b - 1);
      const total = a + remainder;
      return { text: `${total} marbles are shared equally among ${b} friends. How many does each friend get?`, answer: Math.floor(total / b), op1: total, op2: b, operation: 'division' };
    },
  },
];

// ==================== HARD (ages 9-12) ====================
const hardTemplates: Template[] = [
  {
    generate: () => {
      const rate = rand(12, 50), hours = rand(3, 8);
      return { text: `A factory makes ${rate} toys per hour. How many toys are made in ${hours} hours?`, answer: rate * hours, op1: rate, op2: hours, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const budget = rand(50, 200), price = rand(8, 25), count = rand(2, Math.floor(budget / price));
      return { text: `You have $${budget}. You buy ${count} books at $${price} each. How much change do you get?`, answer: budget - count * price, op1: budget, op2: count, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const teams = rand(3, 6), extra = rand(4, 15);
      const perTeam = rand(5, 12);
      const original = teams * perTeam - extra;
      return { text: `${original} students are split into ${teams} equal teams. ${extra} more students join and are split equally too. How many per team now?`, answer: (original + extra) / teams, op1: original, op2: teams, operation: 'division' };
    },
  },
  {
    generate: () => {
      const total = rand(20, 50), passed = rand(10, total - 3);
      return { text: `${total} students took a test. ${passed} students passed. How many students failed?`, answer: total - passed, op1: total, op2: passed, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const speed = rand(40, 80), time = rand(2, 6);
      return { text: `A car travels at ${speed} km per hour. How far does it go in ${time} hours?`, answer: speed * time, op1: speed, op2: time, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const floors = rand(3, 8), perFloor = rand(4, 12);
      const occupied = rand(Math.floor(floors * perFloor / 2), floors * perFloor - 2);
      return { text: `A building has ${floors} floors with ${perFloor} apartments each. ${occupied} are occupied. How many are empty?`, answer: floors * perFloor - occupied, op1: floors, op2: perFloor, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const b = rand(5, 12), total = rand(b * 4, b * 15);
      return { text: `A school needs to transport ${total} students. Each bus holds ${b} students. How many buses are needed?`, answer: Math.ceil(total / b), op1: total, op2: b, operation: 'division' };
    },
  },
  {
    generate: () => {
      const width = rand(5, 15), length = rand(8, 20);
      return { text: `A rectangular playground is ${length} metres long and ${width} metres wide. What is its area in square metres?`, answer: length * width, op1: length, op2: width, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const priceA = rand(5, 15), countA = rand(2, 5);
      const priceB = rand(3, 10), countB = rand(2, 4);
      const discount = rand(5, 15);
      const total = priceA * countA + priceB * countB - discount;
      return { text: `You buy ${countA} shirts at $${priceA} each and ${countB} socks at $${priceB} each. You have a $${discount} discount. How much do you pay?`, answer: total, op1: priceA, op2: countA, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const pages = rand(100, 300), perDay = rand(15, 40), days = rand(2, 5);
      const read = perDay * days;
      return { text: `A book has ${pages} pages. You read ${perDay} pages per day for ${days} days. How many pages are left?`, answer: pages - read, op1: pages, op2: perDay, operation: 'subtraction' };
    },
  },
];

// ==================== SUPER HARD (mental math beasts) ====================
const superHardTemplates: Template[] = [
  {
    generate: () => {
      const price = rand(125, 999), qty = rand(12, 50);
      return { text: `A warehouse orders ${qty} laptops at $${price} each. What is the total cost?`, answer: price * qty, op1: price, op2: qty, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const a = rand(1000, 5000), b = rand(1000, 5000), c = rand(500, 2000);
      return { text: `A company earned $${a} in January, $${b} in February, and $${c} in March. What are the total earnings?`, answer: a + b + c, op1: a, op2: b, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const total = rand(5000, 9999), spent1 = rand(1000, 3000), spent2 = rand(500, 2000);
      return { text: `You start with $${total}. You spend $${spent1} on rent and $${spent2} on food. How much is left?`, answer: total - spent1 - spent2, op1: total, op2: spent1, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const rows = rand(15, 40), cols = rand(15, 40);
      const broken = rand(10, 50);
      return { text: `A stadium has ${rows} rows with ${cols} seats each. ${broken} seats are broken. How many usable seats are there?`, answer: rows * cols - broken, op1: rows, op2: cols, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const distance = rand(200, 800), speed = rand(40, 120);
      const hours = Math.floor(distance / speed);
      const remaining = distance - hours * speed;
      return { text: `A train travels ${speed} km/h for ${hours} hours, covering ${hours * speed} km. It still has ${remaining} km to go. What is the total distance?`, answer: distance, op1: hours * speed, op2: remaining, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const workers = rand(25, 99), perWorker = rand(30, 80);
      return { text: `A factory has ${workers} workers. Each worker assembles ${perWorker} parts per day. How many parts are made daily?`, answer: workers * perWorker, op1: workers, op2: perWorker, operation: 'multiplication' };
    },
  },
  {
    generate: () => {
      const a = rand(200, 999), b = rand(200, 999);
      const total = a + b;
      return { text: `Two trains are ${total} km apart. One has travelled ${a} km. How far has the other train travelled?`, answer: b, op1: total, op2: a, operation: 'subtraction' };
    },
  },
  {
    generate: () => {
      const perBox = rand(24, 48), boxes = rand(15, 40);
      const total = perBox * boxes;
      return { text: `${total} bottles are packed into boxes of ${perBox}. How many full boxes are there?`, answer: boxes, op1: total, op2: perBox, operation: 'division' };
    },
  },
  {
    generate: () => {
      const length = rand(50, 200), width = rand(30, 100);
      const perimeter = 2 * (length + width);
      return { text: `A field is ${length}m long and ${width}m wide. How many metres of fence are needed to go all the way around?`, answer: perimeter, op1: length, op2: width, operation: 'addition' };
    },
  },
  {
    generate: () => {
      const monthly = rand(150, 500), months = rand(7, 12), bonus = rand(500, 2000);
      return { text: `You save $${monthly} per month for ${months} months and get a $${bonus} bonus. How much do you have?`, answer: monthly * months + bonus, op1: monthly, op2: months, operation: 'multiplication' };
    },
  },
];

const templatesByDifficulty: Record<Difficulty, Template[]> = {
  easy: easyTemplates,
  medium: mediumTemplates,
  hard: hardTemplates,
  'super-hard': superHardTemplates,
};

export function generateWordProblems(difficulty: Difficulty, count: number = 10): Question[] {
  const templates = templatesByDifficulty[difficulty];
  const questions: Question[] = [];
  const usedTexts = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let q: ReturnType<Template['generate']>;
    do {
      const template = templates[rand(0, templates.length - 1)];
      q = template.generate();
      attempts++;
    } while (usedTexts.has(q.text) && attempts < 20);

    usedTexts.add(q.text);
    questions.push({
      id: i,
      operand1: q.op1,
      operand2: q.op2,
      operation: q.operation,
      answer: q.answer,
      wordProblem: q.text,
    });
  }

  return questions;
}
