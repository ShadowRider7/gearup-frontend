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

  return (
    <div className="min-h-screen bg-background">
      <AdminClient Users={Users} Gear={Gear} Orders={Orders}></AdminClient>
    </div>
  );
}
