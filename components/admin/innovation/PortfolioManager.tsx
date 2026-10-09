'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SECTOR_ICONS, type InnovationPortfolio, type InnovationProject, type InnovationSector } from '@/lib/innovationSectors';

type Kind = 'sectors' | 'projects';
const inputClass = 'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30';

function Field({ name, label, value, required, maxLength, multiline, type = 'text', min, readOnly }: {
  name: string; label: string; value?: string | number; required?: boolean; maxLength?: number;
  multiline?: boolean; type?: string; min?: number; readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}{required ? ' *' : ''}</span>
      {multiline ? <textarea name={name} defaultValue={value} required={required} maxLength={maxLength} rows={5} className={inputClass} />
        : <input name={name} defaultValue={value} type={type} min={min} required={required} readOnly={readOnly} maxLength={maxLength} className={`${inputClass} ${readOnly ? 'bg-slate-100' : ''}`} />}
    </label>
  );
}

function ImageField({ name, value = '', required = false }: { name: 'image' | 'heroImage'; value?: string; required?: boolean }) {
  const [imagePath, setImagePath] = useState(value);
  const [uploadPreview, setUploadPreview] = useState('');
  const [error, setError] = useState('');
  const [failedPreview, setFailedPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const preview = uploadPreview || imagePath;

  useEffect(() => () => { if (uploadPreview) URL.revokeObjectURL(uploadPreview); }, [uploadPreview]);

  function clearUpload() {
    if (fileRef.current) fileRef.current.value = '';
    setUploadPreview(''); setError('');
  }

  return (
    <div className="space-y-3">
      <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{required ? 'Hero image path / URL (or upload below)' : 'Image path / URL (optional)'}</span><input name={name} value={imagePath} onChange={event => setImagePath(event.target.value)} maxLength={500} className={inputClass} /></label>
      <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{value ? 'Replace image' : 'Upload image'}</span><input ref={fileRef} name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="w-full text-sm text-slate-500" onChange={event => {
        const file = event.target.files?.[0];
        if (!file) { clearUpload(); return; }
        if (file.size > 5 * 1024 * 1024 || !/\.(jpe?g|png|webp|gif)$/i.test(file.name)) {
          clearUpload(); setError('Choose a JPG, PNG, WEBP or GIF image up to 5 MB.'); return;
        }
        setError(''); setUploadPreview(URL.createObjectURL(file));
      }} /><span className="mt-2 block text-xs text-slate-400">JPG, PNG, WEBP or GIF, up to 5 MB. A selected upload replaces the image path when you save.{required ? ' A hero image is required.' : ''}</span></label>
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
      {preview && (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <p className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">{uploadPreview ? 'New image preview — save to apply' : 'Current image'}</p>
          {failedPreview === preview ? <p className="p-4 text-xs text-amber-700">This image could not be loaded. Check the path or upload a replacement.</p> : <Image key={preview} src={preview} alt="Portfolio image preview" width={480} height={270} unoptimized className="h-44 w-full object-contain" onError={() => setFailedPreview(preview)} />}
        </div>
      )}
      <div className="flex gap-4 text-xs font-semibold text-blue-800">
        {uploadPreview && <button type="button" onClick={clearUpload}>Cancel selected upload</button>}
        {!required && preview && <button type="button" onClick={() => { clearUpload(); setImagePath(''); }}>Remove image</button>}
      </div>
    </div>
  );
}

export default function PortfolioManager({ portfolio }: { portfolio: InnovationPortfolio }) {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>('sectors');
  const [editing, setEditing] = useState<InnovationSector | InnovationProject | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [formVersion, setFormVersion] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const sector = editing && 'slug' in editing ? editing : undefined;
  const project = editing && 'id' in editing ? editing : undefined;

  function reset() { setEditing(null); setFormVersion(v => v + 1); setError(''); }
  function switchTab(next: Kind) { setKind(next); reset(); setNotice(''); setSearch(''); }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(form.entries());
    delete data.file;
    if (kind === 'projects') {
      data.sectorSlugs = form.getAll('sectorSlugs');
      if (!(data.sectorSlugs as string[]).length) { setError('Select at least one sector for this project or spin-off.'); return; }
    }
    if (kind === 'sectors' && !data.slug) {
      data.slug = String(data.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    const body = new FormData();
    body.set('data', JSON.stringify(data));
    const file = form.get('file');
    if (file instanceof File && file.size) body.set('file', file);
    setBusy(true); setError(''); setNotice('');
    try {
      const id = sector?.slug ?? project?.id;
      const response = await fetch(`/api/innovation/${kind}${id ? `/${encodeURIComponent(id)}` : ''}`, { method: id ? 'PUT' : 'POST', body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save.');
      reset(); setNotice('Saved. Your changes are now visible on the website.'); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save.'); }
    finally { setBusy(false); }
  }

  async function remove(item: InnovationSector | InnovationProject) {
    if (!window.confirm(`Delete ${item.title}? This cannot be undone.`)) return;
    const id = 'slug' in item ? item.slug : item.id;
    setBusy(true); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/innovation/${kind}/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to delete.');
      reset(); setNotice('Deleted successfully.'); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete.'); }
    finally { setBusy(false); }
  }

  const items = (kind === 'sectors' ? portfolio.sectors : portfolio.projects).filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(['sectors', 'projects'] as const).map(tab => <button key={tab} disabled={busy} onClick={() => switchTab(tab)} aria-pressed={kind === tab} className={`rounded-lg px-5 py-2.5 text-sm font-semibold ${kind === tab ? 'bg-blue-900 text-white' : 'bg-white text-slate-600'}`}>
          {tab === 'sectors' ? `Sectors (${portfolio.sectors.length})` : `Projects & Spin-offs (${portfolio.projects.length})`}
        </button>)}
      </div>
      {error && <p role="alert" className="mb-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
      <div className="grid items-start gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <label className="mb-4 block"><span className="sr-only">Search {kind}</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${kind}...`} className={inputClass} /></label>
          <ul className="divide-y divide-slate-100">
            {items.map(item => {
              const isSector = 'slug' in item;
              const id = isSector ? item.slug : item.id;
              return <li key={id} className="flex items-start gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{isSector ? `${item.projects} projects · ${item.spinOffs} spin-offs` : `${item.type === 'spin-off' ? 'Spin-off' : 'Project'} · ${item.sectorSlugs.map(slug => portfolio.sectors.find(s => s.slug === slug)?.title ?? slug).join(', ')}`}</p>
                  {isSector && <Link href={`/commercialisation/sectors/${item.slug}`} target="_blank" className="mt-2 inline-block text-xs text-blue-800">View sector</Link>}
                  {!isSector && item.sectorSlugs[0] && <Link href={`/commercialisation/sectors/${item.sectorSlugs[0]}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-blue-800">View on website</Link>}
                </div>
                <button disabled={busy} onClick={() => { setEditing(item); setFormVersion(value => value + 1); setError(''); setNotice(''); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="text-xs font-semibold text-blue-800" aria-label={`Edit ${item.title}`}>Edit</button>
                <button disabled={busy || (isSector && item.projects + item.spinOffs > 0)} title={isSector && item.projects + item.spinOffs > 0 ? 'Move or delete assigned projects first' : 'Delete'} onClick={() => remove(item)} className="text-xs font-semibold text-red-600 disabled:opacity-40" aria-label={`Delete ${item.title}`}>Delete</button>
              </li>;
            })}
          </ul>
          {!items.length && <p className="py-8 text-center text-sm text-slate-500">{search ? 'No matching entries.' : `No ${kind} yet. Use the form to add one.`}</p>}
          {kind === 'sectors' && <p className="mt-4 text-xs text-slate-500">To delete a sector, first move or delete its assigned projects and spin-offs.</p>}
        </section>
        <form ref={formRef} key={`${kind}-${sector?.slug ?? project?.id ?? 'new'}-${formVersion}`} onSubmit={save} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-serif text-slate-900">{editing ? 'Edit' : 'Add'} {kind === 'sectors' ? 'Sector' : 'Project / Spin-off'}</h2>
            {editing && <button type="button" disabled={busy} onClick={reset} className="text-xs font-semibold text-slate-500">Cancel editing</button>}
          </div>
          <fieldset disabled={busy || (kind === 'projects' && !portfolio.sectors.length)} className="space-y-4 disabled:opacity-60">
            <Field name="title" label="Title" value={editing?.title} required maxLength={kind === 'sectors' ? 200 : 300} />
            {kind === 'sectors' ? <>
              <Field name="slug" label="Sector URL (generated from title if blank)" value={sector?.slug} maxLength={120} readOnly={!!sector} />
              <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Icon</span><select name="iconKey" defaultValue={sector?.iconKey ?? 'settings'} className={inputClass}>{SECTOR_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select></label>
            </> : <>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Type</span><select name="type" defaultValue={project?.type ?? 'project'} className={inputClass}><option value="project">Project</option><option value="spin-off">Spin-off</option></select></label>
              <Field name="category" label="Category" value={project?.category} required maxLength={300} />
              <div><p className="mb-2 text-xs font-semibold text-slate-600">Sectors * (select one or more)</p><div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3">
                {portfolio.sectors.map(s => <label key={s.slug} className="flex items-start gap-2 text-sm text-slate-700"><input type="checkbox" name="sectorSlugs" value={s.slug} defaultChecked={project?.sectorSlugs.includes(s.slug)} className="mt-1" />{s.title}</label>)}
              </div></div>
            </>}
            <Field name="description" label="Description" value={editing?.description} required maxLength={16000} multiline />
            <ImageField name={kind === 'sectors' ? 'heroImage' : 'image'} value={sector?.heroImage ?? project?.image} required={kind === 'sectors'} />
            {kind === 'sectors' ? <div className="grid gap-4 sm:grid-cols-2"><Field name="ipAssets" label="IP assets (optional)" value={sector?.ipAssets} maxLength={100} /><Field name="industryPartners" label="Industry partners (optional)" type="number" min={0} value={sector?.industryPartners} /></div>
              : <><Field name="status" label="Status / IP protection (optional)" value={project?.status} maxLength={500} /><Field name="highlight" label="Highlight / TRL (optional)" value={project?.highlight} maxLength={300} /></>}
            <Field name="order" label="Display order (lower numbers first)" type="number" value={editing?.order ?? 0} />
            <button type="submit" className="rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white">{busy ? 'Saving...' : editing ? 'Save changes' : kind === 'sectors' ? 'Add sector' : 'Add project / spin-off'}</button>
          </fieldset>
          {kind === 'projects' && !portfolio.sectors.length && <p className="mt-4 text-sm text-amber-700">Add a sector first, then add your projects.</p>}
        </form>
      </div>
    </div>
  );
}
