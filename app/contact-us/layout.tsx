import type { Metadata } from "next";
import { SITE_NAME } from '@/lib/seo';

const title = 'Contact Us';
const description =
  'Contact the ICON offices at NUST for innovation, intellectual property, industry collaboration, and technology-transfer support.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: '/contact',
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
