"use server";

export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gear`, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["brands", "gears"],
      },
    });

    const result = await res.json();

    const gears = Array.isArray(result?.data?.gearItemsList)
      ? result.data.gearItemsList
      : [];

    const uniqueBrands = (
      Array.from(
        new Set(
          gears
            .map((item: { brand?: string }) => item?.brand?.trim())
            .filter(Boolean),
        ),
      ) as string[]
    ).sort((a, b) => a.localeCompare(b));

    return [...uniqueBrands];
  } catch (error) {
    console.error("Error in getAllBrands server action:", error);
    return [];
  }
};
