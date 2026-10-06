import { NextRequest } from 'next/server';
import { readPortfolio, mutatePortfolio } from '@/lib/innovationApi';

export const dynamic = 'force-dynamic';
export function GET(request: NextRequest) { return readPortfolio(request, 'sectors'); }
export function POST(request: NextRequest) { return mutatePortfolio(request, 'sectors'); }
