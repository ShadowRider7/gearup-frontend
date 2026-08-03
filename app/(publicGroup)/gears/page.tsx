import { Suspense } from "react";
import { getAllBrands } from "../_actions/getAllBrands";
import { GearSearchBar } from "../_components/GearSearchBar";
import { GearCardSkeleton } from "../_components/GearCardSkeleton";

import { getCategoryList } from "../_actions/getAllCategory";
import GearsListWrapper from "../_components/GearsListWrapper";
import { categoryResponse } from "@/lib/type";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GearListingPage({ searchParams }: PageProps) {
  const query = await searchParams;

  // 1. These categories and brands are mostly static. Fetch them at layout level.
  const [categoryResponse, allBrands]: [categoryResponse, string[]] =
    await Promise.all([getCategoryList(), getAllBrands()]);
  const categories = categoryResponse.data.categoryList || [];

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Explore Rental Gear</h1>

      {/* 2. Renders instantly. No blocking. */}
      <GearSearchBar
        allBrands={allBrands || []}
        categories={categories || []}
        totalItems={categories.length}
      />

      <Suspense key={JSON.stringify(query)} fallback={<GearCardSkeleton />}>
        <GearsListWrapper query={query} />
      </Suspense>
    </div>
  );
}
