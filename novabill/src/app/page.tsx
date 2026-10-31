'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MousePointer2, Receipt, BarChart3, ArrowRight, Database, Smartphone, ShieldCheck } from "lucide-react";

// Animation orchestration variants
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-canvas-grid bg-white">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-white/50 backdrop-blur-md border-b border-zinc-100">
        <div className="font-extrabold text-2xl tracking-tighter text-zinc-900">NovaBill.</div>
        <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6 py-5 text-sm font-bold shadow-md">
          Merchant Login
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 flex flex-col items-center justify-center px-4 min-h-screen">
        
        {/* Floating Multi-player Cursors (Infinite floating animation) */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 md:left-1/5 -translate-x-12 -translate-y-12 z-20 hidden md:block"
        >
          <MousePointer2 className="w-7 h-7 text-pink-500 fill-pink-500 -rotate-12 drop-shadow-md" />
          <div className="bg-pink-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">
            UX Designer
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 md:right-1/5 z-20 hidden md:block"
        >
          <MousePointer2 className="w-7 h-7 text-orange-500 fill-orange-500 -rotate-12 drop-shadow-md" />
          <div className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm absolute top-6 left-5 shadow-sm">
            Customer
          </div>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute left-8 md:left-24 bottom-1/4 bg-white border border-zinc-200 shadow-2xl rounded-2xl p-4 w-56 z-10"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Table 4</div>
                <div className="text-[10px] text-zinc-500">Paid • 2 mins ago</div>
              </div>
            </div>
            <div className="text-xs font-bold text-zinc-900">$24.50</div>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-2"></div>
          <div className="w-3/4 h-1.5 bg-zinc-100 rounded-full mb-4"></div>
          <div className="bg-zinc-50 text-[10px] font-medium text-zinc-600 p-2 rounded border border-zinc-100 text-center">
            Rating: ⭐️⭐️⭐️⭐️⭐️
          </div>
        </motion.div>

        {/* Main Content with Staggered Reveal */}
        <motion.div 
          variants={containerVariant} 
          initial="hidden" 
          animate="show"
          className="z-30 text-center max-w-4xl mx-auto flex flex-col items-center mt-10"
        >
          <motion.div variants={itemVariant} className="mb-6 flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-1.5 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide text-zinc-800 uppercase">Version 1.0 Live</span>
          </motion.div>

          <motion.h1 variants={itemVariant} className="text-6xl md:text-[7.5rem] font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[0.9] flex flex-col items-center">
            <span>Billing that</span>
            <span className="relative inline-block mt-2">
               loves data.
               {/* The structural blue selection box from your references */}
               <div className="absolute -inset-y-1 -inset-x-4 bg-[#1a65ff]/10 -z-10 border-2 border-[#1a65ff]">
                 <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-[#1a65ff] rounded-full"></div>
                 <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#1a65ff] rounded-full"></div>
               </div>
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariant} className="text-lg md:text-2xl text-zinc-500 font-medium max-w-2xl mb-10 leading-snug">
            We transform your static paper receipts into a high-quality, functional retention engine that aligns with your growth goals.
          </motion.p>

          <motion.div variants={itemVariant} className="flex flex-col sm:flex-row gap-4 items-center">
            <Button className="rounded-full bg-[#1a65ff] hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold shadow-xl transition-all hover:scale-105">
              Start building ecosystem
            </Button>
            <Button variant="outline" className="rounded-full bg-white border-2 border-zinc-200 text-zinc-800 hover:bg-zinc-50 px-10 py-7 text-lg font-bold transition-all">
              View live demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll Reveal Feature Section */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative z-30 bg-zinc-900 text-white py-24 px-4 md:px-12 rounded-t-[3rem] shadow-2xl mt-[-50px]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none max-w-lg">
              From zero <br/> to one.
            </h2>
            <p className="text-zinc-400 font-medium max-w-sm text-lg">
              We work under a methodology that isolates high-throughput APIs from complex data processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database, title: "Multi-Tenant Data", desc: "Strictly isolated MongoDB schemas for every franchise." },
              { icon: Smartphone, title: "Zero-App Ecosystem", desc: "Digital receipts optimized for mobile WebViews." },
              { icon: ShieldCheck, title: "Zero-Trust Security", desc: "Military-grade JWT authentication and hidden routing." },
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-800/50 border border-zinc-700 p-8 rounded-3xl hover:bg-zinc-800 transition-colors">
                <feature.icon className="w-10 h-10 text-[#1a65ff] mb-6" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
