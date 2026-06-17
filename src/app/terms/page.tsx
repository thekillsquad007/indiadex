import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Terms of Service | Indiadex",
  description: "Indiadex terms of service — understand your rights and responsibilities when using the platform.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: "Terms of Service", href: "/terms" },
      ]} />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">1. Acceptance of terms</h2>
          <p>By using Indiadex, you agree to these terms. If you do not agree, do not use the service.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">2. Description of service</h2>
          <p>Indiadex is a non-custodial interface that connects users to third-party decentralized protocols (LI.FI) and regulated on-ramp/off-ramp services (Onramp.money). We do not hold funds, execute trades, or act as a counterparty to any transaction.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">3. Non-custodial</h2>
          <p>Indiadex never has access to your private keys, never holds your crypto, and cannot reverse or modify transactions on the blockchain. You retain full control of your funds at all times.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">4. User responsibility</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>Complying with all applicable laws and regulations in your jurisdiction</li>
            <li>Providing accurate wallet addresses</li>
            <li>Securing your private keys and wallet seed phrases</li>
            <li>Paying all applicable taxes on transactions</li>
          </ul>

          <h2 className="text-lg font-semibold text-foreground mt-8">5. Risks</h2>
          <p>Cryptocurrency investments carry market risk. Prices can be volatile. Indiadex is not a financial advisor and does not provide investment advice. Past performance does not guarantee future results.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">6. Third-party services</h2>
          <p>Swap transactions are routed through LI.FI. Buy/sell transactions are handled by Onramp.money. Each service has its own terms and privacy policy. Indiadex is not responsible for the actions or omissions of these third parties.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">7. Limitation of liability</h2>
          <p>Indiadex is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted by law, we disclaim all liability for any losses arising from your use of the platform.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">8. Changes to terms</h2>
          <p>We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
        </div>
      </section>
    </PageShell>
  );
}
