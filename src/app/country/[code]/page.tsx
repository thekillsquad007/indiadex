import { Metadata } from "next";
import { COUNTRIES, findCountryBySlug, CountryMeta } from "@/lib/countries";
import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const meta = findCountryBySlug(code);
  if (!meta) return { title: "Buy Crypto" };
  return {
    title: `Buy and Sell Crypto in ${meta.name} with ${meta.fiatCode}`,
    description: meta.description,
    alternates: {
      canonical: `/country/${code}`,
    },
    openGraph: {
      title: `Buy and Sell Crypto in ${meta.name} | Indiadex`,
      description: meta.description,
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const meta = findCountryBySlug(code);
  if (!meta) return <PageShell />;

  return (
    <PageShell
      heroSwapProps={{
        defaultFiat: meta.fiatCode,
        defaultMode: "BUY",
      }}
    >
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: meta.name, href: `/country/${code}` },
      ]} />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Buy and Sell Crypto in {meta.name} with {meta.fiatCode}
        </h1>
        <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-8">
          {meta.description} Use {meta.paymentMethods} to buy Bitcoin, Ethereum, USDT and 100+ cryptocurrencies instantly.
        </p>
        <div className="bg-slate-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3">Available payment methods in {meta.name}</h2>
          <p className="text-slate-300">{meta.paymentMethods}</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Why use Indiadex in {meta.name}?</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex gap-2">• <span><strong>Pay with {meta.fiatCode}</strong> — Use your local currency {meta.fiatSymbol}, no USD conversion needed</span></li>
          <li className="flex gap-2">• <span><strong>Local payment methods</strong> — {meta.paymentMethods}</span></li>
          <li className="flex gap-2">• <span><strong>Non-custodial</strong> — Crypto goes directly to your wallet</span></li>
          <li className="flex gap-2">• <span><strong>Regulated</strong> — Fully compliant with local regulations</span></li>
          <li className="flex gap-2">• <span><strong>100+ cryptocurrencies</strong> — Buy and sell Bitcoin, Ethereum, Solana, USDT, and more</span></li>
        </ul>
      </section>
    </PageShell>
  );
}
