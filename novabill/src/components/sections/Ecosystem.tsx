'use client';

import { motion } from "framer-motion";
import { MessageSquare, BarChart3, Zap } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring", bounce: 0.3 } }
};

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-32 px-4 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-24">
        <motion.h2 
          variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-900 mb-6"
        >
          The SaaS Ecosystem
        </motion.h2>
        <motion.p 
          variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          More than a digital receipt. A complete, closed-loop data environment capturing customer lifetime value.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WhatsApp Integration Card */}
        <motion.div 
          variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="bg-zinc-50 border border-zinc-200 rounded-[2.5rem] p-12 relative overflow-hidden group cursor-default"
        >
          <div className="w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <MessageSquare className="w-7 h-7 text-[#1a65ff]" />
          </div>
          <h3 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900">WhatsApp Integration</h3>
          <p className="text-zinc-500 font-medium mb-12 text-lg leading-relaxed max-w-md">
            Send receipts, capture 1-tap ratings, and allow one-click reordering directly inside the customer's chat.
          </p>
          
          {/* Abstract Chat UI Representation */}
          <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-5 w-4/5 md:w-3/4 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600"/>
              </div>
              <div className="flex-1">
                <div className="h-4 w-1/3 bg-zinc-200 rounded-full mb-2"></div>
                <div className="h-3 w-1/4 bg-zinc-100 rounded-full"></div>
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-3 mb-2 w-5/6">
              <div className="h-3 w-full bg-zinc-200 rounded-full mb-2"></div>
              <div className="h-3 w-2/3 bg-zinc-200 rounded-full"></div>
            </div>
            <div className="bg-[#1a65ff]/10 rounded-xl p-3 w-2/3 ml-auto">
              <div className="h-3 w-full bg-[#1a65ff]/40 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Analytics Card */}
        <motion.div 
          variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-12 relative overflow-hidden group cursor-default text-white"
        >
          <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <BarChart3 className="w-7 h-7 text-pink-500" />
          </div>
          <h3 className="text-3xl font-bold tracking-tight mb-4">Command Dashboard</h3>
          <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed max-w-md">
            Real-time sales heatmaps, product affinity analysis, and automated retention banners powered by Python AI.
          </p>
          
          {/* Abstract Chart UI Representation */}
          <div className="bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-700 p-6 w-4/5 md:w-3/4 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
            <div className="flex justify-between items-end h-24 mb-4 gap-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="w-full bg-[#1a65ff] rounded-t-sm hover:bg-blue-400 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 border-t border-zinc-700 pt-4">
              <div className="h-3 w-12 bg-zinc-600 rounded-full"></div>
              <div className="h-3 w-16 bg-zinc-600 rounded-full"></div>
              <div className="h-3 w-12 bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
