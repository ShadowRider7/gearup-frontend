// components/dashboard/OverviewTab.tsx
"use client";

import React, { useTransition } from "react";
import { Package, Activity, Clock, Bell } from "lucide-react";
import StatCard from "../_components/StatCard";

import { ProviderRentalOrders, RentalStatus } from "@/lib/type";
import { updateOrderStatus } from "../_actions/providerDashboardActions";

interface OverviewTabProps {
  gearCount: number;
  orders: ProviderRentalOrders["data"]["orders"];
}

export default function OverviewTab({ gearCount, orders }: OverviewTabProps) {
  const [isPending, startTransition] = useTransition();

  const pendingOrders = orders.filter((o) => o.status === "PLACED");
  const activeRentalsCount = orders.filter(
    (o) => o.status === "PICKED_UP",
  ).length;

  const handleDirectConfirm = (orderId: string) => {
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, "CONFIRMED" as RentalStatus);
      if (res?.success === false) {
        alert(res.error || "Failed to confirm order.");
      }
    });
  };

  return (
    <div
      className={`space-y-6 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Gear Listed" value={gearCount} icon={Package} />
        <StatCard
          label="Active Rentals"
          value={activeRentalsCount}
          icon={Activity}
          accent
        />
        <StatCard
          label="Pending"
          value={pendingOrders.length}
          icon={Clock}
          sub="awaiting confirmation"
        />
      </div>

      {/* Quick Confirmation Banner */}
      {pendingOrders.length > 0 && (
        <div className="bg-card border border-primary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={14} className="text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              New orders awaiting confirmation
            </span>
          </div>
          <div className="space-y-2">
            {pendingOrders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/10 border border-border/40"
              >
                <span className="text-sm text-foreground">
                  {o.gearItem?.name || "Unknown Gear"} ·{" "}
                  {o.customer?.name || "Customer"}
                </span>
                <button
                  onClick={() => handleDirectConfirm(o.id)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
