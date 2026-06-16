"use client";

import { useEffect, useRef, useCallback } from "react";
import { OnrampWebSDK } from "@onramp.money/onramp-web-sdk";

type Props = {
  appId: number;
  mode: "BUY" | "SELL" | "SWAP";
  coinCode: string;
  network: string;
  fiatCurrency: string;
  fiatAmount: number;
  walletAddress?: string;
  onSuccess?: () => void;
  onClose?: () => void;
};

export default function OnrampModal({
  appId,
  mode,
  coinCode,
  network,
  fiatCurrency,
  fiatAmount,
  walletAddress,
  onSuccess,
  onClose,
}: Props) {
  const sdkRef = useRef<OnrampWebSDK | null>(null);
  const closedRef = useRef(false);

  const close = useCallback(() => {
    if (sdkRef.current && !closedRef.current) {
      closedRef.current = true;
      sdkRef.current.close();
      sdkRef.current = null;
    }
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (sdkRef.current) return;

    const flowTypeMap: Record<string, number> = {
      BUY: 1,
      SELL: 2,
      SWAP: 4,
    };

    const sdk = new OnrampWebSDK({
      appId,
      sandbox: true,
      flowType: flowTypeMap[mode] || 1,
      fiatAmount,
      ...(coinCode && { coinCode }),
      ...(network && { network }),
      ...(walletAddress && { walletAddress }),
      ...(fiatCurrency && { fiatCurrency }),
    });
    sdkRef.current = sdk;

    sdk.on("TX_EVENTS", (event) => {
      if (event.type === "ONRAMP_WIDGET_TX_SUCCESSFUL") {
        onSuccess?.();
      }
    });

    sdk.on("WIDGET_EVENTS", (event) => {
      if (event.type === "ONRAMP_WIDGET_CLOSE_REQUEST_CONFIRMED") {
        close();
      }
    });

    sdk.show();

    return () => {
      if (sdkRef.current && !closedRef.current) {
        closedRef.current = true;
        sdkRef.current.close();
        sdkRef.current = null;
      }
    };
  }, [appId, mode, coinCode, network, fiatCurrency, fiatAmount, walletAddress, onSuccess, close]);

  return null;
}
