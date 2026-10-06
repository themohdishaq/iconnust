import { NextRequest } from 'next/server';
import { readPortfolio, mutatePortfolio } from '@/lib/innovationApi';

type Context = { params: Promise<{ id: string }> };
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, { params }: Context) { return readPortfolio(request, 'projects', (await params).id); }
export async function PUT(request: NextRequest, { params }: Context) { return mutatePortfolio(request, 'projects', (await params).id); }
export async function DELETE(request: NextRequest, { params }: Context) { return mutatePortfolio(request, 'projects', (await params).id); }
