'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Fingerprint, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Secure connection failed.');
      setLoading(false);
    }
  };

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
        <p className="text-sm text-zinc-500 font-medium mb-8">Authorized personnel only. Passkey verification required.</p>

        {/* Error State Module */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, mb: 0 }} 
              animate={{ opacity: 1, height: 'auto', mb: 24 }} 
              exit={{ opacity: 0, height: 0, mb: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Operator Email</label>
            <Input 
              type="email" 
              placeholder="admin@merchant.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="bg-zinc-900 border-zinc-800 text-white rounded-xl h-14 px-5 focus-visible:ring-1 focus-visible:ring-[#1a65ff] focus-visible:ring-offset-0 placeholder:text-zinc-700 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Portal Key</label>
            <Input 
              type="password" 
              placeholder="••••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-zinc-900 border-zinc-800 text-white rounded-xl h-14 px-5 focus-visible:ring-1 focus-visible:ring-[#1a65ff] focus-visible:ring-offset-0 placeholder:text-zinc-700 disabled:opacity-50"
            />
          </div>

          <Button 
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[#1a65ff] hover:bg-blue-600 text-white font-bold text-lg flex items-center justify-between px-6 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </Button>
        </form>

        <div className="mt-10 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          Zero-Trust Environment • IPv4 Logged
        </div>
      </motion.div>
    </main>
  );
}
