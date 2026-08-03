import { getCategoryList } from "@/app/(publicGroup)/_actions/getAllCategory";
import {
  getAllGears,
  getAllRentalOrders,
  getAllUsers,
} from "../../_actions/AdminDashboardAction";
import AdminClient from "../../_components/admin/AdminClient";

export default async function AdminPage() {
  const Users = await getAllUsers();
  const Gear = await getAllGears();
  const Orders = await getAllRentalOrders();
  const categories = await getCategoryList();

  return (
    <div className="min-h-screen bg-background">
      <AdminClient
        Users={Users}
        Gear={Gear}
        Orders={Orders}
        categories={categories}
      ></AdminClient>
    </div>
  );
}
