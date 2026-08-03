/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useTransition } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import {
  AdminTabtype,
  AllGears,
  AllOrders,
  AllUsers,
  categoryResponse,
  UserStatus,
} from "@/lib/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "sonner";
import { updateUserStatus } from "../../_actions/AdminDashboardAction";
import OrdersTab from "./OrdersTab";
import GearTab from "./GearTab";
import UsersTab from "./UsersTab";
import OverviewTab from "./OverviewTab";
import { useRouter } from "next/navigation";
import CategoryTab from "./CategoryTab";

interface AdminPageProps {
  Users: AllUsers;
  Gear: AllGears;
  Orders: AllOrders;
  categories: categoryResponse;
}

const AdminClient = ({ Users, Gear, Orders, categories }: AdminPageProps) => {
  // Added "categories" union option to prevent type constraint errors
  const [tab, setTab] = useState<AdminTabtype | "categories">("overview");
  const [loading, setLoading] = useState(true);

  const allUsers = Users?.data?.allUsers || [];
  const allGear = Gear?.data?.gearItemsList || [];
  const allOrders = Orders?.data?.allOrders || [];
  const allCategories = categories?.data?.categoryList || [];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUserToggle = async (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    if (!user) return;

    const isCurrentlyActive = user.status.toUpperCase() === "ACTIVE";
    const nextStatus = isCurrentlyActive
      ? UserStatus.SUSPENDED
      : UserStatus.ACTIVE;

    try {
      const res = await updateUserStatus(userId, nextStatus);

      if (res.success) {
        toast.success("Status updated!");

        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(res.message || "Failed to update user.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    }
  };

  if (loading) return <LoadingSkeleton />;
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Isolated Header Row */}
      <div className="mb-8">
        <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">
          Admin Dashboard
        </div>
        <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-foreground">
          Platform Overview
        </h1>
      </div>

      {/* Modular Navigation View Router */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as any)}
        className="w-full"
      >
        {/* FIXED: Shifted grid layout calculation step from grid-cols-4 to grid-cols-5 */}
        <TabsList className="grid w-full max-w-xl grid-cols-5 font-mono text-xs uppercase tracking-wider mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="gear">Gear</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <OverviewTab
            allUsers={allUsers}
            allOrders={allOrders}
            allGear={allGear}
          />
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <UsersTab
            isPending={isPending}
            allUsers={allUsers}
            handleUserToggle={handleUserToggle}
          />
        </TabsContent>

        <TabsContent value="gear" className="mt-0">
          <GearTab allGear={allGear} />
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <CategoryTab allCategories={allCategories} allGear={allGear} />
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <OrdersTab allOrders={allOrders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminClient;
