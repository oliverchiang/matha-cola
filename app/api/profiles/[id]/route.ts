import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await sql`
    SELECT id, name, bottle_caps, avatar, purchased_items, total_games_played,
           total_correct_answers, high_scores, created_at
    FROM profiles WHERE id = ${id}
  `;
  if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  // Single atomic UPDATE using COALESCE to only update provided fields
  await sql`
    UPDATE profiles SET
      bottle_caps = COALESCE(${body.bottleCaps ?? null}::integer, bottle_caps),
      avatar = COALESCE(${body.avatar ? JSON.stringify(body.avatar) : null}::jsonb, avatar),
      purchased_items = COALESCE(${body.purchasedItems ? JSON.stringify(body.purchasedItems) : null}::jsonb, purchased_items),
      total_games_played = COALESCE(${body.totalGamesPlayed ?? null}::integer, total_games_played),
      total_correct_answers = COALESCE(${body.totalCorrectAnswers ?? null}::integer, total_correct_answers),
      high_scores = COALESCE(${body.highScores ? JSON.stringify(body.highScores) : null}::jsonb, high_scores)
    WHERE id = ${id}
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { pin } = body;

  if (!pin || typeof pin !== 'string') {
    return NextResponse.json({ error: 'PIN required' }, { status: 400 });
  }

  const rows = await sql`SELECT pin FROM profiles WHERE id = ${id}`;
  if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (rows[0].pin !== pin) return NextResponse.json({ error: 'Wrong PIN' }, { status: 403 });

  await sql`DELETE FROM profiles WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
