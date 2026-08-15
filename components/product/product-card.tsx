"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { CATEGORY_LABEL } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  priority,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <article className={cn("group", className)}>
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-sand">
        <Link
          href={`/product/${product.slug}`}
          className="block aspect-[4/5] w-full overflow-hidden"
          aria-label={product.name}
        >
          <Image
            src={product.art}
            alt={product.name}
            width={800}
            height={1000}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.045]"
          />
        </Link>

        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <div className="flex gap-2">
            {product.isNew ? (
              <span className="rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
                جدید
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-ink/90 px-3 py-1 text-[11px] font-medium tracking-wide text-cream backdrop-blur">
                ٪{discount.toLocaleString("fa-IR")} تخفیف
              </span>
            ) : null}
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addItem(product.slug, product.sizes[0])}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink/90 text-sm font-medium text-cream backdrop-blur transition-colors hover:bg-ink"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
            افزودن به سبد
          </button>
        </div>
      </div>

      <div className="px-1">
        <p className="mb-1 text-[11px] tracking-[0.2em] text-mute">
          {CATEGORY_LABEL[product.category]}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="block font-display text-lg leading-snug text-ink transition-colors hover:text-ink-soft"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-baseline gap-2 text-sm">
          <span className="font-medium text-ink">{formatPrice(product.price)}</span>
          {product.oldPrice ? (
            <span className="text-xs text-mute-light line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
