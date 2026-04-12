import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get('profileId');
  if (!profileId) return NextResponse.json({ error: 'profileId required' }, { status: 400 });

  // Get all friendships involving this profile
  const rows = await sql`
    SELECT f.id, f.requester_id, f.addressee_id, f.status, f.created_at,
           p.name, p.avatar, p.bottle_caps, p.total_games_played
    FROM friendships f
    JOIN profiles p ON p.id = CASE
      WHEN f.requester_id = ${profileId} THEN f.addressee_id
      ELSE f.requester_id
    END
    WHERE f.requester_id = ${profileId} OR f.addressee_id = ${profileId}
    ORDER BY f.created_at DESC
  `;

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { requesterId, addresseeId } = body;

  if (!requesterId || !addresseeId) {
    return NextResponse.json({ error: 'requesterId and addresseeId required' }, { status: 400 });
  }
  if (requesterId === addresseeId) {
    return NextResponse.json({ error: 'Cannot friend yourself' }, { status: 400 });
  }

  // Check if friendship already exists in either direction
  const existing = await sql`
    SELECT id FROM friendships
    WHERE (requester_id = ${requesterId} AND addressee_id = ${addresseeId})
       OR (requester_id = ${addresseeId} AND addressee_id = ${requesterId})
  `;

  if (existing.length > 0) {
    return NextResponse.json({ error: 'Friendship already exists' }, { status: 409 });
  }

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO friendships (id, requester_id, addressee_id, status)
    VALUES (${id}, ${requesterId}, ${addresseeId}, 'pending')
  `;

  return NextResponse.json({ id }, { status: 201 });
}
