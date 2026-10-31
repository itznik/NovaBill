'use client';

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100">
      <div className="font-extrabold text-2xl tracking-tighter text-zinc-900">NovaBill.</div>
      <div className="hidden md:flex gap-8 font-medium text-sm text-zinc-500">
        <a href="#ecosystem" className="hover:text-zinc-900 transition-colors">Ecosystem</a>
        <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
      </div>
      <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6 py-5 text-sm font-bold shadow-md">
        Merchant Login
      </Button>
    </nav>
  );
}
