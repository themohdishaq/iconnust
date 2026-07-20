import { notFound } from 'next/navigation';
import TeamMember from '@/lib/models/TeamMember';
import TeamMemberForm from '../../_components/TeamMemberForm';
import { updateTeamMemberAction } from '../../actions';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await TeamMember.findById(id);

  if (!member) notFound();

  const boundAction = updateTeamMemberAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">Edit Team Member</h1>
      <TeamMemberForm
        action={boundAction}
        initial={{
          name: member.name,
          title: member.title,
          dept: member.dept,
          bio: member.bio,
          email: member.email,
          focus: member.focus,
          image: member.image,
          order: member.order,
        }}
      />
    </div>
  );
}
