import { SITE_URL } from '@/lib/seo';

function normalizeOrigin(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) return;
    return url.origin;
  } catch { return undefined; }
}

function firstHeader(request: Request, name: string): string | undefined {
  return request.headers.get(name)?.split(',')[0].trim() || undefined;
}

/** Validate browser mutations against the public origin, including HTTPS proxies. */
export function isValidRequestOrigin(request: Request): boolean {
  const suppliedOrigin = request.headers.get('origin');
  // Preserve support for authenticated non-browser clients without an Origin header.
  if (suppliedOrigin === null) return true;
  const origin = normalizeOrigin(suppliedOrigin);
  if (!origin) return false;

  const allowed = new Set<string>();
  const configured = [SITE_URL, ...(process.env.API_ALLOWED_ORIGINS || '').split(',')];
  for (const value of configured) {
    const normalized = normalizeOrigin(value.trim());
    if (normalized) allowed.add(normalized);
  }

  const url = new URL(request.url);
  // The production proxy must overwrite forwarded headers with the public host/protocol.
  const host = firstHeader(request, 'x-forwarded-host') || firstHeader(request, 'host') || url.host;
  const protocol = firstHeader(request, 'x-forwarded-proto') || (process.env.NODE_ENV === 'production' ? 'https' : url.protocol.slice(0, -1));
  const publicOrigin = normalizeOrigin(`${protocol}://${host}`);
  if (publicOrigin) allowed.add(publicOrigin);

  return allowed.has(origin);
}
