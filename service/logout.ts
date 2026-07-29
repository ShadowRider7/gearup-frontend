"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/dist/server/request/cookies";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  revalidateTag("my-profile", "max");
};
