"use client";

import React from "react";
import { Users, Package, ShoppingBag, TrendingUp } from "lucide-react";
import StatCard from "../shared/StatCard";
import StatusBadge from "../shared/StatusBadge";
import { AllGears, AllOrders, AllUsers } from "@/lib/type";
type Role = "CUSTOMER" | "PROVIDER";
const STATUS_CFG: Record<string, { color: string }> = {
  PLACED: { color: "#f59e0b" }, // Amber
  CONFIRMED: { color: "#3b82f6" }, // Blue
  PAID: { color: "#10b981" }, // Emerald
  PICKED_UP: { color: "#8b5cf6" }, // Purple
  RETURNED: { color: "#22c55e" }, // Green
  CANCELLED: { color: "#ef4444" }, // Red
};
interface OverviewTabProps {
  allUsers: AllUsers["data"]["allUsers"];
  allOrders: AllOrders["data"]["allOrders"];
  allGear: AllGears["data"]["gearItemsList"];
}

export default function OverviewTab({
  allUsers,
  allOrders,
  allGear,
}: OverviewTabProps) {
  const revenue = allOrders
    .filter((o) => ["PAID", "PICKED_UP", "RETURNED"].includes(o.status))
    .reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={allUsers.length} icon={Users} />
        <StatCard
          label="Gear Listings"
          value={allGear.length}
          icon={Package}
          accent
        />
        <StatCard
          label="Total Orders"
          value={allOrders.length}
          icon={ShoppingBag}
        />
        <StatCard
          label="Platform Revenue"
          value={`$${revenue}`}
          sub="confirmed payments"
          icon={TrendingUp}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-foreground mb-5">
            User Breakdown
          </h3>
          {(["CUSTOMER", "PROVIDER"] as Role[]).map((r) => {
            const count = allUsers.filter((u) => u.role === r).length;
            const pct = allUsers.length
              ? Math.round((count / allUsers.length) * 100)
              : 0;
            return (
              <div key={r} className="flex items-center gap-3 mb-4 last:mb-0">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest w-16">
                  {r}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-foreground w-6 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-foreground mb-5">
            Order Status
          </h3>
          <div className="space-y-2.5">
            {Object.keys(STATUS_CFG).map((s) => {
              const count = allOrders.filter((o) => o.status === s).length;
              const pct = allOrders.length
                ? Math.round((count / allOrders.length) * 100)
                : 0;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className="w-28">
                    <StatusBadge status={s} />
                  </div>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: STATUS_CFG[s].color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-4 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
