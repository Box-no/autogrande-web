import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, id, tone = "dark", children }: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-stone" : "text-stone-dark";
  return (
    <div className="max-w-3xl">
      <p className={`flex items-center gap-3 text-eyebrow font-medium uppercase tracking-eyebrow ${muted}`}>
        <span aria-hidden="true" className="h-px w-10 bg-brand" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-6 font-display text-display-lg tracking-display">
        {title}
      </h2>
      {children ? <div className={`mt-6 max-w-xl text-lg leading-relaxed ${muted}`}>{children}</div> : null}
    </div>
  );
}
