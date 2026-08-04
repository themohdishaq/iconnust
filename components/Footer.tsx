
import React from 'react'

function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
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
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/icon-nust',
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Website',
      href: 'https://icon.nust.edu.pk',
      icon: (
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
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
  ];
  return (
    <footer className="bg-[#062539] py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr] pb-12 border-b border-slate-700/60 mb-7">
          <div>
            <div className="text-3xl font-extrabold uppercase tracking-[0.16em] text-white">
              ICON
            </div>
            <p className="text-sm text-white leading-[1.65] max-w-[300px]">
              Empowering the future of Pakistan&apos;s economy by transforming research into commercial reality.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white mb-5">
              Ecosystem
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold text-white/80">
              <a href="/innovation-collaboration" className="transition hover:text-white">
                Innnovation & Collaboration
              </a>
              <a href="/industry-services" className="transition hover:text-white">
                Industry Services
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
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            aria-label={link.name}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-500/80 text-white transition-all duration-200 hover:border-white hover:text-white hover:bg-white/10"
          >
            {link.icon}
          </a>
        ))}
      </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
          <span className="text-white/90">© 2026 National University of Sciences &amp; Technology</span>
        
        </div>
      </div>
    </footer>
  )
}

export default Footer