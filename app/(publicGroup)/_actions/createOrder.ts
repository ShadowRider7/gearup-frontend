"use server";

import { orderPayload } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const createOrder = async (
  prevState: orderPayload,
  formData: FormData,
) => {
  const payload = {
    gearItemId: formData.get("gearItemId") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    quantity: Number(formData.get("quantity")),
  };
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag("customer-order", {
      expire: 0,
    });
  }
  return result;
};
