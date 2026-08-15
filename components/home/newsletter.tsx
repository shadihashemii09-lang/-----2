"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-cream px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -end-24 -top-24 h-64 w-64 rounded-full bg-rose-soft/20 blur-3xl" />
              <div className="absolute -bottom-24 -start-24 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />
            </div>

            <div className="relative">
              <span className="mb-5 inline-block text-xs tracking-[0.3em] text-mute">
                خبرنامه آئورا
              </span>
              <h2 className="text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
                اولین‌ها، مال تو باشد
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-mute">
                از کالکشن‌های جدید، تخفیف‌های اختصاصی و داستان‌های پشت هر تکه، پیش از همه
                باخبر شو.
              </p>

              {done ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-6 py-3.5 text-sm text-ink"
                >
                  <Check className="h-4 w-4 text-sage" strokeWidth={2} />
                  عضویت تو ثبت شد؛ به‌زودی به گوشت می‌رسیم.
                </motion.p>
              ) : (
                <form
                  onSubmit={submit}
                  className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-line bg-cream p-1.5 shadow-sm shadow-ink/5 focus-within:border-ink/30"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل تو"
                    className="h-10 flex-1 rounded-full bg-transparent px-4 text-sm text-ink placeholder:text-mute-light focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-cream transition-colors hover:bg-ink-soft"
                  >
                    عضویت
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.75} />
                  </button>
                </form>
              )}

              <p className="mt-4 text-[11px] text-mute-light">
                با ثبت ایمیل، با قوانین حریم خصوصی آئورا موافقت می‌کنی.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
