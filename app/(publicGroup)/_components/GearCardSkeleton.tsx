import { Skeleton } from "@/components/ui/skeleton";

// 1. Single Card Component
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

// 2. Parent Layout Grid Wrapper Component (Matches the layout structure of <Gears />)
export function GearCardSkeleton() {
  // Generates an array of 8 dummy slots to fill the empty grid container
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonCards.map((_, index) => (
        <GearCardSkeletonItem key={index} />
      ))}
    </div>
  );
}
