"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { company, navItems } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-light bg-paper/90 text-ink backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-site items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" className="shrink-0" aria-label="AutoGrande – forsiden">
          <Logo className="h-auto w-36 md:w-40" />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={active ? "text-brand" : "text-stone-dark transition-colors hover:text-ink"}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <a href={company.phoneHref} className={`${buttonClasses("primary")} whitespace-nowrap`}>
              Ring {company.phoneDisplay}
            </a>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-control border border-line-light bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobilmeny"
            aria-label="Mobilmeny"
            className="border-t border-line-light bg-paper lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <ul className="flex flex-col px-5 py-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-line-light py-4 text-lg font-semibold ${active ? "text-brand" : "text-ink"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-5 pb-2">
                <a href={company.phoneHref} className={`${buttonClasses("primary")} w-full`}>
                  Ring {company.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
