import { Metadata } from "next";
import { ASSETS, findAssetBySlug } from "@/lib/assets";
import PageShell from "@/components/PageShell";

export async function generateStaticParams() {
  return ASSETS.map((a) => ({ asset: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ asset: string }> }): Promise<Metadata> {
  const { asset } = await params;
  const meta = findAssetBySlug(asset);
  if (!meta) return { title: "Sell Crypto | Indiadex" };
  return {
    title: `Sell ${meta.name} (${meta.symbol}) for Local Currency | Indiadex`,
    description: `Sell ${meta.name} (${meta.symbol}) and receive fiat currency directly in your bank account. Quick and secure.`,
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
    />
  );
}
