"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";

import { Category, Gear } from "@/lib/type";
import { deleteGearItem } from "../../_actions/providerDashboardActions";
import GearFormDialog from "./GearFormDialog";
import GearTableRow from "./GearTableRow";

interface GearTabProps {
  gear: Gear[];
  categories: Category[];
}

export default function GearTab({ gear, categories }: GearTabProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (gearItemId: string) => {
    if (!confirm("Are you sure you want to permanently remove this gear item?"))
      return;

    startTransition(async () => {
      const res = await deleteGearItem(gearItemId);
      if (res?.success !== false) {
        toast.success("Gear item removed successfully");
      } else {
        toast.error(res.error || res.message || "Failed to delete item.");
      }
    });
  };

  return (
    <div className={isPending ? "opacity-60 pointer-events-none" : ""}>
      <div className="flex justify-end mb-4">
        <GearFormDialog categories={categories} mode="create" />
      </div>

      {gear.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl text-muted-foreground text-sm">
          No gear listed. Add your first item to start accepting rentals.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {["Item", "Category", "Price/Day", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {gear.map((g) => (
                <GearTableRow
                  key={g.id}
                  item={g}
                  categories={categories}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
