import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');
  const excludeId = request.nextUrl.searchParams.get('excludeId');

  if (!q || q.length < 1) {
    return NextResponse.json([]);
  }

  const pattern = `%${q}%`;
  const rows = await sql`
    SELECT id, name, avatar, bottle_caps, total_games_played
    FROM profiles
    WHERE name ILIKE ${pattern}
    AND id != ${excludeId || ''}
    LIMIT 10
  `;

  return NextResponse.json(rows);
}
