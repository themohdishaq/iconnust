import { createHmac, randomInt } from 'crypto';

export const OTP_TTL_MS = 5 * 60 * 1000;
export const MAX_OTP_ATTEMPTS = 5;

const SECRET = process.env.JWT_SECRET || '';

export function generateOtpCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export function hashOtpCode(code: string): string {
  return createHmac('sha256', SECRET).update(code).digest('hex');
}
