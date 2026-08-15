import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Collections } from "@/components/home/collections";
import { ProductRail } from "@/components/home/product-rail";
import { AboutTeaser } from "@/components/home/about-teaser";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <ProductRail />
      <AboutTeaser />
      <Newsletter />
    </>
  );
}
