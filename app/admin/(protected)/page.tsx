import Link from 'next/link';
import { Newspaper, CalendarDays, Award, Users, Inbox, FlaskConical, ArrowRight, Mail, Handshake, CircleHelp } from 'lucide-react';
import News from '@/lib/models/News';
import Event from '@/lib/models/Event';
import Story from '@/lib/models/Story';
import TeamMember from '@/lib/models/TeamMember';
import HomeInquiry from '@/lib/models/HomeInquiry';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';
import InnovationInquiry from '@/lib/models/InnovationInquiry';
import InventionDisclosure from '@/lib/models/InventionDisclosure';
import Subscriber from '@/lib/models/Subscriber';
import Partner from '@/lib/models/Partner';
import Faq from '@/lib/models/Faq';

export const dynamic = 'force-dynamic';

const cards = [
  { key: 'inquiries', label: 'Form Submissions', href: '/admin/inquiries', icon: Inbox },
  { key: 'disclosures', label: 'Invention Disclosures', href: '/admin/disclosures', icon: FlaskConical },
  { key: 'news', label: 'News Articles', href: '/admin/news', icon: Newspaper },
  { key: 'events', label: 'Upcoming Events', href: '/admin/events', icon: CalendarDays },
  { key: 'stories', label: 'Success Stories', href: '/admin/stories', icon: Award },
  { key: 'partners', label: 'Partners', href: '/admin/partners', icon: Handshake },
  { key: 'faqs', label: 'FAQs', href: '/admin/faqs', icon: CircleHelp },
  { key: 'team', label: 'Team Members', href: '/admin/team', icon: Users },
  { key: 'subscribers', label: 'Subscribers', href: '/admin/subscribers', icon: Mail },
] as const;

export default async function AdminDashboardPage() {
  const [newsCount, eventsCount, storiesCount, teamCount, homeInq, industryInq, innovationInq, disclosuresCount, subscribersCount, partnersCount, faqCount] = await Promise.all([
    News.count(),
    Event.count(),
    Story.count(),
    TeamMember.count(),
    HomeInquiry.count(),
    IndustryServiceInquiry.count(),
    InnovationInquiry.count(),
    InventionDisclosure.count(),
    Subscriber.count(),
    Partner.count(),
    Faq.count(),
  ]);
  const inquiriesCount = homeInq + industryInq + innovationInq;

  const counts: Record<string, number> = {
    news: newsCount,
    events: eventsCount,
    stories: storiesCount,
    team: teamCount,
    inquiries: inquiriesCount,
    disclosures: disclosuresCount,
    subscribers: subscribersCount,
    partners: partnersCount,
    faqs: faqCount,
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-1">Dashboard</h1>
      <p className="text-slate-500 text-sm mb-8">Manage news, events, success stories, and team content for the site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ key, label, href, icon: Icon }) => (
          <Link
            key={key}
            href={href}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6"
          >
            <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-900 text-blue-700 group-hover:text-white rounded-lg flex items-center justify-center mb-4 transition-colors">
              <Icon size={18} />
            </div>
            <div className="text-3xl font-serif text-slate-900 mb-1">{counts[key]}</div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">{label}</span>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
