import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SectorCatalog from '@/components/innovation-collaboration/SectorCatalog';
import { listInnovationPortfolio } from '@/lib/models/InnovationPortfolio';

export const dynamic = 'force-dynamic';

type SectorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { sectors } = await listInnovationPortfolio();
  const sector = sectors.find(s => s.slug === slug);

  if (!sector) return { title: 'Sector Not Found' };

  return {
    title: `${sector.title} Innovations`,
    description: sector.description,
    alternates: {
      canonical: `/commercialisation/sectors/${sector.slug}`,
    },
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const { sectors, projects } = await listInnovationPortfolio();
  const sector = sectors.find(s => s.slug === slug);

  if (!sector) notFound();

  return (
    <SectorCatalog
      sector={sector}
      projects={projects.filter(p => p.sectorSlugs.includes(sector.slug))}
      sectors={sectors}
    />
  );
}
