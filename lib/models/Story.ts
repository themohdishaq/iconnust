import mongoose, { Schema, models, model } from 'mongoose';

export interface IStory {
  _id: mongoose.Types.ObjectId;
  name: string;
  tag: string;
  desc: string;
  founder: string;
  funding: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema = new Schema<IStory>(
  {
    name: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
    founder: { type: String, required: true },
    funding: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Story || model<IStory>('Story', StorySchema);
