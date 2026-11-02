'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Wallet, Star, Sparkles, CheckCircle2, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReceiptUI({ receipt, merchant, store }: any) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [aiOffer, setAiOffer] = useState<{offer: string, code: string} | null>(null);

  // Mocking the AI offer for UI testing
  useEffect(() => {
    setAiOffer({
      offer: "Here's 15% off your next visit!",
      code: "VIP-15"
    });
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    const pythonUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'http://localhost:8000';
    window.open(`${pythonUrl}/api/engine/pdf/${receipt.receiptUuid}`, '_blank');
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center py-8 px-4 font-sans sm:py-12">
      
      {/* 
        The Physical Receipt Paper 
        Single continuous block, white, heavy shadow, serrated bottom edge
      */}
      <motion.div 
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ perspective: 1000 }}
        className="w-full max-w-[400px] relative z-10 drop-shadow-2xl"
      >
        <div className="bg-white rounded-t-3xl overflow-hidden">
          
          {/* Colorful Brand Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-white/30">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight relative z-10">{merchant.name}</h1>
            <p className="text-blue-100 font-medium text-sm mt-1 relative z-10">{store.name}</p>
          </div>

          {/* Receipt Metadata */}
          <div className="px-6 py-5 bg-blue-50/50 flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-widest border-b-2 border-dashed border-zinc-200">
            <div>{new Date(receipt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            <div className="text-indigo-600">Order #{receipt.posOrderId}</div>
          </div>

          {/* Line Items */}
          <div className="px-6 py-6 space-y-4">
            {receipt.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="text-indigo-700 font-extrabold bg-indigo-100 px-2 py-0.5 rounded-md text-xs">
                    {item.quantity}x
                  </div>
                  <div className="text-zinc-800 font-semibold text-sm">{item.name}</div>
                </div>
                <div className="text-zinc-800 font-bold text-sm">${item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Financial Totals */}
          <div className="px-6 py-6 bg-zinc-50 border-y-2 border-dashed border-zinc-200 space-y-3">
            <div className="flex justify-between text-zinc-500 font-medium text-sm">
              <span>Subtotal</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-500 font-medium text-sm">
              <span>Tax (10%)</span>
              <span>${receipt.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-zinc-200">
              <span className="text-zinc-900 font-bold text-lg">Total Paid</span>
              <span className="text-3xl font-black text-indigo-600">${receipt.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Colorful Embedded AI Upsell */}
          <AnimatePresence>
            {aiOffer && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="mx-6 my-6 p-5 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-orange-200 text-center relative overflow-hidden"
              >
                <div className="flex justify-center items-center gap-1 text-orange-600 font-extrabold text-xs uppercase tracking-widest mb-2">
                  <Sparkles className="w-4 h-4" /> Special Reward
                </div>
                <div className="text-orange-950 font-bold text-base leading-tight mb-3">
                  {aiOffer.offer}
                </div>
                <div className="inline-block bg-white border-2 border-dashed border-orange-400 text-orange-600 font-black tracking-widest px-4 py-2 rounded-xl text-sm">
                  {aiOffer.code}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review System Integrated into Paper */}
          <div className="px-6 pb-8 pt-4 text-center border-t-2 border-dashed border-zinc-200">
            <h3 className="text-zinc-800 font-bold text-sm mb-4">Rate your experience</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                >
                  <Star className={`w-8 h-8 ${rating && rating >= star ? 'text-amber-400 fill-amber-400' : 'text-zinc-200 fill-zinc-200'}`} />
                </button>
              ))}
            </div>
            <AnimatePresence>
              {rating && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 text-xs font-bold text-green-600 flex items-center justify-center gap-1 bg-green-50 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for your feedback!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fake Barcode for authentic feel */}
          <div className="px-6 pb-6 pt-2 flex justify-center opacity-40">
            <div className="h-10 w-full flex gap-[2px] justify-center items-center">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="bg-black h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
              ))}
            </div>
          </div>

          {/* Action Buttons Embedded at bottom */}
          <div className="px-4 pb-6 pt-2 grid grid-cols-2 gap-3">
            <Button onClick={handleDownload} variant="outline" className="h-12 rounded-xl border-2 border-zinc-200 text-zinc-700 font-bold flex gap-2">
              {isDownloading ? <span className="animate-pulse">Generating...</span> : <><Download className="w-4 h-4" /> Get PDF</>}
            </Button>
            <Button className="h-12 rounded-xl bg-black text-white hover:bg-zinc-800 font-bold flex gap-2">
              <Wallet className="w-4 h-4" /> Apple Wallet
            </Button>
          </div>

        </div>

        {/* CSS Trick for the serrated zig-zag receipt bottom */}
        <div 
          className="h-4 w-full bg-white relative -top-1"
          style={{
            backgroundImage: 'radial-gradient(circle at 10px 10px, transparent 10px, white 11px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '-10px -10px',
            transform: 'rotate(180deg)'
          }}
        />
      </motion.div>
    </main>
  );
}
