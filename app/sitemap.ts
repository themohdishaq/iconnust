import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import News from '@/lib/models/News';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/commercialization`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/industry-services`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/innovation-collaboration`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/team`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/news`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  await connectDB();
  const newsDocs = await News.find().select('slug updatedAt').lean();

  const newsRoutes: MetadataRoute.Sitemap = newsDocs.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes];
}
