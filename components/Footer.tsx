import { Briefcase, Globe, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#062539] py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr] pb-12 border-b border-slate-700/60 mb-7">
          <div>
            <div className="text-3xl font-extrabold uppercase tracking-[0.16em] text-white">
              ICON
            </div>
            <p className="text-sm text-white leading-[1.65] max-w-[300px]">
              Empowering the future of Pakistan's economy by transforming world-class research into commercial reality.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white mb-5">
              Ecosystem
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold text-white/80">
              <a href="#" className="transition hover:text-white">
                Tech Place
              </a>
              <a href="#" className="transition hover:text-white">
                Spin-offs
              </a>
              <a href="#" className="transition hover:text-white">
                IP Academy
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white mb-5">
              Links
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold text-white/80">
              <a href="#" className="transition hover:text-white">
                Careers
              </a>
              <a href="#" className="transition hover:text-white">
                Policies
              </a>
              <a href="#" className="transition hover:text-white">
                Sitemap
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white mb-5">
              Stay Connected
            </div>
            <div className="flex flex-wrap gap-3">
              {['#', '#', '#'].map((href, index) => (
                <a
                  key={index}
                  href={href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-500/80 text-white transition hover:border-white hover:text-white"
                >
                  {index === 0 && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
          <span className="text-white/90">© 2026 National University of Sciences &amp; Technology</span>
          <div className="flex flex-wrap items-center gap-8">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Legal
            </a>
            <a href="#" className="transition hover:text-white">
              NUST.EDU.PK
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer