import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { pin, deviceId } = body;

  const rows = await sql`SELECT id, pin, device_id FROM profiles WHERE id = ${id}`;
  if (rows.length === 0) return NextResponse.json({ ok: false }, { status: 404 });

  const match = rows[0].pin === pin;
  if (!match) return NextResponse.json({ ok: false }, { status: 403 });

  // Claim unclaimed profile for this device on successful auth
  if (!rows[0].device_id && deviceId) {
    await sql`UPDATE profiles SET device_id = ${deviceId} WHERE id = ${id}`;
  }

  return NextResponse.json({ ok: true });
}
