import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { currentPin, newPin } = await request.json();

  if (!currentPin || !newPin || typeof newPin !== 'string' || newPin.length !== 4) {
    return NextResponse.json({ error: 'Invalid PIN' }, { status: 400 });
  }

  const rows = await sql`SELECT pin FROM profiles WHERE id = ${id}`;
  if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (rows[0].pin !== currentPin) return NextResponse.json({ error: 'Wrong PIN' }, { status: 403 });

  await sql`UPDATE profiles SET pin = ${newPin} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
