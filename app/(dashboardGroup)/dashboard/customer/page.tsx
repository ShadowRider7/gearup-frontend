// app/customer/dashboard/page.tsx
import React from "react";
import { getUser } from "@/service/getUser";
import {
  getCustomerOrderList,
  getCustomerPaymentHistory,
} from "../../_actions/customerDashboardActions";
import { Activity, DollarSign, Package } from "lucide-react";
import StatCard from "../../_components/shared/StatCard";
import { PaymentHistory, UserRentalOrders } from "@/lib/type";
import CustomerDashboardClient from "../../_components/customer/CustomerDashboardClient";

export default async function Customer() {
  const user = await getUser();
  const responseOrders: UserRentalOrders = await getCustomerOrderList();
  const customerOrders = responseOrders?.data?.usersRentalOrders || [];
  const paymentHistoryResponse: PaymentHistory =
    await getCustomerPaymentHistory();
  const paymentHistory = paymentHistoryResponse?.data || [];

  const firstName = user?.data?.userProfile?.name?.split(" ")[0] || "User";

  const totalSpent = customerOrders
    .filter((o) => ["PAID", "PICKED_UP", "RETURNED"].includes(o.status))
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">
              Customer Dashboard
            </div>
            <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-foreground">
              Welcome, {firstName}
            </h1>
          </div>
          {user?.data?.userProfile?.status === "ACTIVE" ||
          user?.data?.userProfile?.status ? (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest bg-card border border-border rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Active account
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest bg-card border border-border rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              Suspended account
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Orders"
            value={customerOrders.length}
            icon={Package}
          />
          <StatCard
            label="Active Rentals"
            value={
              customerOrders.filter((o) => o.status === "PICKED_UP").length
            }
            icon={Activity}
            accent
          />
          <StatCard
            label="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            icon={DollarSign}
            sub="lifetime spending"
          />
        </div>

        <CustomerDashboardClient
          paymentHistory={paymentHistory}
          customerOrders={customerOrders}
        />
      </div>
    </div>
  );
}
