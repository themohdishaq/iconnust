import Link from 'next/link';
import { ArrowRight, Home, Building2, Handshake } from 'lucide-react';
import { connectDB } from '@/lib/db';
import HomeInquiry from '@/lib/models/HomeInquiry';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';
import InnovationInquiry from '@/lib/models/InnovationInquiry';

export const dynamic = 'force-dynamic';

const sections = [
  { key: 'home', label: 'Home Page', sub: 'Partner with ICON', href: '/admin/inquiries/home', icon: Home },
  { key: 'industry', label: 'Industry Services', sub: 'Submit a Brief', href: '/admin/inquiries/industry-services', icon: Building2 },
  { key: 'innovation', label: 'Innovation & Collaboration', sub: 'Research Inquiry', href: '/admin/inquiries/innovation-collaboration', icon: Handshake },
] as const;

export default async function InquiriesIndexPage() {
  await connectDB();
  const [homeTotal, homeUnread, industryTotal, industryUnread, innovationTotal, innovationUnread] = await Promise.all([
    HomeInquiry.countDocuments(),
    HomeInquiry.countDocuments({ status: 'new' }),
    IndustryServiceInquiry.countDocuments(),
    IndustryServiceInquiry.countDocuments({ status: 'new' }),
    InnovationInquiry.countDocuments(),
    InnovationInquiry.countDocuments({ status: 'new' }),
  ]);

  const counts: Record<string, { total: number; unread: number }> = {
    home: { total: homeTotal, unread: homeUnread },
    industry: { total: industryTotal, unread: industryUnread },
    innovation: { total: innovationTotal, unread: innovationUnread },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Form Submissions</h1>
        <p className="text-slate-500 text-sm">Each site form stores its submissions in its own dedicated space.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map(({ key, label, sub, href, icon: Icon }) => (
          <Link
            key={key}
            href={href}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6"
          >
            <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-900 text-blue-700 group-hover:text-white rounded-lg flex items-center justify-center mb-4 transition-colors">
              <Icon size={18} />
            </div>
            <div className="text-3xl font-serif text-slate-900 mb-1">{counts[key].total}</div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 text-sm">{label}</span>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">{sub}</span>
              {counts[key].unread > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {counts[key].unread} new
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
