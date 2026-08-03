"use client";

import React from "react";

import { ProviderRentalOrders, RentalStatus } from "@/lib/type";
import OrderStatusSelect from "./providerupdateStatus";

interface OrdersTabProps {
  orders: ProviderRentalOrders["data"]["orders"];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No historical rental orders found.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              {["Order Details", "Customer", "Quantity", "Change Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-foreground">
                    {o.gearItem?.name || "Gear Item"}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    ID: {o.id.slice(-6).toUpperCase()}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {o.customer?.name || "Client"}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-foreground">
                  {o.quantity || 1}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusSelect
                    orderId={o.id}
                    currentStatus={o.status as RentalStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
