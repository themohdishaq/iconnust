import type { Metadata } from "next";
import { SITE_NAME } from '@/lib/seo';

const title = 'News & Success Stories';
const description =
  'Discover the latest developments, success stories, spin-off ventures, and upcoming events from ICON-NUST.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: '/news',
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export const revalidate = 60;

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
