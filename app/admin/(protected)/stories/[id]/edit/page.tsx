import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Story from '@/lib/models/Story';
import StoryForm from '../../_components/StoryForm';
import { updateStoryAction } from '../../actions';

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const story = await Story.findById(id).lean();

  if (!story) notFound();

  const boundAction = updateStoryAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Edit Success Story</h1>
      <StoryForm
        action={boundAction}
        initial={{
          name: story.name,
          tag: story.tag,
          desc: story.desc,
          founder: story.founder,
          funding: story.funding,
          image: story.image,
          order: story.order,
        }}
      />
    </div>
  );
}
