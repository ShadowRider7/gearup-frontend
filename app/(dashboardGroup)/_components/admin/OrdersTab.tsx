"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPagination } from "./AdminPagination";
import { AllOrders } from "@/lib/type";
import StatusBadge from "../shared/StatusBadge";

const PAGE_SIZE = 10;

interface OrdersTabProps {
  allOrders: AllOrders["data"]["allOrders"];
}

export default function OrdersTab({ allOrders = [] }: OrdersTabProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allOrders.length / PAGE_SIZE);
  const pagedOrders = allOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/20 hover:bg-muted/20">
              {[
                "Order ID",
                "Item",
                "Customer",
                "Dates",
                "Total",
                "Quantity",
                "Status",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedOrders.map((o) => (
              <TableRow
                key={o.id}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
              >
                <TableCell className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {o.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {o.gearItem.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
                  {o.customer.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {new Date(o.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  →{" "}
                  {new Date(o.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className="px-4 py-3 font-mono text-sm text-foreground">
                  ${o.totalAmount}
                </TableCell>
                <TableCell className="px-4 py-3 font-mono text-sm text-foreground">
                  ${o.quantity}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={allOrders.length}
        label="orders"
        onPageChange={setPage}
      />
    </div>
  );
}
