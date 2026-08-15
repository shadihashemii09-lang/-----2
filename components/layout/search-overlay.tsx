"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES, CATEGORY_LABEL } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter((p) => {
      const haystack =
        `${p.name} ${CATEGORY_LABEL[p.category]} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-cream/80 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="جستجو"
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-line bg-cream/95">
              <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
                <Search className="h-5 w-5 shrink-0 text-mute" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجوی لباس… (مثلاً: شومیز، پیراهن)"
                  className="h-full flex-1 bg-transparent font-display text-lg text-ink placeholder:text-mute-light focus:outline-none sm:text-xl"
                />
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
                  aria-label="بستن جستجو"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto px-5 py-8 sm:px-8">
              {!hasQuery ? (
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  <span className="text-xs tracking-wide text-mute">پیشنهادها:</span>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setQuery(CATEGORY_LABEL[c.slug])}
                      className="rounded-full border border-line bg-cream px-4 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink/30"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-24 text-center">
                  <p className="font-display text-xl text-ink">نتیجه‌ای یافت نشد</p>
                  <p className="text-sm text-mute">عبارت دیگری را امتحان کن.</p>
                </div>
              ) : (
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                  className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
                >
                  {results.map((p) => (
                    <motion.li
                      key={p.slug}
                      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="overflow-hidden rounded-xl bg-sand">
                          <Image
                            src={p.art}
                            alt={p.name}
                            width={400}
                            height={500}
                            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
                          />
                        </div>
                        <p className="mt-2.5 font-display text-sm text-ink">
                          {p.name}
                        </p>
                        <p className="text-xs text-mute">{formatPrice(p.price)}</p>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            <div className="border-t border-line bg-cream/95">
              <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
                <p className="text-xs text-mute">
                  {hasQuery
                    ? `${results.length.toLocaleString("fa-IR")} نتیجه`
                    : "جستجوی تمام محصولات"}
                </p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="group flex items-center gap-1 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  مشاهده فروشگاه
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
