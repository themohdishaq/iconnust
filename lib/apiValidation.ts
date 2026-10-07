export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isEmail(value: unknown, max = 300): value is string {
  return typeof value === 'string' && value.trim().length <= max && /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value.trim());
}

export const DISCLOSURE_FIELDS: Record<string, number> = {
  inventionTitle: 300, contactEmail: 200, description: 4000, domain: 200,
  inventorNames: 300, department: 200, contactPhone: 50, studentOrEmployeeId: 100,
  conceptionDate: 50, novelty: 4000, applications: 4000, fundingSource: 300,
  priorDisclosureDetails: 2000,
};

export function disclosureValidationError(data: Record<string, unknown>): string | undefined {
  for (const [field, max] of Object.entries(DISCLOSURE_FIELDS)) {
    const value = data[field];
    if (value !== undefined && (typeof value !== 'string' || value.trim().length > max)) return `Invalid ${field} value (maximum ${max} characters).`;
  }
  if (typeof data.inventionTitle !== 'string' || !data.inventionTitle.trim()) return 'Invention title is required.';
  if (!isEmail(data.contactEmail, 200)) return 'A valid email is required.';
  if (typeof data.description !== 'string' || !data.description.trim()) return 'A description is required.';
  if (data.priorDisclosure !== undefined && data.priorDisclosure !== 'yes' && data.priorDisclosure !== 'no') return 'Prior disclosure must be yes or no.';
  if (typeof data.conceptionDate === 'string' && data.conceptionDate.trim()) {
    const date = data.conceptionDate.trim();
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return 'Conception date must be a valid date (YYYY-MM-DD).';
  }
}
