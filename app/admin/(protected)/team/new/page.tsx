import TeamMemberForm from '../_components/TeamMemberForm';
import { createTeamMemberAction } from '../actions';

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif text-slate-900 mb-8">New Team Member</h1>
      <TeamMemberForm action={createTeamMemberAction} />
    </div>
  );
}
