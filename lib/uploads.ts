import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

/**
 * Saves an uploaded image File to public/uploads/<folder>/ and returns
 * the public path (e.g. "/uploads/news/169...-abcd.jpg") to store in the database.
 */
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Image is too large (max 5MB).');
  }

  const ext = path.extname(file.name).toLowerCase();
  const expectedMime = ALLOWED_EXTENSIONS[ext];
  if (!expectedMime) {
    throw new Error('Unsupported image type. Allowed: JPG, PNG, WEBP, GIF.');
  }
  if (file.type && file.type !== expectedMime && !(expectedMime === 'image/jpeg' && file.type === 'image/jpg')) {
    throw new Error('File content does not match its extension.');
  }

  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

/**
 * Deletes a previously uploaded image given its public path.
 * Silently ignores files outside /uploads (e.g. external URLs) or missing files.
 */
export async function deleteUploadedImage(publicPath: string | undefined | null): Promise<void> {
  if (!publicPath || !publicPath.startsWith('/uploads/')) return;

  const filePath = path.join(process.cwd(), 'public', publicPath);
  try {
    await unlink(filePath);
  } catch {
    // File may already be gone — nothing to do.
  }
}
