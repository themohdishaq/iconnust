import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const contentTypes: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif',
};

// Production public-folder discovery happens at startup; read later uploads directly.
export async function serveUploadedImage(folder: 'team' | 'innovation', filename: string) {
  const match = /^\d+-[a-f0-9]{12}\.(jpg|jpeg|png|webp|gif)$/.exec(filename);
  if (!match) return new NextResponse(null, { status: 404 });
  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'uploads', folder, filename));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': contentTypes[match[1]],
        'Content-Length': String(file.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return new NextResponse(null, { status: 404 });
    console.error(`Unable to read ${folder} image:`, error);
    return new NextResponse(null, { status: 500 });
  }
}
