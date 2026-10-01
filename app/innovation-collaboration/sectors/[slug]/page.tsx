import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SectorCatalog from '@/components/innovation-collaboration/SectorCatalog';
import { getInnovationSector, getSectorProjects, innovationSectors } from '@/lib/innovationSectors';

type SectorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return innovationSectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getInnovationSector(slug);

  if (!sector) return { title: 'Sector Not Found' };

  return {
    title: `${sector.title} Innovations`,
    description: sector.description,
    alternates: {
      canonical: `/innovation-collaboration/sectors/${sector.slug}`,
    },
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getInnovationSector(slug);

  if (!sector) notFound();

  return (
    <SectorCatalog
      sector={sector}
      projects={getSectorProjects(sector.slug)}
    />
  );
}