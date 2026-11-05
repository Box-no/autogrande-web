import type { ReactNode } from "react";

/** Clears the fixed header. */
export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="pt-18">{children}</div>;
}
