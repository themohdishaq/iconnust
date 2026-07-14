import EventForm from '../_components/EventForm';
import { createEventAction } from '../actions';

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">New Event</h1>
      <EventForm action={createEventAction} />
    </div>
  );
}
