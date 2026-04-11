import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  const rows = await sql`
    SELECT id, name, bottle_caps, avatar, purchased_items, total_games_played,
           total_correct_answers, high_scores, created_at
    FROM profiles ORDER BY created_at
  `;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, name, pin, bottleCaps, avatar, purchasedItems, totalGamesPlayed, totalCorrectAnswers, highScores } = body;

  await sql`
    INSERT INTO profiles (id, name, pin, bottle_caps, avatar, purchased_items, total_games_played, total_correct_answers, high_scores)
    VALUES (${id}, ${name}, ${pin}, ${bottleCaps ?? 0}, ${JSON.stringify(avatar ?? {})}, ${JSON.stringify(purchasedItems ?? [])}, ${totalGamesPlayed ?? 0}, ${totalCorrectAnswers ?? 0}, ${JSON.stringify(highScores ?? {})})
  `;

  return NextResponse.json({ id }, { status: 201 });
}
