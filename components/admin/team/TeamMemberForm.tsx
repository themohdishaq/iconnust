'use client';

import { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FormState } from '@/app/admin/(protected)/team/actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  name: string; title: string; dept: string; bio: string; email: string; focus: string[]; image: string; order: number;
};

export default function TeamMemberForm({
  action,
  initial,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: Initial;
}) {
  const [state, formAction] = useActionState(action, {});
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [failedPhoto, setFailedPhoto] = useState('');
  const preview = photoPreview || initial?.image || '';
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required defaultValue={initial?.name} className={inputClass} />
        </div>
        <div>
          <label htmlFor="team-email" className={labelClass}>Email (optional)</label>
          <input id="team-email" type="email" name="email" maxLength={200} defaultValue={initial?.email} className={inputClass} />
          <p className="mt-2 text-xs text-slate-500">Displayed as a contact link on the public team card.</p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={initial?.title} className={inputClass} placeholder="Director, ICON — NUST" />
      </div>

      <div>
        <label className={labelClass}>Department / Location</label>
        <input name="dept" required defaultValue={initial?.dept} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Bio (optional)</label>
        <textarea name="bio" defaultValue={initial?.bio} rows={4} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Focus Areas (comma separated)</label>
        <input name="focus" defaultValue={initial?.focus?.join(', ')} className={inputClass} placeholder="IP Management, Patent Strategy" />
      </div>

      <div>
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>

      <div>
        <label htmlFor="team-photo" className={labelClass}>Photo {initial ? '(leave empty to keep current)' : ''}</label>
        {preview && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-semibold text-slate-500">{photoPreview ? 'New photo preview — save to apply' : 'Current photo'}</p>
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              {failedPhoto === preview ? <p className="p-3 text-xs text-amber-700">This photo could not be loaded. Upload a replacement.</p> : <Image key={preview} src={preview} alt="Team member photo preview" fill sizes="192px" unoptimized className="object-cover" onError={() => setFailedPhoto(preview)} />}
            </div>
          </div>
        )}
        <input id="team-photo" type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" required={!initial} className={inputClass} onChange={event => {
          const file = event.target.files?.[0];
          setPhotoError('');
          if (!file) { setPhotoPreview(''); return; }
          if (file.size > 5 * 1024 * 1024 || !/\.(jpe?g|png|webp|gif)$/i.test(file.name)) {
            event.target.value = ''; setPhotoPreview(''); setPhotoError('Choose a JPG, PNG, WEBP or GIF photo up to 5 MB.'); return;
          }
          setPhotoPreview(URL.createObjectURL(file));
        }} />
        {photoError && <p role="alert" className="mt-2 text-xs text-red-700">{photoError}</p>}
        <p className="mt-2 text-xs text-slate-500">JPG, PNG, WEBP, or GIF, up to 5 MB.</p>
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton label={initial ? 'Update Member' : 'Add Member'} />
    </form>
  );
}
