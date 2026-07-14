import mongoose, { Schema, models, model } from 'mongoose';

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  location: string;
  desc: string;
  registered: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    desc: { type: String, required: true },
    registered: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Event || model<IEvent>('Event', EventSchema);
