import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IpSectorPortfolio from '@/components/innovation-collaboration/IpSectorPortfolio';
import { getIpSectorFromSlug, getPortfolioSectors } from '@/lib/ipPortfolio';
import { listIpPortfolio } from '@/lib/models/IpPortfolio';

export const dynamic = 'force-dynamic';

type IpSectorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: IpSectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getIpSectorFromSlug(slug, getPortfolioSectors(await listIpPortfolio()));
  if (!sector) return { title: 'IP Sector Not Found' };

  const title = sector === 'Unknown' ? 'Unassigned sector' : sector;
  return {
    title: `${title} IP Portfolio`,
    description: `Browse NUST intellectual property records in ${title}.`,
    alternates: { canonical: `/research-innovation/ipo-listing/${slug}` },
  };
}

export default async function IpSectorPage({ params }: IpSectorPageProps) {
  const { slug } = await params;
  const ipRecords = await listIpPortfolio();
  const sector = getIpSectorFromSlug(slug, getPortfolioSectors(ipRecords));
  if (!sector) notFound();

  const records = sector === 'All fields'
    ? ipRecords
    : ipRecords.filter((record) => record.sector === sector);

  return <IpSectorPortfolio sector={sector} records={records} />;
}
