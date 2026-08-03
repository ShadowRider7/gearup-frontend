"use server";

import { CategoryState, UserStatus } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export const getAllUsers = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    next: {
      tags: ["users"],
    },
  });

  const result = await res.json();
  return result;
};

export const updateUserStatus = async (userId: string, status: UserStatus) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();
  if (result.success) {
    updateTag("users");
  }
  return result;
};

export const getAllGears = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gear`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    next: {
      tags: ["gears"],
    },
  });

  const result = await res.json();
  return result;
};
export const getAllRentalOrders = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    next: {
      tags: ["rentals"],
    },
  });

  const result = await res.json();
  return result;
};

export const createCategory = async (
  prevState: CategoryState,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/category/create`,
    {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (result.success) {
    updateTag("category");
    updateTag("gear-items");
  }
  return result;
};

export const updateCategory = async (
  categoryId: string,
  prevState: CategoryState,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();
  const payload = {
    name: formData.get("name") ?? "",
    description: formData.get("description") ?? "",
  };
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/category/${categoryId}`,
    {
      method: "PUT",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (result.success) {
    updateTag("category");
  }
  return result;
};
