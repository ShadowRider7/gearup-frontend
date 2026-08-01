import { getUser } from "@/service/getUser";
import { GearItems, IUser, ProviderRentalOrders } from "@/lib/type";
import {
  getProviderOrderList,
  providerGearItems,
} from "../../_actions/providerDashboardActions";
import ProviderDashboardClient from "../../_components/ProviderDashboardClient";

export default async function ProviderPage() {
  const user: IUser = await getUser();
  const providerId = user?.data?.userProfile?.id;

  const [ordersResponse, gearResponse]: [ProviderRentalOrders, GearItems] =
    await Promise.all([getProviderOrderList(), providerGearItems(providerId)]);

  const orders = ordersResponse?.data?.orders || [];
  const gear = gearResponse?.data?.gearItemsList?.data || [];

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

        <ProviderDashboardClient gear={gear} orders={orders} />
      </div>
    </div>
  );
}
