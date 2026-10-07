import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionForAPI } from '@/lib/auth';
import { sendMail } from '@/lib/mailer';
import { isRateLimited } from '@/lib/rateLimit';

import { isValidRequestOrigin } from '@/lib/requestOrigin';
import { isEmail, isRecord } from '@/lib/apiValidation';

// Authenticated utility endpoint for the admin dashboard to send ad-hoc emails
// (e.g. a "send test email" action in Settings). Not used by the public forms —
// those call lib/departments.ts directly from their route handlers.
export async function POST(request: NextRequest) {
  try {
    await verifySessionForAPI(request);
  } catch {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  if (!isValidRequestOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });

  if (isRateLimited('sendMail:admin')) {
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

  const { to, subject, html } = body as Record<string, unknown>;

  if (!isEmail(to)) {
    return NextResponse.json({ error: 'A valid recipient email is required.' }, { status: 400 });
  }
  if (typeof subject !== 'string' || !subject.trim() || subject.length > 300 || /[\r\n]/.test(subject)) {
    return NextResponse.json({ error: 'A subject is required.' }, { status: 400 });
  }
  if (typeof html !== 'string' || !html.trim() || html.length > 100000) {
    return NextResponse.json({ error: 'Email content is required.' }, { status: 400 });
  }

  try {
    await sendMail({ to: to.trim(), subject: subject.trim(), html });
  } catch (err) {
    console.error('Failed to send email:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
