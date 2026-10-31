'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Receipt, MousePointer2 } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-40 px-4 md:px-12 bg-white relative overflow-hidden">
      
      {/* Floating Client Cursor */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-32 left-[45%] z-40 hidden md:block">
        <MousePointer2 className="w-8 h-8 text-orange-500 fill-orange-500 -rotate-12 drop-shadow-md" />
        <div className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm uppercase tracking-widest">Client</div>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center relative z-10">
        
        {/* Pricing Copy */}
        <div className="flex-1">
          <h2 className="text-6xl md:text-[6rem] font-extrabold tracking-tighter text-zinc-900 mb-8 leading-[0.85]">
            Simple pricing.<br/>
            <span className="text-[#1a65ff]">Unlimited data.</span>
          </h2>
          <p className="text-2xl text-zinc-500 font-bold mb-12 max-w-lg leading-relaxed">
            Stop paying per receipt. One flat fee per franchise location to unlock the entire retention engine.
          </p>
          
          <ul className="space-y-6 mb-8">
            {[
              'Unlimited Digital Receipts', 
              'Real-time Analytics Dashboard', 
              'WhatsApp & SMS Delivery API', 
              '1-Year Historical Data Storage'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-5 text-zinc-900 font-extrabold text-xl tracking-tight">
                <CheckCircle2 className="w-8 h-8 text-green-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Artboard/Canvas Styled Pricing Card */}
        <div className="flex-1 w-full max-w-lg relative">
          
          {/* Floating UI near the card */}
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -top-12 -left-12 bg-white border border-zinc-200 shadow-xl rounded-2xl p-4 flex items-center gap-3 z-30 rotate-[-6deg]">
             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Receipt className="w-5 h-5 text-green-600"/></div>
             <div>
               <div className="text-sm font-bold text-zinc-900">Invoice Paid</div>
               <div className="text-xs font-bold text-zinc-400">Just now</div>
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
            className="bg-zinc-50 p-12 rounded-none border-[3px] border-[#1a65ff] shadow-[0_30px_60px_rgb(0,0,0,0.1)] relative z-20"
          >
            {/* Canvas Artboard Selection Handles */}
            <div className="absolute -left-2 -top-2 w-4 h-4 bg-white border-[3px] border-[#1a65ff] rounded-sm"></div>
            <div className="absolute -right-2 -top-2 w-4 h-4 bg-white border-[3px] border-[#1a65ff] rounded-sm"></div>
            <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-white border-[3px] border-[#1a65ff] rounded-sm"></div>
            <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-white border-[3px] border-[#1a65ff] rounded-sm"></div>

            <div className="text-zinc-500 font-extrabold mb-4 uppercase tracking-[0.2em] text-sm">Pro Tier • Per Store</div>
            <div className="text-[8rem] font-extrabold tracking-tighter text-zinc-900 mb-8 leading-none relative inline-block">
              $49
            </div>
            <Button className="w-full rounded-none bg-[#1a65ff] hover:bg-blue-700 text-white py-8 text-xl font-bold shadow-xl mb-6">
              Deploy SaaS Today
            </Button>
            <div className="text-center text-sm text-zinc-500 font-bold">Cancel anytime. No POS hardware required.</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
