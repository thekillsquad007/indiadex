import { Metadata } from "next";
import { COUNTRIES, findCountryBySlug } from "@/lib/countries";
import PageShell from "@/components/PageShell";

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const meta = findCountryBySlug(code);
  if (!meta) return { title: "Buy Crypto | Indiadex" };
  return {
    title: `Buy and Sell Crypto in ${meta.name} with ${meta.fiatCode} | Indiadex`,
    description: meta.description,
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
    />
  );
}
