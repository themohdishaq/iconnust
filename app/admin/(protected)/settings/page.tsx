import { connectDB } from '@/lib/db';
import Admin from '@/lib/models/Admin';
import { getSession } from '@/lib/auth';
import SettingsForm from './_components/SettingsForm';

export default async function AdminSettingsPage() {
  const session = await getSession();
  await connectDB();
  const admin = await Admin.findById(session?.userId).lean();

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-1">Account Settings</h1>
      <p className="text-slate-500 text-sm mb-8">Update your admin email and password.</p>
      <SettingsForm currentEmail={admin?.email ?? ''} />
    </div>
  );
}
