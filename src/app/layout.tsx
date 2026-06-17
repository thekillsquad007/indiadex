import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Indiadex — Cross-Chain Swap Platform | Swap Any Token Across Any Chain",
    template: "%s | Indiadex",
  },
  description:
    "Swap 100+ cryptocurrencies across 20+ chains. Cross-chain swap via LI.FI with best rate routing. Non-custodial, 0.75% flat fee. Built for the world by Aravindkishore S.",
  keywords: [
    "cross chain swap",
    "crypto swap",
    "cross chain bridge",
    "swap crypto",
    "LI.FI swap",
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
    "token swap",
    "decentralized exchange",
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
    title: "Indiadex — Cross-Chain Swap Platform",
    description:
      "Swap 100+ cryptocurrencies across 20+ chains via LI.FI. Non-custodial, 0.75% flat fee. Built for everyone.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Indiadex — Cross-Chain Swap Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indiadex — Cross-Chain Swap Platform",
    description:
      "Swap 100+ cryptocurrencies across 20+ chains. Non-custodial cross-chain swap platform.",
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
    google: "Nv4AlJZ6l8QwMFmEBjh5Ue2UJL8EiZ9V1rI5s0P3cQo",
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
