"use client";

import React from "react";
import { Trash2, Package } from "lucide-react";
import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const hasImage = item.images && item.images[0];
  const isAvailable = (item.stock ?? 0) > 0;

  return (
    <TableRow className="hover:bg-muted/20 transition-colors">
      {/* Product Image and Name Identity Column */}
      <TableCell className="py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-8 rounded bg-muted shrink-0 relative overflow-hidden border border-border/40 flex items-center justify-center">
            {hasImage ? (
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                sizes="40px"
                className="object-cover"
                unoptimized // Bypasses remotePatterns image loading restrictions permanently
              />
            ) : (
              <Package className="h-4 w-4 text-muted-foreground/60" />
            )}
          </div>
          <span className="text-sm font-medium tracking-tight truncate max-w-[200px]">
            {item.name}
          </span>
        </div>
      </TableCell>

      {/* Product Category Group Tracking Column */}
      <TableCell className="py-3 text-xs font-mono text-muted-foreground">
        {item.category?.name || "General"}
      </TableCell>

      {/* Pricing Matrix Numeric Cell */}
      <TableCell className="py-3 text-sm font-semibold font-mono text-foreground">
        ${item.pricePerDay}
      </TableCell>

      {/* Inventory Status Pill Column */}
      <TableCell className="py-3">
        <Badge
          variant={isAvailable ? "secondary" : "destructive"}
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide border ${
            isAvailable
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {isAvailable ? `In Stock (${item.stock})` : "Out of Stock"}
        </Badge>
      </TableCell>

      {/* Modification Settings Command Center Actions Panel */}
      <TableCell className="py-3">
        <div className="flex items-center gap-1">
          <GearFormDialog categories={categories} mode="edit" item={item} />

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(item.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-md"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
