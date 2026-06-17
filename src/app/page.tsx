import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export default function Home() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
      ]} />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Cross-Chain Swap Platform — Swap Any Token Across Any Chain
        </h1>
        <p className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-8">
          Indiadex lets you swap between 100+ cryptocurrencies across 20+ chains including Ethereum, Solana, Polygon, Arbitrum, and more. Connect your wallet, choose your tokens, and get the best rates from all major DEXs and bridges via LI.FI. Non-custodial, transparent, and built for everyone.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/30 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">Why Indiadex?</h2>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-2">• <span>Cross-chain swap across 20+ chains via LI.FI</span></li>
              <li className="flex gap-2">• <span>Zero hidden fees — 0.75% flat swap fee</span></li>
              <li className="flex gap-2">• <span>Non-custodial — you control your keys, your coins</span></li>
              <li className="flex gap-2">• <span>Best rate routing across all DEXs and bridges</span></li>
              <li className="flex gap-2">• <span>Buy & sell crypto coming soon — with local payment methods</span></li>
            </ul>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">Supported chains</h2>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-2">• <span>Ethereum, Arbitrum, Optimism, Base</span></li>
              <li className="flex gap-2">• <span>Polygon, BNB Smart Chain, Avalanche</span></li>
              <li className="flex gap-2">• <span>Solana</span></li>
              <li className="flex gap-2">• <span>And 15+ more chains via LI.FI integration</span></li>
              <li className="flex gap-2">• <span>Buy/sell with UPI, cards, bank transfers — coming soon</span></li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
