import Gears from "./Gear";
import { getGearList } from "../_actions/getAllGears";
import { GearPagination } from "./GearPagination";
import { GearItems } from "@/lib/type";

interface GearsListWrapperProps {
  query: { [key: string]: string | string[] | undefined };
}

export default async function GearsListWrapper({
  query,
}: GearsListWrapperProps) {
  // Only this fetch runs when clicking the pagination buttons
  const gearsResponse = (await getGearList(query)) as GearItems;

  const gearItems = gearsResponse?.data?.gearItemsList?.data || [];
  const meta = gearsResponse?.data?.gearItemsList?.meta || {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  };

  return (
    <div className="space-y-6">
      <Gears gearItems={gearItems} />

      {meta.totalPages > 1 && (
        <GearPagination
          currentPage={Number(meta.page)}
          totalPages={Number(meta.totalPages)}
        />
      )}
    </div>
  );
}
