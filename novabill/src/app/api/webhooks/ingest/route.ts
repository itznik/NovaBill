import { NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { connectToDatabase } from '@/lib/db';
import { Merchant } from '@/models/Merchant';
import { Store } from '@/models/Store';
import { Customer } from '@/models/Customer';
import { Receipt } from '@/models/Receipt';

// 1. Zod Schema: Define the exact shape of the expected POS payload
const POSPayloadSchema = z.object({
  merchantId: z.string().min(1, "Merchant ID is required"),
  storeCode: z.string().min(1, "Store code is required"),
  posOrderId: z.string().min(1, "POS Order ID is required"),
  customerPhone: z.string().optional(),
  subtotal: z.number().min(0),
  tax: z.number().min(0),
  grandTotal: z.number().min(0),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
    total: z.number().min(0),
  })).min(1, "Receipt must have at least one item")
});

export async function POST(req: Request) {
  try {
    // 2. Safely parse the incoming JSON (Catches malformed JSON)
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload format' }, { status: 400 });
    }

    // 3. Strict Payload Validation (Catches missing or wrong data types)
    const validation = POSPayloadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation Failed', 
        details: validation.error.format() 
      }, { status: 400 });
    }

    const data = validation.data;

    // 4. Ensure Database Connection (Catches DB timeouts gracefully)
    await connectToDatabase();

    // 5. Verify Tenant & Location Existence
    const [merchant, store] = await Promise.all([
      Merchant.findById(data.merchantId).lean(),
      Store.findOne({ merchantId: data.merchantId, storeCode: data.storeCode }).lean()
    ]);

    if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    if (!store) return NextResponse.json({ error: 'Store not found for this merchant' }, { status: 404 });

    // 6. Handle Customer Profile (Atomic Upsert prevents race conditions)
    let customerId = null;
    if (data.customerPhone) {
      const customer = await Customer.findOneAndUpdate(
        { merchantId: merchant._id, phone: data.customerPhone },
        { 
          $inc: { totalSpent: data.grandTotal, visitCount: 1 },
          $set: { lastVisit: new Date() }
        },
        { new: true, upsert: true } // Creates them if they don't exist, updates if they do
      );
      customerId = customer._id;
    }

    // 7. Generate Short URL ID and Create Receipt
    const receiptUuid = nanoid(8); // Generates a secure 8-character ID (e.g., 'a3b9Xq2m')
    
    const receipt = await Receipt.create({
      merchantId: merchant._id,
      storeId: store._id,
      customerId,
      receiptUuid,
      posOrderId: data.posOrderId,
      subtotal: data.subtotal,
      tax: data.tax,
      grandTotal: data.grandTotal,
      items: data.items
    });

    // 8. Return Success Payload with the public URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.json({
      success: true,
      message: 'Receipt ingested successfully',
      receiptUrl: `${appUrl}/b/${receiptUuid}`,
      receiptId: receipt._id
    }, { status: 201 });

  } catch (error: any) {
    // 9. Global Error Boundary (Prevents API crashes on unexpected server faults)
    console.error('🔴 Webhook Ingestion Error:', error.message);
    
    // Check for duplicate key error (e.g., POS sending the same receipt twice)
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Duplicate receipt entry detected' }, { status: 409 });
    }

    return NextResponse.json({ 
      error: 'Internal Server Error', 
      message: 'The system encountered an unexpected fault while processing the receipt.' 
    }, { status: 500 });
  }
}
