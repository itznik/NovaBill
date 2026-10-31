import { Button } from "@/components/ui/button";
import { MousePointer2, Receipt, BarChart3, Store } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas-grid flex flex-col items-center justify-center px-4">
      
      {/* Top Right Floating Nav Button */}
      <div className="absolute top-6 right-6">
        <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-6 py-5 text-sm font-medium">
          Merchant Login
        </Button>
      </div>

      {/* Floating Element 1: Simulated Cursor */}
      <div className="absolute top-1/4 left-1/4 -translate-x-12 -translate-y-12 animate-pulse hidden md:block">
        <MousePointer2 className="w-6 h-6 text-orange-500 fill-orange-500 -rotate-12" />
        <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm absolute top-5 left-4">
          Customer
        </div>
      </div>

      {/* Floating Element 2: Floating Receipt Card */}
      <div className="absolute bottom-1/4 left-1/5 md:left-32 rotate-6 bg-white border border-zinc-200 shadow-xl rounded-2xl p-4 w-48 hidden md:block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="text-xs font-semibold text-zinc-900">Table 4 Paid</div>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-1"></div>
        <div className="w-3/4 h-1.5 bg-zinc-100 rounded-full"></div>
      </div>

      {/* Floating Element 3: Analytics Notification */}
      <div className="absolute top-1/3 right-1/4 md:right-32 -rotate-3 bg-white border border-zinc-200 shadow-xl rounded-full px-4 py-2 flex items-center gap-3 hidden md:flex">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm font-medium text-zinc-800">Peak hours updated</span>
        <BarChart3 className="w-4 h-4 text-zinc-400" />
      </div>

      {/* Central Content */}
      <div className="z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[0.9]">
          Billing that <br />
          <span className="relative">
             loves data.
             {/* Text selection highlight effect from references */}
             <div className="absolute -inset-1 bg-blue-100/50 -z-10 border border-blue-200"></div>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-lg mb-10 leading-relaxed">
          Transform your static receipts into a high-quality, functional retention engine that aligns with your growth goals.
        </p>

        <Button className="rounded-full bg-[#1a65ff] hover:bg-blue-700 text-white px-10 py-7 text-lg font-medium shadow-lg transition-transform hover:scale-105">
          Start building ecosystem
        </Button>
      </div>

    </main>
  );
}
