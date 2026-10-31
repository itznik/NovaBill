'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 flex justify-between items-center bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-4"
    >
      <div className="font-extrabold text-2xl tracking-tighter text-zinc-900 flex items-center gap-2">
        <div className="w-3 h-3 bg-[#1a65ff] rounded-full animate-pulse"></div>
        NovaBill.
      </div>
      <div className="hidden md:flex gap-8 font-bold text-sm text-zinc-500">
        <a href="#ecosystem" className="hover:text-zinc-900 transition-colors">Ecosystem</a>
        <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
      </div>
      <Button className="rounded-full bg-[#1a65ff] text-white hover:bg-blue-700 px-8 py-5 text-sm font-bold shadow-lg transition-transform hover:scale-105">
        Merchant Login
      </Button>
    </motion.div>
  );
}
