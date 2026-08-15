"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { COLLECTIONS } from "@/data/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

const cards = [
  { className: "lg:mt-0" },
  { className: "lg:mt-14" },
  { className: "lg:mt-0" },
];

export function Collections() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="کالکشن‌ها"
          title="سه فصل، یک روایت"
          description="هر کالکشن آئورا از یک حال‌وهوا زاده می‌شود؛ از شکوفه‌های بهار تا گرمای خاموش پاییز."
        />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {COLLECTIONS.map((collection, i) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className={cards[i].className}
            >
              <Link
                href={`/collections#${collection.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={collection.art}
                    alt={`کالکشن ${collection.name}`}
                    width={800}
                    height={1000}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-cream">
                    <div>
                      <p className="font-display text-2xl">کالکشن {collection.name}</p>
                      <p className="mt-1 text-xs tracking-wide text-cream/80">
                        {collection.tagline}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-cream/20 opacity-0 backdrop-blur transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
