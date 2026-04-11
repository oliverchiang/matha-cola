import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { challengeeResult } = body;

  if (!challengeeResult) {
    return NextResponse.json({ error: 'challengeeResult required' }, { status: 400 });
  }

  // Update challenge and return it in one query
  const rows = await sql`
    UPDATE challenges
    SET challengee_result = ${JSON.stringify(challengeeResult)}::jsonb,
        status = 'completed'
    WHERE id = ${id} AND status = 'pending'
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Challenge not found or already completed' }, { status: 404 });
  }

  const challenge = rows[0];

  // Award bonus caps atomically using conditional UPDATE
  if (!challenge.bonus_awarded) {
    const challengerScore = challenge.challenger_result.score;
    const challengeeScore = challengeeResult.score;

    if (challengerScore > challengeeScore) {
      await sql`UPDATE profiles SET bottle_caps = bottle_caps + 5 WHERE id = ${challenge.challenger_id}`;
    } else if (challengeeScore > challengerScore) {
      await sql`UPDATE profiles SET bottle_caps = bottle_caps + 5 WHERE id = ${challenge.challengee_id}`;
    } else {
      // Tie — both get 3
      await sql`UPDATE profiles SET bottle_caps = bottle_caps + 3 WHERE id = ${challenge.challenger_id}`;
      await sql`UPDATE profiles SET bottle_caps = bottle_caps + 3 WHERE id = ${challenge.challengee_id}`;
    }

    await sql`UPDATE challenges SET bonus_awarded = true WHERE id = ${id}`;
  }

  return NextResponse.json({ ok: true });
}
