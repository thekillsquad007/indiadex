import { NextRequest, NextResponse } from "next/server";

const TRANSAK_API_KEY = process.env.TRANSAK_API_KEY || "";
const TRANSAK_ENV = process.env.TRANSAK_ENV || "STAGING";

const PRICING_URL =
  TRANSAK_ENV === "PRODUCTION"
    ? "https://api.transak.com/api/v1/pricing/public/quotes"
    : "https://api-stg.transak.com/api/v1/pricing/public/quotes";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const cryptoCurrency = searchParams.get("cryptoCurrency") || "USDT";
  const network = searchParams.get("network") || "ethereum";
  const isBuyOrSell = searchParams.get("isBuyOrSell") || "BUY";

  const isStaging = TRANSAK_ENV !== "PRODUCTION";

  const fiatCurrency = isStaging ? "EUR" : (searchParams.get("fiatCurrency") || "USD");
  const fiatAmount = isStaging ? "100" : (searchParams.get("fiatAmount"));

  if (!fiatAmount) {
    return NextResponse.json(
      { error: "fiatAmount is required" },
      { status: 400 }
    );
  }

  try {
    const params: Record<string, string> = {
      partnerApiKey: TRANSAK_API_KEY,
      fiatCurrency,
      cryptoCurrency,
      network,
      isBuyOrSell,
      fiatAmount,
    };

    if (isStaging) {
      params.paymentMethod = "sepa_bank_transfer";
    }

    const qs = new URLSearchParams(params);
    const res = await fetch(`${PRICING_URL}?${qs.toString()}`);

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      return NextResponse.json(
        { error: "Quote failed", details: err },
        { status: res.status }
      );
    }

    const data = await res.json();
    const quote = data?.response;

    if (!quote || !quote.conversionPrice || quote.conversionPrice <= 0) {
      return NextResponse.json(
        { error: "Invalid quote returned" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      quote: {
        cryptoAmount: quote.cryptoAmount,
        totalFee: quote.totalFee,
        conversionPrice: quote.conversionPrice,
        fiatCurrency: quote.fiatCurrency,
        fiatAmount: quote.fiatAmount,
      },
      env: TRANSAK_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
