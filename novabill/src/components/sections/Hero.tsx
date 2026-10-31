'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MousePointer2 } from "lucide-react";

const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 flex flex-col items-center justify-center px-4 min-h-screen bg-canvas-grid">
      
      {/* Infinite Floating Cursors */}
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 md:left-1/5 -translate-x-12 -translate-y-12 z-20 hidden md:block">
        <MousePointer2 className="w-7 h-7 text-pink-500 fill-pink-500 -rotate-12 drop-shadow-md" />
        <div className="bg-pink-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">UX Designer</div>
      </motion.div>

      <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/3 right-1/4 md:right-1/5 z-20 hidden md:block">
        <MousePointer2 className="w-7 h-7 text-orange-500 fill-orange-500 -rotate-12 drop-shadow-md" />
        <div className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">Customer</div>
      </motion.div>

      <motion.div variants={containerVariant} initial="hidden" animate="show" className="z-30 text-center max-w-4xl mx-auto flex flex-col items-center mt-10">
        
        {/* Version Pill */}
        <motion.div variants={itemVariant} className="mb-6 flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-1.5 rounded-full">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-bold tracking-wide text-zinc-800 uppercase">Version 1.0 Live</span>
        </motion.div>

        {/* Massive Typography */}
        <motion.h1 variants={itemVariant} className="text-6xl md:text-[7.5rem] font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[0.9] flex flex-col items-center">
          <span>Billing that</span>
          <span className="relative inline-block mt-2">
             loves data.
             <div className="absolute -inset-y-1 -inset-x-4 bg-[#1a65ff]/10 -z-10 border-2 border-[#1a65ff]">
               <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-[#1a65ff] rounded-full"></div>
               <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#1a65ff] rounded-full"></div>
             </div>
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariant} className="text-lg md:text-2xl text-zinc-500 font-medium max-w-2xl mb-10 leading-snug">
          We transform your static paper receipts into a high-quality, functional retention engine that aligns with your growth goals.
        </motion.p>

        {/* Action Button */}
        <motion.div variants={itemVariant} className="flex flex-col sm:flex-row gap-4 items-center">
          <Button className="rounded-full bg-[#1a65ff] hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold shadow-xl transition-all hover:scale-105">
            Start building ecosystem
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
