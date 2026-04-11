import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { pin } = body;

  const rows = await sql`SELECT id, pin FROM profiles WHERE id = ${id}`;
  if (rows.length === 0) return NextResponse.json({ ok: false }, { status: 404 });

  const match = rows[0].pin === pin;
  return NextResponse.json({ ok: match }, { status: match ? 200 : 403 });
}
