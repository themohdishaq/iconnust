import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Subscriber from '@/lib/models/Subscriber';
import { isRateLimited } from '@/lib/rateLimit';
import { isValidRequestOrigin } from '@/lib/requestOrigin';
import { isEmail, isRecord } from '@/lib/apiValidation';

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: NextRequest) {
  if (!isValidRequestOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;

  if (!isEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  try {
    await Subscriber.create({ email: email.trim().toLowerCase() });
  } catch (error) {
    console.error('Failed to save subscription:', error);
    return NextResponse.json({ error: 'Your subscription could not be saved. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
