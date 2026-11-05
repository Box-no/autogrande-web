import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none";

const pill = "rounded-control px-5 py-3";
const primary = `${pill} bg-brand text-surface hover:bg-brand-deep`;

const variants: Record<Variant, Record<Tone, string>> = {
  primary: { light: primary, dark: primary },
  secondary: {
    light: `${pill} border border-line-light bg-surface text-ink hover:border-ink`,
    dark: `${pill} border border-surface/40 text-surface hover:bg-surface hover:text-ink`,
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

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "primary", tone = "light", className = "" }: ButtonLinkProps) {
  const classes = `${buttonClasses(variant, tone)} ${className}`.trim();
  const content = (
    <>
      {children}
      {variant !== "text" ? <Arrow /> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
