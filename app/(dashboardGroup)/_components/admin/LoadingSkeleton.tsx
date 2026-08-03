"use client";

import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "../TableSkeleton";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 font-mono" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <TableSkeleton />
      </div>
    </div>
  );
}
