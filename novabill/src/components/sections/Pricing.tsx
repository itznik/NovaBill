'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring", bounce: 0.3 } }
};

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-4 md:px-12 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Pricing Copy */}
        <div className="flex-1">
          <motion.h2 
            variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[0.9]"
          >
            Simple pricing.<br/>Unlimited data.
          </motion.h2>
          <motion.p 
            variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-xl text-zinc-500 font-medium mb-10 max-w-md leading-relaxed"
          >
            Stop paying per receipt. One flat fee per franchise location to unlock the entire retention ecosystem.
          </motion.p>
          
          <motion.ul 
            variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-5 mb-8"
          >
            {[
              'Unlimited Digital Receipts', 
              'Real-time Analytics Dashboard', 
              'WhatsApp & SMS Delivery API', 
              '1-Year Historical Data Storage'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-zinc-800 font-bold text-lg tracking-tight">
                <CheckCircle2 className="w-6 h-6 text-[#1a65ff]" /> {item}
              </li>
            ))}
          </motion.ul>
        </div>
        
        {/* Pricing Card */}
        <motion.div 
          variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="flex-1 w-full max-w-md bg-white p-12 rounded-[3rem] border-2 border-zinc-200 shadow-2xl relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a65ff] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
            Pro Tier
          </div>
          <div className="text-zinc-500 font-medium mb-2 text-center uppercase tracking-widest text-sm">Per Store / Month</div>
          <div className="text-7xl font-extrabold tracking-tighter text-zinc-900 mb-10 text-center">
            $49
          </div>
          <Button className="w-full rounded-full bg-zinc-900 hover:bg-zinc-800 text-white py-7 text-xl font-bold shadow-xl mb-6 transition-transform hover:scale-105">
            Deploy SaaS Today
          </Button>
          <div className="text-center text-sm text-zinc-400 font-medium">Cancel anytime. No proprietary POS hardware required.</div>
        </motion.div>

      </div>
    </section>
  );
}
