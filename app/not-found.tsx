import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-latin text-7xl font-medium tracking-[0.2em] text-rose/50 sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 font-display text-3xl font-medium text-ink">
        این صفحه پیدا نشد
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-7 text-mute">
        به نظر می‌رسد مسیرِ این صفحه را گم کرده‌ای؛ اما کالکشن‌ها هنوز این‌جا منتظرت
        هستند.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <LinkButton href="/">بازگشت به خانه</LinkButton>
        <LinkButton href="/shop" variant="outline">
          رفتن به فروشگاه
        </LinkButton>
      </div>
      <Link href="/" className="mt-14 font-latin text-sm tracking-[0.5em] text-mute-light">
        AURA
      </Link>
    </Container>
  );
}
