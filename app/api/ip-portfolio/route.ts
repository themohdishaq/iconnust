import { NextRequest } from 'next/server';
import { mutateIpPortfolio, readIpPortfolio } from '@/lib/ipPortfolioApi';

export const dynamic = 'force-dynamic';
export function GET() { return readIpPortfolio(); }
export function POST(request: NextRequest) { return mutateIpPortfolio(request); }
