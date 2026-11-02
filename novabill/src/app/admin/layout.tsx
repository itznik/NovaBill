import { BarChart3, Receipt, Users, Settings, Store, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas-grid bg-zinc-50 flex selection:bg-blue-200">
      
      {/* Floating Tool Palette (Sidebar) */}
      <aside className="fixed top-6 left-6 bottom-6 w-20 md:w-64 bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-2xl z-50 flex flex-col items-center md:items-start py-8 px-4 md:px-6 transition-all duration-300">
        <div className="w-12 h-12 bg-[#1a65ff] rounded-xl flex items-center justify-center font-extrabold text-white text-xl mb-12 shadow-[0_0_20px_rgba(26,101,255,0.4)] cursor-pointer">
          N.
        </div>

        <nav className="flex flex-col gap-6 w-full">
          {[
            { icon: BarChart3, label: 'Command', active: true },
            { icon: Receipt, label: 'Receipts' },
            { icon: Users, label: 'Customers' },
            { icon: Store, label: 'Locations' },
          ].map((item, i) => (
            <Link key={i} href="#" className={`flex items-center gap-4 group px-2 md:px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-zinc-800/80 text-white shadow-inner' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/40'}`}>
              <item.icon className={`w-6 h-6 ${item.active ? 'text-[#1a65ff]' : 'group-hover:text-zinc-300'}`} />
              <span className="hidden md:block font-bold text-sm tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto w-full">
          <div className="w-full h-px bg-zinc-800 mb-6"></div>
          <Link href="#" className="flex items-center gap-4 text-zinc-500 hover:text-red-400 group px-2 md:px-4 transition-colors">
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block font-bold text-sm">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="ml-[100px] md:ml-[300px] w-full min-h-screen p-6 md:p-10 relative">
        {children}
      </main>

    </div>
  );
}
