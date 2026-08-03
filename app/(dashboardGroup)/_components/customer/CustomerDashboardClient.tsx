/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistory, UserRentalOrders } from "@/lib/type";
import OrderRow from "./OrderRow";
import CheckOutModal from "./CheckOutModal";
import ReviewModal from "./ReviewModal";
import PaymentHistoryTable from "./PaymentHistoryTable";
import ReviewedProductsGrid from "./ReviewedProductsGrid";
interface CustomerDashboardClientProps {
  customerOrders: UserRentalOrders["data"]["usersRentalOrders"];
  paymentHistory: PaymentHistory["data"];
}

export type SingleOrder =
  CustomerDashboardClientProps["customerOrders"][number];

export default function CustomerDashboardClient({
  customerOrders,
  paymentHistory,
}: CustomerDashboardClientProps) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<SingleOrder | null>(null);
  const [reviewOrder, setReviewOrder] = useState<SingleOrder | null>(null);

  const handlePaymentRedirectSuccess = (paymentUrl: unknown) => {
    let finalUrl: string | null = null;

    if (typeof paymentUrl === "string") {
      finalUrl = paymentUrl;
    } else if (
      paymentUrl &&
      typeof paymentUrl === "object" &&
      "paymentUrl" in paymentUrl
    ) {
      finalUrl = (paymentUrl as any).paymentUrl;
    }

    if (finalUrl && finalUrl.startsWith("http")) {
      window.location.href = finalUrl;
    } else {
      console.error("Invalid checkout URL string received:", paymentUrl);
      setSelectedOrder(null);
      router.refresh();
    }
  };

  const reviewedOrders = customerOrders.filter(
    (order) =>
      (order as any).review !== null && (order as any).review !== undefined,
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 font-mono text-xs uppercase tracking-wider mb-4">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="reviews">Reviewed Products</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            {customerOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm font-mono">
                No historical bookings or rental orders logged yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    {[
                      "Item Details",
                      "Rental Window Dates",
                      "Total Price",
                      "Quantity",
                      "Status",
                      "Payment Options",
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
                  {customerOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onPay={setSelectedOrder}
                      onReview={setReviewOrder}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <PaymentHistoryTable payments={paymentHistory} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewedProductsGrid items={reviewedOrders} />
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <CheckOutModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onPaymentSuccess={handlePaymentRedirectSuccess}
        />
      )}

      {reviewOrder && (
        <ReviewModal order={reviewOrder} onClose={() => setReviewOrder(null)} />
      )}
    </div>
  );
}
