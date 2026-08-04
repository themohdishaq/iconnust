import Subscriber from '@/lib/models/Subscriber';
import SubscriberList from '@/components/admin/SubscriberList';
import { setNotifyEnabledAction, deleteSubscriberAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
  const docs = await Subscriber.list();
  const items = docs.map((d) => ({
    id: d.id.toString(),
    email: d.email,
    notifyEnabled: d.notifyEnabled,
    createdAt: d.createdAt,
  }));
  const notifiableCount = items.filter((i) => i.notifyEnabled).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Newsletter Subscribers</h1>
        <p className="text-slate-500 text-sm">{items.length} total · {notifiableCount} receiving notifications</p>
      </div>
      <SubscriberList items={items} setNotifyEnabledAction={setNotifyEnabledAction} deleteAction={deleteSubscriberAction} />
    </div>
  );
}
