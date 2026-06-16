import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import HeroSwap from "@/components/HeroSwap";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ReactNode } from "react";

export default function PageShell({
  heroSwapProps,
  children,
}: {
  heroSwapProps?: {
    defaultCoin?: string;
    defaultMode?: "BUY" | "SELL";
    defaultFiat?: string;
    defaultNetwork?: string;
  };
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <JsonLd />
      <Header />
      <div className="pt-16">
        <PriceTicker />
      </div>
      <main>
        <HeroSwap defaultCoin={heroSwapProps?.defaultCoin} defaultMode={heroSwapProps?.defaultMode} defaultFiat={heroSwapProps?.defaultFiat} defaultNetwork={heroSwapProps?.defaultNetwork} />
        <Stats />
        <Features />
        <HowItWorks />
        {children}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
