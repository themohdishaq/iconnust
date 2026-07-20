import type { Metadata } from 'next';
import TeamMember from '@/lib/models/TeamMember';
import TeamPageClient from './_components/TeamPageClient';
import { SITE_NAME } from '@/lib/seo';

export const revalidate = 60;

const title = 'Leadership Team';
const description =
  "Meet the leadership and faculty driving ICON's mission to connect NUST research with industry through commercialization, IP, and R&D partnerships.";

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

export default async function TeamPage() {
  const members = await TeamMember.list();

  const leadership = members.map((m) => ({
    id: m.id.toString(),
    name: m.name,
    title: m.title,
    dept: m.dept,
    bio: m.bio,
    focus: m.focus,
    img: m.image,
    email: m.email,
  }));

  return <TeamPageClient leadership={leadership} />;
}
