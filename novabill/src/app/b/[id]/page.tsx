import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/db';
import { Receipt } from '@/models/Receipt';
import { Merchant } from '@/models/Merchant';
import { Store } from '@/models/Store';
import { ReceiptUI } from '@/components/receipt/ReceiptUI';
import { Loader2 } from 'lucide-react';

// 1. The Async Data Fetcher
// This runs purely on the server at request-time, perfectly isolated.
async function DigitalReceiptPayload({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const resolvedParams = await paramsPromise;
  const receiptUuid = resolvedParams.id;

  await connectToDatabase();

  const receiptDoc = await Receipt.findOne({ receiptUuid }).lean();
  
  if (!receiptDoc) {
    notFound();
  }

  const [merchantDoc, storeDoc] = await Promise.all([
    Merchant.findById(receiptDoc.merchantId).lean(),
    Store.findById(receiptDoc.storeId).lean()
  ]);

  if (!merchantDoc || !storeDoc) {
    notFound();
  }

  const receipt = JSON.parse(JSON.stringify(receiptDoc));
  const merchant = JSON.parse(JSON.stringify(merchantDoc));
  const store = JSON.parse(JSON.stringify(storeDoc));

  return <ReceiptUI receipt={receipt} merchant={merchant} store={store} />;
}

// 2. The Static Prerender Shell
// Next.js 16 compiles this instantly without triggering any dynamic blocking errors.
export default function DigitalReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-4 selection:bg-blue-200">
        <Loader2 className="w-10 h-10 animate-spin text-[#1a65ff]" />
        <p className="text-zinc-500 font-bold animate-pulse text-sm tracking-widest uppercase">Retrieving Receipt</p>
      </div>
    }>
      <DigitalReceiptPayload paramsPromise={params} />
    </Suspense>
  );
}
