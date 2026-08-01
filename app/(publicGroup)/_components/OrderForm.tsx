"use client";

import { useActionState, useState, useMemo } from "react";
import { X, Loader2 } from "lucide-react";

import { OrderFormProps } from "@/lib/type";
import { createOrder } from "../_actions/createOrder";

export default function OrderForm({ gearItem, user }: OrderFormProps) {
  const [state, formAction, isPending] = useActionState(createOrder, {
    success: false,
    message: "",
  });

  // Track values tightly in a single state object to trigger UI recalculations dynamically
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
  });

  const todayString = new Date().toISOString().split("T")[0];

  // Handle generic input updates reactively
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, Number(value)) : value,
    }));
  };

  // Compute total days and price automatically without tracking variables separately
  const { days, total } = useMemo(() => {
    if (!formValues.startDate || !formValues.endDate) {
      return { days: 0, total: 0 };
    }

    const start = new Date(formValues.startDate);
    const end = new Date(formValues.endDate);

    // Calculate the absolute difference in milliseconds
    const differenceInTime = end.getTime() - start.getTime();

    // Convert time to total days
    const computedDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    // Guard against negative days (e.g., if end date is chosen before start date)
    if (computedDays <= 0) return { days: 0, total: 0 };

    return {
      days: computedDays,
      total: computedDays * gearItem.pricePerDay * formValues.quantity,
    };
  }, [formValues, gearItem.pricePerDay]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="gearItemId" value={gearItem.id} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            required
            min={todayString}
            value={formValues.startDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            required
            min={formValues.startDate || todayString} // Prevents picking an end date before the start date
            value={formValues.endDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          required
          min={1}
          max={gearItem.stock || 10}
          value={formValues.quantity}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          onKeyDown={(e) => {
            // Prevent decimal inputs
            if (e.key === "." || e.key === ",") e.preventDefault();
          }}
        />
      </div>

      {state?.message && (
        <p
          className={`text-xs font-mono ${state.success ? "text-green-400" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}

      {/* Renders calculations automatically once valid dates are chosen */}
      {days > 0 && (
        <div className="flex justify-between items-center py-3 border-t border-border">
          <span className="text-sm font-mono text-muted-foreground inline-flex items-center gap-1.5">
            {days}d <X className="w-3 h-3 opacity-60" /> ${gearItem.pricePerDay}
            {formValues.quantity > 1 && (
              <>
                <X className="w-3 h-3 opacity-60" /> Qty {formValues.quantity}
              </>
            )}
          </span>
          <span className="font-['Barlow_Condensed'] font-bold text-2xl text-foreground">
            ${total}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !user}
        className="w-full py-3.5 bg-primary text-primary-foreground font-['Barlow_Condensed'] font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
        {!user ? "Sign In to Rent" : isPending ? "Processing..." : "Rent Now"}
      </button>

      <p className="text-center text-xs font-mono text-muted-foreground">
        Free cancellation up to 48h before pickup
      </p>
    </form>
  );
}
