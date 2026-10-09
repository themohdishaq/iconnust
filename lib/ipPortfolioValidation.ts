import { IP_TYPES, type IpRecord } from '@/lib/ipPortfolio';

export type IpPortfolioInput = {
  ip_title: string;
  ip_type: IpRecord['ip_type'];
  sector: string;
  description: string;
  application_no: string | null;
  award_date: string | null;
  status: 'draft' | 'published';
};
export type ManagedIpRecord = Omit<IpRecord, 'award_date'> & IpPortfolioInput & { id: string };

export class IpPortfolioError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function validateIpId(id: string) {
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) {
    throw new IpPortfolioError('Invalid IP record ID.');
  }
}

export function validateIpInput(value: unknown): IpPortfolioInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new IpPortfolioError('Invalid request body.');
  const data = value as Record<string, unknown>;
  function text(key: string, label: string, limit: number, required = false) {
    const value = data[key];
    if (value !== undefined && value !== null && typeof value !== 'string') throw new IpPortfolioError(`${label} must be text.`);
    const result = typeof value === 'string' ? value.trim() : '';
    if (required && !result) throw new IpPortfolioError(`${label} is required.`);
    if (result.length > limit) throw new IpPortfolioError(`${label} must be ${limit} characters or fewer.`);
    return result;
  }
  const ip_title = text('ip_title', 'IP title', 500, true);
  if (!IP_TYPES.includes(data.ip_type as IpRecord['ip_type'])) throw new IpPortfolioError('Select a valid IP type.');
  if (data.status !== 'draft' && data.status !== 'published') throw new IpPortfolioError('Select Draft or Published.');
  const award_date = text('award_date', 'Award date', 10);
  if (award_date) {
    const parsed = new Date(`${award_date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(award_date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== award_date || Number(award_date.slice(0, 4)) < 1000) {
      throw new IpPortfolioError('Enter a valid award date.');
    }
  }
  return {
    ip_title, ip_type: data.ip_type as IpRecord['ip_type'],
    sector: text('sector', 'Field of invention', 200) || 'Unknown',
    description: text('description', 'Description', 15000),
    application_no: text('application_no', 'Application number', 200) || null,
    award_date: award_date || null, status: data.status,
  };
}
