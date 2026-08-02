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

    // Correctly placed within the safe scope of the `if (query)` boundary condition check
    if (query.page) {
      params.set("page", String(query.page));
    }

    if (query.limit) {
      params.set("limit", String(query.limit));
    }
  } // This closes 'if (query)' perfectly now

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear?${params.toString()}`,
    {
      next: {
        revalidate: 60,
        tags: ["gear-items"],
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch gear items: ${res.statusText}`);
  }

  return await res.json();
};
