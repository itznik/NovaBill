'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Wallet, ArrowDownToLine, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReceiptUI({ receipt, merchant, store }: any) {
  const [rating, setRating] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulated Apple Wallet / Download interaction
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-canvas-grid bg-zinc-50 flex flex-col items-center py-10 px-4 font-sans selection:bg-blue-200">
      
      {/* The Digital Ticket */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-zinc-200 overflow-hidden relative z-10"
      >
        {/* Merchant Header */}
        <div className="bg-zinc-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#1a65ff] rounded-full blur-3xl opacity-50"></div>
          <h1 className="text-3xl font-extrabold tracking-tighter relative z-10">{merchant.name}</h1>
          <p className="text-zinc-400 font-medium text-sm mt-1 relative z-10">{store.name}</p>
        </div>

        {/* Transaction Meta */}
        <div className="p-6 border-b border-dashed border-zinc-200 bg-zinc-50 flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <div>{new Date(receipt.createdAt).toLocaleDateString()}</div>
          <div>#{receipt.posOrderId}</div>
        </div>

        {/* Itemized List */}
        <div className="p-6 space-y-4">
          {receipt.items.map((item: any, i: number) => (
            <div key={i} className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="text-zinc-900 font-bold bg-zinc-100 px-2 py-0.5 rounded text-sm">{item.quantity}x</div>
                <div className="text-zinc-700 font-bold">{item.name}</div>
              </div>
              <div className="text-zinc-900 font-bold">${item.total.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="p-6 bg-zinc-50 border-t border-dashed border-zinc-200 space-y-2">
          <div className="flex justify-between text-zinc-500 font-bold text-sm">
            <span>Subtotal</span>
            <span>${receipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-500 font-bold text-sm">
            <span>Tax</span>
            <span>${receipt.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-900 font-extrabold text-2xl mt-4 pt-4 border-t border-zinc-200">
            <span>Total</span>
            <span>${receipt.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Rating Module */}
        <div className="p-8 border-t border-zinc-100 text-center bg-white">
          <h3 className="text-zinc-900 font-bold tracking-tight mb-4">How was your experience?</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
              >
                <Star className={`w-8 h-8 ${rating && rating >= star ? 'text-[#1a65ff] fill-[#1a65ff]' : 'text-zinc-200 fill-zinc-200'}`} />
              </button>
            ))}
          </div>
          <AnimatePresence>
            {rating && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 text-xs font-bold text-green-600 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Feedback captured
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="w-full max-w-md mt-6 space-y-3 relative z-20"
      >
        <Button className="w-full rounded-2xl bg-black hover:bg-zinc-800 text-white py-7 text-lg font-bold shadow-xl flex items-center justify-center gap-3">
          <Wallet className="w-5 h-5" /> Add to Apple Wallet
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleDownload} variant="outline" className="w-full rounded-2xl bg-white border-2 border-zinc-200 text-zinc-800 py-6 font-bold flex items-center justify-center gap-2">
            {isDownloading ? <span className="animate-pulse">Saving...</span> : <><ArrowDownToLine className="w-4 h-4" /> Download PDF</>}
          </Button>
          <Button variant="outline" className="w-full rounded-2xl bg-green-50 border-2 border-green-200 text-green-700 hover:bg-green-100 py-6 font-bold flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
