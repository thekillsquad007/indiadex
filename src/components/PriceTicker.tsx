"use client";

import { useEffect, useState } from "react";

type CoinPrice = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
};

const TRACKED_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "tether", symbol: "USDT", name: "Tether" },
  { id: "usd-coin", symbol: "USDC", name: "USD Coin" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
];

export default function PriceTicker() {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    let cancelled = false;

    async function detectCurrency() {
      try {
        const res = await fetch("https://api.country.is/", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const map: Record<string, string> = {
          IN: "inr",
          US: "usd",
          GB: "gbp",
          DE: "eur",
          FR: "eur",
          IT: "eur",
          ES: "eur",
          NL: "eur",
          PT: "eur",
          AT: "eur",
          BE: "eur",
          FI: "eur",
          GR: "eur",
          IE: "eur",
          AU: "aud",
          CA: "cad",
          SG: "sgd",
          AE: "aed",
          JP: "jpy",
          BR: "brl",
        };
        if (data?.country && map[data.country]) {
          if (!cancelled) setCurrency(map[data.country]);
        }
      } catch {
      }
    }

    async function fetchPrices() {
      try {
        const ids = TRACKED_COINS.map((c) => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency}&include_24hr_change=true`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        const next: CoinPrice[] = TRACKED_COINS.map((c) => {
          const entry = data[c.id];
          return {
            id: c.id,
            symbol: c.symbol,
            name: c.name,
            price: entry?.[currency] ?? 0,
            change24h: entry?.[`${currency}_24h_change`] ?? 0,
          };
        });
        setPrices(next);
        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    detectCurrency();
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [currency]);

  const currencySymbol: Record<string, string> = {
    usd: "$",
    inr: "₹",
    eur: "€",
    gbp: "£",
    aud: "A$",
    cad: "C$",
    sgd: "S$",
    aed: "د.إ",
    jpy: "¥",
    brl: "R$",
  };

  const symbol = currencySymbol[currency] || "$";

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (price >= 1) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
    if (price >= 0.01) return price.toLocaleString("en-US", { maximumFractionDigits: 3 });
    return price.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  if (loading) {
    return (
      <div className="border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-2.5 text-xs text-muted overflow-hidden">
            <span className="text-emerald-400">●</span>
            <span>Loading live prices…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-white/5 bg-background/60 backdrop-blur-xl overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="flex items-center gap-6 py-2.5 text-xs overflow-x-auto scrollbar-hide whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-emerald-400 flex-shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium">Live</span>
            </span>
            {prices.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <span className="font-semibold text-foreground">
                  {coin.symbol}
                </span>
                <span className="text-muted">
                  {symbol}
                  {formatPrice(coin.price)}
                </span>
                <span
                  className={
                    coin.change24h >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                >
                  {coin.change24h >= 0 ? "▲" : "▼"}
                  {Math.abs(coin.change24h).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
