export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 gradient-accent p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Ready to swap across chains?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Connect your wallet and swap any token across 20+ chains. No
              registration, no KYC. Just connect, swap, and go.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#swap"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 hover:bg-white/90 transition-colors"
              >
                Start swapping
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#faq"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Read the FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
