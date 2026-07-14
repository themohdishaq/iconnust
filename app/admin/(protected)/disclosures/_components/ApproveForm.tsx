'use client';

import { useActionState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import type { ApproveState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

const displayStatusOptions = ['Prototype Available', 'Pilot Tested', 'Ready for Licensing'];
const trlOptions = Array.from({ length: 9 }, (_, i) => `TRL ${i + 1}`);

export default function ApproveForm({
  action,
  initialDisplayStatus,
  initialTrl,
}: {
  action: (prevState: ApproveState, formData: FormData) => Promise<ApproveState>;
  initialDisplayStatus: string;
  initialTrl: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
      <h3 className="font-bold text-emerald-900 text-sm">Approve &amp; Publish to Commercialization Page</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Display Status</label>
          <select name="displayStatus" defaultValue={initialDisplayStatus} required className={inputClass}>
            <option value="">Select status…</option>
            {displayStatusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Technology Readiness Level</label>
          <select name="trl" defaultValue={initialTrl} required className={inputClass}>
            <option value="">Select TRL…</option>
            {trlOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">{state.error}</p>
      )}

      <SubmitButton label="Approve & Publish" pendingLabel="Publishing…" />
    </form>
  );
}
