"use server";

export const getGearDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["gear-details"],
      },
    });

    const result = await res.json();

    const gearItem = result?.data?.gearItemDetails;

    return gearItem;
  } catch (error) {
    console.error("Error in getCategoryList server action:", error);
    return [];
  }
};
