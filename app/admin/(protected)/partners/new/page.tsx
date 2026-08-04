import PartnerForm from '../_components/PartnerForm';
import { createPartnerAction } from '../actions';

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">New Partner</h1>
      <PartnerForm action={createPartnerAction} />
    </div>
  );
}
