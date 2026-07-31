import { Suspense } from "react";
import { getAllBrands } from "../_actions/getAllBrands";
import { GearSearchBar } from "../_components/GearSearchBar";
import { GearCardSkeleton } from "../_components/GearCardSkeleton";
import Gears from "../_components/Gear";
import { getGearList } from "../_actions/getAllGears";
import { getCategoryList } from "../_actions/getAllCategory";
import { GearItems } from "@/lib/type";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GearListingPage({ searchParams }: PageProps) {
  const query = await searchParams;

  const [gearsResponse, categories, allBrands] = await Promise.all([
    getGearList(query),
    getCategoryList(),
    getAllBrands(),
  ]);

  const gearResponseTyped = gearsResponse as GearItems;
  const gearItems = gearResponseTyped?.data?.gearItemsList?.data || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Explore Rental Gear</h1>

      <GearSearchBar
        allBrands={allBrands || []}
        categories={categories || []}
        totalItems={gearItems.length}
      />

      <Suspense key={JSON.stringify(query)} fallback={<GearCardSkeleton />}>
        <Gears gearItems={gearItems} />
      </Suspense>
    </div>
  );
}
