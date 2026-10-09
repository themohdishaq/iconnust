'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { getPortfolioSectors, IP_TYPES, type IpRecord } from '@/lib/ipPortfolio';
import type { ManagedIpRecord } from '@/lib/ipPortfolioValidation';

const inputClass = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-900/15';
const labels: Record<IpRecord['ip_type'], string> = { 'Utility Patent': 'Patents', Copyright: 'Copyrights', 'Industrial Design': 'Industrial designs' };
const PAGE_SIZE = 10;

export default function IpPortfolioManager({ records }: { records: ManagedIpRecord[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [editing, setEditing] = useState<ManagedIpRecord | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'All IP' | IpRecord['ip_type']>('All IP');
  const [currentPage, setCurrentPage] = useState(1);
  const fields = getPortfolioSectors(records);
  const filtered = records.filter(record => (type === 'All IP' || record.ip_type === type)
    && `${record.ip_title} ${record.sector} ${record.application_no ?? ''}`.toLowerCase().includes(search.trim().toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function reset() {
    setEditing(null); setFormVersion(value => value + 1); setError('');
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    setBusy(true); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/ip-portfolio${editing ? `/${editing.id}` : ''}`, {
        method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save this record.');
      reset();
      setNotice(body.status === 'published' ? 'Saved. This record is now visible in the public portfolio.' : 'Draft saved. This record is hidden from the public portfolio.');
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save this record.'); }
    finally { setBusy(false); }
  }

  async function remove(record: ManagedIpRecord) {
    if (!window.confirm(`Delete “${record.ip_title}”? This cannot be undone.`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/ip-portfolio/${record.id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to delete this record.');
      if (editing?.id === record.id) reset();
      setNotice('IP record deleted.'); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete this record.'); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {IP_TYPES.map(ipType => (
          <div key={ipType} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{labels[ipType]}</p>
            <p className="mt-2 text-3xl font-semibold text-blue-900">{records.filter(record => record.ip_type === ipType).length}</p>
          </div>
        ))}
      </div>
      {error && <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}
      <div className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <form ref={formRef} key={formVersion} onSubmit={save} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Plus size={18} aria-hidden="true" />{editing ? 'Edit IP record' : 'Add IP record'}</h2>
            {editing && <button type="button" disabled={busy} onClick={reset} className="text-xs font-semibold text-blue-800 disabled:opacity-50">Cancel</button>}
          </div>
          <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">IP title *</span><input name="ip_title" defaultValue={editing?.ip_title ?? ''} required maxLength={500} className={inputClass} /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">IP type *</span><select name="ip_type" defaultValue={editing?.ip_type ?? 'Utility Patent'} required className={inputClass}>{IP_TYPES.map(ipType => <option key={ipType} value={ipType}>{ipType === 'Utility Patent' ? 'Patent' : ipType}</option>)}</select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Field of invention</span><input name="sector" list="ip-invention-fields" defaultValue={editing?.sector === 'Unknown' ? '' : editing?.sector ?? ''} maxLength={200} placeholder="Select or enter a field" className={inputClass} /><span className="mt-1 block text-xs text-slate-400">New fields appear automatically in the public sidebar. Leave blank for Unassigned.</span></label>
            <datalist id="ip-invention-fields">{fields.map(field => <option key={field} value={field} />)}</datalist>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Application number</span><input name="application_no" defaultValue={editing?.application_no ?? ''} maxLength={200} className={inputClass} /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Award date</span><input name="award_date" type="date" min="1000-01-01" max="9999-12-31" defaultValue={editing?.award_date ?? ''} className={inputClass} /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Description</span><textarea name="description" rows={6} defaultValue={editing?.description ?? ''} maxLength={15000} placeholder="Describe this intellectual property..." className={inputClass} /><span className="mt-1 block text-xs text-slate-400">Shown in a dialog when a visitor clicks this record. May be left blank.</span></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Publication status *</span><select name="status" defaultValue={editing?.status ?? 'draft'} className={inputClass}><option value="draft">Draft — hidden from website</option><option value="published">Published — visible on website</option></select></label>
            <button type="submit" className="w-full rounded-lg bg-blue-900 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-wait">{busy ? 'Saving...' : editing ? 'Save changes' : 'Create IP record'}</button>
          </fieldset>
        </form>
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="admin-ip-records-heading">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="admin-ip-records-heading" className="text-lg font-semibold">Portfolio records <span className="text-sm font-normal text-slate-400">({records.length})</span></h2>
              <Link href="/research-innovation/ipo-listing" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-800 hover:underline">View public portfolio</Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter records by IP type">
              {(['All IP', ...IP_TYPES] as const).map(ipType => <button key={ipType} type="button" aria-pressed={type === ipType} onClick={() => { setType(ipType); setCurrentPage(1); }} className={`rounded-lg px-3 py-2 text-xs font-semibold ${type === ipType ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{ipType === 'All IP' ? 'All IP' : labels[ipType]}</button>)}
            </div>
            <label className="relative mt-4 block"><span className="sr-only">Search IP records</span><Search size={16} aria-hidden="true" className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={event => { setSearch(event.target.value); setCurrentPage(1); }} placeholder="Search titles, fields or application numbers..." className={`${inputClass} pl-9`} /></label>
          </div>
          <div className="divide-y divide-slate-100">
            {visible.map(record => (
              <article key={record.id} className="flex items-start gap-3 p-5">
                <FileText size={18} aria-hidden="true" className="mt-1 shrink-0 text-blue-800" />
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-slate-900">{record.ip_title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{record.ip_type} · {record.sector === 'Unknown' ? 'Unassigned' : record.sector}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500"><span className={`rounded-full px-2 py-0.5 font-semibold ${record.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{record.status === 'published' ? 'Published' : 'Draft'}</span>{record.application_no && <span>{record.application_no}</span>}{record.award_date && <span>Awarded {record.award_date}</span>}<span>{record.description?.trim() ? 'Description added' : 'No description'}</span></div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" disabled={busy} aria-label={`Edit ${record.ip_title}`} onClick={() => { setEditing(record); setFormVersion(value => value + 1); setError(''); setNotice(''); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="rounded-lg p-2 text-blue-800 hover:bg-blue-50 disabled:opacity-40"><Pencil size={16} /></button>
                  <button type="button" disabled={busy} aria-label={`Delete ${record.ip_title}`} onClick={() => remove(record)} className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"><Trash2 size={16} /></button>
                </div>
              </article>
            ))}
            {!visible.length && <p className="px-5 py-12 text-center text-sm text-slate-500">{records.length ? 'No matching records. Try another search or IP type.' : 'No IP records yet. Add your first record using the form.'}</p>}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 text-xs text-slate-500">
            <span aria-live="polite">Showing {filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
            {totalPages > 1 && <nav aria-label="Admin IP pagination" className="flex items-center gap-3"><button type="button" disabled={page === 1} onClick={() => setCurrentPage(page - 1)} className="rounded-lg border px-3 py-2 font-semibold text-blue-900 disabled:opacity-40">Previous</button><span>Page {page} of {totalPages}</span><button type="button" disabled={page === totalPages} onClick={() => setCurrentPage(page + 1)} className="rounded-lg border px-3 py-2 font-semibold text-blue-900 disabled:opacity-40">Next</button></nav>}
          </div>
        </section>
      </div>
    </div>
  );
}
