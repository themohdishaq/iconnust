import { NextRequest } from 'next/server';
import { mutateIpPortfolio } from '@/lib/ipPortfolioApi';

type Context = { params: Promise<{ id: string }> };
export async function PUT(request: NextRequest, { params }: Context) { return mutateIpPortfolio(request, (await params).id); }
export async function DELETE(request: NextRequest, { params }: Context) { return mutateIpPortfolio(request, (await params).id); }
