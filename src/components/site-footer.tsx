import Link from "next/link";
import { Logo } from "@/components/logo";
import { company, legacySiteUrl, navItems, openingHours } from "@/content/site";

const linkClass = "underline-offset-4 hover:text-paper hover:underline";

export function SiteFooter() {
  return (
    <footer className="bg-carbon text-paper">
      <div className="mx-auto max-w-site px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Link href="/" aria-label="AutoGrande – forsiden" className="w-fit">
            <Logo className="h-auto w-44" />
          </Link>
          <p className="max-w-md text-stone md:text-right">{company.tagline}</p>
        </div>

        <div className="mt-14 grid gap-12 border-t border-line-dark pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-paper">Besøk oss</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-stone">
              {company.name}
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city}
            </address>
            <a href={company.mapsUrl} className={`mt-3 inline-block text-sm text-stone ${linkClass}`}>
              Veibeskrivelse
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-paper">Åpningstider</h2>
            <dl className="mt-4 space-y-1.5 text-sm text-stone">
              {openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6">
                  <dt>{row.days}</dt>
                  <dd className="tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2 lg:col-start-9">
            <h2 className="text-sm font-semibold text-paper">Kontakt</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-stone">
              <li>
                <a href={company.phoneHref} className={linkClass}>
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={linkClass}>
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.facebookUrl} className={linkClass}>
                  Følg oss på Facebook
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Bunnmeny" className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-paper">Sider</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-stone">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`${legacySiteUrl}/finansiering`} className={linkClass}>
                  Finansiering
                </a>
              </li>
              <li>
                <a href={`${legacySiteUrl}/reklamasjon`} className={linkClass}>
                  Reklamasjon
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-16 text-xs text-stone">© {company.name}. Alle rettigheter forbeholdt.</p>
        <p aria-hidden="true" className="mt-10 font-display text-[clamp(3.5rem,14vw,9rem)] leading-none text-wordmark">
          AutoGrande
        </p>
      </div>
    </footer>
  );
}
