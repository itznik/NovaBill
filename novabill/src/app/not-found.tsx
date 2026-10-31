'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Receipt, MousePointer2 } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas-grid bg-white selection:bg-blue-200 flex flex-col items-center justify-center">
      <Navbar />
      
      <motion.div animate={{ y: [0, -15, 0], rotate: [-10, -5, -10] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-1/4 left-1/4 z-10 opacity-50">
        <Receipt className="w-32 h-32 text-zinc-200" />
      </motion.div>

      <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-1/3 right-1/4 z-30 hidden md:block">
        <MousePointer2 className="w-8 h-8 text-zinc-900 fill-zinc-900 -rotate-12 drop-shadow-md" />
        <div className="bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">Lost User</div>
      </motion.div>

      <div className="z-40 text-center max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-[12rem] font-extrabold tracking-tighter text-zinc-900 leading-none mb-4">
          <span className="relative inline-block">
             404
             <div className="absolute -inset-y-2 -inset-x-6 bg-[#1a65ff]/10 -z-10 border-[3px] border-[#1a65ff]">
               <div className="absolute -left-2 -top-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
               <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-[#1a65ff] rounded-full border-2 border-white"></div>
             </div>
          </span>
        </h1>
        
        <p className="text-2xl text-zinc-500 font-bold mb-10 mt-8">
          Looks like this receipt is missing from the database.
        </p>

        <Link href="/">
          <Button className="rounded-full bg-[#1a65ff] hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold shadow-xl transition-all hover:scale-105">
            Return to ecosystem
          </Button>
        </Link>
      </div>
    </main>
  );
}
