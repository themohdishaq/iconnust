import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import InventionDisclosure, { type DisclosureSource } from '@/lib/models/InventionDisclosure';
import { isRateLimited } from '@/lib/rateLimit';
import { notifyDepartment } from '@/lib/departments';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES: DisclosureSource[] = ['idf-modal', 'quick-form'];

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
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

  const data = body as Record<string, unknown>;

  if (typeof data.source !== 'string' || !VALID_SOURCES.includes(data.source as DisclosureSource)) {
    return NextResponse.json({ error: 'Invalid submission source.' }, { status: 400 });
  }

  const inventionTitle = str(data.inventionTitle, 300);
  const contactEmail = str(data.contactEmail, 200).toLowerCase();
  const description = str(data.description, 4000);

  if (!inventionTitle) {
    return NextResponse.json({ error: 'Invention title is required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(contactEmail)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (!description) {
    return NextResponse.json({ error: 'A description is required.' }, { status: 400 });
  }

  const priorDisclosure = data.priorDisclosure === 'yes' ? 'yes' : 'no';
  const domain = str(data.domain, 200);
  const inventorNames = str(data.inventorNames, 300);
  const department = str(data.department, 200);
  const contactPhone = str(data.contactPhone, 50);

  try {
    await InventionDisclosure.create({
      source: data.source as DisclosureSource,
      inventionTitle,
      domain,
      inventorNames,
      department,
      studentOrEmployeeId: str(data.studentOrEmployeeId, 100),
      contactEmail,
      contactPhone,
      conceptionDate: str(data.conceptionDate, 50),
      description,
      novelty: str(data.novelty, 4000),
      applications: str(data.applications, 4000),
      fundingSource: str(data.fundingSource, 300),
      priorDisclosure,
      priorDisclosureDetails: str(data.priorDisclosureDetails, 2000),
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
