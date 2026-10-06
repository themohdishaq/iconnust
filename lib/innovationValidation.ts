import { SECTOR_ICONS, type ProjectInput, type SectorInput } from './innovationSectors';

export class PortfolioError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

function text(data: Record<string, unknown>, key: string, max: number, required = false) {
  const value = data[key] ?? '';
  if (typeof value !== 'string') throw new PortfolioError(`${key} must be text.`);
  const result = value.trim();
  if (required && !result) throw new PortfolioError(`Please enter ${key}.`);
  if (result.length > max) throw new PortfolioError(`${key} must be at most ${max} characters.`);
  return result;
}

function integer(value: unknown, label: string, min = -2147483648, max = 2147483647) {
  const result = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
  if (!Number.isInteger(result) || result < min || result > max) throw new PortfolioError(`${label} must be a whole number between ${min} and ${max}.`);
  return result;
}

function image(data: Record<string, unknown>, key: string, required = false) {
  const value = text(data, key, 500, required);
  // Match Next Image's configured hosts; uploaded files and existing public assets are local.
  if (value && !/^\/(?!\/)[a-zA-Z0-9_./%-]+$/.test(value)) {
    let url: URL;
    try { url = new URL(value); } catch { throw new PortfolioError(`${key} must be a local image path or supported HTTPS URL.`); }
    if (url.protocol !== 'https:' || !['propakistani.pk', 'i.pinimg.com', 'images.unsplash.com'].includes(url.hostname)) {
      throw new PortfolioError('Upload an image or use an image URL from images.unsplash.com, i.pinimg.com or propakistani.pk.');
    }
  }
  if (value.includes('..')) throw new PortfolioError('Image paths cannot contain parent directory references.');
  return value;
}

export function validatePortfolioInput(kind: 'sectors', value: unknown): SectorInput;
export function validatePortfolioInput(kind: 'projects', value: unknown): ProjectInput;
export function validatePortfolioInput(kind: 'sectors' | 'projects', value: unknown): SectorInput | ProjectInput;
export function validatePortfolioInput(kind: 'sectors' | 'projects', value: unknown): SectorInput | ProjectInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new PortfolioError('Invalid form data.');
  const data = value as Record<string, unknown>;
  const order = integer(data.order ?? 0, 'Display order');
  const description = text(data, 'description', 16000, true);
  if (kind === 'sectors') {
    const slug = text(data, 'slug', 120, true);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new PortfolioError('Sector URL must contain lowercase letters, numbers and hyphens.');
    if (!SECTOR_ICONS.includes(data.iconKey as typeof SECTOR_ICONS[number])) throw new PortfolioError('Please choose a valid sector icon.');
    return {
      slug, title: text(data, 'title', 200, true), description,
      iconKey: data.iconKey as SectorInput['iconKey'], heroImage: image(data, 'heroImage', true),
      ipAssets: text(data, 'ipAssets', 100) || undefined,
      industryPartners: data.industryPartners === '' || data.industryPartners == null ? undefined : integer(data.industryPartners, 'Industry partners', 0),
      order,
    };
  }
  if (data.type !== 'project' && data.type !== 'spin-off') throw new PortfolioError('Please choose project or spin-off.');
  if (!Array.isArray(data.sectorSlugs) || !data.sectorSlugs.length || data.sectorSlugs.length > 100 || data.sectorSlugs.some(s => typeof s !== 'string' || s.length > 120)) {
    throw new PortfolioError('Select at least one sector (maximum 100).');
  }
  return {
    title: text(data, 'title', 300, true), description, type: data.type,
    category: text(data, 'category', 300, true), image: image(data, 'image'),
    status: text(data, 'status', 500), highlight: text(data, 'highlight', 300),
    sectorSlugs: [...new Set(data.sectorSlugs as string[])], order,
  };
}
