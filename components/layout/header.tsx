"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { site } from "@/data/site";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SearchOverlay } from "@/components/layout/search-overlay";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {site.nav.map((item) => {
        const active =
          item.href === "/shop?sort=new"
            ? pathname === "/shop" && searchParams.get("sort") === "new"
            : pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative text-sm transition-colors duration-300 hover:text-ink",
              active ? "font-medium text-ink" : "text-mute",
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute -bottom-1.5 start-1/2 h-px translate-x-1/2 bg-ink transition-all duration-300 ease-lux",
                active ? "w-full" : "w-0",
              )}
              aria-hidden
            />
          </Link>
        );
      })}
    </>
  );
}

function CartBadge() {
  const { count } = useCart();
  return (
    <span className="relative">
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      <AnimatePresence>
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -start-3.5 -top-2.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-semibold text-cream"
          >
            {count.toLocaleString("fa-IR")}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="bg-ink text-cream">
          <p className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-5 text-[11px] tracking-wide">
            <span className="text-rose-soft" aria-hidden>
              ✦
            </span>
            ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان
            <span className="text-rose-soft" aria-hidden>
              ✦
            </span>
          </p>
        </div>

        <div className="border-b border-line/80 bg-cream/90 backdrop-blur-md">
          <Container>
            <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
              <nav className="hidden items-center gap-8 lg:flex" aria-label="منوی اصلی">
                <Suspense fallback={null}>
                  <NavLinks />
                </Suspense>
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 -ms-3 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden"
                aria-label="باز کردن منو"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <Link
                href="/"
                className="justify-self-center font-latin text-[26px] font-medium uppercase leading-none tracking-[0.42em] text-ink transition-opacity hover:opacity-70 sm:text-3xl"
                aria-label="AURA — صفحه اصلی"
              >
                AURA
              </Link>

              <div className="flex items-center justify-end gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
                  aria-label="جستجو"
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <Link
                  href="/cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
                  aria-label="سبد خرید"
                >
                  <CartBadge />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-cream lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between px-5">
                <span className="font-latin text-xl tracking-[0.4em] text-ink">AURA</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
                  aria-label="بستن منو"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav
                className="flex flex-1 flex-col items-center justify-center gap-8"
                aria-label="منوی موبایل"
              >
                {site.nav.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-3xl text-ink transition-colors hover:text-rose"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col items-center gap-1 pt-6 text-sm text-mute"
                >
                  <p>{site.persianName}</p>
                  <p className="text-xs text-mute-light">{site.tagline}</p>
                </motion.div>
              </nav>
              <p className="border-t border-line py-5 text-center text-xs text-mute">
                {site.contact.phone}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
