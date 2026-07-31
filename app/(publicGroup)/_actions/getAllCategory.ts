"use server";

export const getCategoryList = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["category"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await res.json();

    const categoryList = result?.data?.categoryList || [];

    return categoryList;
  } catch (error) {
    console.error("Error in getCategoryList server action:", error);
    return [];
  }
};
