import { NextResponse } from 'next/server';
import News from '@/lib/models/News';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLimit = Number(searchParams.get('limit'));
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(Math.max(Math.floor(requestedLimit), 1), 20)
    : 3;

  try {
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
  } catch (error) {
    console.error('Failed to load news:', error);
    return NextResponse.json({ error: 'News could not be loaded.' }, { status: 500 });
  }
}
