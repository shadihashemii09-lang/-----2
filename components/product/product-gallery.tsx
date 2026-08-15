"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const views = [
  { key: "full", label: "کامل", className: "" },
  { key: "top", label: "جزئیات بالا", className: "origin-top scale-[1.4]" },
  { key: "bottom", label: "جزئیات پایین", className: "origin-bottom scale-[1.4]" },
];

export function ProductGallery({ art, name }: { art: string; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={art}
              alt={name}
              width={800}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-lux",
                views[active].className,
              )}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {views.map((view, i) => (
          <button
            key={view.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={view.label}
            className={cn(
              "group relative aspect-[4/5] overflow-hidden rounded-xl bg-sand transition-all duration-300",
              active === i
                ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={art}
              alt=""
              width={400}
              height={500}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-110",
                i === 1 ? "origin-top scale-[1.4] group-hover:scale-[1.5]" : "",
                i === 2 ? "origin-bottom scale-[1.4] group-hover:scale-[1.5]" : "",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
