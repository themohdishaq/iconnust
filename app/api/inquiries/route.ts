import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import HomeInquiry from '@/lib/models/HomeInquiry';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';
import InnovationInquiry from '@/lib/models/InnovationInquiry';
import type { InquiryModel } from '@/lib/models/inquiryModelFactory';
import { isRateLimited } from '@/lib/rateLimit';
import { notifyDepartment, type NotificationSource } from '@/lib/departments';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const modelsBySource: Record<string, InquiryModel> = {
  home: HomeInquiry,
  'industry-services': IndustryServiceInquiry,
  'innovation-collaboration': InnovationInquiry,
};

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

  const { source, organization, email, domain, message, website } = body as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field; bots often do.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (typeof source !== 'string' || !(source in modelsBySource)) {
    return NextResponse.json({ error: 'Invalid submission source.' }, { status: 400 });
  }
  if (typeof organization !== 'string' || organization.trim().length === 0 || organization.length > 200) {
    return NextResponse.json({ error: 'Organization is required.' }, { status: 400 });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (domain !== undefined && (typeof domain !== 'string' || domain.length > 200)) {
    return NextResponse.json({ error: 'Invalid domain value.' }, { status: 400 });
  }
  if (message !== undefined && (typeof message !== 'string' || message.length > 4000)) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const Model = modelsBySource[source];
  await Model.create({
    organization: organization.trim(),
    email: email.trim().toLowerCase(),
    domain: typeof domain === 'string' ? domain.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  });

  await notifyDepartment(source as NotificationSource, [
    ['Organization', organization.trim()],
    ['Email', email.trim().toLowerCase()],
    ['Domain', typeof domain === 'string' && domain.trim() ? domain.trim() : '—'],
    ['Message', typeof message === 'string' && message.trim() ? message.trim() : '—'],
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
