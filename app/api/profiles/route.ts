import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const deviceId = request.nextUrl.searchParams.get('deviceId');
  if (!deviceId) {
    return NextResponse.json([]);
  }

  const rows = await sql`
    SELECT id, name, bottle_caps, avatar, purchased_items, total_games_played,
           total_correct_answers, high_scores, created_at,
           CASE WHEN device_id = ${deviceId} THEN true ELSE false END AS owned
    FROM profiles WHERE device_id = ${deviceId} OR device_id IS NULL
    ORDER BY created_at
  `;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, name, pin, deviceId, bottleCaps, avatar, purchasedItems, totalGamesPlayed, totalCorrectAnswers, highScores } = body;

  if (!deviceId) {
    return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
  }

  await sql`
    INSERT INTO profiles (id, name, pin, device_id, bottle_caps, avatar, purchased_items, total_games_played, total_correct_answers, high_scores)
    VALUES (${id}, ${name}, ${pin}, ${deviceId}, ${bottleCaps ?? 0}, ${JSON.stringify(avatar ?? {})}, ${JSON.stringify(purchasedItems ?? [])}, ${totalGamesPlayed ?? 0}, ${totalCorrectAnswers ?? 0}, ${JSON.stringify(highScores ?? {})})
  `;

  return NextResponse.json({ id }, { status: 201 });
}
