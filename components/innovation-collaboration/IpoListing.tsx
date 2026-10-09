'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FileText, Search, X } from 'lucide-react';
import { getPortfolioSectors, type IpRecord } from '@/lib/ipPortfolio';

type IpType = 'All IP' | IpRecord['ip_type'];

const types: IpType[] = ['All IP', 'Utility Patent', 'Copyright', 'Industrial Design'];
const PAGE_SIZE = 10;
const ipTypeOrder: Record<IpRecord['ip_type'], number> = {
  'Utility Patent': 0,
  'Industrial Design': 1,
  Copyright: 2,
};
const typeNames: Record<IpType, string> = {
  'All IP': 'All IP',
  'Utility Patent': 'Patents',
  Copyright: 'Copyrights',
  'Industrial Design': 'Industrial designs',
};

function displayTitle(title: string) {
  return title.replace(/\s*\(Class-\d+\)/gi, '').replace(/\s{2,}/g, ' ').trim();
}

export default function IpoListing({ records }: { records: IpRecord[] }) {
  const sectors = useMemo(() => getPortfolioSectors(records), [records]);
  const typeCounts = useMemo<Record<IpType, number>>(() => ({
    'All IP': records.length,
    'Utility Patent': records.filter((record) => record.ip_type === 'Utility Patent').length,
    Copyright: records.filter((record) => record.ip_type === 'Copyright').length,
    'Industrial Design': records.filter((record) => record.ip_type === 'Industrial Design').length,
  }), [records]);
  const [activeType, updateActiveType] = useState<IpType>('All IP');
  const [activeSector, updateActiveSector] = useState<string | null>(null);
  const [search, updateSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<IpRecord | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedRecord || !dialog) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedRecord]);

  const setActiveType = (type: IpType) => {
    updateActiveType(type);
    setCurrentPage(1);
  };
  const setActiveSector = (sector: string | null) => {
    updateActiveSector(sector);
    setCurrentPage(1);
  };
  const setSearch = (value: string) => {
    updateSearch(value);
    setCurrentPage(1);
  };

  const typeRecords = useMemo(
    () => activeType === 'All IP' ? records : records.filter((record) => record.ip_type === activeType),
    [activeType, records]
  );
  const visibleRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return typeRecords
      .filter((record) => !activeSector || record.sector === activeSector)
      .filter((record) => !query || `${record.ip_title} ${record.ip_type} ${record.sector}`.toLowerCase().includes(query))
      .sort((a, b) => ipTypeOrder[a.ip_type] - ipTypeOrder[b.ip_type] || displayTitle(a.ip_title).localeCompare(displayTitle(b.ip_title), undefined, { sensitivity: 'base' }));
  }, [activeSector, search, typeRecords]);
  const totalPages = Math.max(1, Math.ceil(visibleRecords.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedRecords = visibleRecords.slice(startIndex, startIndex + PAGE_SIZE);
  const pageNumbers = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b);
  const hasFilters = activeType !== 'All IP' || activeSector !== null || search.length > 0;
  const clearFilters = () => {
    setActiveType('All IP');
    setActiveSector(null);
    setSearch('');
  };

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#10233F]">
      <header className="bg-[#003B70] text-white">
        <div className="mx-auto max-w-360 px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
          <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
            <span className="h-0.5 w-9 bg-[#FCAF17]" /> NUST Intellectual Property Office
          </div>
          <h1 className="font-tahoma-font text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">NUST Intellectual Property Portfolio</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 sm:text-base">Explore registered patents, copyrights and industrial designs across NUST&apos;s research and innovation sectors.</p>
        </div>
      </header>

      <section className="mx-auto max-w-360 px-5 py-7 sm:px-8 lg:px-12">
        <div className="border border-[#DCE2E9] bg-white p-4 shadow-[0_5px_20px_rgba(16,35,63,0.04)] sm:p-5">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by IP type">
              {types.map((type) => (
                <button key={type} type="button" aria-pressed={activeType === type} onClick={() => setActiveType(type)} className={`inline-flex min-h-10 items-center border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70] ${activeType === type ? 'border-[#FCAF17] bg-[#FCAF17] text-[#171717]' : 'border-[#E0E5EB] bg-white text-[#284462] hover:border-[#AAC0D7] hover:bg-[#F7F9FB]'}`}>
                  {typeNames[type]} <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-[10px] tabular-nums">{typeCounts[type]}</span>
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search IP titles, types, or sectors</span>
              <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#63778E]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles, types, sectors..." className="h-11 w-full border border-[#DCE2E9] bg-[#F8FAFC] pl-10 pr-10 text-sm text-[#10233F] outline-none transition focus:border-[#4778A8] focus:bg-white placeholder:text-[#8998A9]" />
              {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-slate-500 hover:text-[#003B70]"><X size={15} /></button>}
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF0F3] pt-3 text-xs text-[#60738A]">
            <span>Browse the NUST intellectual property record</span>
            {hasFilters && <button type="button" onClick={clearFilters} className="font-semibold text-[#174F82] underline decoration-[#174F82]/30 underline-offset-4 hover:text-[#B97800]">Clear filters</button>}
          </div>
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px] xl:gap-8">
          <section aria-labelledby="ip-records-heading" className="min-w-0">
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B97800]">Portfolio records</p>
              <h2 id="ip-records-heading" className="mt-1 font-tahoma-font text-xl font-bold text-[#10233F]">{activeSector ?? typeNames[activeType]}</h2>
              <p aria-live="polite" className="mt-2 text-xs text-[#60738A]">
                Showing {visibleRecords.length ? startIndex + 1 : 0}–{Math.min(startIndex + PAGE_SIZE, visibleRecords.length)} of {visibleRecords.length} records
              </p>
            </div>
            <div className="divide-y divide-[#E8EDF2] border border-[#DCE2E9] bg-white">
              {visibleRecords.length > 0 ? paginatedRecords.map((record, index) => (
                <article key={`${record.ip_type}-${record.application_no}-${record.ip_title}-${index}`} className="group relative px-4 py-4 transition-colors hover:bg-[#FAFBFC] sm:px-5">
                  {record.description?.trim() && (
                    <button type="button" aria-haspopup="dialog" onClick={() => setSelectedRecord(record)} className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#003B70]">
                      <span className="sr-only">View description for {displayTitle(record.ip_title)}</span>
                    </button>
                  )}
                  <div className="pointer-events-none relative flex items-start gap-3 sm:gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-[#F0F4F8] text-[#174F82] transition-colors group-hover:bg-[#FFF4D8] group-hover:text-[#B97800]"><FileText size={17} aria-hidden="true" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold leading-5 text-[#10233F]">{displayTitle(record.ip_title)}</h3>
                        <span className="border border-[#DCE6F0] bg-[#F4F8FC] px-2 py-0.5 text-[10px] font-semibold text-[#315C83]">{record.ip_type}</span>
                      </div>
                      {record.description?.trim() && <p className="mt-2 text-xs font-medium text-[#174F82]">View description</p>}
                    </div>
                    <button type="button" onClick={() => setActiveSector(record.sector)} className="pointer-events-auto hidden shrink-0 text-right text-xs font-medium text-[#315C83] underline decoration-[#315C83]/25 underline-offset-4 hover:text-[#B97800] sm:block">{record.sector === 'Unknown' ? 'Unassigned sector' : record.sector}</button>
                  </div>
                  <button type="button" onClick={() => setActiveSector(record.sector)} className="relative mt-2 pl-12 text-left text-[11px] font-medium text-[#315C83] underline decoration-[#315C83]/25 underline-offset-4 hover:text-[#B97800] sm:hidden">{record.sector === 'Unknown' ? 'Unassigned sector' : record.sector}</button>
                </article>
              )) : (
                <div className="px-6 py-14 text-center">
                  <Search size={22} aria-hidden="true" className="mx-auto text-[#8A9AAF]" />
                  <h3 className="mt-3 font-semibold text-[#284462]">No matching IP records</h3>
                  <p className="mt-1 text-sm text-[#718298]">Try another search term or clear the active filters.</p>
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <nav aria-label="Portfolio pagination" className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button type="button" disabled={page === 1} onClick={() => setCurrentPage(page - 1)} className="min-h-10 border border-[#DCE2E9] bg-white px-3 text-xs font-semibold text-[#284462] hover:bg-[#EAF1F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70] disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                {pageNumbers.map((number, index) => (
                  <span key={number} className="inline-flex items-center gap-2">
                    {index > 0 && number - pageNumbers[index - 1] > 1 && <span aria-hidden="true" className="px-1 text-[#60738A]">…</span>}
                    <button type="button" aria-label={`Page ${number}`} aria-current={page === number ? 'page' : undefined} onClick={() => setCurrentPage(number)} className={`min-h-10 min-w-10 border px-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70] ${page === number ? 'border-[#FCAF17] bg-[#FCAF17] text-[#171717]' : 'border-[#DCE2E9] bg-white text-[#284462] hover:bg-[#EAF1F7]'}`}>{number}</button>
                  </span>
                ))}
                <button type="button" disabled={page === totalPages} onClick={() => setCurrentPage(page + 1)} className="min-h-10 border border-[#DCE2E9] bg-white px-3 text-xs font-semibold text-[#284462] hover:bg-[#EAF1F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70] disabled:cursor-not-allowed disabled:opacity-40">Next</button>
              </nav>
            )}
          </section>

          <aside aria-labelledby="sector-filter-heading" className="border border-[#DCE2E9] bg-white lg:sticky lg:top-24">
            <div className="border-b border-[#E8EDF2] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCAF17]">Browse by discipline</p>
              <h2 id="sector-filter-heading" className="sector-heading-pulse mt-1 inline-flex items-center gap-2 border-l-4 px-2 py-1 font-tahoma-font text-lg font-bold text-[#10233F]">
                Fields of Invention
              </h2>
              <p className="mt-1 text-xs text-[#718298]">Filter IP records by research sector.</p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-2">
              <button type="button" aria-pressed={activeSector === null} onClick={() => setActiveSector(null)} className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs transition-colors ${activeSector === null ? 'bg-[#EAF1F7] font-bold text-[#003B70]' : 'text-[#405A75] hover:bg-[#F5F7F9]'}`}><span>All sectors</span></button>
              {sectors.map((sector) => {
                const isActive = activeSector === sector;
                return <button key={sector} type="button" aria-pressed={isActive} onClick={() => setActiveSector(isActive ? null : sector)} className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs transition-colors ${isActive ? 'bg-[#FFF4D8] font-semibold text-[#704800]' : 'text-[#405A75] hover:bg-[#F5F7F9]'}`}><span>{sector}</span></button>;
              })}
              <div className="mx-3 my-2 border-t border-[#E8EDF2]" />
              <button type="button" aria-pressed={activeSector === 'Unknown'} onClick={() => setActiveSector(activeSector === 'Unknown' ? null : 'Unknown')} className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs transition-colors ${activeSector === 'Unknown' ? 'bg-[#EAF1F7] font-semibold text-[#003B70]' : 'text-[#78899D] hover:bg-[#F5F7F9]'}`}><span>Unassigned</span></button>
            </div>
          </aside>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        aria-labelledby="ip-description-title"
        onClose={() => setSelectedRecord(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border border-[#DCE2E9] bg-white p-0 text-[#10233F] shadow-2xl backdrop:bg-[#10233F]/60"
      >
        {selectedRecord && (
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-[#E8EDF2] pb-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#174F82]">{selectedRecord.ip_type}</p>
                <h2 id="ip-description-title" className="mt-2 break-words font-tahoma-font text-xl font-bold">{displayTitle(selectedRecord.ip_title)}</h2>
                <p className="mt-2 text-xs text-[#60738A]">{selectedRecord.sector === 'Unknown' ? 'Unassigned sector' : selectedRecord.sector}</p>
              </div>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close description" className="flex h-10 w-10 shrink-0 items-center justify-center text-[#60738A] hover:bg-[#F0F4F8] hover:text-[#003B70] focus-visible:outline-2 focus-visible:outline-[#003B70]">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <h3 className="mt-5 text-sm font-semibold">Description</h3>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-[#405A75]">{selectedRecord.description?.trim()}</p>
          </div>
        )}
      </dialog>
    </main>
  );
}
