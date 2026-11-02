'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MousePointer2, Zap, MoreHorizontal, Loader2, Receipt as ReceiptIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);

  // The function that fakes a cash register hitting our API
  const simulateSale = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/receipts/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            { name: 'Double Chocolate Waffle', quantity: 1, price: 15.00, total: 15.00 },
            { name: 'Iced Caramel Latte', quantity: 2, price: 6.50, total: 13.00 }
          ]
        })
      });

      const data = await res.json();
      if (data.url) {
        // Instantly open the newly generated receipt in a new tab!
        window.open(data.url, '_blank');
      }
    } catch (error) {
      alert("Failed to generate receipt.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter text-zinc-900 leading-none">
            Overview
          </h1>
          <p className="text-zinc-500 font-bold mt-2">Real-time telemetry for Belgian Waffle Co.</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          
          {/* THE NEW BUTTON */}
          <Button 
            onClick={simulateSale} 
            disabled={isGenerating}
            className="rounded-xl bg-zinc-900 hover:bg-black text-white font-bold px-6 py-5 shadow-lg flex items-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ReceiptIcon className="w-4 h-4" />}
            Generate Test Receipt
          </Button>

        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Gross Volume', value: '$124,500', trend: '+14.2%', active: true },
          { label: 'Receipts Issued', value: '14,203', trend: '+5.4%' },
          { label: 'Customer Retention', value: '42.8%', trend: '+2.1%' },
        ].map((kpi, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-[2rem] border-2 relative overflow-hidden group ${kpi.active ? 'bg-zinc-900 border-zinc-800 text-white shadow-2xl' : 'bg-white border-zinc-200 shadow-sm hover:border-zinc-300'}`}
          >
            {kpi.active && <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a65ff] opacity-20 blur-3xl"></div>}
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`text-sm font-bold uppercase tracking-widest ${kpi.active ? 'text-zinc-400' : 'text-zinc-500'}`}>{kpi.label}</div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.active ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                <ArrowUpRight className="w-3 h-3" /> {kpi.trend}
              </div>
            </div>
            
            <div className={`text-5xl font-extrabold tracking-tighter relative z-10 ${kpi.active ? 'text-white' : 'text-zinc-900'}`}>
              {kpi.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart (CSS Based) */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white border-2 border-zinc-200 rounded-[2.5rem] p-8 shadow-xl relative">
          
          {/* Floating UI Cursor indicating a live viewer */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-8 right-8 z-40 hidden md:block">
            <MousePointer2 className="w-6 h-6 text-pink-500 fill-pink-500 -rotate-12 drop-shadow-md" />
            <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm absolute top-5 left-4 shadow-sm uppercase">Admin</div>
          </motion.div>

          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900">Revenue Velocity</h3>
            <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="w-5 h-5 text-zinc-400" /></Button>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 mt-8 border-b-2 border-zinc-100 pb-4">
            {[40, 60, 45, 80, 55, 90, 100, 75, 85, 60].map((height, i) => (
              <div key={i} className="w-full flex flex-col justify-end h-full group relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(height * 120).toLocaleString()}
                </div>
                <div className={`w-full rounded-t-md transition-all duration-300 ${i === 6 ? 'bg-[#1a65ff]' : 'bg-zinc-100 group-hover:bg-blue-200'}`} style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Feed / AI Upsell Module */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-10 h-10 bg-[#1a65ff]/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#1a65ff]" />
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">AI Insights</h3>
          </div>
          
          <div className="space-y-6 relative z-10">
            {[
              { time: 'Just now', msg: 'Peak hour detected at Andheri Branch. Suggested upselling Hazelnut Shakes.' },
              { time: '2m ago', msg: 'Customer LTV crossed $500 milestone. Sent VIP WhatsApp invite.' },
              { time: '15m ago', msg: 'Inventory mismatch warning: Waffle Batter running 12% above projected usage.' },
            ].map((insight, i) => (
              <div key={i} className="pb-6 border-b border-zinc-800 last:border-0 last:pb-0">
                <div className="text-[10px] font-bold text-[#1a65ff] uppercase tracking-widest mb-1">{insight.time}</div>
                <div className="text-sm font-medium text-zinc-300 leading-relaxed">{insight.msg}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
