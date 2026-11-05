import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  level?: "h1" | "h2";
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  level = "h2",
  tone = "light",
  size = "lg",
  align = "left",
  children,
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-stone" : "text-stone-dark";
  const Heading = level;
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p className={`text-sm font-semibold ${muted}`}>{eyebrow}</p>
      <Heading
        id={id}
        className={`mt-4 font-display text-balance ${size === "xl" ? "text-display-xl" : "text-display-lg"}`}
      >
        {title}
      </Heading>
      {children ? (
        <div className={`mt-4 text-base leading-relaxed ${muted} ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>{children}</div>
      ) : null}
    </div>
  );
}
