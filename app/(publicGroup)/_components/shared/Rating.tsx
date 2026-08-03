import { Star } from "lucide-react";

export function Rating({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={10}
            className={
              i <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground"
            }
          />
        ))}
      </div>
      <span className="text-xs font-mono text-muted-foreground">
        {rating} ({reviews})
      </span>
    </div>
  );
}
