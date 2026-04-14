import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  const rows = await sql`
    SELECT id, profile_id, profile_name, avatar, category, score, time_ms, created_at
    FROM leaderboard_entries
    ORDER BY created_at DESC
    LIMIT 20
  `;

  return NextResponse.json(rows);
}
