"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductRail() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading
          eyebrow="منتخب آئورا"
          title="قطعه‌هایی که دوست‌داشتنی‌اند"
          description="منتخبی از بهترین طراحی‌های این فصل؛ تکه‌هایی که سادگی را با ظرافت ترکیب می‌کنند."
        />

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {featured.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <ProductCard product={product} priority={i < 2} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-8 transition-colors hover:text-rose"
          >
            <span className="border-b border-ink/20 pb-1">مشاهده همه محصولات</span>
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
