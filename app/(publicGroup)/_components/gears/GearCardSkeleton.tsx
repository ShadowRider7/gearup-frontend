import { Skeleton } from "@/components/ui/skeleton";

export function GearCardSkeletonItem() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function GearCardSkeleton() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonCards.map((_, index) => (
        <GearCardSkeletonItem key={index} />
      ))}
    </div>
  );
}
