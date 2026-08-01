"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, MapPin, X } from "lucide-react";
import { Rating } from "./Rating";
import { Gear, IUser, OrderFormProps } from "@/lib/type";
import Image from "next/image";
import OrderForm from "./OrderForm";

export function GearDetailsClient({ gearItem, user }: OrderFormProps) {
  const router = useRouter();
  const handleChange = (action: string) => {
    if (action === "back") {
      return router.push("/gears");
    }
  };

  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <button
          onClick={() => handleChange("back")}
          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Browse
        </button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            <div className="aspect-4/3 relative rounded-2xl overflow-hidden bg-muted mb-3">
              <Image
                src={gearItem.images[activeImg]}
                alt={gearItem.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
                unoptimized
              />
            </div>

            {gearItem.images.length > 1 && (
              <div className="flex gap-2">
                {gearItem.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-14 relative rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImg
                        ? "border-primary"
                        : "border-border hover:border-border/60"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery thumbnail ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              {Object.entries(gearItem.specifications).map(([k, v]) => {
                const displayValue =
                  typeof v === "boolean" ? (v ? "Yes" : "No") : String(v);

                return (
                  <div
                    key={k}
                    className="bg-card border border-border rounded-xl p-3.5"
                  >
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-0.5">
                      {k}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {displayValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
              {gearItem.category.name} · {gearItem.brand}
            </div>
            <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-foreground leading-tight mb-3">
              {gearItem.name}
            </h1>
            <Rating
              rating={gearItem.averageRating}
              reviews={gearItem._count.reviews}
            />
            <p className="text-sm text-muted-foreground mt-5 mb-5 leading-relaxed">
              {gearItem.description}
            </p>
            <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <MapPin size={12} />
              Listed by{" "}
              <span className="text-foreground font-medium ml-1">
                {gearItem.provider.name}
              </span>
            </div>

            {/* Booking card */}
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-20">
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-['Barlow_Condensed'] font-black text-5xl text-primary">
                  ${gearItem.pricePerDay}
                </span>
                <span className="text-sm font-mono text-muted-foreground">
                  per day
                </span>
              </div>

              {gearItem.isAvailable ? (
                <OrderForm user={user} gearItem={gearItem}></OrderForm>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle
                    size={30}
                    className="text-muted-foreground mx-auto mb-3"
                  />
                  <p className="text-sm font-mono text-muted-foreground">
                    Currently unavailable
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Check back soon or browse similar gear
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
