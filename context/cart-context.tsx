"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "@/types";
import { PRODUCTS } from "@/data/products";

const STORAGE_KEY = "aura-cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (slug: string, size: string, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  lastAdded: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) => line && typeof line.slug === "string" && typeof line.size === "string",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setLines(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!lastAdded) return;
    const t = window.setTimeout(() => setLastAdded(null), 3200);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  const addItem = (slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.size === size ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { slug, size, qty }];
    });
    setLastAdded(slug);
  };

  const removeItem = (slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  };

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeItem(slug, size);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l)),
    );
  };

  const clear = () => setLines([]);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = PRODUCTS.find((p) => p.slug === line.slug);
      if (!product) continue;
      count += line.qty;
      subtotal += product.price * line.qty;
    }
    return { count, subtotal };
  }, [lines]);

  return (
    <CartContext.Provider
      value={{
        lines,
        count,
        subtotal,
        addItem,
        removeItem,
        updateQty,
        clear,
        lastAdded,
        dismissToast: () => setLastAdded(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
