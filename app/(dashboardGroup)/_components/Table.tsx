"use client";

import React, { useState, useEffect } from "react";
import TableSkeleton from "./TableSkeleton";
import TabBar from "./TabBar";
import { UserRentalOrders } from "@/lib/type";
import Empty from "@/app/(publicGroup)/_components/Empty";
import { CheckCircle, Package, Star } from "lucide-react";
import { toast } from "sonner";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

interface tableProps {
  customerOrders: UserRentalOrders["data"]["usersRentalOrders"];
}

const Table = ({ customerOrders }: tableProps) => {
  const [tab, setTab] = useState<"orders" | "payments" | "reviews">("orders");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [reviews, setReviews] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  // Turn off loading animation when orders arrive from the server
  const isLoading = !customerOrders;
  const handleReviewSubmit = (id: string) => {
    if (!ratings[id]) {
      toast.error("Please pick a star rating first");
      return;
    }
    setSubmitted((prev) => ({ ...prev, [id]: true }));
    toast.success("Review submitted!");
  };

  return (
    <div>
      <TabBar
        tabs={["orders", "payments", "reviews"]}
        active={tab}
        onChange={setTab}
      />

      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : (
        <>
          {/* ORDERS TAB */}
          {tab === "orders" && (
            <div className="space-y-3">
              {customerOrders.length === 0 ? (
                <Empty
                  icon={Package}
                  message="No orders yet"
                  sub="Browse gear to place your first rental"
                />
              ) : (
                customerOrders.map((o) => (
                  <div
                    key={o.id}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-border/60 transition-colors"
                  >
                    <div className="w-16 h-11 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={o.gearItem.images?.[0] || "/placeholder-gear.jpg"}
                        alt={o.gearItem.name || "Gear item"}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Barlow_Condensed'] font-semibold text-foreground truncate">
                        {o.gearItem.name}
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {o.startDate} → {o.endDate}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <StatusBadge status={o.status} />
                      <span className="text-sm font-mono font-medium text-foreground">
                        ${o.totalAmount}
                      </span>
                    </div>
                    {o.status === "CONFIRMED" && (
                      <button
                        onClick={() => toast.info("Redirecting to Stripe…")}
                        className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                      >
                        Pay Now
                      </button>
                    )}
                    {o.status === "RETURNED" && !submitted[o.id] && (
                      <button
                        onClick={() => setTab("reviews")}
                        className="px-3 py-1.5 border border-border text-muted-foreground text-xs font-mono uppercase tracking-widest rounded-lg hover:border-primary/40 hover:text-foreground transition-colors whitespace-nowrap"
                      >
                        Review
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* PAYMENTS TAB */}
          {tab === "payments" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Order ID", "Item", "Date", "Amount", "Status"].map(
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
                  {customerOrders
                    .filter((o) =>
                      ["PAID", "PICKED_UP", "RETURNED"].includes(o.status),
                    )
                    .map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground truncate max-w-[100px]">
                          {o.id}
                        </td>
                        <td className="px-4 py-3 text-foreground text-sm">
                          {o.gearItem.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {o.createdAt}
                        </td>
                        <td className="px-4 py-3 font-mono font-medium text-foreground">
                          ${o.totalAmount}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    ))}
                  {customerOrders.filter((o) =>
                    ["PAID", "PICKED_UP", "RETURNED"].includes(o.status),
                  ).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-sm font-mono text-muted-foreground"
                      >
                        No payment records yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {/* REVIEWS TAB */}
          {tab === "reviews" && (
            <div className="space-y-4">
              {customerOrders.filter((o) => o.status === "RETURNED").length ===
              0 ? (
                <Empty
                  icon={Star}
                  message="No returned orders"
                  sub="Reviews become available after gear is returned"
                />
              ) : (
                customerOrders
                  .filter((o) => o.status === "RETURNED")
                  .map((o) => (
                    <div
                      key={o.id}
                      className="bg-card border border-border rounded-xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-10 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={
                              o.gearItem.images?.[0] || "/placeholder-gear.jpg"
                            }
                            alt={o.gearItem.name || "Gear item"}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-['Barlow_Condensed'] font-semibold text-foreground">
                            {o.gearItem.name}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {o.startDate} → {o.endDate}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <StatusBadge status={o.status} />
                        </div>
                      </div>

                      {submitted[o.id] ? (
                        <div className="flex items-center gap-2 text-green-400 text-sm font-mono bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                          <CheckCircle size={16} /> Review submitted — thank
                          you!
                        </div>
                      ) : (
                        <div className="space-y-3 pt-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  setRatings((p) => ({ ...p, [o.id]: star }))
                                }
                                className="transition-transform active:scale-95"
                              >
                                <Star
                                  size={18}
                                  className={
                                    star <= (ratings[o.id] || 0)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground/30 hover:text-muted-foreground"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                          <textarea
                            placeholder="Share details of your experience..."
                            value={reviews[o.id] || ""}
                            onChange={(e) =>
                              setReviews((p) => ({
                                ...p,
                                [o.id]: e.target.value,
                              }))
                            }
                            className="w-full text-sm p-3 bg-muted/40 border border-border rounded-lg focus:outline-none focus:border-primary/40 resize-none h-20"
                          />
                          <button
                            onClick={() => handleReviewSubmit(o.id)}
                            className="px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-foreground/90 transition-colors"
                          >
                            Submit Review
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
