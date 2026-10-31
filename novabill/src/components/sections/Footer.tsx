'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MousePointer2 } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState<number | string>("...");
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="bg-[#1a65ff] pt-32 pb-12 px-4 md:px-12 overflow-hidden relative rounded-t-[3rem] mt-[-2rem] z-40 text-white">
      
      {/* Floating Elements on Footer */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-20 right-1/4 hidden md:block">
        <MousePointer2 className="w-8 h-8 text-yellow-300 fill-yellow-300 -rotate-12 drop-shadow-lg" />
        <div className="bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-sm absolute top-7 left-6 shadow-md">Support</div>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-10 leading-tight">
          Ready to turn every <br/> transaction into a relationship?
        </h2>
        
        <Button className="rounded-full bg-white text-[#1a65ff] hover:bg-zinc-100 px-12 py-8 text-xl font-bold shadow-2xl transition-transform hover:scale-105 mb-24">
          Let's talk
        </Button>

        <h2 className="text-[18vw] md:text-[14rem] font-extrabold tracking-tighter text-white/90 leading-none mb-12 select-none">
          NovaBill.
        </h2>
        
        <div className="w-full h-px bg-white/20 mb-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-white/70 font-medium text-sm md:text-base">
          <p>© {year} NovaBill Enterprise.</p>
          <div className="flex gap-8 font-bold">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
