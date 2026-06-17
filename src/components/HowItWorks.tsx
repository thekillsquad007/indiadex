const steps = [
  {
    number: "01",
    title: "Connect your wallet",
    description: "Connect any self-custodial wallet — MetaMask, WalletConnect, Phantom, or any EVM-compatible wallet.",
  },
  {
    number: "02",
    title: "Choose tokens & chains",
    description: "Select the source and destination tokens across 20+ chains. Swap between any EVM chain and Solana.",
  },
  {
    number: "03",
    title: "Review the route",
    description: "LI.FI finds the best route across all DEXs and bridges. You see the exact rate, fees, and estimated time.",
  },
  {
    number: "04",
    title: "Confirm & swap",
    description: "Confirm the transaction in your wallet. Tokens arrive on the destination chain — usually within minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-indigo-400 mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Four simple steps to swap
          </h2>
          <p className="text-muted leading-relaxed">
            From connect to complete in minutes. No registration, no KYC, no
            hidden steps. Just a wallet and a few clicks.
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
