import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rows = await sql`
    UPDATE friendships SET status = 'accepted'
    WHERE id = ${id} AND status = 'pending'
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Request not found or already accepted' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
