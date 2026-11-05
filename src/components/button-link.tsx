import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none";

const primary = "rounded-control bg-brand px-6 py-3.5 text-surface hover:bg-brand-deep";

const variants: Record<Variant, Record<Tone, string>> = {
  primary: { light: primary, dark: primary },
  secondary: {
    light: "rounded-control border-2 border-ink px-6 py-3 text-ink hover:bg-ink hover:text-surface",
    dark: "rounded-control border-2 border-paper px-6 py-3 text-paper hover:bg-paper hover:text-ink",
  },
  text: {
    light: "justify-start underline decoration-2 underline-offset-[6px] decoration-brand hover:text-brand-deep",
    dark: "justify-start underline decoration-2 underline-offset-[6px] decoration-brand-bright hover:text-brand-bright",
  },
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
};

export function buttonClasses(variant: Variant = "primary", tone: Tone = "light") {
  return `${base} ${variants[variant][tone]}`;
}

export function ButtonLink({ href, children, variant = "primary", tone = "light", className = "" }: ButtonLinkProps) {
  const classes = `${buttonClasses(variant, tone)} ${className}`.trim();

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
