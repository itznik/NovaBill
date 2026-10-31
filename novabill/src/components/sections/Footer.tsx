'use client';

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | string>("...");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white pt-32 pb-12 px-4 md:px-12 border-t border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-[18vw] md:text-[14rem] font-extrabold tracking-tighter text-zinc-900 leading-none mb-12 select-none">
          NovaBill.
        </h2>
        
        <div className="w-full h-px bg-zinc-200 mb-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-zinc-500 font-medium text-sm md:text-base">
          <p>© {year} NovaBill Enterprise.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">System Status</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
