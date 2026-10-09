import { slugify } from '@/lib/slugify';

export type IpRecord = {
  id?: string;
  ip_title: string;
  ip_type: 'Utility Patent' | 'Copyright' | 'Industrial Design';
  sector: string;
  application_no: string | null;
  description?: string;
  award_date?: string | null;
};

export const IP_TYPES: IpRecord['ip_type'][] = ['Utility Patent', 'Copyright', 'Industrial Design'];

const definedSectors = [
  'Aerospace Engineering', 'Arts & Crafts', 'Automotive Engineering',
  'Biomedical Engineering', 'Clinical Sciences', 'Computer Science',
  'Defence Engineering', 'Electrical Engineering', 'Electronics Engineering',
  'Environmental Sciences', 'Information Technology', 'Manufacturing Engineering',
  'Materials Engineering', 'Mechanical Engineering', 'NUST Ventures', 'Robotics',
  'Software Engineering', 'Solar Thermal Engineering', 'Thermal Engineering',
];

export function getPortfolioSectors(records: IpRecord[]) {
  return [...new Set([
    ...definedSectors,
    ...records.map((record) => record.sector).filter((sector) => sector && sector !== 'Unknown'),
  ])].sort((a, b) => a.localeCompare(b));
}
export const portfolioSectors = getPortfolioSectors([]);

export function getIpSectorSlug(sector: string | null) {
  if (sector === null) return 'all-fields';
  if (sector === 'Unknown') return 'unassigned-sector';
  return slugify(sector);
}

export function getIpSectorFromSlug(slug: string, sectors = portfolioSectors) {
  if (slug === 'all-fields') return 'All fields';
  if (slug === 'unassigned-sector') return 'Unknown';
  return sectors.find((sector) => slugify(sector) === slug) ?? null;
}
