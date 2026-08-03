"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Category } from "@/lib/type";

interface CategorySelectProps {
  categories: Category[];
  defaultValue?: string;
}

export default function CategorySelect({
  categories,
  defaultValue,
}: CategorySelectProps) {
  return (
    <div className="md:col-span-2 space-y-1">
      <Label
        htmlFor="categoryId"
        className="text-xs font-mono uppercase text-muted-foreground"
      >
        Gear Category
      </Label>
      <select
        id="categoryId"
        name="categoryId"
        required
        defaultValue={defaultValue || ""}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
