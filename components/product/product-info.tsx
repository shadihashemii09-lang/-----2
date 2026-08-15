"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Minus, Plus, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { CATEGORY_LABEL } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-sm font-medium text-ink"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-mute transition-transform duration-300",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-7 text-mute">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const handleAdd = () => {
    if (!size) return;
    addItem(product.slug, size, qty);
  };

  return (
    <div>
      <nav className="mb-4 flex items-center gap-2 text-xs text-mute" aria-label="مسیر">
        <Link href="/" className="transition-colors hover:text-ink">
          خانه
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/shop?category=${product.category}`} className="transition-colors hover:text-ink">
          {CATEGORY_LABEL[product.category]}
        </Link>
      </nav>

      <h1 className="font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xl font-medium text-ink">{formatPrice(product.price)}</span>
        {product.oldPrice ? (
          <>
            <span className="text-sm text-mute-light line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] text-cream">
              ٪{discount?.toLocaleString("fa-IR")} تخفیف
            </span>
          </>
        ) : null}
      </div>

      <p className="mt-6 text-[15px] leading-8 text-mute">{product.description}</p>

      <div className="mt-8 border-t border-line pt-6">
        <p className="mb-3 text-xs text-mute">
          رنگ: <span className="font-medium text-ink">{color.name}</span>
        </p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setColor(c)}
              aria-label={`رنگ ${c.name}`}
              title={c.name}
              className={cn(
                "h-9 w-9 rounded-full border-2 border-cream shadow-sm transition-transform duration-200 hover:scale-110",
                color.hex === c.hex && "ring-2 ring-ink ring-offset-2 ring-offset-cream",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-mute">
            سایز: <span className="font-medium text-ink">{size ?? "انتخاب نشده"}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "flex h-11 min-w-14 items-center justify-center rounded-xl border px-3 text-sm transition-all duration-200",
                size === s
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-cream text-ink-soft hover:border-ink/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex h-12 items-center rounded-full border border-line bg-cream px-2">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
            aria-label="کم کردن تعداد"
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="w-8 text-center text-sm font-medium">{qty.toLocaleString("fa-IR")}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
            aria-label="زیاد کردن تعداد"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!size}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition-all duration-300 ease-lux hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          {size ? "افزودن به سبد" : "یک سایز انتخاب کن"}
        </button>
      </div>

      <AnimatePresence>
        {!size ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs text-mute"
          >
            برای افزودن به سبد، ابتدا سایز را انتخاب کن.
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-sand/50 p-5 text-xs text-mute">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 shrink-0 text-ink-soft" strokeWidth={1.25} />
          <span className="leading-6">
            ارسال رایگان برای سفارش‌های
            <br />
            بالای ۵ میلیون تومان
          </span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="h-5 w-5 shrink-0 text-ink-soft" strokeWidth={1.25} />
          <span className="leading-6">
            ۷ روز ضمانت
            <br />
            بازگشت آسان
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Accordion title="جزئیات و مشخصات">
          <ul className="space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sage" strokeWidth={2} />
                {d}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="جنس و نگهداری">
          <p className="mb-3">ترکیب پارچه:</p>
          <ul className="space-y-1.5">
            {product.fabrics.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-4">
            شست‌وشو با آب سرد، بدون خشک‌کن و اتوی ملایم؛ تا لطافت پارچه سال‌ها بماند.
          </p>
        </Accordion>

        <Accordion title="ارسال و بازگشت">
          سفارش‌ها ظرف ۲ تا ۴ روز کاری ارسال می‌شوند. اگر از انتخاب‌ات راضی نبودی، تا ۷ روز
          پس از دریافت می‌توانی آن را به ما برگردانی.
        </Accordion>
      </div>
    </div>
  );
}
