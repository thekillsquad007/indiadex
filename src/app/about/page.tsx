import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About Indiadex — Making Crypto Accessible for Everyone",
  description:
    "Built by Aravindkishore S, Indiadex is a non-custodial crypto swap platform that lets anyone in 40+ countries swap between 100+ cryptocurrencies using local payment methods.",
  openGraph: {
    title: "About Indiadex — Making Crypto Accessible for Everyone",
    description:
      "Built by Aravindkishore S, Indiadex is a non-custodial crypto swap platform for 40+ countries.",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
      ]} />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 text-center md:text-left">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHY5zMSFyq5tg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719947502037?e=2147483647&v=beta&t=8jXSLFKH2s6htLy1OqMTSd6RzRAxAQ6XpP9aj0z1SqI"
              alt="Aravindkishore S"
              width={160}
              height={160}
              className="rounded-2xl mx-auto md:mx-0 mb-4 border border-white/10"
            />
            <h1 className="text-2xl font-bold mb-1">Aravindkishore S</h1>
            <p className="text-sm text-muted mb-4">Engineering graduate · Builder</p>
            <div className="flex justify-center md:justify-start gap-3">
              <a
                href="https://linkedin.com/in/aravindkishores"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/thekillsquad007/indiadex"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Crypto should be for everyone, not just the privileged few.
            </h2>

            <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
              <p>
                I&apos;m Aravindkishore S, an engineering graduate who believes that
                financial freedom should not be a luxury. I built Indiadex because
                I saw how difficult it still is for ordinary people around the world
                to access cryptocurrency — whether it&apos;s high fees, confusing
                interfaces, or simply not having the right payment methods available
                in their country.
              </p>

              <p>
                Most crypto platforms cater to traders and institutions. Indiadex is
                built differently — it&apos;s for the person in India who wants to send
                money abroad, the freelancer in Brazil who wants to hold USDT, the
                student in Kenya who wants to save in Bitcoin. Swap any token across
                any chain without giving up custody of your funds.
              </p>

              <p>
                The buy and sell features are coming soon. For now, the core
                experience is a cross-chain swap powered by LI.FI — connect your
                wallet and swap between 20+ chains with competitive rates.
              </p>

              <p>
                This is a solo project built with care, one commit at a time.
                No VCs, no board meetings — just a builder trying to make a dent
                in the universe.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6">
              <h3 className="text-sm font-semibold mb-3">The mission</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">→</span>
                  <span>Make crypto accessible in every country with local payment methods</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">→</span>
                  <span>Keep it non-custodial — you control your keys, your coins</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">→</span>
                  <span>Transparent pricing with zero hidden fees</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">→</span>
                  <span>Build in public, stay independent, put users first</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/5 pt-6">
              <h3 className="text-sm font-semibold mb-3">Built with</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "LI.FI", "Onramp.money", "Wagmi", "Viem", "Tailwind CSS", "Solana", "Ethereum"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
