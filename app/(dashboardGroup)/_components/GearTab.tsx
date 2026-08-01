// components/dashboard/GearTab.tsx
"use client";

import React, { useTransition } from "react";
import { Plus, Edit3, Trash2, Package } from "lucide-react";

import { Gear } from "@/lib/type";
import { deleteGearItem } from "../_actions/providerDashboardActions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface GearTabProps {
  gear: Gear[];
}

export default function GearTab({ gear }: GearTabProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (gearItemId: string) => {
    if (!confirm("Are you sure you want to permanently remove this gear item?"))
      return;

    startTransition(async () => {
      const res = await deleteGearItem(gearItemId);
      if (res?.success === false) {
        alert(res.error || "Failed to delete item.");
      }
    });
  };

  return (
    <div className={isPending ? "opacity-60 pointer-events-none" : ""}>
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={14} /> List Gear
        </button>
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
                <tr
                  key={g.id}
                  className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                >
                  {/* Optimized Item Cell */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-8 rounded bg-muted flex-shrink-0 relative overflow-hidden">
                        {g.images && g.images[0] ? (
                          <Image
                            src={g.images[0]}
                            alt={g.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                            priority={false}
                          />
                        ) : (
                          <AvatarFallback className="rounded bg-muted flex items-center justify-center w-full h-full">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm text-foreground font-medium line-clamp-1 max-w-[200px]">
                        {g.name}
                      </span>
                    </div>
                  </td>

                  {/* Category Cell */}
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                    {g.category?.name || "General"}
                  </td>

                  {/* Price Cell */}
                  <td className="px-4 py-3 font-mono text-sm text-foreground">
                    ${g.pricePerDay}
                  </td>

                  {/* Status Badge Cell */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-mono uppercase tracking-wide ${(g.stock ?? 0) > 0 || g.isAvailable ? "text-green-400" : "text-muted-foreground"}`}
                    >
                      {(g.stock ?? 0) > 0
                        ? `● Active (${g.stock ?? 1})`
                        : "○ Disabled"}
                    </span>
                  </td>

                  {/* Action Trigger Elements Cell */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        className="text-destructive hover:opacity-70 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
