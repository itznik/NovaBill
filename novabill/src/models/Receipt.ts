import mongoose, { Schema, Document, Types } from 'mongoose';

interface ILineItem {
  name: string;
  quantity: number;
  price: number; // Price per unit
  total: number;
}

export interface IReceipt extends Document {
  merchantId: Types.ObjectId;
  storeId: Types.ObjectId;
  customerId?: Types.ObjectId; // Optional: Anonymous checkouts
  receiptUuid: string; // The unguessable URL ID (e.g., '1d929ec')
  posOrderId: string; // ID from the physical POS system
  subtotal: number;
  tax: number;
  grandTotal: number;
  items: ILineItem[];
  customerFeedback?: number; // 1-5 star rating
}

const ReceiptSchema = new Schema<IReceipt>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    receiptUuid: { type: String, required: true, unique: true },
    posOrderId: { type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    customerFeedback: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// High-performance compound indexes for dashboard analytics
ReceiptSchema.index({ merchantId: 1, createdAt: -1 });
ReceiptSchema.index({ merchantId: 1, storeId: 1, createdAt: -1 });

export const Receipt = mongoose.models.Receipt || mongoose.model<IReceipt>('Receipt', ReceiptSchema);
