import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-3 sm:mb-14",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-3 text-xs tracking-[0.35em] text-mute">
          <span className="h-px w-8 bg-mute/50" aria-hidden />
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-mute/50" aria-hidden />}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-sm leading-8 text-mute sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
