import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Receipt } from '@/models/Receipt';
import { Merchant } from '@/models/Merchant';
import { Store } from '@/models/Store';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // In a real scenario, the POS sends an API Key. 
    // For this demo, we auto-assign it to your first Merchant (Belgian Waffle Co.)
    const merchant = await Merchant.findOne();
    const store = await Store.findOne({ merchantId: merchant._id });

    if (!merchant || !store) {
      return NextResponse.json({ error: 'System not seeded. Run /api/setup first.' }, { status: 400 });
    }

    // Calculate totals automatically
    const subtotal = body.items.reduce((sum: number, item: any) => sum + item.total, 0);
    const tax = subtotal * 0.10; // 10% Tax
    const grandTotal = subtotal + tax;
    
    // Generate the secure short-link ID
    const receiptUuid = nanoid(8);

    // Save to Database
    await Receipt.create({
      merchantId: merchant._id,
      storeId: store._id,
      receiptUuid,
      posOrderId: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      subtotal,
      tax,
      grandTotal,
      items: body.items,
    });

    // Return the live URL to the POS so it can be SMS'd to the customer
    return NextResponse.json({ 
      success: true, 
      url: `/b/${receiptUuid}`,
      message: 'Receipt generated successfully'
    });

  } catch (error: any) {
    console.error('POS Ingestion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
