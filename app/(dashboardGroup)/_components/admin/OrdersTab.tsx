"use client";

import React, { useState, useMemo } from "react";
import { Calendar, ShoppingBag, DollarSign, Hash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allOrders.slice(start, start + PAGE_SIZE);
  }, [allOrders, page]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[12%] text-xs font-semibold uppercase tracking-wider">
                Order ID
              </TableHead>
              <TableHead className="w-[25%] text-xs font-semibold uppercase tracking-wider">
                Gear Item
              </TableHead>
              <TableHead className="w-[20%] text-xs font-semibold uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="w-[20%] text-xs font-semibold uppercase tracking-wider">
                Rental Dates
              </TableHead>
              <TableHead className="w-[10%] text-xs font-semibold uppercase tracking-wider">
                Total
              </TableHead>
              <TableHead className="w-[5%] text-xs font-semibold uppercase tracking-wider">
                Qty
              </TableHead>
              <TableHead className="w-[8%] text-xs font-semibold uppercase tracking-wider">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-sm text-muted-foreground font-medium"
                >
                  No orders have been recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              pagedOrders.map((o) => (
                <TableRow
                  key={o.id}
                  className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                >
                  <TableCell className="py-3 font-mono text-xs text-muted-foreground max-w-25 truncate">
                    #{o.id.slice(-6)}
                  </TableCell>

                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag
                        size={14}
                        className="text-muted-foreground opacity-70 shrink-0"
                      />
                      <span className="text-sm font-medium tracking-tight truncate max-w-50">
                        {o.gearItem.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-6 w-6 border border-border/80 shadow-sm shrink-0">
                        <AvatarFallback className="bg-green-50 text-green-800 text-[10px] font-bold uppercase">
                          {o.customer.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground tracking-tight truncate max-w-37.5">
                        {o.customer.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar size={12} className="opacity-60" />
                      {formatDate(o.startDate)}
                      <span className="text-muted-foreground/40 mx-0.5">→</span>
                      {formatDate(o.endDate)}
                    </span>
                  </TableCell>

                  <TableCell className="py-3">
                    <span className="inline-flex items-center text-sm font-semibold font-mono text-foreground">
                      <DollarSign size={13} className="-mr-0.5 opacity-80" />
                      {o.totalAmount}
                    </span>
                  </TableCell>

                  <TableCell className="py-3 text-sm font-medium font-mono text-muted-foreground">
                    <div className="flex items-center gap-0.5">
                      <Hash size={11} className="opacity-40" />
                      {o.quantity}
                    </div>
                  </TableCell>

                  <TableCell className="py-3">
                    <StatusBadge status={o.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {allOrders.length > 0 && (
        <AdminPagination
          page={page}
          totalPages={totalPages}
          totalItems={allOrders.length}
          label="orders"
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
