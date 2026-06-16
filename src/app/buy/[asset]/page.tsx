import { Metadata } from "next";
import { ASSETS, findAssetBySlug } from "@/lib/assets";
import PageShell from "@/components/PageShell";

export async function generateStaticParams() {
  return ASSETS.map((a) => ({ asset: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ asset: string }> }): Promise<Metadata> {
  const { asset } = await params;
  const meta = findAssetBySlug(asset);
  if (!meta) return { title: "Buy Crypto | Indiadex" };
  return {
    title: `Buy ${meta.name} (${meta.symbol}) with Local Currency | Indiadex`,
    description: meta.description,
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
    />
  );
}
