"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CreditCard, Package, Star } from "lucide-react";
import { SingleOrder } from "./CustomerDashboardClient";
import { returnGear } from "../_actions/customerDashboardActions";
import { toast } from "sonner";

interface OrderRowProps {
  order: SingleOrder;
  onPay: (order: SingleOrder) => void;
  onReview: (order: SingleOrder) => void;
}

export default function OrderRow({ order, onPay, onReview }: OrderRowProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPayable =
    order.status === "CONFIRMED" || order.status === "PAYMENT_INITIATED";
  const isReturnable = order.status === "PICKED_UP";
  const isReturned = order.status === "RETURNED";
  const isReviewed =
    (order as SingleOrder).review !== null &&
    (order as SingleOrder).review !== undefined;
  const gear = order.gearItem || {};

  const handleReturnGear = async () => {
    if (!confirm("Are you sure you want to return this gear item?")) return;
    setIsSubmitting(true);
    try {
      const res = await returnGear(order.id);
      if (res.success) {
        toast("Gear returned successfully!");
        router.refresh();
      } else {
        toast(res.message || "Failed to return gear.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TableRow className="hover:bg-muted/10 transition-colors">
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-8 rounded bg-muted flex-shrink-0 relative overflow-hidden">
            {gear.images && gear.images[0] ? (
              <Image
                src={gear.images[0]}
                alt={gear.name || "Gear"}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="rounded bg-muted flex items-center justify-center w-full h-full">
                <Package className="h-4 w-4 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <span className="text-sm text-foreground font-medium line-clamp-1 max-w-[180px]">
              {gear.name || "Unknown Item"}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground block uppercase">
              {gear.brand || "Brand"}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
        <div className="text-foreground">
          {new Date(order.startDate).toLocaleDateString()}
        </div>
        <div className="text-[10px]">
          to {new Date(order.endDate).toLocaleDateString()}
        </div>
      </TableCell>

      <TableCell className="px-4 py-3 font-mono text-sm text-foreground font-semibold">
        ${(order.totalAmount || 0).toFixed(2)}
      </TableCell>
      <TableCell className="px-4 py-3 font-mono text-sm text-foreground font-semibold">
        {order.quantity || 0}
      </TableCell>

      <TableCell className="px-4 py-3">
        <span
          className={`text-xs font-mono uppercase tracking-wider font-semibold ${
            isReturned || order.status === "PAID"
              ? "text-green-500"
              : order.status === "CONFIRMED"
                ? "text-blue-500 font-bold"
                : order.status === "CANCELLED"
                  ? "text-destructive"
                  : "text-muted-foreground"
          }`}
        >
          {order.status.replace("_", " ")}
        </span>
      </TableCell>

      <TableCell className="px-4 py-3">
        {isPayable ? (
          <Button
            onClick={() => onPay(order)}
            size="sm"
            className="font-mono text-xs uppercase tracking-widest animate-pulse gap-1.5"
          >
            <CreditCard size={12} /> Pay Now
          </Button>
        ) : isReturnable ? (
          <Button
            disabled={isSubmitting}
            onClick={handleReturnGear}
            size="sm"
            variant="secondary"
            className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs uppercase tracking-widest gap-1.5"
          >
            <ArrowLeftRight size={12} /> Return Order
          </Button>
        ) : isReturned ? (
          isReviewed ? (
            <span className="text-xs font-mono text-muted-foreground italic">
              already reviewed
            </span>
          ) : (
            <Button
              onClick={() => onReview(order)}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest gap-1.5"
            >
              <Star size={12} className="fill-current" /> Leave Review
            </Button>
          )
        ) : (
          <span className="text-xs font-mono text-muted-foreground italic">
            No Action Needed
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}
