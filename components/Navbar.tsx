"use client"
import React from 'react'
import Image from 'next/image';
import { Search, Menu, X, CircleArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type MenuKey = 'Innovation & Collaboration' | 'Industry Services' | 'Commercialization Pathways' | 'News' | 'Team';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuName: MenuKey | null) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 150);
  };

  const menuData: Record<MenuKey, {
    title: string;
    sidebar: { name: string; href: string }[];
    content: { heading: string; links: { label: string; sub: string; href: string }[] };
  }> = {
    'Innovation & Collaboration': {
      title: 'Innovation',
      sidebar: [
        { name: 'Research Areas', href: '/#' },
        { name: 'Technology Portfolio', href: '/#' },
        { name: 'IP Policy & Ethics', href: '/#' },
        { name: 'Faculty Experts', href: '/#' },
      ],
      content: {
        heading: 'Innovation and Collaboration',
        links: [
          { label: 'Technology Disclosure', sub: 'The first step in protecting your invention — file a formal IDF with ICON.', href: '/tto' },
          { label: 'Licensing Opportunities', sub: 'Browse 500+ patents ready for market via the TTO portfolio.', href: '/tto' },
          { label: 'Infrastructure Registry', sub: "Access NUST's 300+ advanced laboratories and research capabilities.", href: '/research' },
        ],
      },
    },
    'Industry Services': {
      title: 'Industry',
      sidebar: [
        { name: 'R&D Support', href: '/#' },
        { name: 'Consultancy', href: '/#' },
        { name: 'Training / Upskilling', href: '/#' },
        { name: 'Testing & Lab Services', href: '/#' },
      ],
      content: {
        heading: 'Strategic Partnerships',
        links: [
          { label: 'Engage R&D Support', sub: 'Collaborate on mission-critical technology projects with NUST faculty.', href: '/research' },
          { label: 'Expert Consultancy', sub: 'Access world-class expertise across 50+ engineering & science domains.', href: '/experts' },
          { label: 'Testing & Calibration', sub: 'Use our ISO-certified lab infrastructure and analytical services.', href: '/tto' },
        ],
      },
    },
    'Commercialization Pathways': {
      title: 'Pathways',
      sidebar: [
        { name: 'Technology Licensing', href: '/commercialization#licensing' },
        { name: 'Spin-off Creation', href: '/commercialization#spinoffs' },
        { name: 'IP Protection', href: '/commercialization#ip' },
        { name: 'Research Infrastructure', href: '/commercialization#infrastructure' },
      ],
      content: {
        heading: 'Commercialization Avenues',
        links: [
          { label: 'License a Technology', sub: 'Access 500+ NUST patents ready for industry licensing across key sectors.', href: '/commercialization#licensing' },
          { label: 'Launch a Spin-off', sub: "Create a new company from your research with ICON's full incubation support.", href: '/commercialization#spinoffs' },
          { label: 'Research Infrastructure', sub: "Leverage NUST's 300+ advanced labs and facilities for prototype development.", href: '/commercialization#infrastructure' },
        ],
      },
    },
    'News': {
      title: 'News',
      sidebar: [
        { name: 'Press Releases', href: '/news' },
        { name: 'Success Stories', href: '/news#stories' },
        { name: 'Events & Webinars', href: '/news#events' },
        { name: 'Newsletter Signup', href: '/news#newsletter' },
      ],
      content: {
        heading: 'Latest Updates',
        links: [
          { label: 'Press Releases', sub: 'Official announcements, licensing deals, and media coverage.', href: '/news' },
          { label: 'Success Stories', sub: 'Highlighting impactful spin-offs and commercialization wins.', href: '/news#stories' },
          { label: 'Events & Webinars', sub: 'Join our upcoming industry-focused innovation sessions.', href: '/news#events' },
        ],
      },
    },
    'Team': {
      title: 'About',
      sidebar: [
        { name: 'Who We Are', href: '/team' },
        { name: 'Leadership', href: '/team#leadership' },
        { name: 'Program Managers', href: '/team#managers' },
        { name: 'Contact Info', href: '/team#contact' },
      ],
      content: {
        heading: 'The ICON Team',
        links: [
          { label: 'Meet the Leadership', sub: 'Driving the ICON Innovation & Commercialization network at NUST.', href: '/team#leadership' },
          { label: 'Contact a Program Manager', sub: 'Find domain-specific tech transfer and R&D experts.', href: '/team#managers' },
          { label: 'Governance & Ethics', sub: 'Our commitment to transparent and responsible commercialization.', href: '/team' },
        ],
      },
    },
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Innovation & Collaboration', href: '/research' },
    { name: 'Industry Services', href: '/tto' },
    { name: 'Commercialization Pathways', href: '/commercialization' },
    { name: 'News', href: '/news' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <div>
      {/* Upper Utility Nav */}
      <div className={`transition-all duration-500 bg-[#0a2342] border-b text-white border-blue-100 ${isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-3'}`}>
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center  border-transparent  space-x-6 text-[10px] uppercase tracking-[0.2em] font-black ">
            <Link href="/tto" className="hover:text-blue-900 transition-colors">Tech Portfolio</Link>
            <Link href="/news#events" className="hover:text-blue-900 transition-colors">Events</Link>
            <Link href="/team#contact" className="hover:text-blue-900 transition-colors">Careers</Link>
            <Link href="/team" className="hover:text-blue-900 transition-colors border-l pl-6 border-slate-100">Partners</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Technology..."
                className="pl-8 pr-4 py-1 text-[11px] text-black bg-slate-50 border border-slate-200 rounded-full w-48 focus:border-blue-900 transition-all outline-none"
              />
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 py-2  transition-all duration-300 ${isScrolled ? 'bg-white shadow-md  top-0' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center relative">
          <Link href="/" className="flex items-center">
            <Image src="/icon-logo.png" alt="ICON Logo" width={200} height={100} className="rounded-sm" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.name in menuData ? (link.name as MenuKey) : null)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`text-[12px] uppercase tracking-widest font-black transition-colors py-4 block border-b-2 ${
                    activeMenu === link.name ? 'text-blue-900 border-blue-900' : 'text-slate-600 border-transparent hover:text-blue-900'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Mega Menu Dropdown */}
          <div
            className={`absolute top-[calc(100%+4px)] left-6 right-6 bg-white shadow-2xl transition-all duration-500 rounded-b-xl border border-slate-100 overflow-hidden z-50 ${
              activeMenu && menuData[activeMenu] ? 'max-h-[600px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
            }`}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            {activeMenu && menuData[activeMenu] && (
              <div className="flex flex-col lg:flex-row min-h-[420px]">
                {/* Left dark sidebar */}
                <div className="w-full lg:w-1/3 bg-[#0a2342] text-white p-12">
                  <Link href={menuData[activeMenu].sidebar[0]?.href || '#'} className="flex items-center space-x-4 mb-10 group">
                    <h2 className="text-4xl font-serif">{menuData[activeMenu].title}</h2>
                    <CircleArrowRight size={28} className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                  <ul className="space-y-5">
                    {menuData[activeMenu].sidebar.map((item, idx) => (
                      <li key={idx} className="group flex items-center">
                        <div className="w-1 h-0 bg-blue-400 mr-0 transition-all duration-300 group-hover:w-1 group-hover:mr-4 group-hover:h-4" />
                        <Link
                          href={item.href}
                          className="text-[13px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right content area */}
                <div className="w-full lg:w-2/3 p-12 bg-white flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-slate-900 mb-10 border-b border-slate-100 pb-4">
                    {menuData[activeMenu].content.heading}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    {menuData[activeMenu].content.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="w-10 h-0.5 bg-blue-900 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mb-4" />
                        <h4 className="text-xl font-serif font-medium text-slate-900 group-hover:text-blue-900 transition-colors mb-2">
                          {link.label}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{link.sub}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-y-auto max-h-[80vh] z-50">
            <div className="p-6 flex flex-col space-y-1">
              {navLinks.map((link) => {
                const hasMenu = link.name in menuData;
                const isExpanded = expandedMobile === (link.name as MenuKey);
                return (
                  <div key={link.name}>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <Link
                        href={link.href}
                        className="text-base font-black uppercase text-slate-900 flex-1"
                        onClick={() => { if (!hasMenu) setMobileMenuOpen(false); }}
                      >
                        {link.name}
                      </Link>
                      {hasMenu && (
                        <button
                          onClick={() => setExpandedMobile(isExpanded ? null : (link.name as MenuKey))}
                          className="p-2 text-slate-500"
                        >
                          <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {hasMenu && isExpanded && (
                      <div className="bg-slate-50 px-4 py-3 space-y-2">
                        {menuData[link.name as MenuKey].sidebar.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-900 py-1.5"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="w-1 h-1 rounded-full bg-blue-400" />
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <button className="bg-blue-900 text-white px-5 py-4 font-black uppercase tracking-widest text-sm mt-4 w-full">
                Portal Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
