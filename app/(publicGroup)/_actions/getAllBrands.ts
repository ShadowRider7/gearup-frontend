"use server";

export const getAllBrands = async () => {
  try {
    // 1. Fetch data with a 24-hour cache and an on-demand revalidation tag
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
      next: {
        revalidate: 60 * 60 * 24, // Cache for 24 hours
        tags: ["brands", "gears"], // Tagged so you can clear it when items change
      },
    });

    const result = await res.json();

    const gears = Array.isArray(result?.data?.gearItemsList?.data)
      ? result.data.gearItemsList.data
      : [];

    // 2. Extract unique brands out of cached response
    const uniqueBrands = (
      Array.from(
        new Set(
          gears
            .map((item: { brand?: string }) => item?.brand?.trim())
            .filter(Boolean),
        ),
      ) as string[]
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...uniqueBrands];
  } catch (error) {
    console.error("Error in getAllBrands server action:", error);
    return ["All"];
  }
};
