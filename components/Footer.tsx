import { Briefcase, Globe, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
            <div className="max-w-sm">
            {/* // icon logo */}
            <Image
              src="/icon-logo.png"
              alt="ICON Logo"
              width={250}
              height={120}
              className="rounded-sm mb-6"
            />

              <p className="text-slate-500 text-lg leading-relaxed">
                Empowering the future of Pakistan's economy by transforming world-class research into commercial reality.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Ecosystem</h5>
                <ul className="space-y-4 text-sm text-slate-500 font-bold">
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">Tech Place</li>
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">Spin-offs</li>
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">IP Academy</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Links</h5>
                <ul className="space-y-4 text-sm text-slate-500 font-bold">
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">Policies</li>
                  <li className="hover:text-blue-900 cursor-pointer transition-colors">Sitemap</li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Stay Connected</h5>
                <div className="flex space-x-6 text-slate-400">
                  <Globe size={20} className="hover:text-blue-900 cursor-pointer transition-colors" />
                  <Briefcase size={20} className="hover:text-blue-900 cursor-pointer transition-colors" />
                  <Users size={20} className="hover:text-blue-900 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">© 2026 National University of Sciences & Technology</p>
            <div className="flex space-x-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <span>Privacy</span>
              <span>Legal</span>
              <span>NUST.EDU.PK</span>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer