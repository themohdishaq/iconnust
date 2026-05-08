"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Lightbulb,
  Briefcase,
  Users,
  TrendingUp,
  Globe,
  ShieldCheck,
  Cpu,
  Microscope,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
  Mail,
  Send,
  BarChart3,
  FlaskConical,
  GraduationCap,
  Layers,
  Zap,
  Rocket,
  Target,
  CheckCircle2,
  Lock,
  FileText,
  Handshake,
  TrendingUpIcon
} from 'lucide-react';

interface Technology {
  id: number;
  title: string;
  category: string;
  status: 'licensed' | 'spinoff' | 'ready';
  description: string;
  image: string;
  maturityLevel: number;
  applications: string[];
}

const TechMarketplace = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'licensed' | 'spinoff' | 'ready'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ licensed: 0, spinoffs: 0, readyToLicense: 0, totalValue: 0 });
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const timeoutRef = useRef<number | null>(null);

 



  const heroSlides = [
    {
      tag: "Marketplace",
      titleLine1: "Innovation",
      highlight: "Meets Opportunity",
      titleLine2: "in Tech Place",
      desc: "Discover cutting-edge technologies, successful spin-offs, and licensing opportunities from NUST's innovation ecosystem.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    },
   
  ];

  const licensedTechs: Technology[] = [
    {
      id: 1,
      title: "Advanced Battery Management System",
      category: "Energy Storage",
      status: "licensed",
      description: "AI-powered battery monitoring and optimization system for EV applications",
      image: "https://images.unsplash.com/photo-1578042212267-f0d1fd0cf5ba?auto=format&fit=crop&q=80",
      maturityLevel: 9,
      applications: ["Electric Vehicles", "Grid Storage", "Renewables"]
    },
    {
      id: 2,
      title: "Smart IoT Infrastructure",
      category: "Internet of Things",
      status: "licensed",
      description: "Distributed IoT platform for industrial automation and monitoring",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?auto=format&fit=crop&q=80",
      maturityLevel: 8,
      applications: ["Manufacturing", "Smart Cities", "Agriculture"]
    }
  ];

  const spinoffs: Technology[] = [
    {
      id: 4,
      title: "TechVenture AI Solutions",
      category: "Artificial Intelligence",
      status: "spinoff",
      description: "Enterprise AI platform for predictive analytics and decision-making",
      image: "https://images.unsplash.com/photo-1677442d019cecf8f0dbbf1a7b5a370a?auto=format&fit=crop&q=80",
      maturityLevel: 8,
      applications: ["Enterprise", "Finance", "Healthcare"]
    },
    {
      id: 5,
      title: "GreenTech Innovations",
      category: "Sustainability",
      status: "spinoff",
      description: "Climate-tech solutions for carbon capture and environmental monitoring",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80",
      maturityLevel: 7,
      applications: ["Environmental", "Energy", "Carbon Credits"]
    },
  ];

  const readyToLicense: Technology[] = [
    {
      id: 7,
      title: "Next-Gen Quantum Computing Framework",
      category: "Quantum Technology",
      status: "ready",
      description: "Quantum algorithms library for optimization and cryptography",
      image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&q=80",
      maturityLevel: 7,
      applications: ["Finance", "Cryptography", "Optimization"]
    },
    {
      id: 8,
      title: "Autonomous Navigation System",
      category: "Robotics",
      status: "ready",
      description: "SLAM-based autonomous navigation for indoor and outdoor environments",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65b?auto=format&fit=crop&q=80",
      maturityLevel: 8,
      applications: ["Robotics", "Autonomous Vehicles", "Drones"]
    },
  ];

  const allTechs = [...licensedTechs, ...spinoffs, ...readyToLicense];
  const filteredTechs = activeFilter === 'all' 
    ? allTechs 
    : allTechs.filter(tech => tech.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'licensed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'spinoff':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ready':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'licensed':
        return <CheckCircle2 size={16} />;
      case 'spinoff':
        return <Rocket size={16} />;
      case 'ready':
        return <Zap size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full">
      
      {/* Hero Section */}
      <section className="w-full relative pt-20 pb-4 bg-gradient-to-b from-slate-50 to-white min-h-[95vh] h-screen flex flex-col justify-between border-b border-slate-100">
        
        {/* Background Slider */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
            }}
          >
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentHeroSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={slide.img} 
                  alt={`Slide ${index + 1}`} 
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentHeroSlide === index ? 'scale-100' : 'scale-110'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-blue-900/20" />
              </div>
            ))}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-10 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 z-20 animate-pulse" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-slate-100 rounded-full blur-2xl opacity-50 z-20" />
        </div>

        {/* Content */}
        <div className="max-w-8xl mx-auto px-6 w-full relative z-20 flex-grow flex flex-col justify-center mb-16 lg:mb-24">
          <div className="max-w-2xl">
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ease-in-out `}
              >
                <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                  <div className="w-12 h-px bg-blue-900/30" />
                  <span>{slide.tag}</span>
                </div>
                <h1 className="text-5xl md:text-7xl 2xl:text-8xl font-serif font-medium text-slate-900 leading-[1.02] mb-8 tracking-tight">
                  {slide.titleLine1} <br />
                  <span className="italic text-blue-900 drop-shadow-sm">{slide.highlight}</span> <br />
                  {slide.titleLine2}
                </h1>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl font-light">
                  {slide.desc}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-900 text-white px-8 py-4 2xl:px-12 2xl:py-6 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95 rounded-sm">
                    Explore Marketplace
                  </button>
                  <button className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 hover:text-blue-900 hover:border-blue-900 transition-all flex items-center gap-2">
                    View Case Studies
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">Explore Technologies</h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search by technology, category, or application..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'All Technologies', icon: <Layers size={16} /> },
              { id: 'licensed', label: 'Licensed Tech', icon: <CheckCircle2 size={16} /> },
              { id: 'spinoff', label: 'Spin-offs', icon: <Rocket size={16} /> },
              { id: 'ready', label: 'Ready to License', icon: <Zap size={16} /> }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-white border border-slate-300 text-slate-900 hover:border-blue-500'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-8xl mx-auto px-6">
          {filteredTechs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTechs.map((tech, i) => (
                <div 
                  key={tech.id}
                  className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animation: `slideUp 0.6s ease-out ${i * 0.1}s both`
                  }}
                >
                  <style>{`
                    @keyframes slideUp {
                      from {
                        opacity: 0;
                        transform: translateY(20px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-xs uppercase tracking-wide ${getStatusColor(tech.status)}`}>
                      {getStatusIcon(tech.status)}
                      {tech.status === 'licensed' ? 'Licensed' : tech.status === 'spinoff' ? 'Spin-off' : 'Ready'}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {tech.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {tech.description}
                    </p>

                   

                    {/* Applications */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">Applications</p>
                      <div className="flex flex-wrap gap-2">
                        {tech.applications.map((app, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-blue-900 text-white py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all rounded-lg group/btn flex items-center justify-center gap-2">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Microscope size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">No technologies found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-5 bg-fixed bg-cover" />
        
        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Success Stories</span>
            <h2 className="text-5xl font-serif leading-tight mb-6">Featured Technologies & Ventures</h2>
            <p className="text-slate-300 text-lg font-light max-w-2xl">Discover transformative solutions that are reshaping industries and creating measurable impact.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Licensed Tech Highlight */}
            <div className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-lg hover:bg-white/20 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif">Licensed Technologies</h3>
                  <p className="text-slate-400 text-sm">Production-ready solutions</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Our licensed technologies have undergone rigorous testing and validation. They're currently deployed by industry leaders and generating substantial revenue through strategic partnerships.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <Handshake size={16} className="text-green-400" />
                  <span>Industry partnerships active</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <BarChart3 size={16} className="text-green-400" />
                  <span>Revenue-generating models</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <FileText size={16} className="text-green-400" />
                  <span>Complete documentation</span>
                </li>
              </ul>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-black text-sm uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                <span>View Licensed Portfolio</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Spin-offs Highlight */}
            <div className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-lg hover:bg-white/20 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-400/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif">Active Spin-offs</h3>
                  <p className="text-slate-400 text-sm">Market-creating ventures</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                140+ ventures founded on NUST intellectual property are disrupting markets and creating economic impact. These companies combine academic rigor with entrepreneurial execution.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <Users size={16} className="text-blue-400" />
                  <span>Diverse founder networks</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <TrendingUp size={16} className="text-blue-400" />
                  <span>Rapid growth trajectories</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Briefcase size={16} className="text-blue-400" />
                  <span>Mentorship & investor access</span>
                </li>
              </ul>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-black text-sm uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                <span>Explore Spin-offs</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Ready to License Highlight */}
            <div className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-lg hover:bg-white/20 transition-all group md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif">Ready to License</h3>
                  <p className="text-slate-400 text-sm">Next-generation innovations</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                85+ cutting-edge technologies approaching commercialization. These innovations represent the future of multiple industries with exceptional licensing potential.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <Lightbulb size={16} className="text-amber-400" />
                  <span>Breakthrough innovations</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Target size={16} className="text-amber-400" />
                  <span>Clear market applications</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Globe size={16} className="text-amber-400" />
                  <span>Global licensing opportunities</span>
                </li>
              </ul>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 font-black text-sm uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                <span>Discover Emerging Tech</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <Handshake size={14} />
                <span>Partnership Opportunities</span>
              </div>
              <h2 className="text-5xl text-slate-900 font-serif mb-6">Ready to Collaborate?</h2>
              <p className="text-slate-700 text-lg opacity-90 max-w-md mb-8">
                Whether you're seeking to license proven technologies, invest in promising spin-offs, or co-develop solutions, our team is ready to facilitate the perfect match.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mt-1 shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Technology Licensing</h4>
                    <p className="text-slate-600 text-sm">Access proven, market-ready technologies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mt-1 shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Investment Opportunities</h4>
                    <p className="text-slate-600 text-sm">Invest in high-growth spin-offs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mt-1 shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Joint Development</h4>
                    <p className="text-slate-600 text-sm">Co-develop solutions for emerging challenges</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-12 rounded-lg border border-slate-200">
              <h3 className="text-2xl font-serif text-slate-900 mb-8">Initiate Partnership</h3>
              <form className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-600">Company Name</label>
                  <input type="text" placeholder="Your organization" className="bg-white border border-slate-300 px-4 py-3 rounded-lg focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-600">Contact Email</label>
                  <input type="email" placeholder="your@email.com" className="bg-white border border-slate-300 px-4 py-3 rounded-lg focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-600">Interest Area</label>
                  <select className="bg-white border border-slate-300 px-4 py-3 rounded-lg focus:border-blue-500 outline-none transition-all">
                    <option>Select an option</option>
                    <option>Technology Licensing</option>
                    <option>Spin-off Investment</option>
                    <option>Joint Development</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-900 text-white py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all rounded-lg flex items-center justify-center gap-2 group/btn">
                  <span>Send Inquiry</span>
                  <Send size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-4">Stay Updated</h2>
              <p className="text-slate-300 text-lg mb-2">Get the latest on newly licensed technologies and emerging spin-offs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Work Email" 
                className="flex-grow bg-white/10 border border-white/20 px-6 py-4 rounded-lg outline-none focus:bg-white/20 focus:border-blue-400 transition-all placeholder:text-slate-400 text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-black text-xs uppercase tracking-widest rounded-lg transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechMarketplace;