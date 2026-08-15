"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const trust = [
  "ارسال رایگان",
  "ضمانت ۷ روزه بازگشت",
  "پارچه‌های لطیف",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -end-40 top-20 h-96 w-96 rounded-full bg-rose-soft/20 blur-3xl" />
        <div className="absolute -start-32 bottom-0 h-80 w-80 rounded-full bg-sage/15 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-xl"
          >
            <motion.div
              variants={item}
              className="mb-6 flex items-center gap-3 text-xs tracking-[0.3em] text-mute"
            >
              <span className="h-px w-10 bg-rose/60" aria-hidden />
              کالکشن جدیدِ بهار
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance font-display text-4xl font-medium leading-[1.35] text-ink sm:text-5xl lg:text-[3.4rem]"
            >
              لطافت، در
              <br />
              سادگیِ امروز
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-[15px] leading-8 text-mute"
            >
              لباس‌هایی برای زنی که می‌داند کمتر، زیباتر است. پارچه‌های نرم، خطوط پاک و
              رنگ‌هایی آرام — هر تکه از آئورا، برای لحظه‌های واقعی زندگی تو طراحی شده.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <LinkButton href="/collections">مشاهده کالکشن‌ها</LinkButton>
              <LinkButton href="/shop" variant="outline">
                خرید جدیدترین‌ها
              </LinkButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-7"
            >
              {trust.map((t) => (
                <span key={t} className="flex items-center gap-2 text-xs text-mute">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-t-full rounded-b-[2rem] lg:max-w-none">
              <Image
                src="/images/hero.svg"
                alt="پوشاک زنانه آئورا"
                width={900}
                height={1180}
                priority
                className="aspect-[900/1180] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[2rem] ring-1 ring-inset ring-ink/5" />
            </div>

            <div className="pointer-events-none absolute -start-6 bottom-10 hidden items-center gap-3 rounded-full border border-line bg-cream/90 px-5 py-3 backdrop-blur sm:flex">
              <span className="font-latin text-2xl italic text-rose">AURA</span>
              <span className="text-xs leading-5 text-mute">
                طراحی‌شده برای
                <br />
                آرامشِ هر روز
              </span>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="flex justify-center pb-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-center gap-1 text-mute-light"
          aria-hidden
        >
          <span className="text-[10px] tracking-[0.3em]">بیشتر</span>
          <ArrowDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
        </motion.span>
      </div>
    </section>
  );
}
