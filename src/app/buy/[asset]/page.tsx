import { Metadata } from "next";
import { ASSETS, findAssetBySlug } from "@/lib/assets";
import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export async function generateStaticParams() {
  return ASSETS.map((a) => ({ asset: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ asset: string }> }): Promise<Metadata> {
  const { asset } = await params;
  const meta = findAssetBySlug(asset);
  if (!meta) return { title: "Buy Crypto" };
  return {
    title: `Buy ${meta.name} (${meta.symbol}) with Local Currency — Coming Soon`,
    description: `Buy ${meta.name} (${meta.symbol}) with local currency — coming soon. In the meantime, swap your crypto cross-chain on Indiadex.`,
    alternates: {
      canonical: `/buy/${asset}`,
    },
    openGraph: {
      title: `Buy ${meta.name} (${meta.symbol}) | Indiadex`,
      description: meta.description,
    },
  };
}

export default async function BuyAssetPage({ params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;
  const meta = findAssetBySlug(asset);
  if (!meta) return <PageShell />;

  return (
    <PageShell
      heroSwapProps={{
        defaultCoin: meta.symbol,
        defaultMode: "BUY",
        defaultNetwork: meta.network,
      }}
    >
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: `Buy ${meta.name}`, href: `/buy/${asset}` },
      ]} />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 mb-6">
          <span className="text-xs font-semibold text-amber-400">Coming Soon</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Buy {meta.name} ({meta.symbol}) with Local Currency
        </h1>
        <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-8">
          {meta.description} Use your preferred payment method — UPI, credit card, bank transfer, Apple Pay, or Google Pay — to buy {meta.name} instantly with competitive rates and transparent fees.
        </p>
        <div className="text-center mb-8">
          <a href="#swap" className="inline-flex items-center gap-2 rounded-lg gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
            Try cross-chain swap instead
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-2xl mb-2">��</div>
            <h3 className="font-semibold mb-2">Choose Amount</h3>
            <p className="text-sm text-slate-400">Enter how much you want to spend in your local currency</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-2">Complete KYC</h3>
            <p className="text-sm text-slate-400">Verify your identity once with our regulated partner</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Receive Instantly</h3>
            <p className="text-sm text-slate-400">{meta.name} arrives in your wallet within minutes</p>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Why buy {meta.name} on Indiadex?</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex gap-2">• <span><strong>Best rates</strong> — Real-time pricing with zero hidden markup</span></li>
          <li className="flex gap-2">• <span><strong>Local payments</strong> — Pay with UPI, SEPA, ACH, PIX, Faster Payments and more</span></li>
          <li className="flex gap-2">• <span><strong>Non-custodial</strong> — {meta.name} goes directly to your wallet, not ours</span></li>
          <li className="flex gap-2">• <span><strong>Global access</strong> — Available in 40+ countries worldwide</span></li>
          <li className="flex gap-2">• <span><strong>Regulated</strong> — Fully compliant with local regulations</span></li>
        </ul>
      </section>
    </PageShell>
  );
}
