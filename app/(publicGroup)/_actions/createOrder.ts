"use server";

import { orderPayload } from "@/lib/type";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = res.json();
  return result;
};
