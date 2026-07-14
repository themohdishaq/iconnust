'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { loginAction, verifyOtpAction, type LoginState } from './actions';

const initialState: LoginState = { step: 'credentials' };

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function LoginCard({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(
    (prevState: LoginState, formData: FormData) =>
      prevState.step === 'otp' ? verifyOtpAction(prevState, formData) : loginAction(prevState, formData),
    initialState
  );
  const step = state.step;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-4">
          {step === 'otp' ? <ShieldCheck size={20} /> : <LockKeyhole size={20} />}
        </div>
        <h1 className="text-xl font-serif text-slate-900">
          {step === 'otp' ? 'Enter Verification Code' : 'Admin Sign In'}
        </h1>
        <p className="text-slate-400 text-sm mt-1 text-center">
          {step === 'otp'
            ? `We emailed a 6-digit code to ${state.email ?? 'your admin email'}.`
            : 'ICON-NUST Content Dashboard'}
        </p>
      </div>

      {step === 'credentials' ? (
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
            />
          </div>

          {state?.error && (
            <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <SubmitButton label="Sign In" pendingLabel="Signing in…" />
        </form>
      ) : (
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              name="otp"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              autoFocus
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
            />
          </div>

          {state?.error && (
            <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <SubmitButton label="Verify & Sign In" pendingLabel="Verifying…" />

          <button
            type="button"
            onClick={onReset}
            className="w-full text-xs text-slate-400 hover:text-slate-600 text-center"
          >
            Back to sign in
          </button>
        </form>
      )}
    </div>
  );
}

export default function AdminLoginPage() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <LoginCard key={resetKey} onReset={() => setResetKey((k) => k + 1)} />
    </div>
  );
}
