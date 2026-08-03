"use client";

import React from "react";
import CategoryFormDialog from "./CategoryFormDialog";
import { AllGears, Category } from "@/lib/type";

interface CategoryTabProps {
  allCategories: Category[];
  allGear: AllGears["data"]["gearItemsList"];
}

const CategoryTab = ({ allCategories, allGear }: CategoryTabProps) => {
  const getGearCount = (categoryId: string) => {
    return allGear.filter(
      (gear) => (gear.category?.id || gear.categoryId) === categoryId,
    ).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-mono uppercase tracking-wider text-foreground">
          Manage Categories
        </h2>
        <CategoryFormDialog mode="create" />
      </div>

      <div className="border border-border rounded-md overflow-hidden bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4">Category Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Gear Count</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {allCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-muted-foreground font-mono text-xs"
                >
                  No Categories Found.
                </td>
              </tr>
            ) : (
              allCategories.map((category) => (
                <tr key={category.id} className="hover:bg-muted/30 transition">
                  <td className="p-4 font-medium text-foreground">
                    {category.name}
                  </td>
                  <td className="p-4 text-muted-foreground max-w-xs truncate">
                    {category.description || "—"}
                  </td>
                  <td className="p-4 text-center font-mono text-xs text-foreground">
                    {getGearCount(category.id)}
                  </td>
                  <td className="p-4 text-right">
                    <CategoryFormDialog mode="edit" item={category} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTab;
