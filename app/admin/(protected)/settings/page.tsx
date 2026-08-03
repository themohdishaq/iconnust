import Admin from '@/lib/models/Admin';
import { getSession } from '@/lib/auth';
import SettingsForm from './_components/SettingsForm';

export default async function AdminSettingsPage() {
  const session = await getSession();
  const admin = session ? await Admin.findById(session.userId) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden py-4">
      <div className="mx-auto flex max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Account Settings</h1>
          <p className="mt-2 text-sm text-slate-500">Update your admin email and password securely.</p>
        </div>
        <SettingsForm currentEmail={admin?.email ?? ''} />
      </div>
    </div>
  );
}
