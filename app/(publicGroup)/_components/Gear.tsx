import {
  Package,
  Search,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Empty from "../_components/Empty";
import { GearCard } from "../_components/GearCard";
import { GearCardSkeleton } from "../_components/GearCardSkeleton";
import { useEffect, useMemo, useState } from "react";
import { ALL_GEAR } from "../gears/page";

interface Gear {
  id: string;
  name: string;
  category: string;
  price: number;
  brand: string;
  available: boolean;
  image: string;
  images: string[];
  provider: string;
  providerId: string;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, string>;
}
const BRANDS = Array.from(new Set(ALL_GEAR.map((g) => g.brand))).sort();
const CATEGORIES = [
  "All",
  "Climbing",
  "Water Sports",
  "Snow Sports",
  "Cycling",
  "Camping",
  "Racket Sports",
  "Clothing",
];

const Gears = ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [availOnly, setAvailOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const allBrands = useMemo(() => ["All", ...BRANDS], []);

  const filtered = useMemo(
    () =>
      gear.filter((g) => {
        if (availOnly && !g.available) return false;
        if (category !== "All" && g.category !== category) return false;
        if (brand !== "All" && g.brand !== brand) return false;
        if (g.price > maxPrice) return false;
        if (
          search &&
          !g.name.toLowerCase().includes(search.toLowerCase()) &&
          !g.brand.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [gear, search, category, brand, availOnly, maxPrice],
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gear or brand..."
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${showFilters ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      {/* Expandable filter panel */}
      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-5 mb-5 grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {allBrands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
              Max Price — <span className="text-primary">${maxPrice}/day</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 mt-1"
            />
            <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
              <span>$10</span>
              <span>$100</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-3">
              Availability
            </label>
            <button
              onClick={() => setAvailOnly(!availOnly)}
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

      {/* Category pills */}
      <div
        className="flex gap-2 mb-8 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all ${
              category === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {loading
            ? "Loading..."
            : `${filtered.length} ${filtered.length === 1 ? "item" : "items"} found`}
        </span>
        {(search ||
          category !== "All" ||
          brand !== "All" ||
          availOnly ||
          maxPrice < 100) &&
          !loading && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setBrand("All");
                setAvailOnly(false);
                setMaxPrice(100);
              }}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              Clear filters
            </button>
          )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <GearCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((g) => (
            <GearCard key={g.id} gear={g} onClick={() => onGearClick(g)} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <Empty
          icon={Package}
          message="No gear found"
          sub="Try adjusting your search or filters"
        />
      )}
    </div>
  );
};

export default Gears;
