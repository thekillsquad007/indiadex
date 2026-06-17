import Logo from "./Logo";
import { ASSETS } from "@/lib/assets";
import { COUNTRIES } from "@/lib/countries";

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
                <Logo size={36} />
              </div>
              <span className="text-base font-semibold">Indiadex</span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Non-custodial cross-chain swap platform. Swap any token across 20+
              chains. Built by Aravindkishore S, for everyone.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://linkedin.com/in/aravindkishores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/thekillsquad007/indiadex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Swap tokens</h4>
            <ul className="space-y-1.5 text-sm text-muted">
              {ASSETS.slice(0, 6).map((a) => (
                <li key={a.slug}>
                  <a href={`/buy/${a.slug}`} className="hover:text-foreground transition-colors">{a.name} ({a.symbol}) <span className="text-[10px] text-amber-400/70 ml-1">Soon</span></a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Sell crypto</h4>
            <ul className="space-y-1.5 text-sm text-muted">
              {ASSETS.slice(0, 6).map((a) => (
                <li key={a.slug}>
                  <a href={`/sell/${a.slug}`} className="hover:text-foreground transition-colors">{a.name} ({a.symbol}) <span className="text-[10px] text-amber-400/70 ml-1">Soon</span></a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Countries</h4>
            <ul className="space-y-1.5 text-sm text-muted">
              {COUNTRIES.map((c) => (
                <li key={c.code}>
                  <a href={`/country/${c.code}`} className="hover:text-foreground transition-colors">{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-1.5 text-sm text-muted">
              <li><a href="#swap" className="hover:text-foreground transition-colors">Swap widget</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-1.5 text-sm text-muted">
              <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>© {new Date().getFullYear()} Indiadex. All rights reserved.</p>
            <p>
              Powered by{" "}
              <span className="text-foreground">
                Onramp.money
              </span>
              {" "}— Licensed & regulated
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            Cryptocurrency investments are subject to market risks. Please invest responsibly. Indiadex is not a financial advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}
