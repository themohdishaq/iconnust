import NewsForm from '../_components/NewsForm';
import { createNewsAction } from '../actions';

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">New Article</h1>
      <NewsForm action={createNewsAction} />
    </div>
  );
}
