"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  label: string;
  onPageChange: (page: number | ((p: number) => number)) => void;
}

export function AdminPagination({
  page,
  totalPages,
  totalItems,
  label,
  onPageChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
      <span className="text-xs font-mono text-muted-foreground">
        Page {page} of {totalPages} · {totalItems} {label}
      </span>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 w-8 text-muted-foreground border-border bg-background hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft size={15} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 text-muted-foreground border-border bg-background hover:bg-muted/50 transition-colors"
        >
          <ChevronRight size={15} />
        </Button>
      </div>
    </div>
  );
}
