'use client';

import { motion } from "framer-motion";
import { Database, Smartphone, ShieldCheck, MousePointer2, Code2 } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring" as const, bounce: 0.3 } }
};

export function Features() {
  return (
    <motion.section 
      variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} 
      className="relative z-30 bg-zinc-900 text-white py-32 px-4 md:px-12 rounded-t-[3rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.2)] mt-[-40px] overflow-hidden"
    >
      {/* Floating Developer Cursor */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-24 right-[10%] z-40 hidden md:block">
        <MousePointer2 className="w-8 h-8 text-green-400 fill-green-400 -rotate-12 drop-shadow-md" />
        <div className="bg-green-400 text-black text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm uppercase tracking-widest">Developer</div>
      </motion.div>

      {/* Floating Background Code Block */}
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [5, 2, 5] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-20 right-[-5%] md:right-[5%] z-10 bg-zinc-800/50 backdrop-blur-md p-6 rounded-3xl border border-zinc-700 w-64 hidden md:block"
      >
        <div className="flex gap-2 items-center mb-4 border-b border-zinc-700 pb-3">
          <Code2 className="w-4 h-4 text-zinc-400" />
          <div className="text-xs font-bold text-zinc-400">api/webhook.ts</div>
        </div>
        <div className="space-y-2">
          <div className="w-3/4 h-2 bg-green-400/20 rounded"></div>
          <div className="w-full h-2 bg-zinc-700 rounded"></div>
          <div className="w-5/6 h-2 bg-zinc-700 rounded"></div>
          <div className="w-1/2 h-2 bg-blue-400/20 rounded"></div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h2 className="text-5xl md:text-[6rem] font-extrabold tracking-tighter leading-[0.9] max-w-2xl">
            From zero <br/> to <span className="relative inline-block text-[#1a65ff]">
              one.
              {/* Graphic Selection Box */}
              <div className="absolute -inset-y-1 -inset-x-4 bg-[#1a65ff]/10 -z-10 border-2 border-[#1a65ff]">
                <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-[#1a65ff] rounded-full border border-white"></div>
                <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#1a65ff] rounded-full border border-white"></div>
              </div>
            </span>
          </h2>
          <p className="text-zinc-400 font-medium max-w-sm text-lg leading-relaxed md:pb-4">
            A strict methodology that isolates high-throughput POS ingestion from complex data processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Database, title: "Multi-Tenant Data", desc: "Strictly isolated MongoDB schemas for every franchise location." },
            { icon: Smartphone, title: "Zero-App Ecosystem", desc: "Digital receipts optimized for mobile WebViews. No downloads required." },
            { icon: ShieldCheck, title: "Zero-Trust Security", desc: "Military-grade JWT auth, Passkeys, and obfuscated routing." },
          ].map((feature, i) => (
            <motion.div 
              key={i} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
              className="bg-zinc-800/40 backdrop-blur-lg border border-zinc-700/50 p-10 rounded-[2.5rem] hover:bg-zinc-800 transition-colors shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a65ff] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10">
                <feature.icon className="w-8 h-8 text-[#1a65ff]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight relative z-10">{feature.title}</h3>
              <p className="text-zinc-400 font-medium leading-relaxed relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
