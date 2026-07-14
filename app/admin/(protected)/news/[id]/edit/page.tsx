import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import News from '@/lib/models/News';
import NewsForm from '../../_components/NewsForm';
import { updateNewsAction } from '../../actions';

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const news = await News.findById(id).lean();

  if (!news) notFound();

  const boundAction = updateNewsAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Edit Article</h1>
      <NewsForm
        action={boundAction}
        initial={{
          title: news.title,
          category: news.category,
          excerpt: news.excerpt,
          content: news.content,
          date: news.date,
          readTime: news.readTime,
          featured: news.featured,
          image: news.image,
        }}
      />
    </div>
  );
}
