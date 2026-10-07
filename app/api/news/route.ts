import { NextResponse } from 'next/server';
import News from '@/lib/models/News';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawLimit = searchParams.get('limit');
  if (rawLimit !== null && (!/^\d+$/.test(rawLimit) || !Number.isSafeInteger(Number(rawLimit)) || Number(rawLimit) < 1)) {
    return NextResponse.json({ error: 'Limit must be a positive whole number.' }, { status: 400 });
  }
  const limit = rawLimit === null ? 3 : Math.min(Number(rawLimit), 20);

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
