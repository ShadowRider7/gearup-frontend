"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

export const getCustomerOrderList = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["customer-order"],
    },
  });
  const result = res.json();
  return result;
};
