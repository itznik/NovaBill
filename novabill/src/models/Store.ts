import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStore extends Document {
  merchantId: Types.ObjectId;
  name: string; // e.g., 'Andheri East Branch'
  storeCode: string; // Internal POS code
  address: string;
  isActive: boolean;
}

const StoreSchema = new Schema<IStore>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
    name: { type: String, required: true },
    storeCode: { type: String, required: true },
    address: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Compound index to ensure store codes are unique only within their own merchant
StoreSchema.index({ merchantId: 1, storeCode: 1 }, { unique: true });

export const Store = mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
