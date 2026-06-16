import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
                <Logo size={36} />
              </div>
              <span className="text-base font-semibold">Indiadex</span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              The fastest, simplest way to buy and sell cryptocurrency in 40+
              countries with local payment methods.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#swap" className="hover:text-foreground transition-colors">Buy crypto</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Risk disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>© {new Date().getFullYear()} Indiadex. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a
                href="https://transak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-indigo-400 transition-colors"
              >
                Transak
              </a>
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
