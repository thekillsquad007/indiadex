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
  if (!meta) return { title: "Sell Crypto" };
  return {
    title: `Sell ${meta.name} (${meta.symbol}) for Local Currency — Coming Soon`,
    description: `Sell ${meta.name} (${meta.symbol}) for local fiat currency — coming soon. In the meantime, swap your crypto cross-chain on Indiadex.`,
    alternates: {
      canonical: `/sell/${asset}`,
    },
    openGraph: {
      title: `Sell ${meta.name} (${meta.symbol}) | Indiadex`,
      description: `Sell ${meta.name} (${meta.symbol}) for local fiat currency.`,
    },
  };
}

export default async function SellAssetPage({ params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;
  const meta = findAssetBySlug(asset);
  if (!meta) return <PageShell />;

  return (
    <PageShell
      heroSwapProps={{
        defaultCoin: meta.symbol,
        defaultMode: "SELL",
        defaultNetwork: meta.network,
      }}
    >
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: `Sell ${meta.name}`, href: `/sell/${asset}` },
      ]} />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 mb-6">
          <span className="text-xs font-semibold text-amber-400">Coming Soon</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Sell {meta.name} ({meta.symbol}) for Local Currency
        </h1>
        <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-8">
          Convert your {meta.name} to local fiat currency and withdraw directly to your bank account. Fast settlement, competitive rates, and support for 40+ countries.
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
            <div className="text-2xl mb-2">📤</div>
            <h3 className="font-semibold mb-2">Send Crypto</h3>
            <p className="text-sm text-slate-400">Transfer {meta.symbol} from your wallet to the provided address</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-2">Verify & Confirm</h3>
            <p className="text-sm text-slate-400">Complete KYC and confirm the transaction details</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="text-2xl mb-2">🏦</div>
            <h3 className="font-semibold mb-2">Receive Fiat</h3>
            <p className="text-sm text-slate-400">Funds arrive in your bank account in minutes</p>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Why sell {meta.name} on Indiadex?</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex gap-2">• <span><strong>Competitive rates</strong> — Get the best market price for your {meta.symbol}</span></li>
          <li className="flex gap-2">• <span><strong>Fast settlement</strong> — Receive fiat in your bank account quickly</span></li>
          <li className="flex gap-2">• <span><strong>Wide coverage</strong> — Sell in 40+ countries with local bank support</span></li>
          <li className="flex gap-2">• <span><strong>Simple process</strong> — Three easy steps from wallet to bank</span></li>
          <li className="flex gap-2">• <span><strong>Regulated partner</strong> — Fully compliant with local regulations</span></li>
        </ul>
      </section>
    </PageShell>
  );
}
