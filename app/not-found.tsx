"use client"
import Link from 'next/link';
import { ArrowLeft, Home, Search, FlaskConical } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4 sm:px-6 text-center">

      {/* Large 404 watermark */}
      <div className="relative select-none pointer-events-none mb-2">
        <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-serif font-bold text-slate-100 leading-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 shadow-lg">
            <FlaskConical size={32} />
          </div>
        </div>
      </div>

      {/* Tag line */}
      <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">
        <div className="w-8 h-px bg-blue-900/30" />
        <span>Page Not Found</span>
        <div className="w-8 h-px bg-blue-900/30" />
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 mb-4 leading-tight">
        This page doesn&apos;t exist
      </h1>

      <p className="text-slate-500 text-sm sm:text-base max-w-md mb-10 leading-relaxed">
        The resource you&apos;re looking for may have moved, been renamed, or simply doesn&apos;t exist.
        Head back to explore ICON&apos;s innovation ecosystem.
      </p>

      {/* Quick links */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-900 text-white px-7 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors shadow-lg shadow-blue-900/20"
        >
          <Home size={14} />
          Back to Home
        </Link>
        <Link
          href="/tto"
          className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-7 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors"
        >
          <Search size={14} />
          Industry Services
        </Link>
      </div>

      {/* Helpful links grid */}
      <div className="w-full max-w-lg border-t border-slate-100 pt-8">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-5">
          Explore ICON
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Commercialization', href: '/commercialization' },
            { label: 'Industry Services', href: '/tto' },
            { label: 'Our Team',          href: '/team' },
            { label: 'Research',          href: '/research' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
