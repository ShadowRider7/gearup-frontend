"use server";

export const getAllBrands = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
      next: { revalidate: 3600 }, // Cache brands for 1 hour to boost performance
    });

    if (!res.ok) {
      throw new Error("Failed to fetch gears from database");
    }

    const result = await res.json();
    const gears = result?.data?.gearItemsList || [];

    // Extract unique brands and discard undefined/null values
    const uniqueBrands = Array.from(
      new Set(
        gears
          .map((item: { brand: string }) => item?.brand?.trim())
          .filter(Boolean),
      ),
    );

    // Return the unique array pre-sorted alphabetically
    return ["All", ...uniqueBrands.sort()];
  } catch (error) {
    console.error("Error in getAllBrands server action:", error);
    return ["All"]; // Fallback value so the UI doesn't crash
  }
};
