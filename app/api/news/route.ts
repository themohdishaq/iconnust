import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import News from '@/lib/models/News';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get('limit')) || 3, 20);

  await connectDB();
  const news = await News.find().sort({ createdAt: -1 }).limit(limit).lean();

  return NextResponse.json(
    news.map((n) => ({
      id: n._id.toString(),
      slug: n.slug,
      category: n.category,
      title: n.title,
      excerpt: n.excerpt,
      image: n.image,
      date: n.date,
    }))
  );
}
