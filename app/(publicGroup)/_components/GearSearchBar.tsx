"use client";

import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

// 1. Define explicit types for your props
interface GearSearchBarProps {
  allBrands: string[];
}

export function GearSearchBar({ allBrands }: GearSearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [brand, setBrand] = useState(searchParams.get("brand") || "All");
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 100,
  );
  const [availOnly, setAvailOnly] = useState(
    searchParams.get("available") === "true",
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrlParams = (key: string, value: string | null) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "All" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);
  };

  return (
    <div className="w-full mb-4">
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            defaultValue={searchParams.get("searchTerm")?.toString() || ""}
            onChange={(e) => updateUrlParams("searchTerm", e.target.value)}
            placeholder="Search gear or brand..."
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
            showFilters
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40"
          }`}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-5 mb-5 grid sm:grid-cols-3 gap-5">
          {/* Brand Selector */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                updateUrlParams("brand", e.target.value);
              }}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {/* 2. Map through the dynamic array prop */}
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Max Price — <span className="text-primary">${maxPrice}/day</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaxPrice(val);
                updateUrlParams("maxPrice", val.toString());
              }}
              className="w-full accent-orange-500 mt-1"
            />
            <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>$10</span>
              <span>$100</span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col justify-center">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-3">
              Availability
            </label>
            <button
              onClick={() => {
                const nextState = !availOnly;
                setAvailOnly(nextState);
                updateUrlParams("available", nextState ? "true" : null);
              }}
              className={`flex items-center gap-2.5 text-sm transition-colors ${availOnly ? "text-primary" : "text-muted-foreground"}`}
            >
              {availOnly ? (
                <ToggleRight size={24} className="text-primary" />
              ) : (
                <ToggleLeft size={24} />
              )}
              <span className="font-mono text-xs uppercase tracking-widest">
                Available only
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
