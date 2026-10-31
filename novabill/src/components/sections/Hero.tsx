'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MousePointer2, Receipt, LineChart, User2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-48 pb-40 flex flex-col items-center justify-center px-4 min-h-[90vh] bg-canvas-grid overflow-hidden">
      
      {/* Background Floating Element 1: Analytics Card */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-32 left-[5%] md:left-[15%] z-10 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 w-56 hidden md:block"
      >
        <div className="flex gap-2 items-center mb-3 text-xs font-bold text-zinc-400">
          <LineChart className="w-4 h-4 text-orange-500" /> Revenue Spike
        </div>
        <div className="flex items-end gap-1 h-16">
          {[30, 50, 40, 80, 60, 100, 70].map((h, i) => (
            <div key={i} className="w-full bg-[#1a65ff]/20 rounded-t-sm" style={{ height: `${h}%` }}>
              <div className="w-full bg-[#1a65ff] rounded-t-sm" style={{ height: '40%' }}></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Background Floating Element 2: Customer Profile */}
      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [8, 12, 8] }} 
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 right-[5%] md:right-[15%] z-20 bg-white p-4 rounded-3xl shadow-2xl border border-zinc-100 w-48 hidden md:flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3">
          <User2 className="w-8 h-8 text-pink-500" />
        </div>
        <div className="text-sm font-bold text-zinc-900">Returning Customer</div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">LTV: $450.00</div>
      </motion.div>

      {/* Floating Cursors */}
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-1/3 right-1/4 z-30">
        <MousePointer2 className="w-7 h-7 text-pink-500 fill-pink-500 -rotate-12 drop-shadow-md" />
        <div className="bg-pink-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">Marketer</div>
      </motion.div>

      <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 0.5 }} className="absolute bottom-1/3 left-1/4 z-30">
        <MousePointer2 className="w-7 h-7 text-orange-500 fill-orange-500 -rotate-12 drop-shadow-md" />
        <div className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">Store Manager</div>
      </motion.div>

      {/* Main Content */}
      <div className="z-40 text-center max-w-5xl mx-auto flex flex-col items-center mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-7xl md:text-[9rem] font-extrabold tracking-tighter text-zinc-900 mb-8 leading-[0.85] flex flex-col items-center"
        >
          <span>Billing that</span>
          <span className="relative inline-block mt-4">
             loves data.
             {/* The Graphic Designer Blue Selection Box */}
             <div className="absolute -inset-y-2 -inset-x-6 bg-[#1a65ff]/10 -z-10 border-[3px] border-[#1a65ff]">
               <div className="absolute -left-2 -top-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
               <div className="absolute -right-2 -top-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
               <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
               <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
             </div>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl mb-12 leading-relaxed"
        >
          We transform static paper receipts into a high-quality, functional retention engine that aligns with your growth goals.
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Button className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:-translate-y-1">
            Let's build an ecosystem
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
