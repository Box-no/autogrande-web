import type { ReactNode } from "react";

/** Clears the fixed header (info strip from md, plus the main bar). */
export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="pt-18 md:pt-27">{children}</div>;
}
