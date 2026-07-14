import mongoose, { Schema, models, model, type Model } from 'mongoose';

export interface IInquiry {
  _id: mongoose.Types.ObjectId;
  organization: string;
  email: string;
  domain: string;
  message: string;
  status: 'new' | 'read';
  createdAt: Date;
  updatedAt: Date;
}

const schemaDefinition = {
  organization: { type: String, required: true, trim: true, maxlength: 200 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  domain: { type: String, trim: true, maxlength: 200, default: '' },
  message: { type: String, trim: true, maxlength: 4000, default: '' },
  status: { type: String, enum: ['new', 'read'] as const, default: 'new' as const },
};

/**
 * Each inquiry form (Home / Industry Services / Innovation & Collaboration)
 * gets its own dedicated MongoDB collection rather than a shared, source-tagged one.
 */
export function getInquiryModel(modelName: string, collectionName: string): Model<IInquiry> {
  if (models[modelName]) return models[modelName] as Model<IInquiry>;
  const schema = new Schema<IInquiry>(schemaDefinition, { timestamps: true });
  return model<IInquiry>(modelName, schema, collectionName);
}
