import mongoose, { Schema, models, model } from 'mongoose';

export interface IAdmin {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin';
  otpCodeHash?: string;
  otpExpiresAt?: Date;
  otpAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, default: 'Admin' },
    role: { type: String, default: 'admin' },
    otpCodeHash: { type: String },
    otpExpiresAt: { type: Date },
    otpAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Admin || model<IAdmin>('Admin', AdminSchema);
