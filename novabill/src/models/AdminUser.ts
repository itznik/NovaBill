import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAdminUser extends Document {
  merchantId: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: 'owner' | 'manager';
  isActive: boolean;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['owner', 'manager'], default: 'manager' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AdminUser = mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
