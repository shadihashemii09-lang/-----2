"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { getProduct } from "@/data/products";

export function Toast() {
  const { lastAdded, dismissToast } = useCart();
  const product = lastAdded ? getProduct(lastAdded) : null;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[70] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-ink/95 p-3 pe-4 text-cream shadow-2xl shadow-ink/20 backdrop-blur">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose/20 text-rose-soft">
              <Check className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="flex-1 text-start">
              <p className="text-sm font-medium">
                {product.name} به سبد اضافه شد
              </p>
              <p className="text-xs text-cream/60">همین حالا ادامه بده یا سبد را ببین</p>
            </div>
            <Link
              href="/cart"
              onClick={dismissToast}
              className="shrink-0 rounded-full border border-cream/25 px-4 py-1.5 text-xs transition-colors hover:border-cream/60"
            >
              سبد خرید
            </Link>
            <button
              type="button"
              onClick={dismissToast}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cream/60 transition-colors hover:text-cream"
              aria-label="بستن اعلان"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
