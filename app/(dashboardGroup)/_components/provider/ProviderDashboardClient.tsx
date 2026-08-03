// components/dashboard/ProviderDashboardClient.tsx
"use client";

import React, { useState } from "react";

import GearTab from "./GearTab";
import OrdersTab from "./OrdersTab";
import { Category, Gear, ProviderRentalOrders } from "@/lib/type";
import TabBar from "./TabBar";
import OverviewTab from "./OverViewTab";

interface ProviderDashboardClientProps {
  categories: Category[];
  gear: Gear[];
  orders: ProviderRentalOrders["data"]["orders"];
}

export default function ProviderDashboardClient({
  categories,
  gear,
  orders,
}: ProviderDashboardClientProps) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-6">
      <TabBar
        tabs={["overview", "gear", "orders"]}
        active={tab}
        onChange={setTab}
      />

      <div className="transition-all duration-200">
        {tab === "overview" && (
          <OverviewTab gearCount={gear.length} orders={orders} />
        )}
        {tab === "gear" && <GearTab categories={categories} gear={gear} />}
        {tab === "orders" && <OrdersTab orders={orders} />}
      </div>
    </div>
  );
}
