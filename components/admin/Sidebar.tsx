'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Newspaper, CalendarDays, Award, Users, LogOut, Settings, Inbox, FlaskConical,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/inquiries', label: 'Form Submissions', icon: Inbox },
  { href: '/admin/disclosures', label: 'Invention Disclosures', icon: FlaskConical },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/events', label: 'Events', icon: CalendarDays },
  { href: '/admin/stories', label: 'Success Stories', icon: Award },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({
  email,
  badges = {},
}: {
  email: string;
  badges?: Record<string, number>;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="font-serif text-lg">ICON-NUST</div>
        <div className="text-slate-400 text-xs mt-0.5">Admin Dashboard</div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname === href || pathname?.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-blue-900 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {(badges[href] ?? 0) > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {badges[href]}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 py-2 text-xs text-slate-400 truncate">{email}</div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
