import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Receipt } from '@/models/Receipt';
import { Merchant } from '@/models/Merchant';
import { Store } from '@/models/Store';
import { ReceiptUI } from '@/components/receipt/ReceiptUI';

export default async function DigitalReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  // Opt into dynamic rendering safely in Next.js 15/16
  await connection();

  const resolvedParams = await params;
  const receiptUuid = resolvedParams.id;

  await connectToDatabase();

  // 1. Fetch the receipt
  const receiptDoc = await Receipt.findOne({ receiptUuid }).lean();
  
  if (!receiptDoc) {
    notFound(); 
  }

  // 2. Fetch the associated tenant data
  const [merchantDoc, storeDoc] = await Promise.all([
    Merchant.findById(receiptDoc.merchantId).lean(),
    Store.findById(receiptDoc.storeId).lean()
  ]);

  if (!merchantDoc || !storeDoc) {
    notFound();
  }

  // 3. Serialize data to pass safely to the Client Component
  const receipt = JSON.parse(JSON.stringify(receiptDoc));
  const merchant = JSON.parse(JSON.stringify(merchantDoc));
  const store = JSON.parse(JSON.stringify(storeDoc));

  return <ReceiptUI receipt={receipt} merchant={merchant} store={store} />;
}
