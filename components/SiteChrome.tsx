'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
      <a
        href="https://www.linkedin.com/company/icon-nust"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit ICON NUST on LinkedIn"
        title="Visit ICON NUST on LinkedIn"
        className="linkedin-float fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#0A66C2] text-white shadow-[0_8px_24px_rgba(0,59,112,0.3)] transition duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-[#003B70] hover:shadow-[0_12px_30px_rgba(0,59,112,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FCAF17] sm:bottom-8 sm:right-8"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </>
  );
}
