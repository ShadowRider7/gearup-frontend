"use client";

import React from "react";
import { Trash2, Package } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Category, Gear } from "@/lib/type";
import GearFormDialog from "./GearFormDialog";

interface GearTableRowProps {
  item: Gear;
  onDelete: (id: string) => void;
  categories: Category[];
}

export default function GearTableRow({
  item,
  onDelete,
  categories,
}: GearTableRowProps) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-8 rounded bg-muted shrink-0 relative overflow-hidden">
            {item.images && item.images[0] ? (
              <Image
                src={item.images[0]}
                alt={item.name}
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
            {item.name}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
        {item.category?.name || "General"}
      </td>

      <td className="px-4 py-3 font-mono text-sm text-foreground">
        ${item.pricePerDay}
      </td>

      <td className="px-4 py-3">
        <span
          className={`text-xs font-mono uppercase tracking-wide ${(item.stock ?? 0) > 0 ? "text-green-400" : "text-muted-foreground"}`}
        >
          {(item.stock ?? 0) > 0
            ? `● Active (${item.stock})`
            : "○ Out of Stock"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <GearFormDialog categories={categories} mode="edit" item={item} />

          <button
            onClick={() => onDelete(item.id)}
            className="text-destructive hover:opacity-70 transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
