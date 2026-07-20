import { NextResponse } from 'next/server';
import News from '@/lib/models/News';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get('limit')) || 3, 20);

  const news = await News.list({ limit });

  return NextResponse.json(
    news.map((n) => ({
      id: n.id.toString(),
      slug: n.slug,
      category: n.category,
      title: n.title,
      excerpt: n.excerpt,
      image: n.image,
      date: n.date,
    }))
  );
}
