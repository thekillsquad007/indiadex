"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Indiadex regulated?",
    answer: "Indiadex connects you to regulated on-ramp and off-ramp providers operating in 160+ countries. Our partners handle all KYC/AML compliance and regulatory requirements. We are not a custodian of your funds.",
  },
  {
    question: "What are the fees?",
    answer: "Indiadex charges zero additional platform fees. Our partner's fees vary by payment method and region (typically 1-3% for UPI/bank transfers, 3-5% for cards). The exact rate is shown before you confirm any transaction.",
  },
  {
    question: "Do I need to complete KYC?",
    answer: "For smaller amounts, basic KYC (phone verification) may be sufficient. For larger amounts or sell transactions, full KYC is required — all handled securely within the widget. KYC requirements vary by country and transaction amount.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "Buy: UPI (Google Pay, PhonePe, Paytm), IMPS, NEFT, debit/credit cards, Apple Pay, Google Pay, SEPA, PIX, PayID, and local bank transfers depending on your country. Sell: Direct bank transfer to your verified account. UPI is recommended for instant buy transactions in India.",
  },
  {
    question: "What fees will I pay?",
    answer: "Total fees include our partner's baseline fee (1-3% for bank transfers, 3-5% for cards) plus our small partner markup (typically 0.5-2% for buy, 1-1.5% for sell). Network/gas fees apply for blockchain transfers. The exact breakdown is shown before you confirm any transaction — no hidden charges.",
  },
  {
    question: "How long does it take?",
    answer: "Buy: Most transactions complete within 2-10 minutes after payment confirmation. Sell: After you send crypto, fiat is typically deposited to your bank account within 1-2 business days.",
  },
  {
    question: "Which cryptocurrencies are supported?",
    answer: "Over 100 cryptocurrencies including Bitcoin, Ethereum, Tether, USD Coin, Solana, BNB, Polygon, XRP, and many more. Available networks include Ethereum, Polygon, Arbitrum, Optimism, Base, Solana, BNB Smart Chain, Tron, and Bitcoin.",
  },
  {
    question: "Can I sell crypto too?",
    answer: "Yes. Toggle to 'Sell' on the swap widget, choose your crypto and network, enter the amount, and provide the wallet you'll send crypto from. After the transaction is verified, fiat is deposited to your verified bank account.",
  },
  {
    question: "Is my wallet address safe?",
    answer: "Yes. Indiadex is fully non-custodial — we never store or have access to your funds. For buy, crypto is sent directly to the wallet address you provide. For sell, you send crypto from your wallet to our partner's address.",
  },
  {
    question: "Which countries are supported?",
    answer: "We support 40+ countries including India, USA, UK, EU, Canada, Australia, Singapore, UAE, Japan, Brazil, and many more. Available payment methods depend on your country.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-indigo-400 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/5 bg-card/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-sm pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
