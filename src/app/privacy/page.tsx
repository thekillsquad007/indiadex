import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | Indiadex",
  description: "Indiadex privacy policy — how we handle your data, KYC information, and wallet addresses.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: "Privacy Policy", href: "/privacy" },
      ]} />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">1. What we collect</h2>
          <p>Indiadex does not collect, store, or process any personal data directly. All KYC (Know Your Customer) data, transaction details, and payment information are handled entirely by our regulated on-ramp/off-ramp partner (Onramp.money) and LI.FI for swap transactions.</p>
          <p>We store only the following in your browser&apos;s local storage:</p>
          <ul>
            <li>Your preferred fiat currency</li>
            <li>Recently selected coins</li>
            <li>Your last-used wallet address (for convenience)</li>
          </ul>
          <p>This data never leaves your browser and is used solely to improve your experience.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">2. KYC and transaction data</h2>
          <p>When you use the buy or sell feature, you interact directly with Onramp.money&apos;s widget. Their privacy policy applies to that data. Indiadex does not receive, store, or process your KYC documents, bank details, or transaction history.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">3. Cookies and tracking</h2>
          <p>Indiadex does not use cookies, tracking scripts, or analytics tools. We do not collect usage data, IP addresses, or any identifiable information.</p>

          <h2 className="text-lg font-semibold text-foreground mt-8">4. Data sharing</h2>
          <p>We do not sell, rent, or share your data with any third parties. The only third-party services integrated are:</p>
          <ul>
            <li><strong>Onramp.money</strong> — for buy/sell transactions (when available)</li>
            <li><strong>LI.FI</strong> — for cross-chain swap execution</li>
            <li><strong>CoinGecko</strong> — for live price display (public API, no user data sent)</li>
          </ul>

          <h2 className="text-lg font-semibold text-foreground mt-8">5. Contact</h2>
          <p>If you have questions about this policy, reach out via the contact information on the About page.</p>
        </div>
      </section>
    </PageShell>
  );
}
