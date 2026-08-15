import Link from "next/link";
import { Camera, Mail, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { CATEGORIES, COLLECTIONS } from "@/data/products";
import { Container } from "@/components/ui/container";

const socials = [
  { label: "اینستاگرام", icon: Camera },
  { label: "تلگرام", icon: Send },
  { label: "ایمیل", icon: Mail },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block font-latin text-2xl font-medium uppercase tracking-[0.4em] text-ink"
            >
              AURA
            </Link>
            <p className="mt-2 font-display text-sm text-mute">{site.persianName}</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-mute">
              {site.tagline}. لباس‌هایی که از دل سادگی، سبک تو را می‌سازند؛ با پارچه‌های
              لطیف و طراحی‌ای که هر روز، تازه می‌ماند.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-ink-soft transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="mb-4 text-sm font-medium text-ink">فروشگاه</h3>
              <ul className="space-y-3 text-sm text-mute">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop?category=${c.slug}`}
                      className="transition-colors hover:text-ink"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium text-ink">کالکشن‌ها</h3>
              <ul className="space-y-3 text-sm text-mute">
                {COLLECTIONS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/collections#${c.slug}`}
                      className="transition-colors hover:text-ink"
                    >
                      کالکشن {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium text-ink">آئورا</h3>
              <ul className="space-y-3 text-sm text-mute">
                <li>
                  <Link href="/about" className="transition-colors hover:text-ink">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-ink">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="transition-colors hover:text-ink">
                    سبد خرید
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-mute">
            © {new Date().getFullYear().toLocaleString("fa-IR")} آئورا. همه حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-2 text-xs text-mute">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            {site.contact.phone}
          </div>
        </Container>
      </div>
    </footer>
  );
}
