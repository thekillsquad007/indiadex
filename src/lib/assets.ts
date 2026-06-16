export type AssetMeta = {
  slug: string;
  symbol: string;
  name: string;
  description: string;
  network: string;
};

export const ASSETS: AssetMeta[] = [
  {
    slug: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    description: "The original cryptocurrency. Buy Bitcoin with local currency in 40+ countries using UPI, bank transfer, debit card, and more.",
    network: "bitcoin",
  },
  {
    slug: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    description: "Buy Ethereum (ETH) with local fiat currency. Supports ERC20, Arbitrum, Optimism, Polygon, and Base networks.",
    network: "ethereum",
  },
  {
    slug: "tether",
    symbol: "USDT",
    name: "Tether",
    description: "Buy USDT stablecoin with local currency. Available on Ethereum (ERC20), Polygon, Arbitrum, Tron (TRC20), Solana, and BNB Smart Chain.",
    network: "ethereum",
  },
  {
    slug: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    description: "Buy USDC stablecoin with fiat currency. Supports Ethereum, Polygon, Arbitrum, Solana, and Base networks.",
    network: "ethereum",
  },
  {
    slug: "solana",
    symbol: "SOL",
    name: "Solana",
    description: "Buy Solana (SOL) with local currency. Fast transactions and low fees on the Solana network.",
    network: "solana",
  },
  {
    slug: "bnb",
    symbol: "BNB",
    name: "BNB",
    description: "Buy BNB with fiat currency. Native token of the BNB Smart Chain (BEP20) ecosystem.",
    network: "bsc",
  },
  {
    slug: "polygon",
    symbol: "MATIC",
    name: "Polygon",
    description: "Buy Polygon (MATIC) with local currency. Layer 2 scaling solution for Ethereum.",
    network: "polygon",
  },
  {
    slug: "ripple",
    symbol: "XRP",
    name: "XRP",
    description: "Buy XRP with fiat currency. Fast, low-cost international payments on the XRP Ledger.",
    network: "xrp",
  },
  {
    slug: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    description: "Buy Dogecoin with local currency. The original meme cryptocurrency.",
    network: "dogecoin",
  },
  {
    slug: "cardano",
    symbol: "ADA",
    name: "Cardano",
    description: "Buy Cardano (ADA) with fiat currency. Proof-of-stake blockchain platform.",
    network: "cardano",
  },
  {
    slug: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    description: "Buy Polkadot (DOT) with local currency. Multi-chain interoperability protocol.",
    network: "polkadot",
  },
  {
    slug: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    description: "Buy Avalanche (AVAX) with fiat currency. High-performance blockchain platform.",
    network: "avalanche",
  },
];

export function findAssetBySlug(slug: string): AssetMeta | undefined {
  return ASSETS.find((a) => a.slug === slug);
}

export function findAssetBySymbol(symbol: string): AssetMeta | undefined {
  return ASSETS.find((a) => a.symbol === symbol);
}
