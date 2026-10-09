import { serveUploadedImage } from '@/lib/uploadResponse';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  return serveUploadedImage('team', (await params).filename);
}
