"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Transak, TransakConfig } from "@transak/ui-js-sdk";

type Props = {
  widgetUrl: string;
  onClose: () => void;
  onOrderSuccess: (data: unknown) => void;
};

export default function TransakModal({
  widgetUrl,
  onClose,
  onOrderSuccess,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const transakRef = useRef<Transak | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config: TransakConfig = {
      widgetUrl,
      containerId: "transak-container",
    };

    const transak = new Transak(config);
    transakRef.current = transak;
    transak.init();

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_INITIALISED, () => {
      setStatus("ready");
    });

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      onClose();
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (data: unknown) => {
      onOrderSuccess(data);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, (data: unknown) => {
      setErrorMsg("Order failed. Please try again.");
      console.error("[Indiadex] Transak order failed:", data);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CANCELLED, () => {
      setErrorMsg("Order was cancelled.");
    });

    return () => {
      transak.cleanup();
    };
  }, [widgetUrl, onClose, onOrderSuccess]);

  const handleClose = useCallback(() => {
    if (status === "ready") {
      const confirmed = window.confirm(
        "Are you sure you want to close? Your transaction may not be completed."
      );
      if (!confirmed) return;
    }
    if (transakRef.current) {
      transakRef.current.close();
    }
    onClose();
  }, [onClose, status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-lg h-[600px] max-h-[90vh] rounded-2xl border border-white/10 bg-[#12121a] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
          <span className="text-sm font-medium text-foreground">
            {status === "loading" ? "Loading Transak…" : "Complete your transaction"}
          </span>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "loading" && (
          <div className="flex items-center justify-center h-full shrink-0">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-indigo-400 mx-auto mb-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-sm text-muted">Connecting to Transak…</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mx-4 mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300 shrink-0">
            {errorMsg}
            <button
              onClick={handleClose}
              className="ml-2 underline hover:text-red-200"
            >
              Close
            </button>
          </div>
        )}

        <div
          ref={containerRef}
          id="transak-container"
          className="flex-1 overflow-hidden"
        />
      </div>
    </div>
  );
}
