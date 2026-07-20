import { notFound } from 'next/navigation';
import Event from '@/lib/models/Event';
import EventForm from '../../_components/EventForm';
import { updateEventAction } from '../../actions';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await Event.findById(id);

  if (!event) notFound();

  const boundAction = updateEventAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Edit Event</h1>
      <EventForm
        action={boundAction}
        initial={{
          day: event.day,
          month: event.month,
          year: event.year,
          title: event.title,
          type: event.type,
          location: event.location,
          desc: event.desc,
          registered: event.registered,
          order: event.order,
        }}
      />
    </div>
  );
}
