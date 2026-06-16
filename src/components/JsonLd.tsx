export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indiadex",
    url: "https://indiadexswap.xyz",
    description:
      "Buy and sell Bitcoin, Ethereum, USDT and 100+ cryptocurrencies in 40+ countries using your local payment methods. Zero hidden fees.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "No platform fees — only Transak's standard fees apply",
    },
    featureList: [
      "Buy crypto with UPI, cards, bank transfers, Apple Pay, Google Pay",
      "Sell crypto for fiat in 40+ countries",
      "100+ cryptocurrencies across multiple networks",
      "Non-custodial — crypto sent directly to your wallet",
      "Regulated infrastructure powered by Transak",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
    provider: {
      "@type": "Organization",
      name: "Indiadex",
      url: "https://indiadexswap.xyz",
      logo: "https://indiadexswap.xyz/logo.png",
      sameAs: [],
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Indiadex",
    url: "https://indiadexswap.xyz",
    logo: "https://indiadexswap.xyz/logo.png",
    description:
      "Indiadex is a non-custodial cryptocurrency on-ramp and off-ramp platform. Buy and sell crypto in 40+ countries.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@indiadexswap.xyz",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Indiadex regulated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiadex is a frontend interface that connects you to Transak — a licensed crypto on-ramp and off-ramp provider operating in 160+ countries. Transak handles all KYC/AML compliance and regulatory requirements.",
        },
      },
      {
        "@type": "Question",
        name: "What are the fees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiadex charges zero additional platform fees. Transak's fees vary by payment method and region (typically 1-3% for bank transfers, 3-5% for cards). The exact rate is shown before you confirm any transaction.",
        },
      },
      {
        "@type": "Question",
        name: "Which payment methods are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Buy: UPI (Google Pay, PhonePe, Paytm), IMPS, NEFT, debit/credit cards, Apple Pay, Google Pay, SEPA, PIX, PayID, and local bank transfers. Sell: Direct bank transfer to your verified account.",
        },
      },
      {
        "@type": "Question",
        name: "Which cryptocurrencies are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Over 100 cryptocurrencies including Bitcoin, Ethereum, Tether, USD Coin, Solana, BNB, Polygon, XRP, and many more across Ethereum, Polygon, Arbitrum, Optimism, Base, Solana, BNB Smart Chain, Tron, and Bitcoin networks.",
        },
      },
      {
        "@type": "Question",
        name: "Is Indiadex non-custodial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Indiadex is fully non-custodial — we never store or have access to your funds. For buy, crypto is sent directly to the wallet address you provide. For sell, you send crypto from your wallet to Transak's address.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support 40+ countries including India, USA, UK, EU, Canada, Australia, Singapore, UAE, Japan, Brazil, and many more. Available payment methods depend on your country.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a crypto transaction take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Buy transactions complete within 2-10 minutes after payment confirmation. Sell transactions take 1-2 business days for fiat to reach your bank account.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
