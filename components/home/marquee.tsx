const items = [
  "شومیز",
  "پیراهن",
  "شلوار",
  "کت و مانتو",
  "ست",
  "کتان لطیف",
  "طراحی مدرن",
  "رنگ‌های آرام",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((word) => (
        <span key={word} className="flex items-center gap-8 px-8">
          <span className="whitespace-nowrap font-display text-lg text-cream/90">
            {word}
          </span>
          <span className="text-rose-soft" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-ink py-5">
      <div dir="ltr" className="flex w-max animate-marquee">
        <Strip />
        <Strip />
      </div>
    </section>
  );
}
