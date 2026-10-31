'use client';

import { motion } from "framer-motion";
import { MessageSquare, BarChart3, Zap, MousePointer2 } from "lucide-react";

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-40 px-4 md:px-12 max-w-7xl mx-auto bg-canvas-grid relative">
      
      {/* Floating Cursor */}
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-32 left-[10%] z-40 hidden md:block">
        <MousePointer2 className="w-8 h-8 text-purple-500 fill-purple-500 -rotate-12 drop-shadow-md" />
        <div className="bg-purple-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm uppercase tracking-widest">Project Manager</div>
      </motion.div>

      <div className="text-center mb-32 relative z-10">
        <h2 className="text-6xl md:text-[7rem] font-extrabold tracking-tighter text-zinc-900 mb-6 leading-none">
          The <span className="text-[#1a65ff] underline decoration-8 underline-offset-8">Ecosystem</span>
        </h2>
        <p className="text-2xl text-zinc-500 font-bold max-w-2xl mx-auto leading-relaxed">
          More than a digital receipt. A closed-loop environment capturing customer lifetime value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Card 1: Tilted Left */}
        <motion.div 
          initial={{ rotate: -2, y: 0 }} whileHover={{ rotate: 0, y: -10 }} transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-[3rem] p-12 shadow-2xl relative group z-20 md:translate-y-12"
        >
          <div className="w-16 h-16 bg-[#1a65ff]/10 border border-[#1a65ff]/20 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <MessageSquare className="w-7 h-7 text-[#1a65ff]" />
          </div>
          <h3 className="text-4xl font-extrabold tracking-tight mb-4 text-zinc-900">WhatsApp Engine</h3>
          <p className="text-zinc-500 font-bold mb-12 text-lg leading-relaxed">
            Send receipts, capture 1-tap ratings, and allow one-click reordering directly inside the customer's chat.
          </p>
          
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100 p-5 w-full transform group-hover:scale-105 transition-transform duration-500">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Zap className="w-5 h-5 text-green-600"/></div>
              <div className="flex-1">
                <div className="h-4 w-1/3 bg-zinc-200 rounded-full mb-2"></div>
                <div className="h-3 w-1/4 bg-zinc-100 rounded-full"></div>
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 w-5/6 mb-2 border border-zinc-100">
              <div className="h-3 w-full bg-zinc-200 rounded-full mb-2"></div>
              <div className="h-3 w-2/3 bg-zinc-200 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Tilted Right */}
        <motion.div 
          initial={{ rotate: 2, y: 0 }} whileHover={{ rotate: 0, y: -10 }} transition={{ type: "spring", stiffness: 200 }}
          className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 shadow-[0_20px_50px_rgb(0,0,0,0.3)] relative group z-20 md:-translate-y-12 text-white"
        >
          <div className="w-16 h-16 bg-pink-500/20 border border-pink-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <BarChart3 className="w-7 h-7 text-pink-500" />
          </div>
          <h3 className="text-4xl font-extrabold tracking-tight mb-4">Command Dashboard</h3>
          <p className="text-zinc-400 font-bold mb-12 text-lg leading-relaxed">
            Real-time sales heatmaps, product affinity analysis, and automated retention banners powered by AI.
          </p>
          
          <div className="bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-700 p-6 w-full transform group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-end h-32 mb-4 gap-3">
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="w-full bg-[#1a65ff] rounded-t-md hover:bg-blue-400 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
