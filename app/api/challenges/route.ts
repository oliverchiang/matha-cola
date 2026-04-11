import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get('profileId');
  if (!profileId) return NextResponse.json({ error: 'profileId required' }, { status: 400 });

  const rows = await sql`
    SELECT * FROM challenges
    WHERE challenger_id = ${profileId} OR challengee_id = ${profileId}
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, config, questions, challengerId, challengerName, challengeeId, challengeeName, challengerResult } = body;

  await sql`
    INSERT INTO challenges (id, config, questions, challenger_id, challenger_name, challengee_id, challengee_name, challenger_result)
    VALUES (${id}, ${JSON.stringify(config)}, ${JSON.stringify(questions)}, ${challengerId}, ${challengerName}, ${challengeeId}, ${challengeeName}, ${JSON.stringify(challengerResult)})
  `;

  return NextResponse.json({ id }, { status: 201 });
}
