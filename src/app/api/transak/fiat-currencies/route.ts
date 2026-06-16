import { NextResponse } from "next/server";

const TRANSAK_ENV = process.env.TRANSAK_ENV || "STAGING";

const FIAT_URL =
  TRANSAK_ENV === "PRODUCTION"
    ? "https://api.transak.com/fiat/public/v1/currencies/fiat-currencies"
    : "https://api-stg.transak.com/fiat/public/v1/currencies/fiat-currencies";

export async function GET() {
  try {
    const res = await fetch(FIAT_URL);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch fiat currencies", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    const currencies = (data.response || []).map((c: {
      symbol: string;
      name: string;
      isAllowed: boolean;
      isPopular?: boolean;
      paymentOptions?: { id: string; name: string; isActive?: boolean }[];
      supportingCountries?: string[];
    }) => ({
      code: c.symbol,
      name: c.name,
      isAllowed: c.isAllowed,
      isPopular: c.isPopular || false,
      paymentMethods: (c.paymentOptions || [])
        .filter((p) => p.isActive !== false)
        .map((p) => ({ id: p.id, label: p.name })),
      countries: c.supportingCountries || [],
    }));

    return NextResponse.json({ currencies });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
