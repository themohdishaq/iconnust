import StoryForm from '../_components/StoryForm';
import { createStoryAction } from '../actions';

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">New Success Story</h1>
      <StoryForm action={createStoryAction} />
    </div>
  );
}
