import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباط با آئورا؛ تیم ما همیشه آماده پاسخ‌گویی است.",
};

const info = [
  { icon: MapPin, label: "آدرس فروشگاه", value: site.contact.address },
  { icon: Phone, label: "تلفن", value: site.contact.phone, dir: "ltr" as const },
  { icon: Mail, label: "ایمیل", value: site.contact.email, dir: "ltr" as const },
  { icon: Clock, label: "ساعات پاسخ‌گویی", value: "همه روزه ۱۰ تا ۲۱" },
];

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
        <p className="mb-4 text-xs tracking-[0.3em] text-mute">تماس با ما</p>
        <h1 className="text-balance font-display text-4xl font-medium text-ink sm:text-5xl">
          در خدمت تو هستیم
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-mute sm:text-[15px]">
          سوالی درباره سایز، پارچه یا سفارش داری؟ بنویس؛ تیم آئورا تا ۲۴ ساعت آینده
          پاسخ می‌دهد.
        </p>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <Reveal className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {info.map(({ icon: Icon, label, value, dir }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-line bg-cream p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.25} />
                </span>
                <div dir={dir}>
                  <p className="text-xs text-mute">{label}</p>
                  <p className="mt-1.5 text-sm font-medium leading-6 text-ink" dir={dir}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-3">
          <div className="rounded-2xl border border-line bg-sand/40 p-6 sm:p-8 lg:p-10">
            <h2 className="mb-6 font-display text-2xl font-medium text-ink">
              برایت بنویس
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
