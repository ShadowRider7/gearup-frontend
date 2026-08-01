import React from "react";

import { getGearDetails } from "../../_actions/getGearDetails";
import { GearDetailsClient } from "../../_components/gearDetailsClient";
import { getUser } from "@/service/getUser";

const GearPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser();
  const gearItem = await getGearDetails(id);

  return (
    <div>
      <GearDetailsClient gearItem={gearItem} user={user}></GearDetailsClient>
    </div>
  );
};

export default GearPage;
