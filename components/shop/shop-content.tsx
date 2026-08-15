"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { cn, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const sortOptions = [
  { value: "featured", label: "پیشنهاد آئورا" },
  { value: "new", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
];

function sortProducts(list: Product[], sort: string): Product[] {
  const arr = [...list];
  switch (sort) {
    case "new":
      return arr.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || Number(b.featured) - Number(a.featured),
      );
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "fa"),
      );
  }
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? "all",
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "featured");

  const results = useMemo(() => {
    const list =
      category === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category);
    return sortProducts(list, sort);
  }, [category, sort]);

  const activeCategory = CATEGORIES.find((c) => c.slug === category);
  const title = activeCategory ? activeCategory.label : "همه محصولات";
  const description = activeCategory
    ? activeCategory.description
    : "مجموعه‌ی کامل طراحی‌های آئورا؛ هر تکه با پارچه‌ای لطیف و خطی پاک.";

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10">
        <p className="mb-3 text-xs tracking-[0.3em] text-mute">فروشگاه</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-7 text-mute">{description}</p>
          </div>
          <p className="text-xs text-mute-light">
            {formatNumber(results.length)} محصول
          </p>
        </div>
      </header>

      <div className="mb-10 flex flex-col gap-5 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0"
          role="tablist"
          aria-label="فیلتر دسته‌بندی"
        >
          {[{ slug: "all", label: "همه" }, ...CATEGORIES].map((c) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-xs transition-all duration-300",
                category === c.slug
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-cream text-mute hover:border-ink/30 hover:text-ink",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-mute" strokeWidth={1.5} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="مرتب‌سازی"
            className="cursor-pointer appearance-none rounded-full border border-line bg-cream px-4 py-2 text-xs text-ink-soft transition-colors hover:border-ink/30 focus:border-ink/40 focus:outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="font-display text-xl text-ink">محصولی در این دسته نیست</p>
          <p className="text-sm text-mute">کمی بعد دوباره سر بزن.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:gap-x-8 lg:gap-y-14 xl:grid-cols-4"
        >
          {results.map((product, i) => (
            <motion.div
              key={`${category}-${sort}-${product.slug}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i % 8, 6) * 0.06, ease: EASE }}
            >
              <ProductCard product={product} priority={i < 4} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
}
