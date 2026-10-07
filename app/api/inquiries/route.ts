import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import HomeInquiry from '@/lib/models/HomeInquiry';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';
import InnovationInquiry from '@/lib/models/InnovationInquiry';
import type { InquiryModel } from '@/lib/models/inquiryModelFactory';
import { isRateLimited } from '@/lib/rateLimit';
import { notifyDepartment, type NotificationSource } from '@/lib/departments';

import { isValidRequestOrigin } from '@/lib/requestOrigin';
import { isEmail, isRecord } from '@/lib/apiValidation';

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

  const {
    source,
    organization,
    email,
    domain,
    message,
    website,
    name,
    industry,
    phoneNumber,
    province,
    address,
    briefAboutCompany,
  } = body as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field; bots often do.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (typeof source !== 'string' || !Object.hasOwn(modelsBySource, source)) {
    return NextResponse.json({ error: 'Invalid submission source.' }, { status: 400 });
  }
  if (typeof organization !== 'string' || organization.trim().length === 0 || organization.length > 200) {
    return NextResponse.json({ error: 'Company name is required.' }, { status: 400 });
  }
  if (!isEmail(email, 200)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (domain !== undefined && (typeof domain !== 'string' || domain.length > 200)) {
    return NextResponse.json({ error: 'Invalid domain value.' }, { status: 400 });
  }
  if (message !== undefined && (typeof message !== 'string' || message.length > 4000)) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const optionalFields: Array<[string, unknown, number]> = [
    ['name', name, 200],
    ['industry', industry, 200],
    ['phoneNumber', phoneNumber, 50],
    ['province', province, 200],
    ['address', address, 300],
    ['briefAboutCompany', briefAboutCompany, 4000],
  ];
  for (const [field, value, maxLength] of optionalFields) {
    if (value !== undefined && (typeof value !== 'string' || value.length > maxLength)) {
      return NextResponse.json({ error: `Invalid ${field} value.` }, { status: 400 });
    }
  }

  const Model = modelsBySource[source];
  try {
    await Model.create({
      organization: organization.trim(),
      name: typeof name === 'string' ? name.trim() : '',
      industry: typeof industry === 'string' ? industry.trim() : '',
      phoneNumber: typeof phoneNumber === 'string' ? phoneNumber.trim() : '',
      email: email.trim().toLowerCase(),
      province: typeof province === 'string' ? province.trim() : '',
      address: typeof address === 'string' ? address.trim() : '',
      briefAboutCompany: typeof briefAboutCompany === 'string' ? briefAboutCompany.trim() : '',
      domain: typeof domain === 'string' ? domain.trim() : '',
      message: typeof message === 'string' ? message.trim() : '',
    });
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return NextResponse.json({ error: 'Your inquiry could not be saved. Please try again.' }, { status: 500 });
  }

  await notifyDepartment(source as NotificationSource, [
    ['Organization', organization.trim()],
    ['Name', typeof name === 'string' && name.trim() ? name.trim() : '—'],
    ['Industry / Sector', typeof industry === 'string' && industry.trim() ? industry.trim() : '—'],
    ['Phone Number', typeof phoneNumber === 'string' && phoneNumber.trim() ? phoneNumber.trim() : '—'],
    ['Email', email.trim().toLowerCase()],
    ['Province', typeof province === 'string' && province.trim() ? province.trim() : '—'],
    ['Address', typeof address === 'string' && address.trim() ? address.trim() : '—'],
    ['Brief About Company', typeof briefAboutCompany === 'string' && briefAboutCompany.trim() ? briefAboutCompany.trim() : '—'],
    ['Domain', typeof domain === 'string' && domain.trim() ? domain.trim() : '—'],
    ['Message', typeof message === 'string' && message.trim() ? message.trim() : '—'],
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
