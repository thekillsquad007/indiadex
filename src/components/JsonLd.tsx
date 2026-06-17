export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indiadex",
    url: "https://indiadexswap.xyz",
    description:
      "Non-custodial cross-chain swap platform. Swap 100+ cryptocurrencies across 20+ chains via LI.FI. Built by Aravindkishore S.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "0.75% flat swap fee — no hidden charges",
    },
    featureList: [
      "Cross-chain swap across 20+ chains via LI.FI",
      "100+ cryptocurrencies across multiple networks",
      "Non-custodial — you control your keys",
      "Best rate routing across all DEXs and bridges",
      "Buy & sell crypto coming soon with local payment methods",
    ],
    author: {
      "@type": "Person",
      name: "Aravindkishore S",
      url: "https://linkedin.com/in/aravindkishores",
    },
    provider: {
      "@type": "Organization",
      name: "Indiadex",
      url: "https://indiadexswap.xyz",
      logo: "https://indiadexswap.xyz/logo.png",
      sameAs: [
        "https://github.com/thekillsquad007/indiadex",
        "https://linkedin.com/in/aravindkishores",
      ],
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Indiadex",
    url: "https://indiadexswap.xyz",
    logo: "https://indiadexswap.xyz/logo.png",
    description:
      "Non-custodial cross-chain swap platform built by Aravindkishore S. Swap 100+ tokens across 20+ chains.",
    sameAs: [
      "https://github.com/thekillsquad007/indiadex",
      "https://linkedin.com/in/aravindkishores",
    ],
    founder: {
      "@type": "Person",
      name: "Aravindkishore S",
      url: "https://linkedin.com/in/aravindkishores",
    },
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
        name: "What is Indiadex?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiadex is a non-custodial cross-chain swap platform built by Aravindkishore S. You can swap 100+ cryptocurrencies across 20+ chains including Ethereum, Solana, Polygon, Arbitrum, and more via LI.FI integration. Buy and sell features are coming soon.",
        },
      },
      {
        "@type": "Question",
        name: "How does the cross-chain swap work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Connect your wallet, select the source and destination tokens and chains, and Indiadex routes your swap through LI.FI which aggregates all major DEXs and bridges to find the best rate. The swap fee is a flat 0.75%.",
        },
      },
      {
        "@type": "Question",
        name: "What are the swap fees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiadex charges a flat 0.75% fee on all swaps. This covers the LI.FI integration and routing. Network gas fees apply separately and vary by chain.",
        },
      },
      {
        "@type": "Question",
        name: "Which chains are supported for swaps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "20+ chains including Ethereum, Solana, Polygon, Arbitrum, Optimism, Base, BNB Smart Chain, Avalanche, and more via LI.FI integration.",
        },
      },
      {
        "@type": "Question",
        name: "Is Indiadex non-custodial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Indiadex is fully non-custodial — we never have access to your private keys or funds. Swaps happen directly from your wallet. Buy and sell transactions will send crypto directly to your wallet address.",
        },
      },
      {
        "@type": "Question",
        name: "Can I buy or sell crypto with fiat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Buy and sell features are coming soon. For now, the platform supports cross-chain swaps. When launched, you'll be able to buy crypto with UPI, debit/credit cards, bank transfers, Apple Pay, and Google Pay in 40+ countries.",
        },
      },
      {
        "@type": "Question",
        name: "Who built Indiadex?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiadex was built by Aravindkishore S, an engineering graduate who believes crypto should be accessible to everyone. It's a solo project built with care — no VCs, no board meetings.",
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
