/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftRight, CreditCard, Package } from "lucide-react";
import { useRouter } from "next/navigation";

import CheckOutModal from "./CheckOutModal";
import { UserRentalOrders } from "@/lib/type";

interface CustomerDashboardClientProps {
  customerOrders: UserRentalOrders["data"]["usersRentalOrders"];
}

// Extract the type of a single order item from the array
type SingleOrder = CustomerDashboardClientProps["customerOrders"][number];

export default function CustomerDashboardClient({
  customerOrders,
}: CustomerDashboardClientProps) {
  const router = useRouter();

  // Explicitly tell TypeScript the state can be a SingleOrder or null
  const [selectedOrder, setSelectedOrder] = useState<SingleOrder | null>(null);

  // Update this handler in your CustomerDashboardClient component:
  const handlePaymentRedirectSuccess = (paymentUrl: unknown) => {
    // Defensive check: verify if it's a string, or drill down if it's still an object
    let finalUrl: string | null = null;

    if (typeof paymentUrl === "string") {
      finalUrl = paymentUrl;
    } else if (
      paymentUrl &&
      typeof paymentUrl === "object" &&
      "paymentUrl" in paymentUrl
    ) {
      // Fallback if the modal still passes the object anyway
      finalUrl = (paymentUrl as any).paymentUrl;
    }

    if (finalUrl && finalUrl.startsWith("http")) {
      console.log("Redirecting directly to Stripe:", finalUrl);
      window.location.href = finalUrl;
    } else {
      console.error("Invalid checkout URL string received:", paymentUrl);
      setSelectedOrder(null);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {customerOrders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm font-mono">
            No historical bookings or rental orders logged yet.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {[
                  "Item Details",
                  "Rental Window Dates",
                  "Total Price",
                  "Status",
                  "Payment Options",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => {
                const isPayable =
                  order.status === "CONFIRMED" ||
                  order.status === "PAYMENT_INITIATED";
                const isReturnable = order.status === "PICKED_UP";
                const gear = order.gearItem || {};

                return (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    {/* Item Details Column Layout */}
                    <td className="px-4 py-3">
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
                    </td>

                    {/* Window Dates Column Layout */}
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                      <div className="text-foreground">
                        {new Date(order.startDate).toLocaleDateString()}
                      </div>
                      <div className="text-[10px]">
                        to {new Date(order.endDate).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Total Amount Due Column Layout */}
                    <td className="px-4 py-3 font-mono text-sm text-foreground font-semibold">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </td>

                    {/* Operational Status Badging Column Layout */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                          order.status === "PAID" || order.status === "RETURNED"
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
                    </td>

                    {/* Context Action Interception Trigger Column Layout */}
                    <td className="px-4 py-3">
                      {isPayable ? (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors shadow-sm animate-pulse"
                        >
                          <CreditCard size={12} /> Pay Now
                        </button>
                      ) : isReturnable ? (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                        >
                          <ArrowLeftRight size={12} /> Return Order
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-muted-foreground italic">
                          No Action Needed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Conditional Client Modal Pop-up Activation */}
      {selectedOrder && (
        <CheckOutModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onPaymentSuccess={handlePaymentRedirectSuccess}
        />
      )}
    </div>
  );
}
