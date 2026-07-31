"use server";

export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);

    const result = await res.json();

    const gears = Array.isArray(result?.data?.gearItemsList.data)
      ? result.data.gearItemsList.data
      : [];

    const uniqueBrands = (
      Array.from(
        new Set(
          gears
            .map((item: { brand: string }) => item?.brand?.trim())
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
