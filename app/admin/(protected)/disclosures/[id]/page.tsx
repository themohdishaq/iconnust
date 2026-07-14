import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { connectDB } from '@/lib/db';
import InventionDisclosure from '@/lib/models/InventionDisclosure';
import ApproveForm from '../_components/ApproveForm';
import { approveDisclosureAction, rejectDisclosureAction, resetToPendingAction, deleteDisclosureAction } from '../actions';

const statusBadge: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</div>
      <p className="text-slate-700 text-sm whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default async function DisclosureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const d = await InventionDisclosure.findById(id).lean();

  if (!d) notFound();

  const boundApprove = approveDisclosureAction.bind(null, id);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/disclosures" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
        <ArrowLeft size={14} />
        Back to Disclosures
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-2">{d.inventionTitle}</h1>
          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusBadge[d.status]}`}>
            {d.status}
          </span>
        </div>
        <form action={async () => { 'use server'; await deleteDisclosureAction(id); }}>
          <button type="submit" className="text-red-600 hover:text-red-700 text-xs font-bold uppercase tracking-widest">
            Delete
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5 mb-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Domain" value={d.domain} />
          <Field label="Inventor(s)" value={d.inventorNames} />
          <Field label="Department" value={d.department} />
          <Field label="Student / Employee ID" value={d.studentOrEmployeeId} />
          <Field label="Conception Date" value={d.conceptionDate} />
          <Field label="Funding Source" value={d.fundingSource} />
        </div>

        <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-slate-100">
          <a href={`mailto:${d.contactEmail}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-700 transition-colors">
            <Mail size={13} />
            {d.contactEmail}
          </a>
          {d.contactPhone && (
            <span className="flex items-center gap-2 text-slate-600">
              <Phone size={13} />
              {d.contactPhone}
            </span>
          )}
        </div>

        <Field label="Description" value={d.description} />
        <Field label="Novelty" value={d.novelty} />
        <Field label="Potential Applications" value={d.applications} />
        <Field
          label="Prior Disclosure"
          value={d.priorDisclosure === 'yes' ? `Yes — ${d.priorDisclosureDetails || 'no details provided'}` : 'No'}
        />
      </div>

      {d.status !== 'approved' && (
        <ApproveForm action={boundApprove} initialDisplayStatus={d.displayStatus} initialTrl={d.trl} />
      )}

      {d.status === 'approved' && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-6">
          <p className="text-emerald-900 text-sm font-bold mb-1">Published to the Commercialization page</p>
          <p className="text-emerald-700 text-sm">Status: {d.displayStatus} · {d.trl}</p>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {d.status !== 'rejected' && (
          <form action={async () => { 'use server'; await rejectDisclosureAction(id); }}>
            <button type="submit" className="text-xs font-black uppercase tracking-widest text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-lg transition-colors">
              Reject
            </button>
          </form>
        )}
        {d.status !== 'pending' && (
          <form action={async () => { 'use server'; await resetToPendingAction(id); }}>
            <button type="submit" className="text-xs font-black uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors">
              Reset to Pending
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
