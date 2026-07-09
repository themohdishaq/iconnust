"use client"
import React from 'react'
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className={`transition-all duration-500 bg-[#00558F] border-b text-white border-blue-100 ${isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-3'}`}>
        <div className="max-w-8xl mx-auto px-3 md:px-6 flex justify-between items-center">
          <div className="flex tahoma-font items-center  border-transparent space-x-3.5 md:space-x-6 text-[10px] uppercase tracking-[0.2em] font-black ">
            <Link href="/tto" className="hover:text-blue-900 transition-colors">Tech Portfolio</Link>
            <Link href="/news#events" className="hover:text-blue-900 transition-colors">Events</Link>
            <Link href="/team#contact" className="hover:text-blue-900 transition-colors">Careers</Link>
            <Link href="/team" className="hover:text-blue-900 transition-colors">Partners</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
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
      <nav className={`fixed  w-full z-50 py-0 sm:py-2 mt-0 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center relative">
          <Link href="/" className="flex items-center">
            <Image src="/icon-logo.png" alt="ICON Logo" width={200} height={100} className="rounded-sm" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center  space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest font-black transition-colors py-4 block border-b-2 text-slate-600 border-transparent hover:text-blue-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

         

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-y-auto max-h-[80vh] z-50">
            <div className="p-6 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-black uppercase text-slate-900 py-4 border-b border-slate-100 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
             
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
