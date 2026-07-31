import { Skeleton } from "@/components/ui/skeleton";
import { Rating } from "./Rating";
import { useState } from "react";
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

export function GearCard({
  gear,
  onClick,
}: {
  gear: Gear;
  onClick: () => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
        <img
          src={gear.image}
          alt={gear.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        {!gear.available && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
              Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono uppercase tracking-widest bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
            {gear.category}
          </span>
        </div>
        {gear.available && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-mono uppercase bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded backdrop-blur-sm">
              Available
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
          {gear.brand}
        </div>
        <h3 className="font-['Barlow_Condensed'] font-semibold text-base text-foreground leading-tight mb-2 line-clamp-2">
          {gear.name}
        </h3>
        <Rating rating={gear.rating} reviews={gear.reviews} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-['Barlow_Condensed'] font-bold text-primary">
              ${gear.price}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              /day
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground truncate max-w-[100px]">
            {gear.provider}
          </span>
        </div>
      </div>
    </div>
  );
}
