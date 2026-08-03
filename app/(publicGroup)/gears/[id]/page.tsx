import React from "react";

import { getGearDetails } from "../../_actions/getGearDetails";
import { GearDetailsClient } from "../../_components/gearDetailsClient";
import { GearDetailsResponse } from "@/lib/type";

const GearPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const gearItem: GearDetailsResponse["data"]["gearItemDetails"] =
    await getGearDetails(id);

  return (
    <div>
      <GearDetailsClient gearItem={gearItem}></GearDetailsClient>
    </div>
  );
};

export default GearPage;
