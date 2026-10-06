'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BrainCircuit, CarFront, ChevronDown, FileText, Handshake, Leaf, Search, Settings, Shield, ShieldCheck, Sprout, Stethoscope, Users, Wind } from 'lucide-react';
import type { InnovationProject, InnovationSector } from '@/lib/innovationSectors';

type SectorCatalogProps = {
  sector: InnovationSector;
  projects: InnovationProject[];
  sectors: InnovationSector[];
};

const numberFormat = new Intl.NumberFormat('en-US');
const sectorIcons = {
  stethoscope: Stethoscope,
  brainCircuit: BrainCircuit,
  sprout: Sprout,
  wind: Wind,
  car: CarFront,
  shield: Shield,
  settings: Settings,
};

export default function SectorCatalog({ sector, projects, sectors }: SectorCatalogProps) {
  const SectorIcon = sectorIcons[sector.iconKey];
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'spin-off'>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'featured' | 'alphabetical'>('featured');

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesType = activeFilter === 'all' || project.type === activeFilter;
      const matchesSearch = !query || `${project.title} ${project.description} ${project.category}`.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });

    return sort === 'alphabetical'
      ? [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      : filtered;
  }, [activeFilter, projects, search, sort]);

  const filters = [
    { label: 'All', value: 'all' as const, count: sector.projects + sector.spinOffs },
    { label: 'Projects', value: 'project' as const, count: sector.projects },
    { label: 'Spin-offs', value: 'spin-off' as const, count: sector.spinOffs },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0C1D3B]">
      <section className="relative isolate overflow-hidden bg-[#003B70] text-white">
        <Image src={sector.heroImage} alt="" fill priority loading="eager" sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#003B70] via-[#003B70]/85 to-[#003B70]/25" />
        <div className="mx-auto max-w-[1800px] px-5 pb-6 pt-5 md:px-8 lg:px-14">
          <div className="mb-5 flex items-center gap-2 text-xs text-white/80">
            <Link href="/commercialisation#sector-explorer" className="transition-colors hover:text-[#FCAF17]">Innovation Portfolio</Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">{sector.title}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#FCAF17] text-white sm:flex">
                <SectorIcon size={34} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="max-w-3xl">
                <h1 className="font-tahoma-font text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{sector.title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">{sector.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 lg:min-w-[520px] lg:gap-x-7">
              <Stat icon={FileText} value={sector.projects} label="Projects" />
              <Stat icon={Users} value={sector.spinOffs} label="Spin-offs" />
              {sector.ipAssets !== undefined && <Stat icon={ShieldCheck} value={sector.ipAssets} label="IP Assets" />}
              {sector.industryPartners !== undefined && <Stat icon={Handshake} value={sector.industryPartners} label="Industry Partners" />}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-5 py-5 md:px-8 lg:px-14">
        <nav aria-label="Innovation sectors" className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-2">
          <Link href="/commercialisation#sector-explorer" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-[#193459] shadow-sm transition-colors hover:bg-[#E8EEF5]">
            <ArrowLeft size={15} aria-hidden="true" /> All Sectors
          </Link>
          {sectors.map((item) => (
            <Link key={item.slug} href={`/commercialisation/sectors/${item.slug}`} aria-current={item.slug === sector.slug ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${item.slug === sector.slug ? 'bg-[#FCAF17] text-[#171717]' : 'bg-transparent text-[#193459] hover:bg-white'}`}>
              {item.slug === sector.slug && <Leaf size={14} aria-hidden="true" />}
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-tahoma-font text-2xl font-bold text-[#0C1D3B] sm:text-3xl">Innovations in {sector.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter sector catalog">
              {filters.map((filter) => (
                <button key={filter.value} type="button" onClick={() => setActiveFilter(filter.value)} aria-pressed={activeFilter === filter.value} className={`rounded-md border px-3.5 py-2 text-xs font-medium transition-colors ${activeFilter === filter.value ? 'border-[#FCAF17] bg-[#FCAF17] text-[#171717]' : 'border-[#D9E0E8] bg-white text-[#29476B] hover:border-[#B8C7D8]'}`}>
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block sm:w-64">
              <span className="sr-only">Search projects or spin-offs</span>
              <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#496483]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or spin-offs..." className="h-10 w-full rounded-md border border-[#D9E0E8] bg-white pl-9 pr-3 text-xs text-[#132B4C] outline-none placeholder:text-[#8393A7] focus:border-[#4976A6]" />
            </label>
            <label className="flex items-center gap-2 text-xs text-[#425A77]">
              Sort by
              <span className="relative">
                <select value={sort} onChange={(event) => setSort(event.target.value as 'featured' | 'alphabetical')} className="h-10 appearance-none rounded-md border border-[#D9E0E8] bg-white pl-3 pr-8 text-xs font-semibold text-[#132B4C] outline-none focus:border-[#4976A6]">
                  <option value="featured">Featured</option>
                  <option value="alphabetical">A-Z</option>
                </select>
                <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
              </span>
            </label>
          </div>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-lg border border-[#E1E6EC] bg-white shadow-[0_4px_14px_rgba(16,42,72,0.05)]">
                <div className="relative aspect-[2.4/1] overflow-hidden bg-[#DCE7F0]">
                  <ProjectImage src={project.image} title={project.title} />
                  <span className={`absolute left-2 top-2 rounded px-2 py-1 text-[9px] font-bold uppercase text-white ${project.type === 'spin-off' ? 'bg-[#E2A300]' : 'bg-[#0B55A0]'}`}>
                    {project.type === 'spin-off' ? 'Spin-off' : 'Project'}
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 className="font-tahoma-font text-base font-bold leading-snug text-[#0C1D3B]">{project.title}</h3>
                  <p className="mt-1 text-xs leading-[1.45] text-[#405875]">{project.description}</p>
                  {(project.status || project.highlight) && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.highlight && <span className="rounded bg-[#FFF0BD] px-2 py-1 text-[9px] font-medium text-[#4D3A0B]">{project.highlight}</span>}
                      {project.status && <span className="rounded bg-[#DDEEFF] px-2 py-1 text-[9px] font-medium text-[#164B86]">{project.status}</span>}
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between gap-3 text-[10px] text-[#425A77]">
                    <span className="inline-flex items-center gap-1.5"><Sprout size={13} aria-hidden="true" className="text-[#174B7E]" />{project.category}</span>
                    <Link href="/contact-us" aria-label={`Enquire about ${project.title}`} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F4F7] text-[#173A68] transition-colors hover:bg-[#FCAF17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70]">
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#C9D4E0] bg-white px-6 py-14 text-center">
            <h3 className="font-tahoma-font text-lg font-bold text-[#173A68]">{projects.length ? 'No matching innovations' : 'No innovations listed'}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5B6F86]">
              {projects.length ? 'Try a different search or filter to browse this sector.' : `No projects or spin-offs are currently listed for ${sector.title}.`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof FileText; value: number | string; label: string }) {
  return (
    <div className="border-l border-white/25 pl-3 sm:pl-4">
      <div className="flex items-center gap-2 text-[#FCAF17]">
        <Icon size={17} aria-hidden="true" />
        <span className="text-xl font-bold">{typeof value === 'number' ? numberFormat.format(value) : value}</span>
      </div>
      <div className="mt-1 text-[10px] text-white/85 sm:text-xs">{label}</div>
    </div>
  );
}

function ProjectImage({ src, title }: { src: string; title: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div role="img" aria-label={title} className="absolute inset-0 flex items-center justify-center bg-[#DCE7F0] px-5 text-center text-sm font-semibold text-[#315C83]">
        {title}
      </div>
    );
  }

  return <Image src={src} alt={title} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" onError={() => setImageFailed(true)} />;
}
