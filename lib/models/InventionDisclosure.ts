import mongoose, { Schema, models, model } from 'mongoose';

export type DisclosureStatus = 'pending' | 'approved' | 'rejected';
export type DisclosureSource = 'idf-modal' | 'quick-form';

export interface IInventionDisclosure {
  _id: mongoose.Types.ObjectId;
  source: DisclosureSource;
  inventionTitle: string;
  domain: string;
  inventorNames: string;
  department: string;
  studentOrEmployeeId: string;
  contactEmail: string;
  contactPhone: string;
  conceptionDate: string;
  description: string;
  novelty: string;
  applications: string;
  fundingSource: string;
  priorDisclosure: 'yes' | 'no';
  priorDisclosureDetails: string;
  status: DisclosureStatus;
  // Set by admin on approval — drives the public "Available for Commercialization" card.
  displayStatus: string;
  trl: string;
  createdAt: Date;
  updatedAt: Date;
}

const InventionDisclosureSchema = new Schema<IInventionDisclosure>(
  {
    source: { type: String, enum: ['idf-modal', 'quick-form'], required: true },
    inventionTitle: { type: String, required: true, trim: true, maxlength: 300 },
    domain: { type: String, trim: true, maxlength: 200, default: '' },
    inventorNames: { type: String, trim: true, maxlength: 300, default: '' },
    department: { type: String, trim: true, maxlength: 200, default: '' },
    studentOrEmployeeId: { type: String, trim: true, maxlength: 100, default: '' },
    contactEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    contactPhone: { type: String, trim: true, maxlength: 50, default: '' },
    conceptionDate: { type: String, trim: true, maxlength: 50, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    novelty: { type: String, trim: true, maxlength: 4000, default: '' },
    applications: { type: String, trim: true, maxlength: 4000, default: '' },
    fundingSource: { type: String, trim: true, maxlength: 300, default: '' },
    priorDisclosure: { type: String, enum: ['yes', 'no'], default: 'no' },
    priorDisclosureDetails: { type: String, trim: true, maxlength: 2000, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    displayStatus: { type: String, trim: true, maxlength: 100, default: '' },
    trl: { type: String, trim: true, maxlength: 20, default: '' },
  },
  { timestamps: true }
);

export default models.InventionDisclosure || model<IInventionDisclosure>('InventionDisclosure', InventionDisclosureSchema);
