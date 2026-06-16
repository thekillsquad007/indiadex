import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = req.headers.get("x-onramp-signature");
  const payload = req.headers.get("x-onramp-payload");

  console.log("[Onramp Webhook] Received:", { eventType: body.eventType, referenceId: body.referenceId, status: body.status, metadata: body.metadata });

  const eventType = body.eventType;
  const referenceId = body.referenceId;
  const status = body.status;

  switch (eventType) {
    case "KYC":
      console.log(`[Onramp] KYC update for user ${referenceId}: ${status}`);
      break;
    case "ONRAMP":
      console.log(`[Onramp] Onramp order ${referenceId}: ${status}`);
      if (status === "FAILED") {
        console.log(`[Onramp] Failure reason:`, body.metadata?.failure_reasons);
      }
      break;
    case "OFFRAMP":
      console.log(`[Onramp] Offramp order ${referenceId}: ${status}`);
      break;
    case "SWAP":
      console.log(`[Onramp] Swap order ${referenceId}: ${status}`);
      break;
    default:
      console.log(`[Onramp] Unknown event:`, body);
  }

  return NextResponse.json({ status: 1, code: 200 });
}
