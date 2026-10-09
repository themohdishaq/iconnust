import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySessionForAPI } from '@/lib/auth';
import { isValidRequestOrigin } from '@/lib/requestOrigin';
import { deleteIpRecord, listIpPortfolio, saveIpRecord } from '@/lib/models/IpPortfolio';
import { IpPortfolioError, validateIpId, validateIpInput } from '@/lib/ipPortfolioValidation';

function failure(error: unknown) {
  if (error instanceof IpPortfolioError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error('IP portfolio request failed:', error);
  return NextResponse.json({ error: 'Unable to load or save IP records. Please try again.' }, { status: 500 });
}

export async function readIpPortfolio() {
  try { return NextResponse.json(await listIpPortfolio(), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { return failure(error); }
}

export async function mutateIpPortfolio(request: NextRequest, id?: string) {
  try { await verifySessionForAPI(request); }
  catch { return NextResponse.json({ error: 'Please sign in to the admin area.' }, { status: 401 }); }
  if (!isValidRequestOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    if (id !== undefined) validateIpId(id);
    let savedId = id;
    if (request.method === 'DELETE') {
      if (!id) throw new IpPortfolioError('Missing IP record ID.');
      await deleteIpRecord(id);
    } else {
      let body: unknown;
      try { body = await request.json(); }
      catch { throw new IpPortfolioError('Invalid JSON request body.'); }
      savedId = await saveIpRecord(validateIpInput(body), id);
    }
    revalidatePath('/admin/ip-portfolio');
    revalidatePath('/admin');
    revalidatePath('/research-innovation/ipo-listing');
    revalidatePath('/research-innovation/ipo-listing/[slug]', 'page');
    return NextResponse.json({ id: savedId, success: true }, { status: request.method === 'POST' ? 201 : 200 });
  } catch (error) { return failure(error); }
}
