import { serveUploadedImage } from '@/lib/uploadResponse';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Read runtime uploads directly: production public-folder discovery happens at startup.
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  return serveUploadedImage('innovation', filename);
}
