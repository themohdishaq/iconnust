'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, FileText, Search, X } from 'lucide-react';
import Link from 'next/link';
import { IP_TYPES, type IpRecord } from '@/lib/ipPortfolio';

type IpFilter = 'All IP' | IpRecord['ip_type'];

const typeLabels: Record<IpFilter, string> = {
  'All IP': 'All records',
  'Utility Patent': 'Patents',
  Copyright: 'Copyrights',
  'Industrial Design': 'Industrial designs',
};

const typeOrder: Record<IpRecord['ip_type'], number> = {
  'Utility Patent': 0,
  'Industrial Design': 1,
  Copyright: 2,
};

export default function IpSectorPortfolio({ sector, records }: { sector: string; records: IpRecord[] }) {
  const [activeType, setActiveType] = useState<IpFilter>('All IP');
  const [search, setSearch] = useState('');
  const isAllFields = sector === 'All fields';
  const sectorTitle = sector === 'Unknown' ? 'Unassigned sector' : sector;

  const counts = useMemo(() => ({
    'All IP': records.length,
    'Utility Patent': records.filter((record) => record.ip_type === 'Utility Patent').length,
    Copyright: records.filter((record) => record.ip_type === 'Copyright').length,
    'Industrial Design': records.filter((record) => record.ip_type === 'Industrial Design').length,
  }), [records]);

  const visibleRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records
      .filter((record) => activeType === 'All IP' || record.ip_type === activeType)
      .filter((record) => !query || `${record.ip_title} ${record.ip_type} ${record.application_no}`.toLowerCase().includes(query))
      .sort((a, b) => typeOrder[a.ip_type] - typeOrder[b.ip_type] || a.ip_title.localeCompare(b.ip_title, undefined, { sensitivity: 'base' }));
  }, [activeType, records, search]);

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#10233F]">
      <header className="relative isolate overflow-hidden bg-[#003B70] text-white">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] border-l border-white/10 bg-gradient-to-br from-[#0C4D7D] to-[#003B70] lg:block" />
        <FileText aria-hidden="true" size={300} strokeWidth={0.65} className="pointer-events-none absolute -right-12 top-1/2 hidden -translate-y-1/2 text-white/[0.04] lg:block" />
        <div className="mx-auto max-w-360 px-5 pb-8 pt-6 sm:px-8 sm:pb-10 lg:px-12">
          <Link href="/research-innovation/ipo-listing" className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 transition-colors hover:text-[#FCAF17]">
            <ArrowLeft size={15} aria-hidden="true" /> All fields of invention
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
                <span className="h-0.5 w-9 bg-[#FCAF17]" /> NUST Intellectual Property Portfolio
              </div>
              <h1 className="font-tahoma-font text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{sectorTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                {isAllFields ? 'Explore registered intellectual property across NUST research and innovation.' : `Explore registered intellectual property in ${sectorTitle}.`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-7 gap-y-4 sm:grid-cols-4 lg:min-w-[500px]">
              {[
                ['All IP', counts['All IP']],
                ['Patents', counts['Utility Patent']],
                ['Copyrights', counts.Copyright],
                ['Designs', counts['Industrial Design']],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-white/25 pl-3">
                  <p className="text-2xl font-bold text-[#FCAF17]">{value}</p>
                  <p className="mt-1 text-[10px] text-white/80 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-5 flex flex-col gap-4 border-b border-[#DCE2E9] pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B97800]">Portfolio records</p>
            <h2 className="mt-1 font-tahoma-font text-2xl font-bold text-[#10233F]">{isAllFields ? 'All intellectual property' : `IP in ${sectorTitle}`}</h2>
            <p className="mt-1 text-xs text-[#60738A]">Showing {visibleRecords.length} of {records.length} records</p>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search portfolio records</span>
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#63778E]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles or application numbers..." className="h-11 w-full border border-[#DCE2E9] bg-white pl-10 pr-10 text-sm text-[#10233F] outline-none transition focus:border-[#4778A8] placeholder:text-[#8998A9]" />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-slate-500 hover:text-[#003B70]"><X size={15} /></button>}
          </label>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by IP type">
          {(['All IP', ...IP_TYPES] as IpFilter[]).map((type) => (
            <button key={type} type="button" aria-pressed={activeType === type} onClick={() => setActiveType(type)} className={`inline-flex min-h-10 items-center gap-2 border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70] ${activeType === type ? 'border-[#FCAF17] bg-[#FCAF17] text-[#171717]' : 'border-[#DCE2E9] bg-white text-[#284462] hover:border-[#AAC0D7] hover:bg-[#F7F9FB]'}`}>
              {typeLabels[type]} <span className="text-[10px] opacity-70">{counts[type]}</span>
            </button>
          ))}
        </div>

        {visibleRecords.length > 0 ? (
          <div className="divide-y divide-[#E8EDF2] border border-[#DCE2E9] bg-white">
            {visibleRecords.map((record, index) => (
              <article key={`${record.ip_type}-${record.application_no}-${index}`} className="group px-4 py-4 transition-colors hover:bg-[#FAFBFC] sm:px-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[#F0F4F8] text-[#174F82] transition-colors group-hover:bg-[#FFF4D8] group-hover:text-[#B97800]"><FileText size={18} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold leading-5 text-[#10233F]">{record.ip_title.replace(/\s*\(Class-\d+\)/gi, '')}</h3>
                      <span className="border border-[#DCE6F0] bg-[#F4F8FC] px-2 py-0.5 text-[10px] font-semibold text-[#315C83]">{record.ip_type}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[#60738A]">
                      <span>Application no. <strong className="font-semibold text-[#284462]">{record.application_no}</strong></span>
                      {record.award_date && <span>Granted {record.award_date}</span>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#C9D4E0] bg-white px-6 py-14 text-center">
            <Search size={22} aria-hidden="true" className="mx-auto text-[#8A9AAF]" />
            <h3 className="mt-3 font-semibold text-[#284462]">No matching IP records</h3>
            <p className="mt-1 text-sm text-[#718298]">Try another search term or IP type.</p>
          </div>
        )}
      </section>
    </main>
  );
}