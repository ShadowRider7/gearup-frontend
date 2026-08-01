"use server";

import { cookies } from "next/headers";

export const getCustomerOrderList = async () => {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

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
