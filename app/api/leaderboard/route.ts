import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');
  const sort = request.nextUrl.searchParams.get('sort') || 'score';

  if (!category) {
    return NextResponse.json({ error: 'category required' }, { status: 400 });
  }

  let rows;
  if (sort === 'time') {
    rows = await sql`
      SELECT id, profile_id, profile_name, avatar, category, score, time_ms, created_at
      FROM leaderboard_entries
      WHERE category = ${category}
      ORDER BY time_ms ASC
      LIMIT 10
    `;
  } else {
    rows = await sql`
      SELECT id, profile_id, profile_name, avatar, category, score, time_ms, created_at
      FROM leaderboard_entries
      WHERE category = ${category}
      ORDER BY score DESC
      LIMIT 10
    `;
  }

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { profileId, profileName, avatar, category, score, timeMs } = body;

  if (!profileId || !category || score === undefined || timeMs === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO leaderboard_entries (id, profile_id, profile_name, avatar, category, score, time_ms)
    VALUES (${id}, ${profileId}, ${profileName}, ${JSON.stringify(avatar || {})}, ${category}, ${score}, ${timeMs})
  `;

  return NextResponse.json({ id }, { status: 201 });
}
