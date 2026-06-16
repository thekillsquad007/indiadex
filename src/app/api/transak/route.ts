import { NextRequest, NextResponse } from "next/server";

const TRANSAK_API_KEY = process.env.TRANSAK_API_KEY || "";
const TRANSAK_API_SECRET = process.env.TRANSAK_API_SECRET || "";
const TRANSAK_ENV = process.env.TRANSAK_ENV || "STAGING";

const SESSION_URL =
  TRANSAK_ENV === "PRODUCTION"
    ? "https://api-gateway.transak.com/api/v2/auth/session"
    : "https://api-gateway-stg.transak.com/api/v2/auth/session";

const TOKEN_URL =
  TRANSAK_ENV === "PRODUCTION"
    ? "https://api.transak.com/partners/api/v2/refresh-token"
    : "https://api-stg.transak.com/partners/api/v2/refresh-token";

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-secret": TRANSAK_API_SECRET,
    },
    body: JSON.stringify({ apiKey: TRANSAK_API_KEY }),
  });

  const data = await res.json();

  if (!res.ok || !data?.data?.accessToken) {
    throw new Error(`Auth failed (${res.status}): ${JSON.stringify(data)}`);
  }

  return data.data.accessToken;
}

export async function POST(req: NextRequest) {
  const debug: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: TRANSAK_ENV,
    apiKeyLength: TRANSAK_API_KEY.length,
    apiSecretLength: TRANSAK_API_SECRET.length,
  };

  try {
    if (!TRANSAK_API_KEY || !TRANSAK_API_SECRET) {
      return NextResponse.json(
        { error: "Transak credentials not configured", debug },
        { status: 500 }
      );
    }

    const body = await req.json();
    debug.requestBody = body;

    const productsAvailed = body.productsAvailed === "SELL" ? "SELL" : "BUY";

    const accessToken = await getAccessToken();
    debug.accessTokenLength = accessToken.length;

    const referrerDomain =
      req.headers.get("host") || "indiadexswap.xyz";

    const fiatCurrency = TRANSAK_ENV === "STAGING"
      ? "EUR"
      : (body.fiatCurrency || "INR");

    const fiatAmount = TRANSAK_ENV === "STAGING"
      ? 100
      : (body.fiatAmount || 1000);

    const widgetParams: Record<string, unknown> = {
      apiKey: TRANSAK_API_KEY,
      referrerDomain,
      productsAvailed,
      fiatCurrency,
      cryptoCurrencyCode: body.cryptoCurrencyCode || "USDT",
      network: body.network || "ethereum",
      fiatAmount,
      walletAddress: body.walletAddress,
      paymentMethod: TRANSAK_ENV === "STAGING"
        ? "sepa_bank_transfer"
        : (body.paymentMethod || undefined),
      hideExchangeScreen: true,
      disableWalletAddressForm: true,
    };

    if (body.email) {
      widgetParams.email = body.email;
    }

    if (body.userData) {
      widgetParams.userData = body.userData;
    }
    debug.widgetParams = widgetParams;

    const res = await fetch(SESSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
      },
      body: JSON.stringify({ widgetParams }),
    });

    const data = await res.json();
    debug.sessionStatus = res.status;
    debug.sessionResponse = data;

    if (!res.ok) {
      return NextResponse.json(
        { error: "Session creation failed", debug, transakError: data },
        { status: res.status }
      );
    }

    if (!data?.data?.widgetUrl) {
      return NextResponse.json(
        { error: "No widgetUrl in response", debug, transakResponse: data },
        { status: 500 }
      );
    }

    debug.widgetUrl = data.data.widgetUrl;

    return NextResponse.json({
      widgetUrl: data.data.widgetUrl,
      debug,
    });
  } catch (error) {
    debug.exception = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Server error", debug },
      { status: 500 }
    );
  }
}
