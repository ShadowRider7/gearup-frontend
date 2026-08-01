import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = ({
  rows = 5,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex gap-6">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="border-b border-border last:border-0 px-4 py-3.5 flex gap-6 items-center"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className={`h-3.5 ${c === 0 ? "flex-2" : "flex-1"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
