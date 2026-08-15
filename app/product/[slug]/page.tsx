import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS, getProduct, getRelatedProducts } from "@/data/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.art }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Link
          href="/shop"
          className="group mb-8 inline-flex items-center gap-2 text-xs text-mute transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          بازگشت به فروشگاه
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery art={product.art} name={product.name} />
          <div className="lg:py-2">
            <ProductInfo product={product} />
          </div>
        </div>

        <section className="mt-24">
          <SectionHeading
            eyebrow="ممکن است بپسندی"
            title="تکمیل‌کننده‌های استایل تو"
            description="تکه‌هایی که با همین لباس می‌نشینند و ظاهرت را کامل می‌کنند."
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:gap-x-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
