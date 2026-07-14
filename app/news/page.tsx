import { connectDB } from '@/lib/db';
import News from '@/lib/models/News';
import Event from '@/lib/models/Event';
import Story from '@/lib/models/Story';
import NewsPageClient from './_components/NewsPageClient';

export const revalidate = 60;

export default async function NewsPage() {
  await connectDB();

  const [newsDocs, eventDocs, storyDocs] = await Promise.all([
    News.find().sort({ createdAt: -1 }).lean(),
    Event.find().sort({ order: 1, createdAt: -1 }).lean(),
    Story.find().sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  const newsList = newsDocs.map((n) => ({
    id: n._id.toString(),
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
    id: e._id.toString(),
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
    id: s._id.toString(),
    name: s.name,
    tag: s.tag,
    desc: s.desc,
    founder: s.founder,
    funding: s.funding,
    image: s.image,
  }));

  return <NewsPageClient newsList={newsList} stories={stories} events={events} />;
}
