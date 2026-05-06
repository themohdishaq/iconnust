/**
 * PDC Training Portal Page
 *
 * This component renders the Professional Development Center (PDC) training portal
 * featuring course listings, program types, statistics, and contact forms.
 *
 * IMPORTED ICONS (from lucide-react):
 * - Building2: Customized Corporate Training icon
 * - Award: Executive Diplomas icon
 * - Users: Open Enrollment Workshops and NUST Faculty feature icon
 * - Laptop: E-Learning & Hybrid programs icon
 * - Clock: Course duration indicator
 * - MapPin: Course mode/location indicator
 * - ChevronRight: Navigation and action button arrows
 * - FileText: Request Corporate Proposal button icon
 * - Target: Hands-on Approach feature icon
 * - CheckCircle2: ISO Certified feature icon
 * - GraduationCap: PDC badge icon
 * - Globe: Global Certifications feature icon
 * - Briefcase: Corporate Proposal CTA icon
 * - ArrowRight: Various action button arrows
 * - ArrowLeft: Left navigation (imported for completeness)
 *
 * COMPONENT STATE:
 * - isScrolled: Boolean state for navbar scroll effects
 *
 * DATA VARIABLES:
 * - courseData: Array of training course objects with date, title, category, duration, mode
 * - programTypes: Array of program type objects with title, icon, description, image
 * - PDCStats: Array of PDC statistics for impact metrics display
 * - features: Array of PDC advantage features with title, description, icon
 *
 * ANIMATION VARIANTS:
 * - staggerContainer: Container animation for staggered children animations
 * - fadeUp: Fade in from bottom animation
 * - slideInRight: Slide in from right animation
 */

"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from '../../components/Carousel';
import {
  Building2,      // Icon for Customized Corporate Training
  Award,          // Icon for Executive Diplomas
  Users,          // Icon for Open Enrollment Workshops and NUST Faculty
  Laptop,         // Icon for E-Learning & Hybrid programs
  Clock,          // Icon for course duration
  MapPin,         // Icon for course mode/location
  ChevronRight,   // Icon for navigation and buttons
  FileText,       // Icon for Request Corporate Proposal button
  Target,         // Icon for Hands-on Approach feature
  CheckCircle2,   // Icon for ISO Certified feature
  GraduationCap,  // Icon for Professional Development Center badge
  Globe,          // Icon for Global Certifications feature
  Briefcase,      // Icon for Corporate Proposal CTA
  ArrowRight,     // Icon for various action buttons
  ArrowLeft       // Icon for potential left navigation (imported for completeness)
} from 'lucide-react';

// --- Mock Data (Based on PDC NUST Offerings) ---
const courseData = [
  { 
    date: "Nov 15 - 17", 
    title: "Certified Project Management Professional (PMP)®", 
    category: "Certification", 
    duration: "3 Days", 
    mode: "On-Campus",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  { 
    date: "Nov 22 - 24", 
    title: "Data Science & Big Analytics for Executives", 
    category: "Technology", 
    duration: "3 Days", 
    mode: "Hybrid",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  { 
    date: "Dec 05 - 08", 
    title: "Supply Chain & Logistics Management", 
    category: "Management", 
    duration: "4 Days", 
    mode: "On-Campus",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    date: "Dec 12 - 13", 
    title: "Strategic Leadership & Change Management", 
    category: "Executive", 
    duration: "2 Days", 
    mode: "On-Campus",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    date: "Jan 10 - 12", 
    title: "Artificial Intelligence for Business Leaders", 
    category: "Technology", 
    duration: "3 Days", 
    mode: "Online",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
];

const programTypes = [
  { title: "Customized Corporate Training", icon: <Building2 size={32} />, desc: "Bespoke training modules tailored precisely to your organizational needs, delivered at your premises or NUST.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" },
  { title: "Executive Diplomas", icon: <Award size={32} />, desc: "Comprehensive, long-term programs designed to build profound expertise in specialized industry domains.", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80" },
  { title: "Open Enrollment Workshops", icon: <Users size={32} />, desc: "Intensive 2-5 day courses focusing on immediate skill acquisition and the latest technological trends.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" },
  { title: "E-Learning & Hybrid", icon: <Laptop size={32} />, desc: "Flexible, technology-enabled learning environments for professionals who require remote access.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80" }
];

const PDCStats = [
  { label: 'Professionals Trained', value: '15,000+' },
  { label: 'Corporate Clients', value: '250+' },
  { label: 'Training Modules', value: '120+' },
  { label: 'Industry Experts', value: '80+' },
];

const features = [
  { title: "NUST Faculty", desc: "Learn from top-tier academic minds combined with seasoned industry practitioners.", icon: <Users /> },
  { title: "Global Certifications", desc: "Preparation for PMI, Supply Chain, and Data Analytics international exams.", icon: <Globe /> },
  { title: "Hands-on Approach", desc: "Case studies, simulations, and real-world problem-solving methodologies.", icon: <Target /> },
  { title: "ISO Certified", desc: "Quality management systems ensuring high-end training delivery and assessment.", icon: <CheckCircle2 /> }
];

// --- Animation Variants ---
const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 }
};

const PDCPortal = () => {
  // Component state variables
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.3 }} 
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8 bg-blue-900/40 px-4 py-2 rounded-full border border-blue-500/30">
              <GraduationCap size={14} />
              <span>Professional Development Center</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]">
              Upskilling the <span className="italic text-blue-400">National Workforce</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-blue-100/80 leading-relaxed mb-12 font-light">
              PDC NUST delivers industry-driven executive education, bridging the corporate knowledge gap through specialized training, globally recognized certifications, and bespoke corporate programs.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">
                View Course Schedule
              </button>
              <button className="bg-white/10 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center">
                <FileText size={14} className="mr-2" /> Request Corporate Proposal
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative -mt-16 z-20 mx-6 lg:mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-100">
            {PDCStats.map((stat, idx) => (
              <div key={idx} className={`px-4 ${idx === 0 ? 'pl-0' : ''}`}>
                <div className="text-4xl lg:text-5xl font-serif text-blue-900 mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Executive Portfolios (Bento Grid) */}
      <section id="portfolios" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Our Offerings</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight">Executive Portfolios</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">Tailored learning experiences designed for every stage of organizational and professional growth.</p>
          </div>

          <motion.div 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }} 
            variants={staggerContainer} 
            className="grid md:grid-cols-2 gap-6"
          >
            {programTypes.map((program, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp} 
                className="group relative overflow-hidden rounded-2xl h-[320px] cursor-pointer"
              >
                <img src={program.img} alt={program.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-80" />
                
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                  <div className="text-blue-400 mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                    {program.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">{program.title}</h3>
                  <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {program.desc}
                    </p>
                    <button className="flex items-center space-x-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-blue-300 transition-colors">
                      <span>Explore Program</span> <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Courses (Continuous Motion Carousel) */}
      <section id="schedule" className="py-32 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6">Training Calendar</h2>
            <p className="text-slate-500 text-lg">Register for our upcoming open-enrollment workshops and certifications.</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel
              responsive={{ sm: 1, md: 2, lg: 3, xl: 3 }}
              autoPlay={true}
              autoPlayDelay={3000}
              className="px-12"
            >
              {courseData.map((course, idx) => (
                <div
                  key={idx}
                  className="group bg-white flex flex-col justify-between rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Date Block */}
                  <div className="bg-blue-50 text-blue-900 p-4 rounded-lg text-center min-w-[120px] shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-6">
                    <span className="block text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Date</span>
                    <span className="block font-serif font-bold text-lg">{course.date}</span>
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 mb-6 px-6">
                    <div className="flex items-center gap-3 mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{course.category}</span>
                      <span className="flex items-center"><Clock size={12} className="mr-1" /> {course.duration}</span>
                      <span className="flex items-center"><MapPin size={12} className="mr-1" /> {course.mode}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 px-6 pb-6">
                    <button className="w-full bg-slate-900 text-white px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors rounded-sm flex items-center justify-center">
                      Register Now <ChevronRight size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="mt-12 text-center">
            <button className="text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-slate-900 hover:border-slate-900 transition-colors">
              View Full Annual Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose PDC */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-blue-400 mb-6 bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
                    {React.cloneElement(feature.icon, { size: 24 })}
                  </div>
                  <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={slideInRight} className="order-1 lg:order-2">
              <span className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">The PDC Advantage</span>
              <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-tight">Bridging the Corporate Knowledge Gap</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
                We don't just teach theory. Our programs are reverse-engineered from current industry demands. By partnering with PDC, organizations ensure their workforce is equipped with cutting-edge tools to drive operational excellence and innovation.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="Trainer" />
                  <img className="w-12 h-12 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Trainer" />
                  <img className="w-12 h-12 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" alt="Trainer" />
                </div>
                <div className="text-sm font-bold text-slate-300">
                  Join 15,000+ Alumni <br/>
                  <span className="text-blue-400">across 250+ organizations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Proposal CTA */}
      <section id="corporate" className="py-32 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 -skew-x-12 transform origin-top" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Briefcase size={36} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-slate-900">Need Customized Training for Your Team?</h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              Collaborate with our curriculum designers to build a bespoke training program tailored to your company's strategic goals and operational requirements.
            </p>
            
            <div className="bg-white p-10 rounded-2xl shadow-2xl border border-slate-100 text-left grid md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</label>
                <input type="text" className="bg-slate-50 border border-slate-200 py-3 px-4 rounded-lg focus:border-blue-900 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Audience / Department</label>
                <input type="text" className="bg-slate-50 border border-slate-200 py-3 px-4 rounded-lg focus:border-blue-900 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="md:col-span-2 flex flex-col space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Training Objectives / Required Skills</label>
                <textarea rows={4} className="bg-slate-50 border border-slate-200 py-3 px-4 rounded-lg focus:border-blue-900 focus:bg-white outline-none transition-colors resize-none"></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-blue-900 text-white py-4 rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors flex items-center justify-center group">
                  Request Corporate Proposal <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PDCPortal;