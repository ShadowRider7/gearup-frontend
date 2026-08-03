"use server";

import { gearPayload, RentalStatus } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export const getProviderOrderList = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders`,
    {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["provider-order"],
      },
    },
  );
  const result = res.json();
  return result;
};

export const getProviderIncomingOrders = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/incomingOrders`,
    {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["incoming-order"],
      },
    },
  );
  const result = res.json();

  return result;
};

export const addGearItem = async (
  prevState: gearPayload,
  formData: FormData,
) => {
  const payload = {
    categoryId: formData.get("categoryId") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    brand: formData.get("brand") as string,
    pricePerDay: Number(formData.get("pricePerDay")),
    stock: Number(formData.get("stock")),
    images: (formData.get("images") as string).split(","),
    specifications: JSON.parse(formData.get("specifications") as string),
  };
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    updateTag("provider-gears");
  }
  return result;
};

export const updateGearItem = async (
  gearItemId: string,
  prevState: gearPayload,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    brand: formData.get("brand")?.toString() || "",
    pricePerDay: Number(formData.get("pricePerDay")) || 0,
    stock: Number(formData.get("stock")) || 0,
    images: formData.get("images")
      ? (formData.get("images") as string).split(",")
      : [],
    specifications: formData.get("specifications")
      ? JSON.parse(formData.get("specifications") as string)
      : {},
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${gearItemId}`,
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
    updateTag("provider-gears");
  }
  return result;
};
export const providerGearItems = async (providerId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear?providerId=${providerId}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["provider-gears"],
      },
    },
  );
  const result = res.json();
  return result;
};
export const deleteGearItem = async (gearItemId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${gearItemId}`,
    {
      method: "DELETE",
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
    },
  );
  const result = await res.json();
  if (result.success) {
    updateTag("provider-gears");
  }
  return result;
};
export const updateOrderStatus = async (
  orderId: string,
  status: RentalStatus,
) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`,
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
    updateTag("provider-order");
  }

  return result;
};
export const getLowStockGears = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/stock`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["provider-lowStock"],
    },
  });
  const result = res.json();
  return result;
};

export const getCategoryList = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["category"],
    },
  });
  const result = res.json();
  return result;
};
