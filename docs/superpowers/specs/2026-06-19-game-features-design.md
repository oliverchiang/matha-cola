# Math-a-Cola — New Features Design

Date: 2026-06-19

Six related changes to the game. Decisions confirmed with the user are noted inline.

## Summary of the six items

1. **Multiplication "Mixed Difficulty" mode** — play multiplication by difficulty (Easy → Ultra Hard) with questions randomised within each difficulty's number range, instead of only by times table.
2. **Play Again button** on the finished screen — replays the same mode with fresh questions. Shown on *all* games, including challenges (a replay becomes a fresh solo game).
3. **Ultra Hard for addition & subtraction** — a new difficulty tier using three 5–6 digit numbers (e.g. `51231 + 12315 + 567986`).
4. **Multiplication ranking bug** — the leaderboard shows Easy/Medium/Hard/Super-Hard tabs for multiplication, but no game ever wrote to those categories (multiplication was only played by times table). Item 1 makes those tabs reachable; this item also cleans up the leaderboard tab list.
5. **Remove hackers** — purge leaderboard entries with a total game time under 20 seconds, and block such submissions going forward.
6. **Ultra Hard for all other modes** — the new tier is added everywhere difficulty applies.

## Foundational change: the `ultra-hard` tier

Add `'ultra-hard'` to the `Difficulty` union in `lib/engine/types.ts`:

```ts
export type Difficulty = 'easy' | 'medium' | 'hard' | 'super-hard' | 'ultra-hard';
```

Because many maps are typed `Record<Difficulty, …>`, this forces an exhaustive update across the codebase. Every one of these must gain an `ultra-hard` entry:

- `lib/engine/difficulty.ts` — `configs` (all 4 operations), `getDifficultyLabel`, `getDifficultyDescription` (mixed / word-problems / make-tens / word-based maps).
- `components/game/DifficultyCard.tsx` — `difficultyConfig` (label, colour, icon).
- `lib/engine/wordProblemGenerator.ts` — `templatesByDifficulty` (new `ultraHardTemplates`).
- `lib/engine/wordBasedGenerator.ts` — `getTemplates` switch (new `ultraHardTemplates`).
- `lib/engine/scoring.ts` — `getCapsPerCorrect`, `getQuestionTimeLimitMs` (the latter is currently unused/vestigial but kept type-valid).
- `app/leaderboard/page.tsx` — `difficulties` map.
- `app/scores/page.tsx` — `difficultyLabels` (also add the missing `super-hard` while here).

### Ultra Hard number ranges

| Operation | operand1 | operand2 | operand3 | Notes |
|-----------|----------|----------|----------|-------|
| addition | 10000–999999 | 10000–999999 | 10000–999999 | `a + b + c`, three 5–6 digit numbers |
| subtraction | 500000–999999 | 10000–200000 | 10000–200000 | `a − b − c`; ranges guarantee result ≥ ~100000 (always positive) |
| multiplication | 25–99 | 12–99 | — | two operands |
| division | 12–50 | 25–99 | — | generated from product, whole-number answer |

Mixed mode at Ultra Hard draws from each operation's Ultra Hard config, so its addition/subtraction questions are 3-operand too — no extra work beyond the shared generator.

`DifficultyCard` Ultra Hard styling: label "Ultra Hard", a distinct icon (e.g. `Bomb` or `Zap` from lucide), darkest/most-intense colour.

### Reward & description tuning for Ultra Hard

`getCapsPerCorrect`:
- difficulty path (addition/subtraction/division/mixed): `ultra-hard` → **50** caps (super-hard = 30).
- word-problems: `ultra-hard` → **70** (super = 45).
- word-based: `ultra-hard` → **60** (super = 40).

Descriptions (in `getDifficultyDescription`): short flavour text per mode, e.g. mixed → "Monster numbers, all operations"; addition/subtraction inherit the generic "Numbers: …" line built from the config ranges.

## Item 1 + 4: multiplication difficulty mode & ranking fix

### Data model / category key

A difficulty-based multiplication game leaves `timesTable === null` and sets `difficulty`. The existing save logic in `app/play/page.tsx` already falls through to `` `${operation}_${difficulty}` `` in that case, producing keys `multiplication_easy` … `multiplication_ultra-hard`. No save-logic change needed beyond verifying this path.

### Question generation

`generateQuestions('multiplication', difficulty)` already works — it uses the `multiplication` config in `difficulty.ts` via the single-operation branch. No generator change.

### Entry point (UI)

On the **times-table selection screen** (`selectTimesTable` phase), add a full-width card above the 1×–12× grid:

> 🎲 **Mixed Difficulty** — random multiplication, pick Easy → Ultra Hard

Tapping it transitions to the `selectDifficulty` phase (without setting `timesTable`).

New store action in `gameStore.ts`:

```ts
startMultiplicationDifficultyMode: () => set({ phase: 'selectDifficulty' }),
```

`setDifficulty` is unchanged (it already calls `generateQuestions(operation, difficulty)`).

`goBack` update: when `phase === 'selectDifficulty'` **and** `operation === 'multiplication'`, return to `selectTimesTable` (not `selectOperation`). All other operations keep returning to `selectOperation`.

The existing range-based "Mixed" times table (`timesTable: 'mixed'`) is untouched as gameplay; it just no longer has its own leaderboard tab.

### Leaderboard fix (item 4)

In `app/leaderboard/page.tsx`, change the `multiplication` entry in `difficulties` to the standard list (Easy/Medium/Hard/Super Hard/Ultra Hard) — same shape as every other operation. The `mixedx` "Mixed Tables" tab is removed (those scores remain visible on the personal Scores page). Every operation's difficulty list gains the Ultra Hard tab.

## Item 2: Play Again button

New store action:

```ts
playAgain: () => {
  const { operation, difficulty, timesTable, mixedRange, makeTarget } = get();
  let questions: Question[] = [];
  if (timesTable) questions = generateTimesTableQuestions(timesTable, 10, mixedRange ?? undefined);
  else if (makeTarget) questions = generateMakeTensQuestions(makeTarget);
  else if (operation) questions = generateQuestions(operation, difficulty!);
  set({
    phase: 'countdown', questions, currentQuestionIndex: 0, results: [],
    score: 0, streak: 0, bestStreak: 0,
    questionStartTime: 0, gameStartTime: 0, gameEndTime: 0,
    activeChallengeId: null, // a replay is always a fresh solo game
  });
},
```

On the finished screen (`app/play/page.tsx`), add a "Play Again" button (e.g. `RotateCcw` icon, success/blue styling) shown on **all** finished games. Its handler:

```ts
sounds.click();
store.playAgain();
scoreSaved.current = false;
setCapsEarnedThisGame(0);
setChallengeSent(false);
```

Staying on `/play`, the countdown overlay runs and the new round begins. Button order: Play Again, then (Challenge a Friend / View Challenge Result), then Done.

## Item 3 + 6: 3-operand support & input cap

### Type

```ts
export interface Question {
  …
  operand3?: number; // present only for 3-operand ultra-hard addition/subtraction
}
```

### Generator (`generateSingleQuestion`)

Extend `DifficultyConfig` with an optional third range:

```ts
interface DifficultyConfig { operand1: Range; operand2: Range; operand3?: Range; }
```

- **addition**: if `config.operand3` present → `c = randomInt(...)`, `answer = a + b + c`, return `{ …, operand3: c }`.
- **subtraction**: if `config.operand3` present → `answer = a - b - c` with `a` = operand1 (the large range), no swap; ranges guarantee positivity. Return `operand3: c`.
- Other operations and non-ultra difficulties unchanged.

### Rendering (`QuestionCard.tsx`)

In the standard-equation branch, when `question.operand3 !== undefined`, render `operand1 OP operand2 OP operand3 = ?` (same symbol throughout). Use a smaller font size for 3-operand equations (e.g. `text-3xl sm:text-4xl` instead of `text-5xl sm:text-6xl`) so the long expression fits the card without vertical wrapping (consistent with the earlier multi-digit-wrap fix).

### Results review (`app/play/page.tsx`)

The non-make-tens equation string must include `operand3` when present:
`` `${operand1} OP ${operand2} OP ${operand3} = ${answer}` ``.

### Input cap

In `app/play/page.tsx`, raise the digit cap from `>= 6` to `>= 7` in both the keyboard handler and `handleDigit` (max answer `999999 × 3 = 2,999,997`, 7 digits).

## Item 5: remove hackers

**Definition (confirmed):** a hacker = a leaderboard entry whose total game time (`time_ms`) is under 20000 ms. A full ~10-question game that fast is not humanly possible.

**Insert guard** — in `POST /api/leaderboard` (`app/api/leaderboard/route.ts`), reject when `timeMs < 20000`: skip the insert and return a benign response (e.g. `{ skipped: true }`, status 200) so the client UX is unaffected and cheats stop landing in the table.

**One-time purge** — run once against the Neon database:

```sql
DELETE FROM leaderboard_entries WHERE time_ms < 20000;
```

Delivered as `scripts/purge-hackers.sql` (run in the Neon SQL console). Only the leaderboard records carry timing data; the personal Scores page (`profile.highScores`) stores no time, so it cannot be filtered and is out of scope for this purge.

*(Privacy note: this deletes only cheat-flagged leaderboard rows — data minimisation, not a concern.)*

## Out of scope / non-goals

- No change to make-tens difficulty (it has no difficulty axis — it's target-based; its unused difficulty description strings get an `ultra-hard` key only to satisfy the type).
- No reinstatement of the per-question timer (`QuestionTimer` / `getQuestionTimeLimitMs` stay vestigial).
- No purge of personal high scores (no timing data available to judge them).
- No re-introduction of per-digit OCR obfuscation (previously tried and reverted).

## Testing

- **Generators**: unit-test `generateSingleQuestion` / `generateQuestions` for `ultra-hard` — addition sums three operands, subtraction stays non-negative, multiplication/division ranges correct, `operand3` only set where expected.
- **playAgain**: from each mode (times-table, mixed-tables, make-tens, difficulty-based, challenge) it produces a fresh question set, resets score/streak/results, and clears `activeChallengeId`.
- **Leaderboard guard**: `POST` with `timeMs < 20000` does not insert; `>= 20000` does.
- **Manual**: play multiplication Mixed Difficulty and confirm the score appears under the matching leaderboard difficulty tab; play addition Ultra Hard and confirm 3-operand rendering, a 7-digit answer is enterable, and the results review shows the full equation.
