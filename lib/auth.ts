import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// 1. Define the Session Payload Data Type
type SessionPayload = {
  userId: string;
  email: string;
  role: string; 
  expires: Date;
};

const SECRET_KEY = process.env.JWT_SECRET ;
const key = new TextEncoder().encode(SECRET_KEY);

/**
 * Encrypts a session payload into a JWT string.
 * Used during Login.
 */
export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1800s') // Token expires in 1800 seconds
    .sign(key);
}

/**
 * Decrypts and verifies a JWT string.
 * Used by Middleware and Server Components.
 */
export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    // If token is expired or invalid, return null
    return null;
  }
}

/**
 * Creates the session cookie.
 * Call this inside your Login Server Action.
 */
export async function createSession(userId: string, email: string, role: string) {
  const expires = new Date(Date.now() + 60 * 30 * 1000); // 30 minutes from now
  const session = await encrypt({
    userId,
    email,
    role,
    expires
  });

  // Set the cookie
  const cookieStore = await cookies();
  cookieStore.set('session_token', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Gets the current session in Server Components.
 * Use this to conditionally render UI (e.g., Show "Logout" button).
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session_token')?.value;
  if (!session) return null;
  return await decrypt(session);
}

/**
 * Middleware Helper: Verifies token specifically for middleware.ts
 * Middleware cannot use 'cookies()' from next/headers, so we parse manually.
 */
export async function verifyAuthToken(token: string | undefined) {
  if (!token) return null;
  return await decrypt(token);
}

/**
 * Destroys the session.
 * Call this in your Logout Server Action.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session_token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}


export async function createOtpPendingSession(adminId: string) {
  const token = await new SignJWT({ adminId, purpose: 'admin-otp' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('300s')
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set('otp_pending', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 300,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Reads and verifies the pending-OTP cookie. Returns the admin id it was
 * issued for, or null if missing/expired/tampered.
 */
export async function getOtpPendingAdminId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('otp_pending')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    if (payload.purpose !== 'admin-otp' || typeof payload.adminId !== 'string') return null;
    return payload.adminId;
  } catch {
    return null;
  }
}

export async function clearOtpPendingSession() {
  const cookieStore = await cookies();
  cookieStore.set('otp_pending', '', {
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Verify session for API routes.
 * Returns the session payload if valid, or throws an error if not.
 */
export async function verifySessionForAPI(request: NextRequest): Promise<SessionPayload> {
  const token = request.cookies.get('session_token')?.value;

  if (!token) {
    throw new Error('Unauthorized: No session token');
  }

  const session = await decrypt(token);

  if (!session) {
    throw new Error('Unauthorized: Invalid or expired token');
  }

  // Check if session has expired
  if (session.expires && new Date(session.expires) < new Date()) {
    throw new Error('Unauthorized: Session expired');
  }

  return session;
}