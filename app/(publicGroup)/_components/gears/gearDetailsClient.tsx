import React from "react";
import { MapPin } from "lucide-react";
import { Rating } from "../shared/Rating";
import { GearDetailsResponse, IUser } from "@/lib/type";
import { getUser } from "@/service/getUser";
import OrderForm from "./OrderForm";

import { ImageGallery } from "../shared/ImageGallery";
import BackButton from "../shared/BackButton";

export async function GearDetailsClient(props: {
  gearItem: GearDetailsResponse["data"]["gearItemDetails"];
}) {
  const user: IUser | null = await getUser();

  const gearItem = props?.gearItem;

  const userProfile = user?.data?.userProfile;
  const userRole = userProfile?.role;

  const isLoggedIn = !!userProfile && !!userProfile.id;

  if (!gearItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm font-mono text-muted-foreground">
          Gear details missing.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <BackButton />

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            <ImageGallery images={gearItem.images} name={gearItem.name} />

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
                !isLoggedIn ? (
                  <div className="text-center py-8 bg-primary/5 border border-primary/10 rounded-xl p-6">
                    <p className="text-sm font-mono text-foreground font-semibold">
                      Please Login to Order
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-1 mb-4">
                      You must be signed in to reserve this gear.
                    </p>
                    <a
                      href="/login"
                      className="inline-block w-full bg-primary text-primary-foreground text-xs font-mono font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                    >
                      Sign In
                    </a>
                  </div>
                ) : userRole === "CUSTOMER" ? (
                  <OrderForm user={user} gearItem={gearItem} />
                ) : (
                  <div className="text-center py-8 bg-muted/10 border border-dashed border-border rounded-xl p-6">
                    <p className="text-sm font-mono text-destructive font-semibold">
                      Ordering Disabled
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-1 max-w-[220px] mx-auto">
                      Only customer accounts can place orders. Your current role
                      is:{" "}
                      <span className="font-bold uppercase text-foreground">
                        {userRole || "unknown"}
                      </span>
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm font-mono text-muted-foreground">
                    Currently unavailable
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
