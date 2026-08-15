"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "۱۶", label: "طراحی در هر فصل" },
  { value: "۱۰۰٪", label: "پارچه‌های لطیف و طبیعی" },
  { value: "۳", label: "کالکشن در سال" },
];

export function AboutTeaser() {
  return (
    <section className="bg-sand/40 py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl bg-cream">
              <Image
                src="/images/about.svg"
                alt="پارچه و بافت آئورا"
                width={900}
                height={1100}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[900/1100] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-center text-xs tracking-[0.25em] text-mute-light">
              بافت و پارچه — آئورا
            </p>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="mb-5 flex items-center gap-3 text-xs tracking-[0.3em] text-mute">
                <span className="h-px w-10 bg-rose/60" aria-hidden />
                داستان ما
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-balance font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">
                سادگی، از دلِ
                <br />
                جزئیاتِ ریز
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-[15px] leading-8 text-mute">
                آئورا با یک پرسش ساده شروع شد: لباسِ روزانه باید چه حسی داشته باشد؟
                جواب ما، پارچه‌ای بود که نرم بماند، برشی که با بدن هماهنگ شود و رنگی که
                به چشم آرامش بدهد. از انتخاب نخ تا دوخت آخر، هر تکه با حوصله ساخته
                می‌شود تا تو سال‌ها با آن زندگی کنی.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-latin text-3xl font-medium text-ink">{s.value}</p>
                    <p className="mt-2 text-xs leading-6 text-mute">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span className="border-b border-ink/20 pb-1 transition-colors group-hover:border-rose group-hover:text-rose">
                  داستان کامل آئورا
                </span>
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
