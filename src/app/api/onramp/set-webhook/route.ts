import { NextRequest, NextResponse } from "next/server";

const ONRAMP_API_KEY = process.env.ONRAMP_API_KEY || "";
const ONRAMP_API_SECRET = process.env.ONRAMP_API_SECRET || "";
const ONRAMP_ENV = process.env.ONRAMP_ENV || "SANDBOX";

const BASE_URL = ONRAMP_ENV === "PRODUCTION"
  ? "https://api.onramp.money"
  : "https://api-test.onramp.money";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webhookUrl = body.webhookUrl;

    if (!webhookUrl) {
      return NextResponse.json({ error: "webhookUrl is required" }, { status: 400 });
    }

    if (!ONRAMP_API_KEY || !ONRAMP_API_SECRET) {
      return NextResponse.json({ error: "Onramp credentials not configured" }, { status: 500 });
    }

    const payload = JSON.stringify({ webhookUrl });

    const res = await fetch(`${BASE_URL}/onramp/api/v1/merchant/setWebhookUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": ONRAMP_API_KEY,
        "secret": ONRAMP_API_SECRET,
      },
      body: payload,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
