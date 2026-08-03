/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { PaymentHistory } from "@/lib/type";

interface PaymentHistoryTableProps {
  payments: PaymentHistory["data"];
}
export type SinglePayment = PaymentHistoryTableProps["payments"][number];

export default function PaymentHistoryTable({
  payments,
}: PaymentHistoryTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {!payments || payments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm font-mono">
          No payment history logs found.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20 hover:bg-muted/20">
              {[
                "Payment ID",
                "Product Name",
                "Quantity",
                "Amount Paid",
                "Processed Date",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: SinglePayment) => {
              const order = payment.rentalOrder || {};
              const gear = order.gearItem || {};

              return (
                <TableRow
                  key={payment.id}
                  className="hover:bg-muted/10 transition-colors font-mono text-xs"
                >
                  <TableCell className="px-4 py-3 font-semibold text-muted-foreground">
                    {payment.stripePaymentIntentId ||
                      `PAY-${payment.id.slice(-8).toUpperCase()}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-sans text-sm font-medium text-foreground">
                    {gear.name || "Unknown Product"}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-sans text-sm font-medium text-foreground">
                    {payment.rentalOrder.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-green-500 font-bold">
                    ${Number(payment.amount || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
