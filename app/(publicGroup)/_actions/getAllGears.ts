"use server";

export const getGearList = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();

  if (query) {
    if (query.searchTerm) params.set("searchTerm", String(query.searchTerm));

    if (query.brand && query.brand !== "All") {
      params.set("brand", String(query.brand));
    }

    if (query.categoryId && query.categoryId !== "All") {
      params.set("categoryId", String(query.categoryId));
    }

    if (query.maxPrice) {
      params.set("maxPrice", String(query.maxPrice));
    }

    if (query.isAvailable) {
      params.set("isAvailable", String(query.isAvailable));
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear?${params.toString()}`,
    {
      cache: "no-store",
      next: { tags: ["gear-items"] },
    },
  );
  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unknown backend database crash");
    throw new Error(`Backend Error (${res.status}): ${errorText}`);
  }

  return await res.json();
};
