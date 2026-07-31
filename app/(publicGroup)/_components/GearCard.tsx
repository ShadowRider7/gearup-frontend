"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Rating } from "./Rating";
import { useState } from "react";
import Image from "next/image";
import { Gear } from "@/lib/type";

interface GearCardProps {
  gear: Gear;
  onClick?: () => void;
}

export function GearCard({ gear, onClick }: GearCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const cardImage = gear.images?.[0] || "/placeholder-image.jpg";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 rounded-none z-10" />
        )}
        <Image
          src={cardImage}
          alt={gear.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onLoad={() => setImgLoaded(true)}
        />
        {!gear.isAvailable && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center z-20">
            <span className="font-mono text-xs uppercase tracking-widest text-white/80 bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
              Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-xs font-mono uppercase tracking-widest bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
            {gear.category?.name}
          </span>
        </div>
        {gear.isAvailable && (
          <div className="absolute top-3 right-3 z-20">
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
        <Rating
          rating={gear.averageRating}
          reviews={gear._count?.reviews || 0}
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-['Barlow_Condensed'] font-bold text-primary">
              ${gear.pricePerDay}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              /day
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground truncate max-w-[100px]">
            {gear.provider?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
