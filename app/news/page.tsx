"use client"
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Calendar, Tag, Search, ChevronRight, Mail,
  Send, Filter, ExternalLink, Play, Clock, Users, TrendingUp,
  Newspaper, Award, Zap, Globe, BookOpen
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Link from 'next/link';

// --- Data ---
const allNews = [
  {
    id: 1,
    category: 'Licensing',
    date: 'December 15, 2024',
    title: 'NUST Licenses 7 New Intellectual Property Rights to Mubarak Hi-Tech Engineering',
    excerpt: 'Seven intellectual property rights covering advanced engineering solutions have been successfully licensed to Mubarak Hi-Tech Engineering for commercial deployment, representing the largest single licensing deal in NUST TTO history.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
    readTime: '4 min',
    featured: true,
  },
  {
    id: 2,
    category: 'Spinoff',
    date: 'December 5, 2024',
    title: 'ESTATECH GIS Plus — NUST Spin-off Successfully Licensed for National Rollout',
    excerpt: 'EstaTech GIS Plus, a geographic information system technology developed at NUST, has secured its first commercial licensing agreement and will be deployed across multiple government mapping agencies.',
    image: 'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?auto=format&fit=crop&q=80',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 3,
    category: 'Partnership',
    date: 'November 22, 2024',
    title: 'DG FIA Visit Strengthens Industry-Academia Collaboration in Security Tech',
    excerpt: 'Director General of the Federal Investigation Agency explored partnership opportunities with NUST for development of advanced cybersecurity and surveillance technologies through sponsored research programmes.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    readTime: '2 min',
    featured: false,
  },
  {
    id: 4,
    category: 'Licensing',
    date: 'November 10, 2024',
    title: 'PeekaFood IPR Licensing Agreement Signed with Leading Food-Tech Startup',
    excerpt: 'The innovative PeekaFood intelligent food freshness monitoring technology has been licensed to a leading food-tech startup for integration into retail and logistics supply chain systems.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 5,
    category: 'Partnership',
    date: 'October 28, 2024',
    title: 'Tech Valley Private Limited Signs Strategic R&D MoU with NUST',
    excerpt: 'Multi-year research and development collaboration agreement signed with Tech Valley Private Limited, covering joint projects in AI, embedded systems, and next-generation communication technologies.',
    image: 'https://images.unsplash.com/photo-1573164574048-46f8f0bd4e35?auto=format&fit=crop&q=80',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 6,
    category: 'Licensing',
    date: 'October 15, 2024',
    title: 'Coal Tab Technology Licensed for Clean Energy Applications',
    excerpt: 'NUST\'s breakthrough coal-to-fuel tablet technology, capable of reducing emissions by 45%, has been licensed to an energy company for pilot deployment in industrial heating applications.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 7,
    category: 'Award',
    date: 'September 20, 2024',
    title: 'NUST TTO Recognized Among Top 10 University Tech Transfer Offices in Asia',
    excerpt: 'The NUST Technology Transfer Office has been ranked in the top 10 university TTO offices in Asia by the Asian Technology Rankings, citing exceptional spin-off creation and licensing revenue growth.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
    readTime: '2 min',
    featured: false,
  },
  {
    id: 8,
    category: 'Innovation',
    date: 'September 5, 2024',
    title: 'NUST Researchers Develop Water-from-Air Device for Arid Region Deployment',
    excerpt: 'A team from NUST\'s Mechanical Engineering department has created an atmospheric water generation device capable of producing 10 litres per day in arid conditions, with patent filing underway.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
    readTime: '4 min',
    featured: false,
  },
];

const successStories = [
  {
    name: 'EKKO',
    tag: 'Health Tech',
    desc: 'A therapeutic wave device for neuro-rehabilitation of patients with cerebral palsy, autism, and speech disorders — now deployed in 8 hospitals.',
    founder: 'Dr. Ahmed Khan',
    funding: '$2.5M',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
  },
  {
    name: 'DermaVision',
    tag: 'AI Diagnostics',
    desc: 'AI-powered dermatological imaging with 94% accuracy for early skin cancer detection, licensed to 12 hospitals across Pakistan.',
    founder: 'Dr. Sara Ahmed',
    funding: '$1.8M',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80',
  },
  {
    name: 'Myobionics',
    tag: 'Medical Devices',
    desc: 'EMG-controlled prosthetic gripper restoring mobility to upper-limb amputees at a fraction of global market cost.',
    founder: 'Dr. Faisal Mehmood',
    funding: '$3.2M',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  },
  {
    name: 'Radwi Electronics',
    tag: 'AgriTech',
    desc: 'Smart irrigation controller deployed across 500+ farms, reducing water consumption by 35% and increasing yield by 22%.',
    founder: 'Eng. Zubair Ahmed',
    funding: '$1.2M',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
  },
];

const upcomingEvents = [
  {
    date: { day: '15', month: 'May', year: '2026' },
    title: 'NUST Innovation Summit 2026',
    type: 'Conference',
    location: 'NUST H-12 Auditorium, Islamabad',
    desc: 'Annual flagship event bringing together entrepreneurs, investors, industry leaders, and researchers. Keynotes, startup exhibitions, and live pitch competitions.',
    registered: 850,
  },
  {
    date: { day: '22', month: 'May', year: '2026' },
    title: 'IP Commercialization Masterclass',
    type: 'Workshop',
    location: 'CIE Building, NUST',
    desc: 'A one-day intensive workshop on patent strategy, licensing negotiations, and IP monetization for researchers and innovators.',
    registered: 120,
  },
  {
    date: { day: '05', month: 'Jun', year: '2026' },
    title: 'Industry Connect Forum — AI & Robotics',
    type: 'Webinar',
    location: 'Online (Zoom)',
    desc: 'Industry leaders from the AI and robotics sector meet NUST researchers for matchmaking and sponsored R&D discussions.',
    registered: 340,
  },
  {
    date: { day: '18', month: 'Jun', year: '2026' },
    title: 'Startup Pitch Day — Incite Cohort 6',
    type: 'Pitch Event',
    location: 'NUST Tech One Incubator',
    desc: 'Six funded teams present their proof-of-concept results to a panel of investors and corporate partners.',
    registered: 200,
  },
];

const coverageData = [
  { month: 'Jan', press: 4, digital: 12 },
  { month: 'Feb', press: 6, digital: 18 },
  { month: 'Mar', press: 8, digital: 22 },
  { month: 'Apr', press: 11, digital: 30 },
  { month: 'May', press: 7, digital: 25 },
  { month: 'Jun', press: 14, digital: 38 },
  { month: 'Jul', press: 10, digital: 28 },
  { month: 'Aug', press: 9, digital: 32 },
];

const categories = ['All', 'Licensing', 'Spinoff', 'Partnership', 'Award', 'Innovation'];
const categoryColors: Record<string, string> = {
  Licensing: 'bg-emerald-100 text-emerald-800',
  Spinoff: 'bg-blue-100 text-blue-800',
  Partnership: 'bg-violet-100 text-violet-800',
  Award: 'bg-amber-100 text-amber-800',
  Innovation: 'bg-rose-100 text-rose-800',
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return allNews.filter((n) => {
      const matchCat = activeCategory === 'All' || n.category === activeCategory;
      const matchSearch = searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredNews = allNews.find((n) => n.featured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Newspaper size={14} />
              <span>News &amp; Media Center</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              News, Stories &amp; <span className="italic text-blue-400">Events</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 font-light leading-relaxed mb-10">
              Stay up to date with NUST's latest technology transfer deals, spin-off milestones, research breakthroughs, and upcoming innovation events.
            </motion.p>
            {/* Search */}
            <motion.div variants={fadeUp} className="relative max-w-lg">
              <input
                type="text"
                placeholder="Search news and updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-5 py-4 rounded-xl outline-none focus:bg-white/15 focus:border-blue-400 transition-all pr-12"
              />
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Featured Story</span>
              </motion.div>
              <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="relative rounded-2xl overflow-hidden h-80">
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
                  <button className="flex items-center space-x-2 text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all">
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </button>
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
                <motion.div key={news.id} variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col">
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
                    <button className="flex items-center space-x-2 text-blue-900 font-black text-xs uppercase tracking-widest self-start border-b border-blue-900/30 hover:border-blue-900 transition-colors">
                      <span>Read More</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
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

      {/* Success Stories */}
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

            {/* Horizontal Scrollable Stories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {successStories.map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500 cursor-pointer">
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

      


    </div>
  );
}
