"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Category, Gear } from "@/lib/type";
import { deleteGearItem } from "../../_actions/providerDashboardActions";
import GearFormDialog from "./GearFormDialog";
import GearTableRow from "./GearTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        toast.error(res?.error || res?.message || "Failed to delete item.");
      }
    });
  };

  return (
    <div
      className={`space-y-4 ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}
    >
      <div className="flex justify-end">
        <GearFormDialog categories={categories} mode="create" />
      </div>

      {gear.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl text-muted-foreground text-sm font-medium">
          No gear listed. Add your first item to start accepting rentals.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Item
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Price/Day
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gear.map((g) => (
                <GearTableRow
                  key={g.id}
                  item={g}
                  categories={categories}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
