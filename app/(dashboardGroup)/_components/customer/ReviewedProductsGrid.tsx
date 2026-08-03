/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { SingleOrder } from "./CustomerDashboardClient";

interface ReviewedProductsGridProps {
  items: SingleOrder[];
}

export default function ReviewedProductsGrid({
  items,
}: ReviewedProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.length === 0 ? (
        <div className="col-span-full bg-card border border-border rounded-xl text-center py-12 text-muted-foreground text-sm font-mono">
          No products reviewed yet.
        </div>
      ) : (
        items.map((item) => {
          const review = (item as any).review || {};
          const ratingStars = Number(review.rating || 5);

          return (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-foreground line-clamp-1">
                    {item.gearItem?.name || "Gear Rental Item"}
                  </h4>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">
                    Order Ref: #{item.id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= ratingStars
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 border border-border/60 rounded-lg p-3 flex gap-2.5 items-start">
                <MessageSquare
                  size={14}
                  className="text-muted-foreground mt-0.5 shrink-0"
                />
                <p className="text-xs text-foreground italic leading-relaxed">
                  &ldquo;{review.comment || "No comment left."}&rdquo;
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
