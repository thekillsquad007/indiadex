import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Indiadex — Buy & Sell Crypto with Local Currency | 40+ Countries",
    template: "%s | Indiadex",
  },
  description:
    "Buy and sell Bitcoin, Ethereum, USDT and 100+ cryptocurrencies in 40+ countries using UPI, cards, bank transfers, Apple Pay, Google Pay. Zero hidden fees. Non-custodial. Powered by Transak.",
  keywords: [
    "buy crypto",
    "sell crypto",
    "buy bitcoin",
    "buy ethereum",
    "buy USDT",
    "crypto on-ramp",
    "crypto off-ramp",
    "buy crypto with UPI",
    "buy crypto with credit card",
    "buy crypto India",
    "buy crypto Europe",
    "buy crypto USA",
    "INR to crypto",
    "USD to crypto",
    "EUR to crypto",
    "Bitcoin",
    "Ethereum",
    "Solana",
    "USDC",
    "BNB",
    "Polygon",
    "XRP",
    "non-custodial",
    "crypto exchange",
    "crypto swap",
    "cryptocurrency platform",
  ],
  authors: [{ name: "Indiadex" }],
  creator: "Indiadex",
  publisher: "Indiadex",
  metadataBase: new URL("https://indiadexswap.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indiadexswap.xyz",
    siteName: "Indiadex",
    title: "Indiadex — Buy & Sell Crypto with Local Currency",
    description:
      "Buy and sell Bitcoin, Ethereum, USDT and 100+ cryptocurrencies in 40+ countries. UPI, cards, bank transfers, Apple Pay supported. Zero hidden fees.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Indiadex — Buy & Sell Crypto with Local Currency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indiadex — Buy & Sell Crypto with Local Currency",
    description:
      "Buy and sell Bitcoin, Ethereum, USDT and 100+ cryptocurrencies in 40+ countries. UPI, cards, bank transfers supported.",
    images: ["/og.png"],
    creator: "@indiadex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-slate-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
