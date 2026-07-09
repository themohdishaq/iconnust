import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { newsArticles, getNewsBySlug, getNewsSlug } from '@/data/news';

export function generateStaticParams() {
  return newsArticles.map((news) => ({ slug: getNewsSlug(news) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  return { title: news ? `${news.title} | ICON-NUST News` : 'News | ICON-NUST' };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) notFound();

  const otherNews = newsArticles.filter((n) => n.id !== news.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <section className="relative pt-24 pb-16 bg-slate-900 overflow-hidden">
        <img src={news.image} alt={news.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 to-slate-900" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/news" className="inline-flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            <span>Back to News</span>
          </Link>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-900 text-white mb-6">
            {news.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-serif text-white mb-6 leading-tight">{news.title}</h1>
          <div className="flex items-center space-x-6 text-slate-300 text-sm">
            <span className="flex items-center"><Calendar size={14} className="mr-2" /> {news.date}</span>
            <span className="flex items-center"><Clock size={14} className="mr-2" /> {news.readTime} read</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden mb-10">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            {news.content.map((paragraph, i) => (
              <p key={i} className="text-slate-700 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {otherNews.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <span className="text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">More News</span>
            <div className="grid sm:grid-cols-2 gap-8">
              {otherNews.map((n) => (
                <Link key={n.id} href={`/news/${getNewsSlug(n)}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
