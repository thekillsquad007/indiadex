"use client";

import { LiFiWidget, type WidgetConfig } from "@lifi/widget";
import { EthereumProvider } from "@lifi/widget-provider-ethereum";
import { WalletManagementProviders } from "@lifi/wallet-management";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
};

const queryClient = new QueryClient();

const config: WidgetConfig = {
  integrator: "Indiadex",
  apiKey: process.env.NEXT_PUBLIC_LI_FI_API_KEY || "",
  providers: [EthereumProvider()],
  theme: {
    colorSchemes: {
      dark: {
        palette: {
          primary: { main: "#818cf8" },
          secondary: { main: "#a78bfa" },
          background: { default: "#0f0f17", paper: "#181825" },
          text: { primary: "#e2e8f0", secondary: "#94a3b8" },
          error: { main: "#ef4444" },
          warning: { main: "#f59e0b" },
          success: { main: "#22c55e" },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
    container: {
      border: "none",
      borderRadius: "16px",
      height: "100%",
      minHeight: "600px",
    },
  },
  appearance: "dark",
  feeConfig: {
    name: "Indiadex",
    fee: 0.0075,
    showFeePercentage: true,
    showFeeTooltip: true,
  },
  variant: "wide",
};

export default function LiFiSwapper({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[480px] mx-4 max-h-[90vh] overflow-auto rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-foreground">Swap across chains</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <QueryClientProvider client={queryClient}>
          <WalletManagementProviders>
            <LiFiWidget {...config} />
          </WalletManagementProviders>
        </QueryClientProvider>
      </div>
    </div>
  );
}
