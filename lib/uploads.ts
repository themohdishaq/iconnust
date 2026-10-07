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

  const buffer = Buffer.from(await file.arrayBuffer());
  const matches = expectedMime === 'image/jpeg'
    ? buffer.length >= 3 && buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
    : expectedMime === 'image/png'
      ? buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : expectedMime === 'image/gif'
        ? ['GIF87a', 'GIF89a'].includes(buffer.subarray(0, 6).toString('ascii'))
        : buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  if (!matches) throw new Error('File content does not match its image type.');

  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
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
