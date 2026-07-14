import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import HomeInquiry from '@/lib/models/HomeInquiry';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';
import InnovationInquiry from '@/lib/models/InnovationInquiry';
import InventionDisclosure from '@/lib/models/InventionDisclosure';
import Sidebar from '@/components/admin/Sidebar';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  await connectDB();
  const [homeUnread, industryUnread, innovationUnread, pendingDisclosures] = await Promise.all([
    HomeInquiry.countDocuments({ status: 'new' }),
    IndustryServiceInquiry.countDocuments({ status: 'new' }),
    InnovationInquiry.countDocuments({ status: 'new' }),
    InventionDisclosure.countDocuments({ status: 'pending' }),
  ]);
  const unreadInquiries = homeUnread + industryUnread + innovationUnread;

  const badges = {
    '/admin/inquiries': unreadInquiries,
    '/admin/disclosures': pendingDisclosures,
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar email={session.email} badges={badges} />
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
