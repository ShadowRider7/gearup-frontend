"use client";

import React from "react";
import { ProviderRentalOrders, RentalStatus } from "@/lib/type";
import OrderStatusSelect from "./providerupdateStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrdersTabProps {
  orders: ProviderRentalOrders["data"]["orders"];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm font-medium">
          No historical rental orders found.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Order Details
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Quantity
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Change Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow
                key={o.id}
                className="hover:bg-muted/10 transition-colors"
              >
                {/* Order Item and ID Column */}
                <TableCell className="py-3">
                  <div className="text-sm font-medium text-foreground tracking-tight">
                    {o.gearItem?.name || "Gear Item"}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5">
                    ID: #{o.id.slice(-6).toUpperCase()}
                  </div>
                </TableCell>

                {/* Customer Column */}
                <TableCell className="py-3 text-sm text-muted-foreground font-medium">
                  {o.customer?.name || "Client"}
                </TableCell>

                {/* Quantity Column */}
                <TableCell className="py-3 font-mono text-sm text-foreground">
                  {o.quantity || 1}
                </TableCell>

                {/* Status Selector Dropdown Column */}
                <TableCell className="py-3">
                  <div className="max-w-[160px]">
                    <OrderStatusSelect
                      orderId={o.id}
                      currentStatus={o.status as RentalStatus}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
