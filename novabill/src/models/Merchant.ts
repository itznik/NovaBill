import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchant extends Document {
  name: string;
  slug: string; // Unique URL identifier (e.g., 'bwc')
  tier: 'free' | 'pro' | 'enterprise';
  isActive: boolean;
  branding: {
    logoUrl?: string;
    primaryColor: string;
  };
}

const MerchantSchema = new Schema<IMerchant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    tier: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'pro' },
    isActive: { type: Boolean, default: true },
    branding: {
      logoUrl: String,
      primaryColor: { type: String, default: '#1a65ff' },
    },
  },
  { timestamps: true }
);

export const Merchant = mongoose.models.Merchant || mongoose.model<IMerchant>('Merchant', MerchantSchema);
