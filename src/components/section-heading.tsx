import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  level?: "h1" | "h2";
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  level = "h2",
  tone = "light",
  size = "lg",
  children,
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-stone" : "text-stone-dark";
  const Heading = level;
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold ${muted}`}>{eyebrow}</p>
      <Heading
        id={id}
        className={`mt-4 font-display text-balance ${size === "xl" ? "text-display-xl" : "text-display-lg"}`}
      >
        {title}
      </Heading>
      {children ? <div className={`mt-6 max-w-xl text-lg leading-relaxed ${muted}`}>{children}</div> : null}
    </div>
  );
}
