"use client";

import { useActionState, useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { OrderFormProps } from "@/lib/type";
import { createOrder } from "../../_actions/createOrder";
import { toast } from "sonner";

export default function OrderForm({ gearItem, user }: OrderFormProps) {
  const [state, formAction, isPending] = useActionState(createOrder, null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(
        "Order placed successfully! Wait for the Provider to confirm your booking.Check the dashboard later",
      );
    } else {
      toast.error(state.message || "Order processing failed.");
    }
  }, [state]);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 3600 * 24));

  const isValidRange = days > 0 && startDate && endDate;
  const total = isValidRange ? days * gearItem.pricePerDay * quantity : 0;

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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            min={startDate || todayString}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          onKeyDown={(e) =>
            ["-", "+", ".", ","].includes(e.key) && e.preventDefault()
          }
        />
      </div>

      {isValidRange && (
        <div className="flex justify-between items-center py-3 border-t border-border">
          <span className="text-sm font-mono text-muted-foreground inline-flex items-center gap-1.5">
            {days}d <X className="w-3 h-3 opacity-60" /> ${gearItem.pricePerDay}
            {quantity > 1 && (
              <>
                <X className="w-3 h-3 opacity-60" /> Qty {quantity}
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
