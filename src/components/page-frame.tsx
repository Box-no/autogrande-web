import type { ReactNode } from "react";

/** Clears the fixed header on pages that don't open with a full-bleed hero. */
export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="pt-20">{children}</div>;
}
