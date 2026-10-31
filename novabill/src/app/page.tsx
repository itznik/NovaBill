import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white selection:bg-blue-200">
      <Navbar />
      <Hero />
      <Features />
      <Ecosystem />
      <Pricing />
      <Footer />
    </main>
  );
}
