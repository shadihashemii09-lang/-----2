import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "@/components/shop/shop-content";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "مجموعه کامل طراحی‌های آئورا؛ شومیز، پیراهن، شلوار، کت و مانتو و ست.",
};

function ShopFallback() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="h-8 w-56 animate-pulse rounded bg-sand" />
      <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-sand" />
      <div className="mt-10 h-12 animate-pulse rounded-full bg-sand" />
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-sand" />
        ))}
      </div>
    </Container>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopContent />
    </Suspense>
  );
}
