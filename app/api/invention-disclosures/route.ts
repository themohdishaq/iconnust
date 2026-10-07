import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import InventionDisclosure, { type DisclosureSource } from '@/lib/models/InventionDisclosure';
import { isRateLimited } from '@/lib/rateLimit';
import { notifyDepartment } from '@/lib/departments';

import { isValidRequestOrigin } from '@/lib/requestOrigin';
import { disclosureValidationError, isRecord } from '@/lib/apiValidation';
const VALID_SOURCES: DisclosureSource[] = ['idf-modal', 'quick-form'];

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export async function GET() {
  try {
    const published = await InventionDisclosure.listApproved();

    return NextResponse.json(
      published.map((d) => ({
        id: d.id.toString(),
        title: d.inventionTitle,
        domain: d.domain,
        status: d.displayStatus,
        trl: d.trl,
      }))
    );
  } catch (error) {
    console.error('Failed to load invention disclosures:', error);
    return NextResponse.json({ error: 'Invention disclosures could not be loaded.' }, { status: 500 });
  }
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

  const data = body as Record<string, unknown>;

  if (typeof data.source !== 'string' || !VALID_SOURCES.includes(data.source as DisclosureSource)) {
    return NextResponse.json({ error: 'Invalid submission source.' }, { status: 400 });
  }

  const validationError = disclosureValidationError(data);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });
  const inventionTitle = str(data.inventionTitle);
  const contactEmail = str(data.contactEmail).toLowerCase();
  const description = str(data.description);

  const priorDisclosure = data.priorDisclosure === 'yes' ? 'yes' : 'no';
  const domain = str(data.domain);
  const inventorNames = str(data.inventorNames);
  const department = str(data.department);
  const contactPhone = str(data.contactPhone);

  try {
    await InventionDisclosure.create({
      source: data.source as DisclosureSource,
      inventionTitle,
      domain,
      inventorNames,
      department,
      studentOrEmployeeId: str(data.studentOrEmployeeId),
      contactEmail,
      contactPhone,
      conceptionDate: str(data.conceptionDate),
      description,
      novelty: str(data.novelty),
      applications: str(data.applications),
      fundingSource: str(data.fundingSource),
      priorDisclosure,
      priorDisclosureDetails: str(data.priorDisclosureDetails),
    });
  } catch (error) {
    console.error('Failed to save invention disclosure:', error);
    return NextResponse.json({ error: 'Your disclosure could not be saved. Please try again.' }, { status: 500 });
  }

  await notifyDepartment('invention-disclosure', [
    ['Invention Title', inventionTitle],
    ['Domain', domain || '—'],
    ['Inventor(s)', inventorNames || '—'],
    ['Department', department || '—'],
    ['Contact Email', contactEmail],
    ['Contact Phone', contactPhone || '—'],
    ['Prior Disclosure', priorDisclosure],
    ['Description', description],
    ['Submission Form', data.source as string],
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
