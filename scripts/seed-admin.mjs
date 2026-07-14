import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;
const email = (process.env.SEED_ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD || '';

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI (run with: node --env-file=.env.local scripts/seed-admin.mjs)');
if (!email || !password) throw new Error('Missing SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local');

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, default: 'Admin' },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

await mongoose.connect(MONGODB_URI);

const passwordHash = await bcrypt.hash(password, 10);
const admin = await Admin.findOneAndUpdate(
  { email },
  { email, passwordHash, name: 'Admin', role: 'admin' },
  { upsert: true, returnDocument: 'after' }
);

console.log(`Admin account ready: ${admin.email}`);
console.log('Sign in at /admin/login with the email/password from .env.local, then change the password.');

await mongoose.disconnect();
