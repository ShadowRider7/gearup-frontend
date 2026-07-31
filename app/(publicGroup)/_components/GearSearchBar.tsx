"use client";

import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

interface GearSearchBarProps {
  allBrands: string[];
  categories: Array<{ id: string; name: string }>;
  totalItems: number;
}

export function GearSearchBar({
  allBrands,
  categories,
  totalItems,
}: GearSearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);

  const brand = searchParams.get("brand") || "All";
  const availOnly = searchParams.get("isAvailable") === "true";
  const currentCategory = searchParams.get("categoryId") || "All";

  const urlMaxPrice = Number(searchParams.get("maxPrice")) || 100;

  const [localMaxPrice, setLocalMaxPrice] = useState(urlMaxPrice);

  const [prevUrlPrice, setPrevUrlPrice] = useState(urlMaxPrice);

  if (urlMaxPrice !== prevUrlPrice) {
    setLocalMaxPrice(urlMaxPrice);
    setPrevUrlPrice(urlMaxPrice);
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const priceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shared routing engine
  const executeUrlUpdate = (params: URLSearchParams) => {
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateUrlParamImmediate = (key: string, value: string | null) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const params = new URLSearchParams(window.location.search);
    if (value && value !== "All" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    executeUrlUpdate(params);
  };

  const updateUrlParamDebounced = (key: string, value: string | null) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      executeUrlUpdate(params);
    }, 400);
  };

  const updatePriceParamDebounced = (value: string) => {
    if (priceDebounceRef.current) {
      clearTimeout(priceDebounceRef.current);
    }

    priceDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value && value !== "100") {
        params.set("maxPrice", value);
      } else {
        params.delete("maxPrice");
      }
      executeUrlUpdate(params);
    }, 250);
  };

  const clearAllFilters = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters =
    !!searchParams.get("searchTerm") ||
    !!searchParams.get("categoryId") ||
    searchParams.get("brand") !== null ||
    searchParams.get("isAvailable") !== null ||
    searchParams.get("maxPrice") !== null;

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
            onChange={(e) =>
              updateUrlParamDebounced("searchTerm", e.target.value)
            }
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
          {/* Brand Field */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => updateUrlParamImmediate("brand", e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="All">All Brands</option>
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Max Price —{" "}
              <span className="text-primary">${localMaxPrice}/day</span>
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={localMaxPrice}
              onChange={(e) => {
                const val = e.target.value;
                setLocalMaxPrice(Number(val));
                updatePriceParamDebounced(val);
              }}
              className="w-full accent-primary mt-1 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>$1</span>
              <span>$100</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Availability
            </label>
            <label className="inline-flex items-center gap-2.5 text-sm text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availOnly}
                // FIX: Fires routing updates instantly without waiting for React cycle renders
                onChange={(e) => {
                  updateUrlParamImmediate(
                    "isAvailable",
                    e.target.checked ? "true" : null,
                  );
                }}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer transition-transform active:scale-95"
              />
              <span>Show Available Items Only</span>
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          onClick={() => updateUrlParamImmediate("categoryId", null)}
          className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
            currentCategory === "All"
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Categories ({totalItems})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateUrlParamImmediate("categoryId", cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              currentCategory === cat.id
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Global Reset Action Header */}
      {hasActiveFilters && (
        <div className="flex justify-end mb-4">
          <button
            onClick={clearAllFilters}
            className="text-xs font-mono uppercase tracking-wider text-destructive hover:underline"
          >
            Clear All Active Filters
          </button>
        </div>
      )}
    </div>
  );
}
