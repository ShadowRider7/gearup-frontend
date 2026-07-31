import { getAllBrands } from "../_actions/getAllBrands";
import { GearSearchBar } from "../_components/GearSearchBar";

export default async function GearListingPage() {
  // Fetch dynamic brands cleanly on the server
  const brands = await getAllBrands();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Explore Rental Gear</h1>

      {/* Pass it as a prop here */}
      <GearSearchBar allBrands={brands} />

      {/* Your gear catalog displaying cards comes here */}
    </div>
  );
}
