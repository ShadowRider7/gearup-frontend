"use server";

export const getGearDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
      cache: "no-cache",
    });

    const result = await res.json();

    const gearItem = result?.data?.gearItemDetails;

    return gearItem;
  } catch (error) {
    console.error("Error in getCategoryList server action:", error);
    return [];
  }
};
