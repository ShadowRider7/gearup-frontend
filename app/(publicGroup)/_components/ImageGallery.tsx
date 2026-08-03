"use client";

import React, { useState } from "react";
import Image from "next/image";

export function ImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <div className="aspect-4/3 relative rounded-2xl overflow-hidden bg-muted mb-3">
        <Image
          src={images[activeImg]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          className="object-cover"
          unoptimized
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
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
    </>
  );
}
