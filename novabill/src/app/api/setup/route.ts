import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { Merchant } from '@/models/Merchant';
import { Store } from '@/models/Store';
import { AdminUser } from '@/models/AdminUser';
import { Customer } from '@/models/Customer';
import { Receipt } from '@/models/Receipt';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Check if an admin already exists to prevent accidental overwrites
    const existingAdmin = await AdminUser.findOne({ email: 'admin@novabill.com' });
    if (existingAdmin) {
      return NextResponse.json({ message: 'System is already initialized.' }, { status: 400 });
    }

    // 2. Create the Merchant (Tenant)
    const merchant = await Merchant.create({
      name: 'Belgian Waffle Co.',
      slug: 'bwc',
      tier: 'enterprise',
      branding: { primaryColor: '#1a65ff' }
    });

    // 3. Create a Store Location
    const store = await Store.create({
      merchantId: merchant._id,
      name: 'Andheri East Branch',
      storeCode: 'BWC-AND-01',
      address: '123 Tech Park, Andheri, Mumbai'
    });

    // 4. Create the Admin User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    await AdminUser.create({
      merchantId: merchant._id,
      email: 'admin@novabill.com',
      passwordHash,
      role: 'owner'
    });

    // 5. Seed Mock Customers & Receipts for Dashboard Telemetry
    const customer = await Customer.create({
      merchantId: merchant._id,
      phone: '+1234567890',
      totalSpent: 45.00,
      visitCount: 2
    });

    await Receipt.create([
      {
        merchantId: merchant._id,
        storeId: store._id,
        customerId: customer._id,
        receiptUuid: nanoid(8),
        posOrderId: 'POS-9921',
        subtotal: 12.50,
        tax: 2.50,
        grandTotal: 15.00,
        items: [{ name: 'Hazelnut Waffle', quantity: 1, price: 12.50, total: 12.50 }]
      },
      {
        merchantId: merchant._id,
        storeId: store._id,
        receiptUuid: nanoid(8),
        posOrderId: 'POS-9922',
        subtotal: 25.00,
        tax: 5.00,
        grandTotal: 30.00,
        items: [{ name: 'Dark Chocolate Shake', quantity: 2, price: 12.50, total: 25.00 }]
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      message: 'Environment seeded successfully.',
      credentials: {
        email: 'admin@novabill.com',
        password: 'admin123'
      }
    });

  } catch (error: any) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
  }
}
