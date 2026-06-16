"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import TransakModal from "./TransakModal";
import OnrampModal from "./OnrampModal";
import LiFiSwapper from "./LiFiSwapper";

type Mode = "BUY" | "SELL" | "SWAP";

type Coin = {
  code: string;
  name: string;
  networks: { id: string; label: string }[];
};

type Fiat = {
  code: string;
  symbol: string;
  country: string;
  flag: string;
  paymentMethods: { id: string; label: string }[];
};

const FALLBACK_COINS: Coin[] = [
  { code: "BTC", name: "Bitcoin", networks: [{ id: "bitcoin", label: "Bitcoin" }] },
  {
    code: "ETH", name: "Ethereum", networks: [
      { id: "ethereum", label: "Ethereum" },
      { id: "arbitrum", label: "Arbitrum" },
      { id: "optimism", label: "Optimism" },
      { id: "polygon", label: "Polygon" },
      { id: "base", label: "Base" },
    ],
  },
  {
    code: "USDT", name: "Tether", networks: [
      { id: "ethereum", label: "Ethereum (ERC20)" },
      { id: "polygon", label: "Polygon" },
      { id: "arbitrum", label: "Arbitrum" },
      { id: "tron", label: "Tron (TRC20)" },
      { id: "solana", label: "Solana" },
      { id: "bsc", label: "BNB Smart Chain" },
    ],
  },
  {
    code: "USDC", name: "USD Coin", networks: [
      { id: "ethereum", label: "Ethereum (ERC20)" },
      { id: "polygon", label: "Polygon" },
      { id: "arbitrum", label: "Arbitrum" },
      { id: "solana", label: "Solana" },
      { id: "base", label: "Base" },
    ],
  },
  { code: "SOL", name: "Solana", networks: [{ id: "solana", label: "Solana" }] },
  { code: "BNB", name: "BNB", networks: [{ id: "bsc", label: "BNB Smart Chain (BEP20)" }] },
  { code: "MATIC", name: "Polygon", networks: [{ id: "polygon", label: "Polygon" }] },
  { code: "XRP", name: "XRP", networks: [{ id: "xrp", label: "XRP Ledger" }] },
];

const FALLBACK_FIATS: Fiat[] = [
  { code: "INR", symbol: "₹", country: "India", flag: "IN", paymentMethods: [{ id: "inr_upi", label: "UPI" }, { id: "inr_bank_transfer", label: "Bank Transfer (IMPS/NEFT)" }] },
  { code: "USD", symbol: "$", country: "United States", flag: "US", paymentMethods: [{ id: "credit_debit_card", label: "Debit/Credit Card" }, { id: "us_bank_transfer", label: "ACH Transfer" }] },
  { code: "EUR", symbol: "€", country: "Europe", flag: "EU", paymentMethods: [{ id: "sepa_bank_transfer", label: "SEPA Bank Transfer" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "GBP", symbol: "£", country: "United Kingdom", flag: "GB", paymentMethods: [{ id: "gbp_bank_transfer", label: "Faster Payments" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "AUD", symbol: "A$", country: "Australia", flag: "AU", paymentMethods: [{ id: "pay_id", label: "PayID" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "CAD", symbol: "C$", country: "Canada", flag: "CA", paymentMethods: [{ id: "interac", label: "Interac e-Transfer" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "SGD", symbol: "S$", country: "Singapore", flag: "SG", paymentMethods: [{ id: "sg_bank_transfer", label: "Bank Transfer" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "AED", symbol: "د.إ", country: "UAE", flag: "AE", paymentMethods: [{ id: "uae_bank_transfer", label: "Bank Transfer" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "JPY", symbol: "¥", country: "Japan", flag: "JP", paymentMethods: [{ id: "japan_bank_transfer", label: "Bank Transfer" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
  { code: "BRL", symbol: "R$", country: "Brazil", flag: "BR", paymentMethods: [{ id: "pix", label: "PIX" }, { id: "credit_debit_card", label: "Debit/Credit Card" }] },
];

const COUNTRY_TO_FIAT: Record<string, string> = {
  IN: "INR", US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", IT: "EUR",
  ES: "EUR", NL: "EUR", PT: "EUR", AT: "EUR", BE: "EUR", FI: "EUR",
  GR: "EUR", IE: "EUR", AU: "AUD", CA: "CAD", SG: "SGD", AE: "AED",
  JP: "JPY", BR: "BRL",
};

const COUNTRY_NAMES: Record<string, string> = {
  IN: "India", US: "United States", GB: "United Kingdom", DE: "Germany",
  FR: "France", IT: "Italy", ES: "Spain", NL: "Netherlands", PT: "Portugal",
  AT: "Austria", BE: "Belgium", FI: "Finland", GR: "Greece", IE: "Ireland",
  AU: "Australia", CA: "Canada", SG: "Singapore", AE: "UAE", JP: "Japan", BR: "Brazil",
};

const COUNTRY_FLAGS: Record<string, string> = {
  IN: "IN", US: "US", GB: "GB", DE: "EU", FR: "EU", IT: "EU", ES: "EU",
  NL: "EU", PT: "EU", AT: "EU", BE: "EU", FI: "EU", GR: "EU", IE: "EU",
  AU: "AU", CA: "CA", SG: "SG", AE: "AE", JP: "JP", BR: "BR",
};

const STORAGE_KEYS = {
  wallet: "indiadex:lastWallet",
  recentCoins: "indiadex:recentCoins",
  fiat: "indiadex:preferredFiat",
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return JSON.parse(v) as T;
  } catch { return fallback; }
}

function writeStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function HeroSwap({
  defaultCoin,
  defaultMode,
  defaultFiat,
  defaultNetwork,
}: {
  defaultCoin?: string;
  defaultMode?: Mode;
  defaultFiat?: string;
  defaultNetwork?: string;
}) {
  const modeDefault = defaultMode || "BUY";
  const coinDefault = defaultCoin || "USDT";
  const fiatDefault = defaultFiat || "INR";
  const netDefault = defaultNetwork || "ethereum";

  const [mode, setMode] = useState<Mode>(modeDefault);
  const [selectedCoin, setSelectedCoin] = useState(coinDefault);
  const [selectedNetwork, setSelectedNetwork] = useState(netDefault);
  const [selectedFiat, setSelectedFiat] = useState(fiatDefault);
  const [fiatAmount, setFiatAmount] = useState("1000");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [widgetUrl, setWidgetUrl] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [onrampOpen, setOnrampOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);

  const [coinsList, setCoinsList] = useState<Coin[]>(FALLBACK_COINS);
  const [fiatsList, setFiatsList] = useState<Fiat[]>(FALLBACK_FIATS);
  const [showAllCoins, setShowAllCoins] = useState(false);

  const [showKycFields, setShowKycFields] = useState(false);
  const [kycFirstName, setKycFirstName] = useState("");
  const [kycLastName, setKycLastName] = useState("");
  const [kycDob, setKycDob] = useState("");
  const [kycAddress, setKycAddress] = useState("");
  const [kycCity, setKycCity] = useState("");
  const [kycZipCode, setKycZipCode] = useState("");

  const hasDefaultCoin = useRef(!!defaultCoin);
  const hasDefaultFiat = useRef(!!defaultFiat);
  const [quote, setQuote] = useState<{ cryptoAmount: number; totalFee: number; conversionPrice: number } | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [isStaging, setIsStaging] = useState(false);
  const [provider, setProvider] = useState<"transak" | "onramp">("transak");
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    const storedWallet = readStorage<string>("", "");
    if (storedWallet) setWalletAddress(storedWallet);

    fetch("/api/transak/fiat-currencies")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.currencies?.length) {
          const mapped: Fiat[] = data.currencies
            .filter((c: { isAllowed: boolean }) => c.isAllowed)
            .map((c: { code: string; name: string; countries?: string[]; paymentMethods?: { id: string; label: string }[] }) => {
              const countryCode = c.countries?.[0] || c.code.slice(0, 2);
              return {
                code: c.code,
                symbol: getSymbolForFiat(c.code),
                country: COUNTRY_NAMES[countryCode] || c.name || c.code,
                flag: COUNTRY_FLAGS[countryCode] || countryCode,
                paymentMethods: c.paymentMethods || [],
              };
            });
          setFiatsList(mapped);
        }
      })
      .catch(() => {});

    fetch("/api/transak/crypto-currencies")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.coins?.length) setCoinsList(data.coins);
      })
      .catch(() => {});

    if (hasDefaultFiat.current) return;

    const storedFiat = readStorage<string | null>(STORAGE_KEYS.fiat, null);
    if (storedFiat && fiatsList.find((f: Fiat) => f.code === storedFiat)) {
      setSelectedFiat(storedFiat);
      return;
    }

    fetch("https://api.country.is/", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.country) return;
        setDetectedCountry(data.country);
        const fiat = COUNTRY_TO_FIAT[data.country];
        if (fiat && fiatsList.find((f: Fiat) => f.code === fiat)) {
          setSelectedFiat(fiat);
        }
      })
      .catch(() => {});

    fetch("/api/transak/crypto-currencies")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.coins?.length) setCoinsList(data.coins);
      })
      .catch(() => {});

    fetch("https://api.country.is/", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.country) return;
        setDetectedCountry(data.country);
        const fiat = COUNTRY_TO_FIAT[data.country];
        if (fiat && fiatsList.find((f) => f.code === fiat)) {
          setSelectedFiat(fiat);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.fiat, selectedFiat);
  }, [selectedFiat]);

  useEffect(() => {
    if (!fiatAmount || Number(fiatAmount) < 100) {
      setQuote(null);
      return;
    }
    const controller = new AbortController();
    setQuoteLoading(true);
    const params = new URLSearchParams({
      fiatCurrency: selectedFiat,
      cryptoCurrency: selectedCoin,
      network: selectedNetwork,
      isBuyOrSell: mode,
      fiatAmount: String(Number(fiatAmount)),
    });
    fetch(`/api/transak/quote?${params}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.quote) {
          setQuote({ cryptoAmount: data.quote.cryptoAmount, totalFee: data.quote.totalFee, conversionPrice: data.quote.conversionPrice });
          if (data.env) setIsStaging(data.env !== "PRODUCTION");
        } else { setQuote(null); }
      })
      .catch(() => {})
      .finally(() => setQuoteLoading(false));
    return () => controller.abort();
  }, [fiatAmount, selectedCoin, selectedNetwork, selectedFiat, mode]);

  const handleModalClose = useCallback(() => setWidgetUrl(null), []);
  const handleOrderSuccess = useCallback((data: unknown) => {
    console.log("[Indiadex] Order successful:", data);
    setOrderSuccess(true);
    setWidgetUrl(null);
    setTimeout(() => setOrderSuccess(false), 5000);
  }, []);

  const fiat = useMemo(
    () => fiatsList.find((f) => f.code === selectedFiat) || fiatsList[0],
    [selectedFiat, fiatsList]
  );
  const coin = useMemo(
    () => coinsList.find((c) => c.code === selectedCoin) || coinsList[0],
    [selectedCoin, coinsList]
  );

  const displayCoins = useMemo(() => {
    if (showAllCoins) return coinsList;
    return coinsList.slice(0, 12);
  }, [coinsList, showAllCoins]);

  const handleCoinChange = (code: string) => {
    setSelectedCoin(code);
    const newCoin = coinsList.find((c) => c.code === code);
    if (newCoin && !newCoin.networks.find((n) => n.id === selectedNetwork)) {
      setSelectedNetwork(newCoin.networks[0].id);
    }
    const recent = readStorage<string[]>(STORAGE_KEYS.recentCoins, []);
    const next = [code, ...recent.filter((c) => c !== code)].slice(0, 4);
    writeStorage(STORAGE_KEYS.recentCoins, next);
  };

  const handleSwap = async () => {
    if (!walletAddress.trim()) {
      setError("Please enter your wallet address");
      return;
    }
    if (!fiatAmount || Number(fiatAmount) < 100) {
      setError(`Minimum amount is ${fiat?.symbol || "₹"}100`);
      return;
    }

    if (provider === "onramp") {
      setOnrampOpen(true);
      return;
    }

    writeStorage(STORAGE_KEYS.wallet, walletAddress.trim());

    setIsLoading(true);
    setError(null);

    try {
      const paymentMethod = fiat?.paymentMethods?.[0]?.id || undefined;
      const body: Record<string, unknown> = {
        productsAvailed: mode,
        cryptoCurrencyCode: selectedCoin,
        network: selectedNetwork,
        fiatCurrency: selectedFiat,
        fiatAmount: Number(fiatAmount),
        walletAddress: walletAddress.trim(),
        paymentMethod,
        email: email.trim() || undefined,
      };

      if (kycFirstName.trim() && kycLastName.trim()) {
        body.userData = {
          firstName: kycFirstName.trim(),
          lastName: kycLastName.trim(),
          dob: kycDob.trim() || undefined,
          address: {
            addressLine1: kycAddress.trim() || undefined,
            city: kycCity.trim() || undefined,
            zipCode: kycZipCode.trim() || undefined,
            country: detectedCountry || undefined,
          },
        };
      }

      const res = await fetch("/api/transak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.widgetUrl) {
        setWidgetUrl(data.widgetUrl);
      } else {
        setError(`${data.error || "Failed"} — check console for details`);
      }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  return (
    <>
      <section className="relative pt-28 pb-24 overflow-hidden" id="swap">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
            <div className="pt-8 lg:pt-16 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 mb-8">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-muted">Live rates · 40+ countries supported</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
                Buy &amp; sell crypto with
                <br />
                <span className="gradient-text">local currency</span>
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-lg">
                Indiadex lets users in 40+ countries buy and sell Bitcoin, Ethereum, USDT and 100+ cryptocurrencies with local fiat. Powered by regulated infrastructure.
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted mb-8">
                {["Buy & sell", "40+ countries", "100+ tokens", "Non-custodial"].map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-4 mb-8">
                <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                  First time? Here&apos;s what to expect
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-foreground">~2 min</p>
                    <p className="text-xs text-muted">Setup time</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">1-time</p>
                    <p className="text-xs text-muted">KYC required</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">30s</p>
                    <p className="text-xs text-muted">Next purchases</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-6 sm:p-8 glow">
                <div className="space-y-5">
                  <div className="inline-flex w-full rounded-lg bg-white/5 border border-white/10 p-1">
                    <button
                      onClick={() => setMode("BUY")}
                      className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                        mode === "BUY"
                          ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setMode("SELL")}
                      className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                        mode === "SELL"
                          ? "bg-violet-500/20 text-violet-200 border border-violet-500/40"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => setMode("SWAP")}
                      className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                        mode === "SWAP"
                          ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      Swap
                    </button>
                  </div>

                  {mode !== "SWAP" && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setProvider("transak")}
                        className={`flex-1 rounded-md py-1.5 text-[11px] font-medium transition-all uppercase tracking-wider ${
                          provider === "transak"
                            ? "bg-white/10 text-foreground"
                            : "text-muted/50 hover:text-muted"
                        }`}
                      >
                        Transak
                      </button>
                      <button
                        onClick={() => setProvider("onramp")}
                        className={`flex-1 rounded-md py-1.5 text-[11px] font-medium transition-all uppercase tracking-wider ${
                          provider === "onramp"
                            ? "bg-white/10 text-foreground"
                            : "text-muted/50 hover:text-muted"
                        }`}
                      >
                        Onramp
                      </button>
                    </div>
                  )}

                  {mode === "SWAP" ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                        <svg className="h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Swap any token across any chain</h3>
                      <p className="text-sm text-muted max-w-xs mx-auto">
                        Bridge and swap between 20+ chains including Ethereum, Solana, Polygon, Arbitrum, and more. Best rates across all DEXs and bridges.
                      </p>
                      <button
                        onClick={() => setSwapOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                      >
                        Launch Swap
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                      <p className="text-xs text-muted">
                        Connect your wallet to swap · 0.75% fee
                      </p>
                    </div>
                  ) : (
                    <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      Country & currency
                      {detectedCountry && (
                        <span className="ml-2 normal-case text-emerald-400/80">· auto-detected</span>
                      )}
                    </label>
                    <select
                      value={selectedFiat}
                      onChange={(e) => setSelectedFiat(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 py-3 px-4 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors appearance-none"
                    >
                      {fiatsList.map((f) => (
                        <option key={f.code} value={f.code} className="bg-[#12121a]">
                          {f.flag} — {f.country} ({f.code} {f.symbol})
                        </option>
                      ))}
                    </select>

                    <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      Select asset
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {displayCoins.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => handleCoinChange(c.code)}
                          className={`rounded-lg px-2 py-2.5 text-center text-sm font-medium transition-all ${
                            selectedCoin === c.code
                              ? "bg-indigo-500/15 border border-indigo-500/40 text-indigo-300"
                              : "bg-white/5 border border-white/5 text-muted hover:border-white/10 hover:text-foreground"
                          }`}
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                    {coinsList.length > 12 && (
                      <button
                        onClick={() => setShowAllCoins(!showAllCoins)}
                        className="mt-2 w-full rounded-lg bg-white/5 hover:bg-white/10 py-2 text-xs text-muted hover:text-foreground transition-colors"
                      >
                        {showAllCoins ? "Show less" : `Show all ${coinsList.length} assets`}
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      Network
                    </label>
                    <select
                      value={selectedNetwork}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 py-3 px-4 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors appearance-none"
                    >
                      {coin?.networks.map((n) => (
                        <option key={n.id} value={n.id} className="bg-[#12121a]">
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      Amount in {fiat?.code || "INR"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-muted">
                        {fiat?.symbol || "₹"}
                      </span>
                      <input
                        type="number"
                        value={fiatAmount}
                        onChange={(e) => setFiatAmount(e.target.value)}
                        min="100"
                        placeholder="1000"
                        className="w-full rounded-lg bg-white/5 border border-white/10 py-3.5 pl-10 pr-4 text-lg font-semibold text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      {[500, 1000, 2500, 5000, 10000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setFiatAmount(String(amount))}
                          className="flex-1 rounded-md bg-white/5 hover:bg-white/10 px-2 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
                        >
                          {fiat?.symbol || "₹"}{amount.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    {fiatAmount && Number(fiatAmount) >= 100 && (
                      <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.03] p-3">
                        {quoteLoading ? (
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Fetching live quote...
                          </div>
                        ) : quote ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted">
                                {mode === "BUY" ? "You'll receive" : "You'll send"}
                              </span>
                              {isStaging && (
                                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  Staging
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between">
                              <span></span>
                              <span className="font-semibold text-foreground text-sm">
                                ~{quote.cryptoAmount.toFixed(4)} {selectedCoin}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted">Rate</span>
                              <span className="text-muted">
                                1 {selectedCoin} ≈ {fiat?.symbol || "$"}{quote.conversionPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted">Fee</span>
                              <span className="text-muted">
                                {fiat?.symbol || "$"}{quote.totalFee.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-muted">Enter an amount to see a live quote</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      {mode === "BUY" ? "Destination wallet address" : "Source wallet address (where you'll send crypto from)"}
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="0x... or your wallet address"
                      className="w-full rounded-lg bg-white/5 border border-white/10 py-3 px-4 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors font-mono"
                    />
                    <p className="text-xs text-muted mt-2">
                      {mode === "BUY"
                        ? `Crypto will be sent directly to this address on the ${coin?.networks.find((n) => n.id === selectedNetwork)?.label || selectedNetwork} network.`
                        : `You'll send ${selectedCoin} from this address. Fiat will be deposited to your verified bank account.`}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      Email <span className="text-muted/60">(optional — speeds up KYC)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-lg bg-white/5 border border-white/10 py-3 px-4 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors"
                    />
                  </div>

                  <div className="border-t border-white/5 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowKycFields(!showKycFields)}
                      className="flex items-center justify-between w-full py-2 text-xs text-muted hover:text-foreground transition-colors"
                    >
                      <span>
                        Pre-fill KYC details
                        <span className="text-muted/60 ml-1">(optional — skip this step)</span>
                      </span>
                      <svg className={`h-3.5 w-3.5 transition-transform ${showKycFields ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {showKycFields && (
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={kycFirstName} onChange={(e) => setKycFirstName(e.target.value)} placeholder="First name" className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                          <input type="text" value={kycLastName} onChange={(e) => setKycLastName(e.target.value)} placeholder="Last name" className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                        </div>
                        <input type="date" value={kycDob} onChange={(e) => setKycDob(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                        <input type="text" value={kycAddress} onChange={(e) => setKycAddress(e.target.value)} placeholder="Address line 1" className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={kycCity} onChange={(e) => setKycCity(e.target.value)} placeholder="City" className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                          <input type="text" value={kycZipCode} onChange={(e) => setKycZipCode(e.target.value)} placeholder="Postal code" className="w-full rounded-lg bg-white/5 border border-white/10 py-2.5 px-3 text-sm text-foreground placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-colors" />
                        </div>
                        <p className="text-xs text-muted">
                          Providing these details skips the Lite KYC screen inside Transak. Your data is sent securely and handled by Transak.
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>
                  )}

                  <button
                    onClick={handleSwap}
                    disabled={isLoading}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold text-white shadow-lg transition-all ${
                      mode === "BUY"
                        ? "gradient-accent shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        : "gradient-success shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Initializing...
                      </>
                    ) : (
                      <>
                        {mode === "BUY"
                          ? `Buy ${selectedCoin} with ${fiat?.symbol || "₹"}${Number(fiatAmount || 0).toLocaleString("en-IN")}`
                          : `Sell ${selectedCoin} for ${fiat?.symbol || "₹"}${Number(fiatAmount || 0).toLocaleString("en-IN")}`}
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-muted">Secured by Transak · KYC handled securely · 40+ countries</span>
                  </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {orderSuccess && (
        <div className="mx-auto max-w-lg mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300 text-center">
          Order placed successfully! Check your wallet for the transaction.
        </div>
      )}

      {widgetUrl && (
        <TransakModal widgetUrl={widgetUrl} onClose={handleModalClose} onOrderSuccess={handleOrderSuccess} />
      )}

      {onrampOpen && (
        <OnrampModal
          appId={2203861}
          mode={mode === "SWAP" ? "SWAP" : mode}
          coinCode={selectedCoin}
          network={selectedNetwork}
          fiatCurrency={selectedFiat}
          fiatAmount={Number(fiatAmount)}
          walletAddress={walletAddress.trim()}
          onSuccess={() => {
            setOrderSuccess(true);
            setOnrampOpen(false);
            setTimeout(() => setOrderSuccess(false), 5000);
          }}
          onClose={() => setOnrampOpen(false)}
        />
      )}

      {swapOpen && (
        <LiFiSwapper onClose={() => setSwapOpen(false)} />
      )}
    </>
  );
}

function getSymbolForFiat(code: string): string {
  const symbols: Record<string, string> = {
    INR: "₹", USD: "$", EUR: "€", GBP: "£", AUD: "A$", CAD: "C$",
    SGD: "S$", AED: "د.إ", JPY: "¥", BRL: "R$", KRW: "₩", TRY: "₺",
    RUB: "₽", ZAR: "R", MYR: "RM", THB: "฿", IDR: "Rp", PHP: "₱",
    VND: "₫", CNY: "¥", HKD: "HK$", NZD: "NZ$", CHF: "Fr", SEK: "kr",
    NOK: "kr", DKK: "kr", PLN: "zł", CZK: "Kč", HUF: "Ft",
  };
  return symbols[code] || code;
}
