import type { Metadata } from 'next';
import News from '@/lib/models/News';
import { SITE_NAME } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await News.findBySlug(slug);

  if (!news) {
    return { title: 'News' };
  }

  const description = news.excerpt;
  const url = `/news/${news.slug}`;

  return {
    title: news.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: `${news.title} | ${SITE_NAME}`,
      description,
      url,
      images: news.image ? [{ url: news.image }] : undefined,
    },
    twitter: {
      title: `${news.title} | ${SITE_NAME}`,
      description,
      images: news.image ? [news.image] : undefined,
    },
  };
}

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
