import type { Metadata } from "next";
import Image from "next/image";
import { Feather, Gem, Scissors } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "درباره آئورا",
  description: "داستان آئورا؛ از یک پرسش ساده تا لباس‌هایی برای آرامشِ هر روز.",
};

const values = [
  {
    icon: Feather,
    title: "پارچه‌های لطیف",
    text: "از کتان و لیوسل تا کشمیر؛ هر پارچه را برای لمسِ اول انتخاب می‌کنیم. اگر درست و نرم نباشد، وارد کالکشن نمی‌شود.",
  },
  {
    icon: Scissors,
    title: "طراحی ماندگار",
    text: "ما دنبال ترندهای لحظه‌ای نیستیم. هر مدل با خطی پاک طراحی می‌شود تا سال‌ها در کمدت بماند و تازه بماند.",
  },
  {
    icon: Gem,
    title: "تولید محدود",
    text: "هر تکه در تعداد محدود دوخته می‌شود؛ تا هیچ لباسی تکراری نباشد و هیچ الگویی هدر نرود.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <span className="mb-5 flex items-center gap-3 text-xs tracking-[0.3em] text-mute">
                  <span className="h-px w-10 bg-rose/60" aria-hidden />
                  درباره آئورا
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="text-balance font-display text-4xl font-medium leading-[1.35] text-ink sm:text-5xl">
                  لباسِ هر روز،
                  <br />
                  به اندازه‌ی لحظه‌هایِ نابِ زندگی
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-7 max-w-lg space-y-5 text-[15px] leading-8 text-mute">
                  <p>
                    آئورا با یک پرسش ساده شروع شد: لباسِ روزانه باید چه حسی داشته باشد؟
                    پاسخ ما، پارچه‌ای بود که نرم بماند، برشی که با بدن هماهنگ شود و رنگی
                    که به چشم آرامش بدهد.
                  </p>
                  <p>
                    از انتخاب نخ تا دوختِ آخر، هر تکه با حوصله و دقت ساخته می‌شود. ما
                    اعتقاد داریم یک لباس خوب، نه پر از جزئیات که خالی از آشفتگی است؛ و
                    به همین دلیل، نامش را آئورا گذاشتیم — هاله‌ای لطیف از سبک که دورِ
                    هر زن می‌نشیند.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl bg-cream">
                <Image
                  src="/images/about.svg"
                  alt="پارچه و بافت آئورا"
                  width={900}
                  height={1100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[900/1100] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <p className="mb-4 text-xs tracking-[0.3em] text-mute">آنچه برای ما مهم است</p>
            <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
              سه اصل، در همه‌ی فصل‌ها
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-line bg-cream p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-xl hover:shadow-ink/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-cream">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mute">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-sand/40 py-20 sm:py-28">
        <Container className="text-center">
          <Reveal>
            <span className="font-latin text-6xl text-rose/40" aria-hidden>
              “
            </span>
            <blockquote className="mx-auto -mt-6 max-w-3xl text-balance font-display text-2xl font-medium leading-relaxed text-ink sm:text-3xl">
              سادگی، پیچیده‌ترین کاری است که می‌توان انجام داد؛ و ما هر روز، آن را
              انتخاب می‌کنیم.
            </blockquote>
            <p className="mt-8 text-xs tracking-[0.3em] text-mute">
              تیم طراحی آئورا
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium text-ink sm:text-4xl">
              حالا نوبت کمدِ توست
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-mute">
              میان کالکشن‌های امسال، تکه‌ای را پیدا کن که برای تو طراحی شده.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <LinkButton href="/collections" size="lg">
                دیدن کالکشن‌ها
              </LinkButton>
              <LinkButton href="/shop" variant="outline" size="lg">
                فروشگاه
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
