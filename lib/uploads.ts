import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads');

/**
 * Saves an uploaded image File to public/uploads/<folder>/ and returns
 * the public path (e.g. "/uploads/news/169...-abcd.jpg") to store in Mongo.
 */
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || '.jpg';
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
