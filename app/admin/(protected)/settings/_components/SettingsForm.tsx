'use client';

import { useActionState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import { updateCredentialsAction, type FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

export default function SettingsForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction] = useActionState<FormState, FormData>(updateCredentialsAction, {});

  return (
    <form action={formAction} className="space-y-5 max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div>
        <label className={labelClass}>Email</label>
        <input name="email" type="email" required defaultValue={currentEmail} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>New Password (leave empty to keep current)</label>
        <input name="newPassword" type="password" minLength={8} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Current Password (required to confirm)</label>
        <input name="currentPassword" type="password" required className={inputClass} />
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
          {state.success}
        </p>
      )}

      <SubmitButton label="Update Credentials" />
    </form>
  );
}
