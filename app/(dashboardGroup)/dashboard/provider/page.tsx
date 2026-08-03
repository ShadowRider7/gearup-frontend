import { getUser } from "@/service/getUser";
import {
  Category,
  categoryResponse,
  GearItems,
  IUser,
  ProviderRentalOrders,
} from "@/lib/type";
import {
  getProviderOrderList,
  providerGearItems,
} from "../../_actions/providerDashboardActions";
import ProviderDashboardClient from "../../_components/provider/ProviderDashboardClient";
import { getCategoryList } from "@/app/(publicGroup)/_actions/getAllCategory";

export default async function ProviderPage() {
  const user: IUser = await getUser();
  const providerId = user?.data?.userProfile?.id;

  const [ordersResponse, gearResponse, categoryResponse]: [
    ProviderRentalOrders,
    GearItems,
    categoryResponse,
  ] = await Promise.all([
    getProviderOrderList(),
    providerGearItems(providerId),
    getCategoryList(),
  ]);

  const orders = ordersResponse?.data?.orders || [];
  const gear = gearResponse?.data?.gearItemsList?.data || [];
  const categories = categoryResponse?.data?.categoryList || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">
            Provider Dashboard
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-foreground">
            {user?.data?.userProfile?.name || "Provider Profile"}
          </h1>
        </div>

        <ProviderDashboardClient
          categories={categories}
          gear={gear}
          orders={orders}
        />
      </div>
    </div>
  );
}
