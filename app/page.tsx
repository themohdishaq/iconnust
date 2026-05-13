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
  Menu, 
  X,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
  CircleArrowRight,
  Mail,
  Send,
  BarChart3,
  FlaskConical,
  GraduationCap,
  Layers,
  Fullscreen
} from 'lucide-react';
import Image from 'next/image';
import IndustryServicesPortal from '@/components/Service';
import Footer from '@/components/Footer';
import PartnersSection from '@/components/Partner';

type MenuKey = 'Innovation & Collaboration' | 'Industry Services' | 'Support Programs' | 'Team';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [stats, setStats] = useState({ partners: 0, projects: 0, spinOffs: 0, patents: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  // Statistics & Slider Animation Logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate dynamic stat loading
    const statInterval = setInterval(() => {
      setStats(prev => ({
        partners: prev.partners < 230 ? prev.partners + 5 : 230,
        projects: prev.projects < 85 ? prev.projects + 2 : 85,
        spinOffs: prev.spinOffs < 142 ? prev.spinOffs + 3 : 142,
        patents: prev.patents < 512 ? prev.patents + 10 : 512
      }));
    }, 50);

    // Hero Slider Auto-rotation
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(statInterval);
      clearInterval(slideInterval);
    };
  }, []);

  const handleMouseEnter = (menuName: MenuKey | null) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

 
  const heroSlides = [
    {
      tag: "Innovation",
      titleLine1: "Where",
      highlight: "Discovery",
      titleLine2: "Ignites Growth.",
      desc: "The Innovation & Commercialization Network at NUST bridge the gap between academic brilliance and global industrial impact.",
      img: "campus-life.jpg"
    },
    {
      tag: "Industry Synergy",
      titleLine1: "Partnering for",
      highlight: "Global Scale",
      titleLine2: "and Impact.",
      desc: "Collaborate with world-class faculty and leverage ISO-certified testing facilities to solve complex industrial bottlenecks.",
      img: "https://propakistani.pk/wp-content/uploads/2023/09/SP-Global-and-NUST-Strengthen-Linkages-by-Signing-an-MoU.jpg"
    },
    {
      tag: "Commercialization",
      titleLine1: "From Lab Bench",
      highlight: "to the Market",
      titleLine2: "Seamlessly.",
      desc: "Navigate the journey from invention disclosure to strategic licensing with our dedicated technology transfer experts.",
      img: "https://i.pinimg.com/1200x/8c/f4/20/8cf420466c0c85498332512694ef1c63.jpg"
    }
  ];

  return (
    <div className="min-h-screen  bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full">
      
      {/* Hero Section with Dynamic Slider and Integrated Live Dashboard */}
      <section className=" w-full relative pt-16 bg-white min-h-screen flex flex-col justify-between border-b border-slate-100">
        
        {/* Background Images Slider */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={slide.img} 
                  width={1000}
                  height={1000}
                  alt={`Slide ${index + 1}`} 
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentSlide === index ? 'scale-100' : 'scale-110'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-blue-900/10 lg:via-transparent" />
                
              </div>
            ))}
          </div>
          {/* Decorative Floating Elements */}
          <div className="absolute -top-20 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 z-20 animate-pulse" />
          <div className="absolute top-1/2 -left-10 w-40 h-40 bg-slate-100 rounded-full blur-2xl opacity-40 z-20" />
        </div>

        {/* Text Content Slider */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 w-full relative z-20 flex-grow flex flex-col justify-center mb-6 sm:mb-10 lg:mb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                    currentSlide === index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
                    <div className="w-12 h-px bg-blue-900/30" />
                    <span>{slide.tag}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-medium text-slate-900 leading-[1.02] mb-5 sm:mb-8 tracking-tight">
                    {slide.titleLine1} <br />
                    <span className="italic text-blue-900 drop-shadow-sm">{slide.highlight}</span> <br />
                    {slide.titleLine2}
                  </h1>
                  {/* <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl font-light">
                    {slide.desc}
                  </p> */}
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-900 text-white px-5 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                      Launch Tech Place
                    </button>
                    <button className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 hover:text-blue-900 hover:border-blue-900 transition-all">
                      Impact Dashboard
                    </button>
                  </div>
                </div>
              ))}

              {/* Slider Navigation Dots */}
              <div className="absolute bottom-4 sm:bottom-8 lg:bottom-16 2xl:-bottom-10 left-0 flex space-x-3">
                 {heroSlides.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-10 bg-blue-900' : 'w-3 bg-slate-200 hover:bg-blue-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Dashboard - Impact Snapshot (Integrated Overlay) */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 mb-6 sm:mb-8 lg:mb-10 -top-10 sm:-top-16 lg:-top-28 2xl:-top-5 w-full relative z-30">
           <div className="bg-white/90  backdrop-blur-xl rounded-xl shadow-xl overflow-hidden">
             <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center bg-slate-50/50">
               <div className="flex items-center space-x-3 text-blue-900 font-black text-[10px] uppercase tracking-[0.3em]">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span>Live Impact Engine</span>
               </div>
               
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
               {[
                  { label: 'Industry Partners', value: stats.partners, icon: <Users /> },
                  { label: 'Projects In Hand', value: stats.projects, icon: <BarChart3 /> },
                  { label: 'Spin-off Ventures', value: stats.spinOffs, icon: <TrendingUp /> },
                  { label: 'Active Patents', value: stats.patents, icon: <ShieldCheck /> }
                ].map((stat, i) => (
                  <div key={i} className="p-3 sm:p-4 lg:p-6 hover:bg-blue-50/50 transition-colors group relative overflow-hidden">
                    {/* Background glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex justify-between items-start mb-3 sm:mb-4 lg:mb-5">
                      <div className="text-blue-900 bg-blue-100/50 p-1.5 sm:p-2 lg:p-3 rounded-lg group-hover:scale-110 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                        {React.cloneElement(stat.icon, { size: 18, className: 'sm:w-5 sm:h-5 lg:w-6 lg:h-6' })}
                      </div>
                      
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-baseline space-x-1 mb-1">
                        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-Inter text-slate-900 group-hover:text-blue-950 transition-colors">{stat.value}</div>
                        <span className="text-xl font-serif text-blue-900 font-bold">+</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-black text-slate-500 group-hover:text-blue-900 transition-colors">{stat.label}</div>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>
       {/* News sections */}
      <section id="news" className="pt-6 sm:pt-32 md:pt-40 lg:pt-48 pb-4 2xl:pt-6 bg-slate-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
              <div className="w-12 h-px bg-blue-900/30" />
              <span>Latest Updates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900 mb-3">News & Success Stories</h2>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg">Discover the latest developments, success stories, and upcoming events from ICON-NUST.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkI1i27WbQ_aPaJi954nGhCWiiIhO14kj3lA&s',
                tag: 'Success Story',
                title: 'Tech Startup Scales to $10M Valuation',
                desc: 'An ICON-NUST supported spin-off secured Series A funding, demonstrating the impact of our entrepreneurial support programs.'
              },
              {
                image: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2023/11/22/4105781-1574885962.jpeg?itok=Ft6FH-_n',
                tag: 'Partnership',
                title: 'Strategic MoU with Global Tech Leader',
                desc: 'NUST and international corporation sign collaboration agreement for joint R&D initiatives in advanced manufacturing.'
              },
              {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5kgX-34t6B3g3IH-C7ba_AJIyvNAUcHjCA&s',
                tag: 'Event',
                title: 'Innovation Summit 2026 Announced',
                desc: 'Mark your calendars for our annual summit bringing together entrepreneurs, investors, and industry leaders on May 15th.'
              },
              
            ].map((news, i) => (
              <div key={i} className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-blue-900 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                    {news.tag}
                  </span>
                </div>
                
                <div className="p-4 sm:p-6 lg:p-7">
                  <h3 className="text-xl font-serif text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {news.desc}
                  </p>
                  <button className="flex items-center space-x-2 cursor-pointer text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all group/btn">
                    <span>Read More</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <IndustryServicesPortal/>

      {/* Industry Services Pillars */}
      {/* <section id="industry" className="py-4 bg-white">
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-left ">
             <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
              <div className="w-12 h-px bg-blue-900/30" />
              <span>Upgraded Labs</span>
            </div>
            <h2 className="text-5xl font-serif text-slate-900 mb-6">Industry Services</h2>
            <p className="text-slate-500 text-lg">Four key avenues designed to integrate NUST's research excellence with corporate R&D needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'R&D Support', desc: 'Custom research projects designed to solve specific industrial bottlenecks.', icon: <FlaskConical />, bg: 'bg-slate-50' },
              { title: 'Consultancy', desc: 'Expert guidance from world-renowned faculty across multiple domains.', icon: <Users />, bg: 'bg-white border border-slate-100' },
              { title: 'Upskilling & Training', desc: 'Specialized corporate training programs and certification workshops.', icon: <GraduationCap />, bg: 'bg-white border border-slate-100' },
              { title: 'Testing & Lab Services', desc: 'Access to ISO-certified infrastructure and high-end analytical tools.', icon: <Layers />, bg: 'bg-slate-50' }
            ].map((service, i) => (
              <div key={i} className={`p-12 ${service.bg} group hover:shadow-2xl transition-all duration-500 rounded-sm`}>
                <div className="w-16 h-16 bg-blue-900 text-white rounded-sm flex items-center justify-center mb-8 shadow-lg group-hover:-translate-y-2 transition-transform">
                  {React.cloneElement(service.icon, { size: 30 })}
                </div>
                <h3 className="text-3xl font-serif text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10 text-lg">{service.desc}</p>
                <button className="flex items-center space-x-3 cursor-pointer text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 group/btn">
                  <span>Inquire Now</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}
 <section className="py-8 sm:py-10 lg:py-12 bg-white text-slate-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
                <Mail size={14} />
                <span>Knowledge Brief</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-900 font-serif mb-4">The Innovation Brief</h2>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg opacity-90 max-w-md">Stay ahead of the market with monthly updates on NUST research, licensed tech, and industry roundtables.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Work Email"
                className="flex-grow bg-slate-50 border border-slate-300 px-4 py-3 sm:py-4 outline-none focus:bg-white focus:border-blue-500 transition-all rounded-sm placeholder:text-slate-400 text-slate-900 text-sm sm:text-base"
              />
              <button className="bg-blue-600 text-white px-7 py-3 sm:py-4 font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-blue-700 transition-all rounded-sm shadow-lg whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
      {/* Tech Place / Storefront */}
      <section className="py-14 sm:py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 bg-fixed bg-cover" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 sm:mb-14 lg:mb-20 gap-6 lg:gap-10">
            <div className="max-w-xl">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Storefront</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif leading-tight mb-4">Tech Place: Marketplace of Innovation</h2>
              <p className="text-slate-400 text-sm sm:text-base lg:text-lg font-light">Explore 120+ spin-offs and market-ready intellectual property available for strategic licensing.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-slate-900 px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-colors">LinkedIn Feed</button>
              <button className="bg-blue-900 text-white px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 border border-blue-700 transition-colors">Licensed Tech</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: 'Licensed Tech', count: '48', sub: 'Technologies actively licensed to industry partners' },
              { label: 'Spin-offs', count: '142', sub: 'Ventures founded on NUST intellectual property' },
              { label: 'Ready to License', count: '85', sub: 'Cutting-edge technologies awaiting commercialization' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 sm:p-7 lg:p-8 rounded-sm hover:bg-white/10 transition-all cursor-pointer group">
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform"><Layers size={28} /></div>
                <div className="text-4xl font-Inter mb-2">{item.count}</div>
                <div className="text-lg font-serif text-white mb-2">{item.label}</div>
                <p className="text-slate-500 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Innovation Brief (Newsletter) */}
     

      {/* Initiate a Partnership (Contact Section) */}
      <section id="team" className="py-8 sm:py-12 lg:py-16 bg-white relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-5 sm:mb-6 lg:mb-8">
                <div className="w-12 h-px bg-blue-900/30" />
                <span>Initiate Engagement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-slate-900 mb-5 sm:mb-7 lg:mb-10 leading-tight">
                Partner for <br /> <span className="italic text-blue-900">Success</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                Our Program Managers are subject-matter experts dedicated to facilitating long-term strategic alliances.
              </p>

              <div className="space-y-5 sm:space-y-7 lg:space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-900 shrink-0"><Globe size={20} /></div>
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-1">Scholar House</h4>
                    <p className="text-slate-900 font-medium">Sector H-12, Islamabad, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-900 shrink-0"><Users size={20} /></div>
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-1">Direct Outreach</h4>
                    <p className="text-slate-900 font-medium">icon@nust.edu.pk | +92 51 9085 1000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-8 lg:p-12 xl:p-14 rounded-sm">
              <form className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization</label>
                  <input type="text" className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none" />
                </div>
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Email</label>
                  <input type="email" className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none" />
                </div>
                <div className="sm:col-span-2 flex flex-col space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inquiry Nature</label>
                  <select className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none appearance-none">
                    <option>Technology Licensing</option>
                    <option>Sponsored R&D</option>
                    <option>Invention Disclosure</option>
                    <option>Lab Services Request</option>
                  </select>
                </div>
                <div className="sm:col-span-2 flex flex-col space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                  <textarea rows={4} className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none resize-none"></textarea>
                </div>
                <div className="sm:col-span-2 pt-4 sm:pt-6">
                  <button className="w-full bg-blue-900 text-white py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all flex items-center justify-center space-x-4 shadow-xl shadow-blue-900/20 group">
                    <span>Submit Engagement Request</span>
                    <Send size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <PartnersSection/>
      </section>

      
    </div>
  );
};

export default App;