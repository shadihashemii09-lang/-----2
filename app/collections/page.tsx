import type { Metadata } from "next";
import Image from "next/image";
import { COLLECTIONS, getCollectionProducts } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "کالکشن‌ها",
  description: "کالکشن‌های آئورا؛ بهار، تابستان و پاییز، هر کدام با روایت خودش.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.3em] text-mute">کالکشن‌ها</p>
            <h1 className="text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
              سه فصل، یک روایتِ آهسته
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-mute sm:text-[15px]">
              هر کالکشن آئورا از یک حال‌وهوا زاده می‌شود؛ از شکوفه‌های روشنِ بهار تا
              گرمای خاموش پاییز. جایی که سادگی، خودِ داستان است.
            </p>
          </Reveal>
        </Container>
      </section>

      {COLLECTIONS.map((collection, i) => {
        const products = getCollectionProducts(collection.slug);
        return (
          <section
            key={collection.slug}
            id={collection.slug}
            className={i % 2 === 1 ? "bg-sand/40" : ""}
          >
            <Container className="py-16 sm:py-24">
              <div
                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                  i % 2 === 1 ? "" : ""
                }`}
              >
                <div
                  className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <Reveal>
                    <div className="relative overflow-hidden rounded-2xl bg-cream">
                      <Image
                        src={collection.art}
                        alt={`کالکشن ${collection.name}`}
                        width={800}
                        height={1000}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="aspect-[4/5] w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
                    </div>
                  </Reveal>
                </div>

                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <p className="font-latin text-xs tracking-[0.4em] text-mute">
                      AURA — Collection {i + 1}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                      کالکشن {collection.name}
                    </h2>
                    <p className="mt-2 text-sm text-rose">{collection.tagline}</p>
                    <p className="mt-5 max-w-lg text-[15px] leading-8 text-mute">
                      {collection.description}
                    </p>
                  </Reveal>

                  <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                    {products.map((product, pi) => (
                      <Reveal key={product.slug} delay={pi * 0.06}>
                        <ProductCard product={product} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
