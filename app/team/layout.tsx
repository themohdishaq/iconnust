import type { Metadata } from "next";
import { SITE_NAME } from '@/lib/seo';

const title = 'Leadership Team';
const description =
  "Meet the leadership and faculty driving ICON's mission to connect NUST research with industry through commercialisation, IP, and R&D partnerships.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: '/team',
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
