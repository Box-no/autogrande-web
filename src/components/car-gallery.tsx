"use client";

import Image from "next/image";
import { useState } from "react";

export function CarGallery({ images, alt }: { images: readonly string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-card bg-soft text-sm text-stone-dark">
        Ingen bilde i annonsen
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-soft">
        <Image
          src={current}
          alt={alt}
          fill
          preload
          quality={85}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Bilde ${index + 1} av ${images.length}`}
                  aria-current={selected ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className={`relative block size-20 overflow-hidden rounded-card ${selected ? "ring-2 ring-brand" : "opacity-80 hover:opacity-100"}`}
                >
                  <Image src={image} alt="" fill quality={75} sizes="80px" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
