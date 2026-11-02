import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  merchantId: Types.ObjectId;
  phone: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
    phone: { type: String, required: true },
    totalSpent: { type: Number, default: 0 },
    visitCount: { type: Number, default: 0 },
    lastVisit: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// A phone number should only appear once per merchant
CustomerSchema.index({ merchantId: 1, phone: 1 }, { unique: true });

export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
