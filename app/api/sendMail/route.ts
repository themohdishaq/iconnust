import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionForAPI } from '@/lib/auth';
import { sendMail } from '@/lib/mailer';
import { isRateLimited } from '@/lib/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Authenticated utility endpoint for the admin dashboard to send ad-hoc emails
// (e.g. a "send test email" action in Settings). Not used by the public forms —
// those call lib/departments.ts directly from their route handlers.
export async function POST(request: NextRequest) {
  try {
    await verifySessionForAPI(request);
  } catch {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (isRateLimited('sendMail:admin')) {
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

  const { to, subject, html } = body as Record<string, unknown>;

  if (typeof to !== 'string' || !EMAIL_RE.test(to)) {
    return NextResponse.json({ error: 'A valid recipient email is required.' }, { status: 400 });
  }
  if (typeof subject !== 'string' || !subject.trim()) {
    return NextResponse.json({ error: 'A subject is required.' }, { status: 400 });
  }
  if (typeof html !== 'string' || !html.trim()) {
    return NextResponse.json({ error: 'Email content is required.' }, { status: 400 });
  }

  try {
    await sendMail({ to, subject, html });
  } catch (err) {
    console.error('Failed to send email:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
