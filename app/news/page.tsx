import type { Metadata } from 'next';
import News from '@/lib/models/News';
import Event from '@/lib/models/Event';
import Story from '@/lib/models/Story';
import NewsPageClient from './_components/NewsPageClient';
import { SITE_NAME } from '@/lib/seo';

export const revalidate = 60;

const title = 'News & Success Stories';
const description =
  'Discover the latest developments, success stories, spin-off ventures, and upcoming events from ICON-NUST.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: '/news',
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function NewsPage() {
  const [newsDocs, eventDocs, storyDocs] = await Promise.all([
    News.list(),
    Event.list(),
    Story.list(),
  ]);

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

  return <NewsPageClient newsList={newsList} stories={stories} events={events} />;
}
