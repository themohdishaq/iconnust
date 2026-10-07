import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySessionForAPI } from '@/lib/auth';
import { listInnovationPortfolio, removePortfolioEntry, saveProject, saveSector } from '@/lib/models/InnovationPortfolio';
import { PortfolioError, validatePortfolioId, validatePortfolioInput } from '@/lib/innovationValidation';
import { deleteUploadedImage, saveUploadedImage } from '@/lib/uploads';
import { isValidRequestOrigin } from '@/lib/requestOrigin';

type Kind = 'sectors' | 'projects';

function failure(error: unknown) {
  if (error instanceof PortfolioError) return NextResponse.json({ error: error.message }, { status: error.status });
  const code = (error as { code?: string })?.code;
  if (code === 'ER_DUP_ENTRY') return NextResponse.json({ error: 'This sector URL already exists. Choose a different URL.' }, { status: 409 });
  if (code === 'ER_ROW_IS_REFERENCED_2') return NextResponse.json({ error: 'Move or delete the projects assigned to this sector before deleting it.' }, { status: 409 });
  console.error('Innovation portfolio request failed:', error);
  return NextResponse.json({ error: 'Unable to save or load the portfolio. Please try again.' }, { status: 500 });
}

export async function readPortfolio(request: NextRequest, kind: Kind, id?: string) {
  try {
    if (id !== undefined) validatePortfolioId(kind, id);
    const slug = request.nextUrl.searchParams.get('sector');
    if (slug !== null) validatePortfolioId('sectors', slug);
    const portfolio = await listInnovationPortfolio();
    if (id) {
      const item = kind === 'sectors' ? portfolio.sectors.find(s => s.slug === id) : portfolio.projects.find(p => p.id === id);
      if (!item) throw new PortfolioError('Entry not found.', 404);
      return NextResponse.json(item, { headers: { 'Cache-Control': 'no-store' } });
    }
    return NextResponse.json(kind === 'sectors' ? portfolio.sectors : portfolio.projects.filter(p => !slug || p.sectorSlugs.includes(slug)), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return failure(error); }
}

export async function mutatePortfolio(request: NextRequest, kind: Kind, id?: string) {
  try {
    await verifySessionForAPI(request);
  }
  catch { return NextResponse.json({ error: 'Please sign in to the admin area.' }, { status: 401 }); }
  if (!isValidRequestOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  let uploaded: string | undefined;
  try {
    if (id !== undefined) validatePortfolioId(kind, id);
    let savedId = id;
    if (request.method === 'DELETE') {
      if (!id) throw new PortfolioError('Missing entry ID.');
      await removePortfolioEntry(kind, id);
    } else {
      let data: unknown;
      let file: File | undefined;
      try {
        if (request.headers.get('content-type')?.includes('multipart/form-data')) {
          const form = await request.formData();
          data = JSON.parse(String(form.get('data') || 'null'));
          const image = form.get('file');
          if (image !== null && !(image instanceof File)) throw new PortfolioError('Invalid image upload.');
          if (image instanceof File && image.size > 0) file = image;
        } else { data = await request.json(); }
      } catch { throw new PortfolioError('Invalid request body.'); }
      // Validate before writing an upload, using a placeholder for an uploaded sector hero.
      const input = validatePortfolioInput(kind, file && data && typeof data === 'object' && !Array.isArray(data) ? { ...data, [kind === 'sectors' ? 'heroImage' : 'image']: '/uploads/placeholder.png' } : data);
      if (file) {
        try { uploaded = await saveUploadedImage(file, 'innovation'); }
        catch (error) { throw new PortfolioError(error instanceof Error ? error.message : 'Unable to upload image.'); }
        if ('heroImage' in input) input.heroImage = uploaded;
        else input.image = uploaded;
      }
      if ('slug' in input) savedId = await saveSector(input, id);
      else savedId = await saveProject(input, id);
      // The database now owns this image; rollback cleanup only applies before commit.
      uploaded = undefined;
    }
    revalidatePath('/admin/innovation');
    revalidatePath('/commercialisation');
    revalidatePath('/commercialisation/sectors/[slug]', 'page');
    return NextResponse.json({ id: savedId, success: true }, { status: request.method === 'POST' ? 201 : 200 });
  } catch (error) {
    if (uploaded) await deleteUploadedImage(uploaded);
    return failure(error);
  }
}
