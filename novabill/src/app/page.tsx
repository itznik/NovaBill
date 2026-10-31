import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white selection:bg-blue-200">
      <Navbar />
      <Hero />
      {/* We will stack <Features />, <Ecosystem />, <Pricing />, and <Footer /> here next */}
    </main>
  );
}
