import mongoose, { Schema, models, model } from 'mongoose';

export interface INews {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: [String], required: true, default: [] },
    image: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true, default: '3 min' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.News || model<INews>('News', NewsSchema);
