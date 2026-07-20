import InnovationInquiry from '@/lib/models/InnovationInquiry';
import InquiryList from '@/components/admin/InquiryList';
import { markReadAction, deleteInquiryAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function InnovationInquiriesPage() {
  const docs = await InnovationInquiry.list();
  const items = docs.map((d) => ({
    id: d.id.toString(),
    organization: d.organization,
    email: d.email,
    domain: d.domain,
    message: d.message,
    status: d.status,
    createdAt: d.createdAt,
  }));
  const unreadCount = items.filter((i) => i.status === 'new').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Innovation & Collaboration — Research Inquiry</h1>
        <p className="text-slate-500 text-sm">{items.length} total · {unreadCount} unread</p>
      </div>
      <InquiryList items={items} markReadAction={markReadAction} deleteAction={deleteInquiryAction} />
    </div>
  );
}
