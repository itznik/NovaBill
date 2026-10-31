'use client';

import { motion } from "framer-motion";
import { Database, Smartphone, ShieldCheck } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring", bounce: 0.3 } }
};

export function Features() {
  return (
    <motion.section 
      variants={fadeUpVariant} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, margin: "-100px" }} 
      className="relative z-30 bg-zinc-900 text-white py-32 px-4 md:px-12 rounded-t-[4rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] mt-[-80px]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-zinc-800 pb-12">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] max-w-lg">
            From zero <br/> to one.
          </h2>
          <p className="text-zinc-400 font-medium max-w-sm text-lg leading-relaxed">
            We work under a strict methodology that isolates high-throughput POS ingestion from complex data processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Database, 
              title: "Multi-Tenant Data", 
              desc: "Strictly isolated MongoDB schemas for every franchise location, ensuring zero data leakage." 
            },
            { 
              icon: Smartphone, 
              title: "Zero-App Ecosystem", 
              desc: "Digital receipts optimized for mobile WebViews without requiring customers to download an app." 
            },
            { 
              icon: ShieldCheck, 
              title: "Zero-Trust Security", 
              desc: "Military-grade JWT authentication, Passkey biometric logins, and obfuscated dashboard routing." 
            },
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }}
              className="bg-zinc-800/40 border border-zinc-700/50 p-10 rounded-3xl hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <feature.icon className="w-6 h-6 text-[#1a65ff]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
