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

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Portal key and email are required.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // Prevent crashes if Vercel returns an HTML timeout error instead of JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Database connection timed out. Check MongoDB IP Whitelist.");
      }

      const data = await res.json();
      
      if (res.ok) {
        // Use Next.js router for a smooth transition without flashing white
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Secure connection failed.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,101,255,0.15),transparent_50%)]"></div>

      <motion.div className="w-full max-w-sm bg-zinc-950/50 backdrop-blur-2xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative z-10">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-10">
          <Fingerprint className="w-8 h-8 text-[#1a65ff]" />
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-2">Secure Portal</h1>
        <p className="text-sm text-zinc-500 mb-8">Passkey verification required.</p>

        <AnimatePresence>
          {error && (
            <motion.div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" /> 
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 
          FIX: Removed the <form> tag completely. 
          We now use a standard <div> to prevent native browser refreshes. 
        */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase">Operator Email</label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-zinc-900 border-zinc-800 text-white rounded-xl h-14 px-5"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase">Portal Key</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-zinc-900 border-zinc-800 text-white rounded-xl h-14 px-5"
            />
          </div>

          <Button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[#1a65ff] hover:bg-blue-600 text-white font-bold text-lg flex items-center justify-between px-6 transition-all group"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
