/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createPayment } from "../../_actions/customerDashboardActions";
import { RentalOrder } from "@/lib/type";

interface ModalProps {
  order: RentalOrder["data"]["rentalOrder"];
  onClose: () => void;
  onPaymentSuccess: (url: string) => void;
}

export default function CheckOutModal({
  order,
  onClose,
  onPaymentSuccess,
}: ModalProps) {
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const gear = order.gearItem || {};
  const itemPrice = gear.pricePerDay || 0;

  const handlePaySubmit = async () => {
    setProcessing(true);
    setErrorMsg("");
    try {
      const result = await createPayment(order.id);

      // Explicitly check for the nested string property
      if (result && result.success && result.data?.paymentUrl) {
        console.log("Raw Server Action Result Data:", result.data);

        // PASS ONLY THE STRING URL, NOT THE WHOLE OBJECT
        onPaymentSuccess(result.data.paymentUrl);
      } else {
        setErrorMsg(
          result.message ||
            "Failed to initialize Stripe payment transaction routing.",
        );
      }
    } catch (err: any) {
      setErrorMsg(
        err.message || "An unexpected error occurred during execution.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Ribbon Info Row Layout */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-white">
          <span className="font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wider text-foreground">
            Secure Booking Checkout
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 text-xl font-sans"
          >
            ×
          </button>
        </div>

        <div className="p-6 bg-white">
          {/* Predefined Item Meta Details Block Row Layout */}
          <div className="flex gap-3 mb-5 p-3 bg-muted/10 border border-border/40 rounded-xl">
            <div className="w-16 h-12 relative overflow-hidden rounded-lg bg-muted shrink-0">
              <Image
                src={
                  gear.images && gear.images[0]
                    ? gear.images[0]
                    : "/placeholder.png"
                }
                alt={gear.name || "Gear Item"}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase">
                {gear.brand || "Brand"}
              </div>
              <div className="font-['Barlow_Condensed'] font-semibold text-foreground text-sm uppercase">
                {gear.name || "Gear"}
              </div>
              <div className="text-xs font-mono text-primary font-bold">
                ${itemPrice}/day
              </div>
            </div>
          </div>

          {/* Locked Read-Only Dates Display Component Box Layout */}
          <div className="grid grid-cols-3 gap-3 mb-4 bg-muted/5 border p-3 rounded-lg text-xs font-mono">
            <div>
              <span className="text-muted-foreground block uppercase text-[10px] tracking-wider mb-0.5">
                Start Date
              </span>
              <span className="text-foreground font-semibold">
                {new Date(order.startDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block uppercase text-[10px] tracking-wider mb-0.5">
                End Date
              </span>
              <span className="text-foreground font-semibold">
                {new Date(order.endDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block uppercase text-[10px] tracking-wider mb-0.5">
                Quantity
              </span>
              <span className="text-foreground font-semibold">
                {order.quantity}
              </span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-mono mb-3">{errorMsg}</p>
          )}

          {/* Financial Totals Breakdown Ledger Block Elements Row Item Lines Container */}
          <div className="space-y-2 py-4 border-t border-b border-border mb-5 text-sm">
            <div className="flex justify-between font-semibold pt-1 border-t border-dashed mt-1">
              <span className="font-['Barlow_Condensed'] text-base uppercase tracking-wider">
                Total Amount Due
              </span>
              <span className="font-['Barlow_Condensed'] text-lg text-primary tracking-wide">
                ${order.totalAmount}
              </span>
            </div>
          </div>

          {/* Action Trigger Buttons Stack Elements Area Section Block */}
          <div className="space-y-2">
            <button
              onClick={handlePaySubmit}
              disabled={processing}
              className="w-full py-3.5 bg-primary text-primary-foreground font-['Barlow_Condensed'] font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Contacting Stripe Gateway…
                </>
              ) : (
                "Authorize & Pay Now"
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors block text-center"
            >
              Close and Review Later
            </button>
          </div>

          <p className="text-center text-[10px] font-mono text-muted-foreground mt-4 border-t pt-3 uppercase tracking-wider">
            Secure 256-bit SSL encrypted connection layout
          </p>
        </div>
      </div>
    </div>
  );
}
