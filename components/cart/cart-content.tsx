"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { getProduct, CATEGORY_LABEL } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CartContent() {
  const { lines, subtotal, updateQty, removeItem, clear } = useCart();

  const items = lines
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter(({ product }) => Boolean(product));

  const discount = items.reduce((sum, { line, product }) => {
    if (!product?.oldPrice) return sum;
    return sum + (product.oldPrice - product.price) * line.qty;
  }, 0);

  const total = subtotal - discount;
  const freeShipping = subtotal >= 5_000_000;

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
          <ShoppingBag className="h-8 w-8 text-mute" strokeWidth={1} />
        </span>
        <h1 className="mt-8 font-display text-3xl font-medium text-ink">
          سبد خریدت خالی است
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-7 text-mute">
          هنوز چیزی به سبدت اضافه نشده. از میان کالکشن‌های آئورا، قطعه‌ای که با تو
          می‌نشیند را پیدا کن.
        </p>
        <div className="mt-8">
          <LinkButton href="/shop" size="lg">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            رفتن به فروشگاه
          </LinkButton>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs tracking-[0.3em] text-mute">سبد خرید</p>
          <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            سبد خرید تو
          </h1>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-mute underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          خالی کردن سبد
        </button>
      </header>

      <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
        <ul className="space-y-6 lg:col-span-2">
          <AnimatePresence initial={false}>
            {items.map(({ line, product }) => (
              <motion.li
                key={`${line.slug}-${line.size}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex gap-4 border-b border-line pb-6 last:border-b-0 sm:gap-6"
              >
                {product ? (
                  <>
                    <Link
                      href={`/product/${product.slug}`}
                      className="block w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-28"
                    >
                      <Image
                        src={product.art}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/product/${product.slug}`}
                            className="font-display text-lg text-ink transition-colors hover:text-ink-soft"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-mute">
                            {CATEGORY_LABEL[product.category]} — سایز {line.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(line.slug, line.size)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-mute-light transition-colors hover:bg-sand hover:text-ink"
                          aria-label="حذف از سبد"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <div className="flex items-center rounded-full border border-line bg-cream p-1">
                          <button
                            type="button"
                            onClick={() => updateQty(line.slug, line.size, line.qty - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
                            aria-label="کم کردن تعداد"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">
                            {line.qty.toLocaleString("fa-IR")}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(line.slug, line.size, line.qty + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-sand hover:text-ink"
                            aria-label="زیاد کردن تعداد"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-ink">
                          {formatPrice(product.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-sand/40 p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-ink">خلاصه سفارش</h2>
            <dl className="mt-6 space-y-3.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-mute">جمع کالاها</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 ? (
                <div className="flex items-center justify-between">
                  <dt className="text-mute">تخفیف</dt>
                  <dd className="font-medium text-sage">− {formatPrice(discount)}</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <dt className="text-mute">ارسال</dt>
                <dd className={cn("font-medium", freeShipping ? "text-sage" : "text-ink")}>
                  {freeShipping ? "رایگان" : "بر اساس آدرس"}
                </dd>
              </div>
              <div className="my-2 border-t border-line" />
              <div className="flex items-center justify-between text-base">
                <dt className="font-medium text-ink">مبلغ قابل پرداخت</dt>
                <dd className="font-medium text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>

            {!freeShipping ? (
              <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-xs leading-6 text-mute">
                با خرید {formatPrice(5_000_000 - subtotal)} بیشتر، ارسال سفارشت رایگان
                می‌شود.
              </p>
            ) : null}

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition-all duration-300 hover:bg-ink-soft"
            >
              ادامه و پرداخت
            </button>
            <p className="mt-4 text-center text-[11px] leading-5 text-mute-light">
              نسخه‌ی دمو — پرداخت آنلاین در این نمونه پیاده‌سازی نشده است.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
