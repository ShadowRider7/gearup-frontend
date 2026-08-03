"use server";

export const getCategoryList = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["category"],
    },
  });

  const result = res.json();

  return result;
};
