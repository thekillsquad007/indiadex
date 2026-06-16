import { NextResponse } from "next/server";

const TRANSAK_ENV = process.env.TRANSAK_ENV || "STAGING";

const CRYPTO_URL =
  TRANSAK_ENV === "PRODUCTION"
    ? "https://api.transak.com/cryptocoverage/api/v1/public/crypto-currencies"
    : "https://api-stg.transak.com/cryptocoverage/api/v1/public/crypto-currencies";

export async function GET() {
  try {
    const res = await fetch(CRYPTO_URL);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch crypto currencies", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();

    const networkNames: Record<string, string> = {
      ethereum: "Ethereum (ERC20)",
      polygon: "Polygon",
      arbitrum: "Arbitrum",
      tron: "Tron (TRC20)",
      solana: "Solana",
      bsc: "BNB Smart Chain",
      bnb: "BNB Smart Chain",
      base: "Base",
      optimism: "Optimism",
      avalanche: "Avalanche C-Chain",
      avalanche_cchain: "Avalanche C-Chain",
    };

    const coinMap = new Map<string, {
      code: string;
      name: string;
      isPopular: boolean;
      isStable: boolean;
      networks: { id: string; label: string }[];
      uniqueIds: string[];
    }>();

    for (const c of data.response || []) {
      const symbol = c.symbol;
      const netId = c.network?.name || "ethereum";
      const netLabel = networkNames[netId] || netId;

      if (!coinMap.has(symbol)) {
        coinMap.set(symbol, {
          code: symbol,
          name: c.name,
          isPopular: c.isPopular || false,
          isStable: c.isStable || false,
          networks: [],
          uniqueIds: [],
        });
      }

      const entry = coinMap.get(symbol)!;
      if (!entry.networks.find((n) => n.id === netId)) {
        entry.networks.push({ id: netId, label: netLabel });
      }
      if (c.uniqueId) {
        entry.uniqueIds.push(c.uniqueId);
      }
    }

    const coins = Array.from(coinMap.values())
      .filter((c) => c.networks.length > 0)
      .sort((a, b) => {
        if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
        if (a.isStable !== b.isStable) return a.isStable ? -1 : 1;
        return a.code.localeCompare(b.code);
      });

    return NextResponse.json({ coins });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
