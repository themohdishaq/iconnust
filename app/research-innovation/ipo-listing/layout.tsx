import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NUST Intellectual Property Portfolio',
  description: 'Browse NUST patents, copyrights and industrial designs by IP type and research sector.',
  alternates: {
    canonical: '/research-innovation/ipo-listing',
  },
};

export default function IpoListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}