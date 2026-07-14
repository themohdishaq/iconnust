import { connectDB } from '@/lib/db';
import TeamMember from '@/lib/models/TeamMember';
import TeamPageClient from './_components/TeamPageClient';

export const revalidate = 60;

export default async function TeamPage() {
  await connectDB();
  const members = await TeamMember.find().sort({ order: 1, createdAt: -1 }).lean();

  const leadership = members.map((m) => ({
    id: m._id.toString(),
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
