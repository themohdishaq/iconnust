import { NewsHero, FeaturedNews, NewsGrid, UpcomingEvents, SuccessStories } from '@/components/news/NewsSections';
import News from '@/lib/models/News';
import Event from '@/lib/models/Event';
import Story from '@/lib/models/Story';

export const dynamic = 'force-dynamic';

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const [newsDocs, eventDocs, storyDocs] = q
    ? await Promise.all([News.search(q), Event.search(q), Story.search(q)])
    : await Promise.all([News.list(), Event.list(), Story.list()]);

  const newsList = newsDocs.map((n) => ({
    id: n.id.toString(),
    slug: n.slug,
    category: n.category,
    date: n.date,
    title: n.title,
    excerpt: n.excerpt,
    image: n.image,
    readTime: n.readTime,
    featured: n.featured,
  }));

  const events = eventDocs.map((e) => ({
    id: e.id.toString(),
    day: e.day,
    month: e.month,
    year: e.year,
    title: e.title,
    type: e.type,
    location: e.location,
    desc: e.desc,
    registered: e.registered,
  }));

  const stories = storyDocs.map((s) => ({
    id: s.id.toString(),
    name: s.name,
    tag: s.tag,
    desc: s.desc,
    founder: s.founder,
    funding: s.funding,
    image: s.image,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <NewsHero />
      <FeaturedNews newsList={newsList} />
      <NewsGrid newsList={newsList} initialSearch={q ?? ""} />
      <UpcomingEvents events={events} />
      <SuccessStories stories={stories} />
    </div>
  );
}
