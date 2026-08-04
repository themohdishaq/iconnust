import { notFound } from 'next/navigation';
import Partner from '@/lib/models/Partner';
import PartnerForm from '../../_components/PartnerForm';
import { updatePartnerAction } from '../../actions';

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await Partner.findById(id);

  if (!partner) notFound();

  const boundAction = updatePartnerAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Edit Partner</h1>
      <PartnerForm
        action={boundAction}
        initial={{
          name: partner.name,
          desc: partner.desc,
          logo: partner.logo,
          order: partner.order,
        }}
      />
    </div>
  );
}
