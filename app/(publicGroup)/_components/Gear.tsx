"use client";

import { Package } from "lucide-react";
import Empty from "../_components/Empty";
import { GearCard } from "../_components/GearCard";
import { Gear } from "@/lib/type";
import { useRouter } from "next/navigation";

interface GearsProps {
  gearItems: Gear[];
}

const Gears = ({ gearItems }: GearsProps) => {
  const router = useRouter();

  const handleGearDetails = (gearId: string) => {
    console.log(gearId);
    router.push(`/gears/${gearId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {gearItems.length === 0 ? (
        <Empty
          message="No gear found"
          sub="Try adjusting your filters or search terms."
          icon={Package}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {gearItems.map((g: Gear) => (
            <GearCard
              onClick={() => handleGearDetails(g.id)}
              key={g.id}
              gear={g}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gears;
