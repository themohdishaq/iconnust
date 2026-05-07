"use client"
import React from 'react'
import Image from 'next/image';
import { Search, Menu, X, CircleArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type MenuKey = 'Innovation & Collaboration' | 'Industry Services' | 'Support Programs' | 'Team';


function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
   
        const timeoutRef = useRef<number | null>(null);
   useEffect(() => {
       const handleScroll = () => setIsScrolled(window.scrollY > 20);
       window.addEventListener('scroll', handleScroll);
       
       // Simulate dynamic stat loading
     
   
   
       return () => {
         window.removeEventListener('scroll', handleScroll);
      
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
    
      const menuData = {
        'Innovation & Collaboration': {
          title: 'Innovation',
          sidebar: [
            { name: 'Research Areas', href: '#' },
            { name: 'Technology Portfolio', href: '#' },
            { name: 'IP Policy & Ethics', href: '#' },
            { name: 'Faculty Experts', href: '#' }
          ],
          content: {
            heading: 'Commercialization Pathways',
            links: [
              { label: 'Technology Disclosure', sub: 'The first step in protecting your invention.' },
              { label: 'Licensing Opportunities', sub: 'Browse 500+ patents ready for market.' },
              { label: 'Infrastructure Registry', sub: 'View NUST\'s current research capabilities.' }
            ]
          }
        },
        'Industry Services': {
          title: 'Industry',
          sidebar: [
            { name: 'R&D Support', href: '#' },
            { name: 'Consultancy', href: '#' },
            { name: 'Training/Upskilling', href: '#' },
            { name: 'Testing & Lab Svs', href: '#' }
          ],
          content: {
            heading: 'Strategic Partnerships',
            links: [
              { label: 'Engage R&D Support', sub: 'Collaborate on mission-critical technology projects.' },
              { label: 'Expert Consultancy', sub: 'Access world-class faculty for industry challenges.' },
              { label: 'Testing & Calibration', sub: 'Use our ISO-certified lab infrastructure.' }
            ]
          }
        },
        'Support Programs': {
          title: 'Programs',
          sidebar: [
            { name: 'Tech One Incubator', href: '#' },
            { name: 'Incite Funding', href: '#' },
            { name: 'Venture Bridge', href: '#' }
          ],
          content: {
            heading: 'Entrepreneurial Support',
            links: [
              { label: 'Startup Incubation', sub: 'Nurturing ideas from lab to market.' },
              { label: 'Proof of Concept Funding', sub: 'Gap funding for early stage prototypes.' },
              { label: 'Mentor Network', sub: 'Connect with serial entrepreneurs.' }
            ]
          }
        },
        'News': {
          title: 'News',
          sidebar: [
            { name: 'Press Releases', href: '#' },
            { name: 'Success Stories', href: '#' },
            { name: 'Events & Webinars', href: '#' },
            { name: 'Newsletter Signup', href: '#' }
          ],
          content: {
            heading: 'Latest Updates',
            links: [
              { label: 'Press Releases', sub: 'Official announcements and media coverage.' },
              { label: 'Success Stories', sub: 'Highlighting impactful collaborations.' },
              { label: 'Events & Webinars', sub: 'Join our upcoming industry-focused sessions.' }
            ]
          }
        },
        'Team': {
          title: 'About',
          sidebar: [
            { name: 'Who We Are', href: '#' },
            { name: 'Leadership', href: '#' },
            { name: 'Program Managers', href: '#' },
            { name: 'Contact Info', href: '#' }
          ],
          content: {
            heading: 'The ICON Team',
            links: [
              { label: 'Meet the Leadership', sub: 'Driving the ICON-NOSIS Communication Engine.' },
              { label: 'Contact a Program Manager', sub: 'Find domain-specific tech transfer experts.' },
              { label: 'Governance & Ethics', sub: 'Our commitment to transparent commercialization.' }
            ]
          }
        }
      };
    
      const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Innovation & Collaboration', href: '#innovation' },
        { name: 'Industry Services', href: '#industry' },
        { name: 'Support Programs', href: '#support' },
        { name: 'News', href: '#news'},
        { name: 'Team', href: '#team' },
        
      ];
  return (
    <div>
        {/* Upper Utility Nav */}
      <div className={`transition-all items-center duration-500 bg-white border-b border-slate-50 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'py-3'}`}>
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-[0.2em] font-black text-[#1D2758]">
            <a href="#" className="hover:text-blue-900 transition-colors">Resources</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Events</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Careers</a>
            <a href="#" className="hover:text-blue-900 transition-colors border-l pl-6 border-slate-100">Partners</a>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search Technology..." 
                  className="pl-8 pr-4 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-full w-48 focus:border-blue-900 transition-all outline-none"
                />
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-1 top-0' : 'bg-white/95 backdrop-blur-sm '
      }`}>
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center relative">
            <a href="/" className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {/* // logo */}
            <Image
              src="/icon-logo.png"
              alt="ICON Logo"
              width={200}
              height={100}
              className="rounded-sm"
            />
          </div>
            </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.name in menuData ? link.name as MenuKey : null)}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href={link.href} 
                  className={`text-[12px] uppercase tracking-widest font-black transition-colors py-4 block border-b-2 ${
                    activeMenu === link.name ? 'text-blue-900 border-blue-900' : 'text-slate-600 border-transparent hover:text-blue-900'
                  }`}
                >
                  {link.name}
                </a>
              </div>
            ))}
           
          </div>

          {/* Mega Menu Dropdown */}
          <div 
            className={`absolute top-[calc(100%+4px)] left-6  right-6 bg-white shadow-2xl transition-all duration-500 rounded-b-xl border border-slate-100 overflow-hidden z-50 ${
              activeMenu && menuData[activeMenu] ? 'max-h-[600px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
            }`}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            {activeMenu && menuData[activeMenu] && (
              <div className="flex flex-col lg:flex-row min-h-[420px]">
                <div className="w-full lg:w-1/3 bg-[#0a2342] text-white p-12">
                  <div className="flex items-center space-x-4 mb-10 group cursor-pointer">
                    <h2 className="text-4xl font-serif">{menuData[activeMenu].title}</h2>
                    <CircleArrowRight size={28} className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <ul className="space-y-5">
                    {menuData[activeMenu].sidebar.map((item, idx) => (
                      <li key={idx} className="group flex items-center">
                        <div className="w-1 h-0 bg-blue-400 mr-0 transition-all duration-300 group-hover:w-1 group-hover:mr-4 group-hover:h-4" />
                        <a href={item.href} className="text-[13px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full lg:w-2/3 p-12 bg-white flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-slate-900 mb-10 border-b border-slate-100 pb-4">{menuData[activeMenu].content.heading}</h3>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                    {menuData[activeMenu].content.links.map((link, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="w-10 h-0.5 bg-blue-900 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mb-4" />
                        <h4 className="text-xl font-serif font-medium text-slate-900 group-hover:text-blue-900 transition-colors mb-2">
                          {link.label}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {link.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-8 flex flex-col space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 overflow-y-auto max-h-[80vh]">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col space-y-2">
                 <a href={link.href} className="text-xl font-black uppercase text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              </div>
            ))}
            <button className="bg-blue-900 text-white px-5 py-4 font-black uppercase tracking-widest text-sm mt-4">
              Portal Login
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar