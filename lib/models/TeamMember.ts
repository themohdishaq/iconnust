import mongoose, { Schema, models, model } from 'mongoose';

export interface ITeamMember {
  _id: mongoose.Types.ObjectId;
  name: string;
  title: string;
  dept: string;
  bio: string;
  focus: string[];
  image: string;
  email: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    dept: { type: String, required: true },
    bio: { type: String, required: true },
    focus: { type: [String], default: [] },
    image: { type: String, required: true },
    email: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.TeamMember || model<ITeamMember>('TeamMember', TeamMemberSchema);
