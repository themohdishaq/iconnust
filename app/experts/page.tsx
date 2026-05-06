"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  FlaskConical,
  Cpu,
  Globe,
  ShieldCheck,
  ChevronRight,
  Download,
  Calendar,
  FileText,
  Activity,
  ArrowRight,
  Award,
  Microscope,
  Users,
  Building,
  Lightbulb,
  Target,
  TrendingUp,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  BookOpen,
  Briefcase,
  Zap,
  Star,
  MessageSquare,
  HelpCircle,
  Send,
  Eye,
  Handshake,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Settings,
  Search,
  Filter,
  Grid3X3,
  List,
  User,
  GraduationCap,
  Wrench,
  FileCheck,
  Scale,
  DollarSign,
  Clock,
  ThumbsUp
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, Legend, Line
} from 'recharts';

// --- Mock Data for Technology Transfer Analytics ---
const licensingData = [
  { year: '2020', licenses: 12, revenue: 2.1 },
  { year: '2021', licenses: 18, revenue: 3.8 },
  { year: '2022', licenses: 25, revenue: 6.2 },
  { year: '2023', licenses: 34, revenue: 9.5 },
  { year: '2024', licenses: 47, revenue: 14.2 },
];

const iprData = [
  { name: 'Patents', value: 45, color: '#1e3a8a' },
  { name: 'Copyrights', value: 30, color: '#3b82f6' },
  { name: 'Trademarks', value: 15, color: '#60a5fa' },
  { name: 'Design Rights', value: 10, color: '#93c5fd' },
];

const spinoffData = [
  { sector: 'Health & Biotech', count: 8, revenue: 45 },
  { sector: 'IT & Software', count: 12, revenue: 32 },
  { sector: 'Engineering', count: 6, revenue: 18 },
  { sector: 'Energy', count: 4, revenue: 5 },
];

// --- Success Stories Data ---
const successStories = [
  {
    name: 'EKKO',
    description: 'AI-powered educational platform revolutionizing learning through personalized adaptive technology.',
    founder: 'Dr. Ahmed Khan',
    sector: 'EdTech',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    metrics: { users: '50K+', funding: '$2.5M', patents: 3 },
    contact: 'ahmed.khan@ekko.edu.pk'
  },
  {
    name: 'DermaVision',
    description: 'Advanced dermatological imaging system using AI for early skin cancer detection.',
    founder: 'Dr. Sara Ahmed',
    sector: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80',
    metrics: { users: '100+', funding: '$1.8M', patents: 5 },
    contact: 'sara.ahmed@dermavision.pk'
  },
  {
    name: 'Myobionics',
    description: 'Advanced prosthetic limb technology with neural interface for natural movement control.',
    founder: 'Dr. Faisal Mehmood',
    sector: 'Medical Devices',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80',
    metrics: { users: '200+', funding: '$3.2M', patents: 8 },
    contact: 'faisal.mehmood@myobionics.pk'
  }
];

// --- Commercialized Technologies ---
const commercializedTech = [
  {
    name: 'Smart Grid Optimization System',
    description: 'AI-driven energy distribution optimization reducing losses by 35%',
    inventor: 'Dr. Naveed Arshad',
    status: 'Licensed',
    sector: 'Energy',
    contact: 'naveed.arshad@nust.edu.pk'
  },
  {
    name: 'Bio-Degradable Packaging Material',
    description: 'Sustainable packaging solution from agricultural waste',
    inventor: 'Dr. Ayesha Bibi',
    status: 'Commercialized',
    sector: 'Materials',
    contact: 'ayesha.bibi@nust.edu.pk'
  },
  {
    name: 'Medical Imaging Software',
    description: 'Advanced image processing for diagnostic accuracy',
    inventor: 'Dr. Hassan Khan',
    status: 'Licensed',
    sector: 'Healthcare',
    contact: 'hassan.khan@nust.edu.pk'
  }
];

// --- Animation Variants ---
const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

const TechnologyTransferPortal = () => {
  const [activeTab, setActiveTab] = useState('inventors');
  const [selectedStory, setSelectedStory] = useState<{ name: string; description: string; founder: string; sector: string; image: string; metrics: { users: string; funding: string; patents: number }; contact: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-sm uppercase tracking-[0.4em] mb-8">
              <Activity size={16} />
              <span>Technology Transfer Office</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]">
              Transforming Research into <span className="italic text-blue-400">Real-World Impact</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed mb-12 font-light max-w-3xl">
              NUST's Technology Transfer Office bridges the gap between cutting-edge research and commercial success,
              fostering innovation that drives economic growth and societal benefit.
            </motion.p>
        
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute pb-12 bottom-8 right-8 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-xs text-slate-300 uppercase tracking-widest">Licenses Issued</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">$14.2M</div>
            <div className="text-xs text-slate-300 uppercase tracking-widest">Revenue Generated</div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-20 bg-white -mt-16 relative z-20 rounded-t-3xl shadow-2xl mx-4 lg:mx-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif text-slate-900 mb-2">Technology Transfer Impact</h2>
            <p className="text-slate-500 text-sm">Quantifying NUST's contribution to innovation and commercialization</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Licensing Growth Chart */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Licensing Revenue Growth (Million PKR)</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={licensingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value) => [`$${value}M`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* IPR Distribution */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Intellectual Property Portfolio</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={iprData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {iprData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-2">
                {iprData.map((entry, index) => (
                  <div key={index} className="flex items-center text-xs font-bold text-slate-600">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                    {entry.name} ({entry.value}%)
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Spinoff Revenue Chart */}
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mt-8">
            <div className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-serif mb-2">NUST Spinoff Companies by Sector</h3>
              <p className="text-blue-200 text-sm mb-6">30 successful startups generating $100M+ in combined revenue</p>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spinoffData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                      cursor={{ fill: '#1e293b' }}
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#fff', borderRadius: '4px' }}
                      formatter={(value, name) => [name === 'count' ? `${value} companies` : `$${value}M revenue`, name === 'count' ? 'Companies' : 'Revenue']}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeTab === 'inventors' && (
              <motion.div
                key="inventors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* For Inventors and Researchers */}
                <div className="mb-16">
                  <motion.div initial="initial" animate="animate" variants={staggerContainer}>
                    <motion.h2 variants={fadeUp} className="text-5xl lg:text-6xl font-serif text-slate-900 mb-4">For Inventors & <span className="text-blue-600">Researchers</span></motion.h2>
                    <motion.p variants={fadeUp} className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                      Transform your research into real-world impact through our comprehensive technology transfer support system. From initial innovation to successful commercialization, we're with you every step of the way.
                    </motion.p>
                  </motion.div>
                </div>

                {/* Quick Action Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {/* NUST Spinoffs */}
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <Zap size={28} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">NUST Spinoffs</h3>
                    <p className="text-slate-600 text-sm mb-4">Explore 30+ successful startups born from NUST research</p>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors">
                      Explore
                    </button>
                  </motion.div>

                  {/* Inventors' Resources */}
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                      <BookOpen size={28} className="text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Resources & Forms</h3>
                    <p className="text-slate-600 text-sm mb-4">Templates, guidelines, and comprehensive support documents</p>
                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors">
                      Download
                    </button>
                  </motion.div>

                  {/* NUST TTO Policies */}
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                    className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                      <Scale size={28} className="text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">TTO Policies</h3>
                    <p className="text-slate-600 text-sm mb-4">Comprehensive policies for technology transfer and spinoffs</p>
                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
                      View
                    </button>
                  </motion.div>

                  {/* Commercialized Tech */}
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <Target size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Live Technologies</h3>
                    <p className="text-slate-600 text-sm mb-4">Currently commercialized and available for licensing</p>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors">
                      Browse
                    </button>
                  </motion.div>
                </div>

                {/* Technology Transfer Process Flow - Responsive with Connecting Lines */}
                <motion.div
                  variants={scaleIn}
                  className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-8 lg:p-12 rounded-3xl border border-blue-200 mb-16 shadow-lg"
                >
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 text-center">Technology Transfer Process Flow</h3>
                  <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">From your initial innovation to successful commercialization, we guide you through every step</p>

                  {/* Large Screen Flow (Horizontal) */}
                  <div className="hidden lg:block relative">
                    {/* Connecting Lines */}
                    <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ display: 'flex' }}>
                      <div className="flex-1 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                    </div>

                    <div className="grid grid-cols-5 gap-4 relative z-10">
                      {[
                        {
                          step: 1,
                          title: 'Invention Disclosure',
                          desc: 'Submit your innovation details',
                          icon: Lightbulb,
                          color: 'blue'
                        },
                        {
                          step: 2,
                          title: 'IP Assessment',
                          desc: 'Evaluate patentability & potential',
                          icon: FlaskConical,
                          color: 'indigo'
                        },
                        {
                          step: 3,
                          title: 'IP Protection',
                          desc: 'File patents & secure IP rights',
                          icon: ShieldCheck,
                          color: 'violet'
                        },
                        {
                          step: 4,
                          title: 'Market Analysis',
                          desc: 'Assess market opportunity',
                          icon: Globe,
                          color: 'purple'
                        },
                        {
                          step: 5,
                          title: 'Commercialization',
                          desc: 'License or create spinoff',
                          icon: TrendingUp,
                          color: 'blue'
                        }
                      ].map((process, idx) => {
                        const IconComponent = process.icon;
                        const colorMap: Record<string, string> = {
                          blue: 'bg-blue-100 text-blue-600',
                          indigo: 'bg-indigo-100 text-indigo-600',
                          violet: 'bg-violet-100 text-violet-600',
                          purple: 'bg-purple-100 text-purple-600'
                        };
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                          >
                            <div className={`w-24 h-24 ${colorMap[process.color] || colorMap.blue} rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg`}>
                              <IconComponent size={40} />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1 text-sm">{process.title}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{process.desc}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile/Tablet Flow (Vertical) */}
                  <div className="lg:hidden">
                    <div className="flex flex-col">
                      {[
                        {
                          step: 1,
                          title: 'Invention Disclosure',
                          desc: 'Submit your innovation details',
                          icon: Lightbulb,
                          color: 'blue'
                        },
                        {
                          step: 2,
                          title: 'IP Assessment',
                          desc: 'Evaluate patentability & potential',
                          icon: FlaskConical,
                          color: 'indigo'
                        },
                        {
                          step: 3,
                          title: 'IP Protection',
                          desc: 'File patents & secure IP rights',
                          icon: ShieldCheck,
                          color: 'violet'
                        },
                        {
                          step: 4,
                          title: 'Market Analysis',
                          desc: 'Assess market opportunity',
                          icon: Globe,
                          color: 'purple'
                        },
                        {
                          step: 5,
                          title: 'Commercialization',
                          desc: 'License or create spinoff',
                          icon: TrendingUp,
                          color: 'blue'
                        }
                      ].map((process, idx) => {
                        const IconComponent = process.icon;
                        const colorMap: Record<string, string> = {
                          blue: 'from-blue-100 to-blue-50 border-blue-200 text-blue-600',
                          indigo: 'from-indigo-100 to-indigo-50 border-indigo-200 text-indigo-600',
                          violet: 'from-violet-100 to-violet-50 border-violet-200 text-violet-600',
                          purple: 'from-purple-100 to-purple-50 border-purple-200 text-purple-600'
                        };
                        return (
                          <div key={idx}>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`bg-gradient-to-r ${colorMap[process.color] || colorMap.blue} p-6 rounded-xl border mb-3 flex items-start`}
                            >
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2" style={{ borderColor: 'currentColor' }}>
                                  <IconComponent size={28} className={colorMap[process.color] || colorMap.blue} />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="text-sm font-bold text-slate-900">Step {process.step}</div>
                                <h4 className="font-bold text-slate-900 mb-1">{process.title}</h4>
                                <p className="text-sm text-slate-700">{process.desc}</p>
                              </div>
                            </motion.div>
                            {idx < 4 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.1 + 0.1 }}
                                className="flex justify-center mb-3"
                              >
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full" />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Submit Your Invention Form Section */}
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl"
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center mb-6">
                      <Lightbulb size={40} className="mr-4" />
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold">Submit Your Invention</h3>
                        <p className="text-blue-100 mt-1">Transform your research into commercial success</p>
                      </div>
                    </div>

                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-bold mb-2">Full Name *</label>
                          <input
                            type="text"
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className="block text-sm font-bold mb-2">Email Address *</label>
                          <input
                            type="email"
                            placeholder="your.email@nust.edu.pk"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-sm font-bold mb-2">Invention Title *</label>
                        <input
                          type="text"
                          placeholder="e.g., AI-Powered Diagnostic System"
                          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-bold mb-2">Brief Description *</label>
                        <textarea
                          placeholder="Describe your invention, its potential applications, and market relevance..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:border-white focus:bg-white/30 transition-all resize-none"
                        />
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <label className="block text-sm font-bold mb-2">Technical Field *</label>
                          <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white focus:bg-white/30 transition-all">
                            <option className="text-slate-900">Select field</option>
                            <option className="text-slate-900">Software & IT</option>
                            <option className="text-slate-900">Healthcare</option>
                            <option className="text-slate-900">Engineering</option>
                            <option className="text-slate-900">Energy</option>
                            <option className="text-slate-900">Materials</option>
                          </select>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label className="block text-sm font-bold mb-2">Co-Inventors (Optional)</label>
                          <input
                            type="text"
                            placeholder="Names separated by commas"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                          />
                        </motion.div>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" id="confirm" className="mt-1 mr-3 w-5 h-5" />
                        <label htmlFor="confirm" className="text-sm text-blue-100">
                          I confirm that this invention is original and I own/have rights to disclose it
                        </label>
                      </div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center text-lg"
                      >
                        <Send size={20} className="mr-2" />
                        Submit Invention Disclosure
                      </motion.button>

                      <p className="text-sm text-blue-100 text-center">
                        Our team will review your submission within 5-7 business days and contact you with next steps.
                      </p>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'industry' && (
              <motion.div
                key="industry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* For Industry */}
                <div className="mb-12">
                  <h2 className="text-4xl font-serif text-slate-900 mb-4">For Industry Partners</h2>
                  <p className="text-slate-600 text-lg max-w-3xl">Access cutting-edge technologies from NUST's world-class research ecosystem.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                  {/* Commercialized Technologies */}
                  <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Commercialized Technologies</h3>
                    <div className="space-y-6">
                      {commercializedTech.map((tech, idx) => (
                        <div key={idx} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-slate-900">{tech.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              tech.status === 'Licensed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {tech.status}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{tech.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Inventor: {tech.inventor}</span>
                            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                              Contact <Mail size={14} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Licensing Process & Resources */}
                  <div className="space-y-8">
                    {/* Licensing Process */}
                    <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Licensing Process</h3>
                      <div className="space-y-4">
                        {[
                          'Technology Inquiry & NDA',
                          'Due Diligence & Evaluation',
                          'Term Sheet Negotiation',
                          'License Agreement Execution',
                          'Technology Transfer & Support'
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                              {idx + 1}
                            </div>
                            <span className="text-slate-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Sample Agreements & Forms */}
                    <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Sample Agreements & Forms</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          'License Agreement Template',
                          'NDA Template',
                          'Material Transfer Agreement',
                          'IP Assignment Form',
                          'Technology Evaluation Form',
                          'Commercialization Report'
                        ].map((form, idx) => (
                          <button key={idx} className="p-3 border border-slate-200 rounded-lg text-left hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{form}</span>
                              <Download size={14} className="text-slate-400 group-hover:text-blue-600" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Interested in Licensing */}
                    <motion.div variants={fadeUp} className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">Interested in Licensing?</h3>
                      <p className="text-blue-100 mb-6">Connect with our technology transfer specialists to explore licensing opportunities.</p>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail size={16} className="mr-3" />
                          <span>tto@nust.edu.pk</span>
                        </div>
                        <div className="flex items-center">
                          <Phone size={16} className="mr-3" />
                          <span>+92-51-111-11-6878</span>
                        </div>
                        <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center justify-center mt-6">
                          <MessageSquare size={16} className="mr-2" />
                          Start Conversation
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">Success Stories</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">NUST innovations that transformed research into thriving businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <motion.div
                key={idx}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                onClick={() => setSelectedStory(story)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">{story.sector}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{story.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{story.metrics.users}</div>
                      <div className="text-xs text-slate-500">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{story.metrics.funding}</div>
                      <div className="text-xs text-slate-500">Funding</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{story.metrics.patents}</div>
                      <div className="text-xs text-slate-500">Patents</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Founder: {story.founder}</span>
                    <Mail size={14} className="text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif text-slate-900 mb-2">Latest News</h2>
              <p className="text-slate-600">Stay updated with NUST's technology transfer developments</p>
            </div>
            <button className="hidden md:flex items-center space-x-2 text-blue-900 font-bold text-sm uppercase tracking-widest hover:underline">
              <span>View All News</span> <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'NUST Licenses 7 New IPRs to Mubarak Hi-Tech',
                date: 'December 15, 2024',
                excerpt: 'Seven intellectual property rights successfully licensed to Mubarak Hi-Tech Engineering for commercial deployment.',
                category: 'Licensing'
              },
              {
                title: 'DG FIA Visit Strengthens Industry-Academia Collaboration',
                date: 'December 10, 2024',
                excerpt: 'Director General FIA explores partnership opportunities with NUST for advanced security technologies.',
                category: 'Collaboration'
              },
              {
                title: 'ESTATECH GIS Plus NUST Spinoff Successfully Licensed',
                date: 'December 5, 2024',
                excerpt: 'Innovative GIS technology spinoff secures first commercial licensing agreement.',
                category: 'Spinoff'
              }
            ].map((news, idx) => (
              <motion.div
                key={idx}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">{news.category}</span>
                  <span className="text-xs text-slate-500">{news.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{news.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3">{news.excerpt}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                  <span>Read More</span>
                  <ChevronRight size={14} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Us */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={slideInLeft}>
              <h2 className="text-3xl font-serif text-slate-900 mb-8">Contact Us</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin size={20} className="text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-slate-600">Technology Transfer Office<br />NUST H-12 Campus, Islamabad</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={20} className="text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">tto@nust.edu.pk</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={20} className="text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">+92-51-111-11-6878</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={20} className="text-blue-600 mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-serif text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    question: 'How do I submit an invention disclosure?',
                    answer: 'Use our online submission portal or contact our TTO team directly. We provide templates and guidance throughout the process.'
                  },
                  {
                    question: 'What is the timeline for IP protection?',
                    answer: 'Initial assessment takes 2-4 weeks. Patent filing process typically takes 6-12 months depending on jurisdiction and complexity.'
                  },
                  {
                    question: 'How does licensing revenue sharing work?',
                    answer: 'Revenue sharing is typically 50-70% to inventors/researchers, depending on the agreement terms and institutional policies.'
                  },
                  {
                    question: 'Can international companies license NUST technologies?',
                    answer: 'Yes, we welcome international partnerships. Our team assists with cross-border licensing and technology transfer arrangements.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-6 last:border-b-0">
                    <h3 className="font-bold text-slate-900 mb-2 flex items-center">
                      <HelpCircle size={16} className="text-blue-600 mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedStory.name}</h2>
                    <p className="text-slate-600">{selectedStory.sector} • Founded by {selectedStory.founder}</p>
                  </div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={selectedStory.image}
                  alt={selectedStory.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <p className="text-slate-700 mb-6">{selectedStory.description}</p>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedStory.metrics.users}</div>
                    <div className="text-sm text-slate-500">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedStory.metrics.funding}</div>
                    <div className="text-sm text-slate-500">Total Funding</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedStory.metrics.patents}</div>
                    <div className="text-sm text-slate-500">Patents Filed</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-slate-600">Contact: {selectedStory.contact}</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechnologyTransferPortal;