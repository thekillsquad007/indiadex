const steps = [
  {
    number: "01",
    title: "Enter wallet address",
    description: "Paste your crypto wallet address. Works with MetaMask, Trust Wallet, Ledger, and any self-custodial wallet.",
  },
  {
    number: "02",
    title: "Select crypto & amount",
    description: "Choose from 100+ cryptocurrencies and your local fiat currency. Enter the amount you want to buy or sell.",
  },
  {
    number: "03",
    title: "Complete KYC",
    description: "Quick identity verification handled securely by Transak. Most users complete it in under 2 minutes.",
  },
  {
    number: "04",
    title: "Pay & receive",
    description: "Pay with your local payment method (UPI, card, bank transfer, Apple Pay, Google Pay). Crypto arrives in minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-indigo-400 mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Four simple steps to crypto
          </h2>
          <p className="text-muted leading-relaxed">
            From signup to your first crypto in under 5 minutes. No complex
            registration, no hidden steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent -translate-x-6" />
              )}
              <div className="rounded-2xl border border-white/5 bg-card/30 p-6 h-full">
                <div className="text-sm font-mono text-muted mb-4">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
