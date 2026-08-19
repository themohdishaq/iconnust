import Link from 'next/link';
import { notFound } from 'next/navigation';
import Faq from '@/lib/models/Faq';
import FaqForm from '../../_components/FaqForm';
import { updateFaqAction } from '../../actions';

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await Faq.findById(id);
  if (!faq) notFound();

  const action = updateFaqAction.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Edit FAQ</h1>
        <p className="text-slate-500 text-sm">Update the question, answer, or display order.</p>
      </div>

      <div className="max-w-3xl rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
        <FaqForm
          page={faq.page}
          action={action}
          initial={{ question: faq.question, answer: faq.answer, order: faq.order }}
        />
        <Link
          href={`/admin/faqs?section=${faq.page}#${faq.page}`}
          className="inline-block mt-4 text-sm font-semibold text-slate-500 hover:text-blue-800"
        >
          ← Back to FAQs
        </Link>
      </div>
    </div>
  );
}
