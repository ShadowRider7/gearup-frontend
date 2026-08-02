"use server";

import { reviewPayload } from "@/lib/type";
import { isAccessTokenExist } from "@/service/refreshToken";
import { updateTag } from "next/cache";

export const getCustomerOrderList = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    next: {
      tags: ["customer-order"],
    },
  });

  const result = await res.json();
  return result;
};

export const createPayment = async (rentalOrderId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rentalOrderId }),
    },
  );

  const result = await res.json();

  if (result.success) {
    updateTag("customer-order");
  }
  return result;
};

export const returnGear = async (rentalOrderId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/return/${rentalOrderId}`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (result.success) {
    updateTag("customer-order");
  }
  return result;
};

export const createReview = async (
  rentalOrderId: string,
  prevState: reviewPayload,
  formdata: FormData,
) => {
  const accessToken = await isAccessTokenExist();
  const payload = {
    rentalOrderId,
    rating: Number(formdata.get("rating")),
    comment: formdata.get("comment") ?? "",
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    updateTag("customer-order");
  }
  return result;
};

export const getCustomerPaymentHistory = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    next: {
      tags: ["payment-history"],
    },
  });

  const result = await res.json();
  return result;
};
