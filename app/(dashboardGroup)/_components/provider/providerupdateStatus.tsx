"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "../../_actions/providerDashboardActions";
import { RentalStatus } from "@/lib/type";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: RentalStatus;
}

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const allowedTransitions: Record<RentalStatus, RentalStatus[]> = {
    PLACED: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["CANCELLED"],
    PAYMENT_INITIATED: ["PAID", "CANCELLED"],
    PAID: ["PICKED_UP"],
    PICKED_UP: ["RETURNED"],
    RETURNED: [],
    CANCELLED: [],
  };

  const options = allowedTransitions[currentStatus] || [];

  if (options.length === 0) {
    return (
      <div className="flex flex-col gap-1.5 w-full max-w-50">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Status
        </span>
        <span className="text-sm font-medium px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-500 block w-full">
          {currentStatus.replace("_", " ")}
        </span>
      </div>
    );
  }

  const handleStatusChange = (orderStatus: RentalStatus) => {
    if (!orderStatus) return;

    startTransition(async () => {
      const response = await updateOrderStatus(orderId, orderStatus);

      if (response.success) {
        router.refresh();
      } else {
        alert(`Error: ${response.error}`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-50">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Change Status
      </label>

      <select
        value=""
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as RentalStatus)}
        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
      >
        <option value="" disabled hidden>
          {isPending
            ? "Updating status..."
            : `${currentStatus.replace("_", " ")} ➔`}
        </option>

        {options.map((status) => (
          <option
            key={status}
            value={status}
            className="text-gray-900 bg-white"
          >
            {status.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
