import TeamPageContent from '@/components/team/TeamPageContent';
import TeamMember from '@/lib/models/TeamMember';

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const members = await TeamMember.list();

  return (
    <TeamPageContent
      members={members.map(({ id, name, title, dept, image }) => ({
        id, name, title, dept, image,
      }))}
    />
  );
}
