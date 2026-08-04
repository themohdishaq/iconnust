import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Subscriber from '@/lib/models/Subscriber';
import { isRateLimited } from '@/lib/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;

  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 300) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  await Subscriber.create({ email: email.trim().toLowerCase() });

  return NextResponse.json({ ok: true }, { status: 201 });
}
