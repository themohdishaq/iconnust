"use client"
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Calendar, Tag, Search, ChevronRight, Mail,
  Send, Filter, ExternalLink, Play, Clock, Users, TrendingUp,
  Newspaper, Award, Zap, Globe, BookOpen
} from 'lucide-react';
import Link from 'next/link';

export type NewsItem = {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  featured: boolean;
};

export type StoryItem = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  founder: string;
  funding: string;
  image: string;
};

export type EventItem = {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  location: string;
  desc: string;
  registered: number;
};

const categoryColors: Record<string, string> = {
  'Industry Collaboration': 'bg-emerald-100 text-emerald-800',
  'MoU Signing': 'bg-blue-100 text-blue-800',
  Partnership: 'bg-violet-100 text-violet-800',
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function NewsPageClient({
  newsList,
  stories,
  events,
}: {
  newsList: NewsItem[];
  stories: StoryItem[];
  events: EventItem[];
}) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(newsList.map((n) => n.category)))], [newsList]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return newsList.filter((n) => {
      const matchCat = activeCategory === 'All' || n.category === activeCategory;
      const matchSearch = searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [newsList, activeCategory, searchQuery]);

  const featuredNews = newsList.find((n) => n.featured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] mb-8">
              <Newspaper size={14} />
              <span>News &amp; Media Center</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl font-serif text-white mb-6 leading-tight">
              News, Stories &amp; <span className="italic text-blue-400">Events</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base text-slate-300 font-light leading-relaxed mb-10">
              Stay up to date with NUST&apos;s latest technology transfer deals, spin-off milestones, research breakthroughs, and upcoming innovation events.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>

              <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="relative rounded-none overflow-hidden h-80">
                  <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[featuredNews.category] || 'bg-slate-100 text-slate-700'}`}>
                      {featuredNews.category}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-4 text-slate-400 text-xs mb-4">
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {featuredNews.date}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {featuredNews.readTime} read</span>
                  </div>
                  <h2 className="text-3xl font-serif text-slate-900 mb-4 leading-tight">{featuredNews.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{featuredNews.excerpt}</p>
                  <Link href={`/news/${featuredNews.slug}`} className="flex items-center space-x-2 text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all w-fit">
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Horizontal Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto text-sm text-slate-400 self-center">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} initial="hidden" animate="show" variants={stagger}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((news) => (
                <motion.div key={news.id} variants={fadeUp}>
                  <Link href={`/news/${news.slug}`}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={news.image} alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${categoryColors[news.category] || 'bg-slate-100 text-slate-700'}`}>
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center space-x-4 text-slate-400 text-xs mb-3">
                        <span className="flex items-center"><Calendar size={11} className="mr-1" /> {news.date}</span>
                        <span className="flex items-center"><Clock size={11} className="mr-1" /> {news.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors leading-snug flex-1">
                        {news.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{news.excerpt}</p>
                      <span className="flex items-center space-x-2 text-blue-900 font-black text-xs uppercase tracking-widest self-start border-b border-blue-900/30 group-hover:border-blue-900 transition-colors">
                        <span>Read More</span>
                        <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Search size={40} className="mx-auto mb-4 opacity-40" />
              <p className="font-bold">No results found for your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section id="events" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-12">
                <span className="text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Get Involved</span>
                <h2 className="text-4xl font-serif text-slate-900">Upcoming Events</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {events.map((e) => (
                  <motion.div key={e.id} variants={fadeUp}
                    className="flex gap-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-blue-900 text-white flex flex-col items-center justify-center">
                      <span className="text-xl font-black leading-none">{e.day}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest">{e.month}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-700 mb-1">{e.type}</span>
                      <h3 className="font-bold text-slate-900 leading-snug mb-2">{e.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{e.desc}</p>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs">
                        <span className="flex items-center"><Globe size={12} className="mr-1" /> {e.location}</span>
                        <span className="flex items-center"><Users size={12} className="mr-1" /> {e.registered} registered</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {stories.length > 0 && (
        <section id="stories" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Proven Impact</span>
                  <h2 className="text-4xl font-serif text-slate-900">Success Stories</h2>
                </div>
                <Link href="/tto" className="hidden md:flex items-center space-x-2 text-blue-900 font-bold text-sm hover:underline">
                  <span>All Stories</span> <ChevronRight size={16} />
                </Link>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((s) => (
                  <motion.div key={s.id} variants={fadeUp}
                    className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500 cursor-pointer">
                    <div className="relative h-44 overflow-hidden">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded">
                        {s.tag}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-white font-bold text-lg leading-tight">{s.name}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">{s.desc}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Funding Raised</div>
                          <div className="text-emerald-600 font-black">{s.funding}</div>
                        </div>
                        <div className="w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                          <Play size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
