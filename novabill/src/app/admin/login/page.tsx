'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Fingerprint, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  return (
    <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Background Graphic Element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,101,255,0.15),transparent_50%)]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-sm bg-zinc-950/50 backdrop-blur-2xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-10 shadow-inner">
          <Fingerprint className="w-8 h-8 text-[#1a65ff]" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Secure Portal</h1>
        <p className="text-sm text-zinc-500 font-medium mb-10">Authorized personnel only. Passkey verification required.</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Portal Key</label>
            <Input 
              type="password" 
              placeholder="••••••••••••" 
              className="bg-zinc-900 border-zinc-800 text-white rounded-xl h-14 px-5 focus-visible:ring-1 focus-visible:ring-[#1a65ff] focus-visible:ring-offset-0 placeholder:text-zinc-700"
            />
          </div>

          <Button className="w-full h-14 rounded-xl bg-[#1a65ff] hover:bg-blue-600 text-white font-bold text-lg flex items-center justify-between px-6 transition-all group">
            Authenticate
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-10 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          Zero-Trust Environment • IPv4 Logged
        </div>
      </motion.div>
    </main>
  );
}
