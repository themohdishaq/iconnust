"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  FlaskConical, 
  Users, 
  GraduationCap, 
  Layers, 
  ArrowRight,
  Briefcase,
  ChevronRight,
  Globe,
  Network,
  Cpu,
  ShieldCheck,
  Send,
  Building2,
  Workflow,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// --- Animation Variants ---
const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

const IndustryServicesPortal = () => {
  // State variables for scroll and hover interactions
  const [activeService, setActiveService] = useState<string | null>(null);
 


  const services = [
    { 
      id: 'rnd',
      title: 'R&D Support', 
      desc: 'Custom research projects designed to solve specific industrial bottlenecks through applied science and engineering.', 
      icon: <FlaskConical size={32} />, 
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      stats: '150+ Active Projects',
      color: 'from-blue-600 to-blue-900',
      href: 'research'
    },
    { 
      id: 'consultancy',
      title: 'Expert Consultancy', 
      desc: 'Strategic guidance from world-renowned faculty across multiple domains, from AI implementation to structural engineering.', 
      icon: <Users size={32} />, 
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
      stats: '500+ Faculty Experts',
      color: 'from-indigo-600 to-indigo-900',
      href: 'experts'
    },
    { 
      id: 'training',
      title: 'Upskilling & Training', 
      desc: 'Specialized corporate training programs, executive diplomas, and certification workshops tailored for your workforce.', 
      icon: <GraduationCap size={32} />, 
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
      stats: '15,000+ Professionals Trained',
      color: 'from-cyan-600 to-cyan-900',
      href: 'training'
    },
    { 
      id: 'testing',
      title: 'Testing & Lab Services', 
      desc: 'Access to NUST\'s ISO-certified infrastructure, high-end analytical tools, and material testing facilities.', 
      icon: <Layers size={32} />, 
      img: 'https://media.istockphoto.com/id/1048191122/photo/latin-engineer-on-laptop-in-shop.jpg',
      stats: '300+ Advanced Labs',
      color: 'from-sky-600 to-sky-900',
      href: 'tto'
    }
  ];

  return (
    <div className="py-7 my-4 bg-slate-900  text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-fixed bg-cover"
          style={{ backgroundImage: "url('/industrial_bg.png')" }}
        />
      {/* Hero Section: High-Tech Look */}
      <section className="relative py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl mx-auto flex flex-col items-center">
            
            
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl xl:text-8xl font-serif text-white mb-8 leading-[1.05] tracking-tight">
              Industrial <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Services</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-slate-400 leading-relaxed  font-light max-w-2xl">
              Four key avenues designed to seamlessly integrate NUST's world-class research excellence, faculty expertise, and infrastructure with your corporate R&D needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Interactive Grid */}
      <section id="services" className=" relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer} 
            className="grid lg:grid-cols-2 gap-6"
          >
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                variants={scaleUp}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className="relative group overflow-hidden rounded-3xl bg-slate-900 border border-white/5 cursor-pointer h-[400px] lg:h-[450px]"
              >
                {/* Background Image with Parallax & Dark Overlay */}
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-60"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-750 via-slate-850/90 to-transparent" />

                {/* Content Container */}
                <div className="absolute inset-0 p-10 lg:p-12 flex flex-col justify-end">
                  {/* Top Right Stat Badge */}
                  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white shadow-sm">{service.stats}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl transform group-hover:-translate-y-4 transition-transform duration-500">
                    {service.icon}
                  </div>
                  
                  {/* Text Details */}
                  <div className="transform group-hover:-translate-y-4 transition-transform duration-500">
                    <h3 className="text-3xl lg:text-4xl font-serif text-white mb-4">{service.title}</h3>
                    <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-8 max-w-lg opacity-80 group-hover:opacity-100 transition-opacity">
                      {service.desc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="absolute bottom-8 left-10 lg:left-12 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    <Link href={service.href} className="flex items-center space-x-3 text-cyan-300 font-black text-[11px] uppercase tracking-[0.2em] border-b border-cyan-300/30 pb-1 hover:border-cyan-300 transition-colors">
                    <button className="flex items-center space-x-3 text-cyan-300 font-black text-[11px] uppercase tracking-[0.2em] border-b border-cyan-300/30 pb-1 hover:border-cyan-300 transition-colors">

                      <span>Details...</span>
                      <ArrowRight size={16} />
                    </button>
                    </Link>
                  </div>
                </div>
                
                {/* Glowing Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default IndustryServicesPortal;