import { Logo } from "@/components/logo";
import { company, legacySiteUrl, navItems } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-dark bg-ink">
      <div className="mx-auto max-w-site px-5 py-16 md:px-10">
        <p className="max-w-4xl font-display text-display-md tracking-display text-bone/90">
          «{company.tagline}»
        </p>

        <div className="mt-16 grid gap-12 border-t border-line-dark pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-auto w-40" />
            <p className="mt-6 text-sm leading-relaxed text-stone">
              {company.name}
              <br />
              {company.street}, {company.postalCode} {company.city}
            </p>
          </div>

          <nav aria-label="Bunnmeny" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-3 text-sm text-stone">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-bone">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`${legacySiteUrl}/finansiering`} className="hover:text-bone">
                  Finansiering
                </a>
              </li>
              <li>
                <a href={`${legacySiteUrl}/reklamasjon`} className="hover:text-bone">
                  Reklamasjon
                </a>
              </li>
            </ul>
          </nav>

          <div className="space-y-2 text-sm text-stone md:col-span-4 md:text-right">
            <p>
              <a href={company.phoneHref} className="hover:text-bone">
                {company.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-bone">
                {company.email}
              </a>
            </p>
            <p>
              <a href={company.facebookUrl} className="hover:text-bone">
                Følg oss på Facebook
              </a>
            </p>
          </div>
        </div>

        <p className="mt-16 text-xs text-stone">© {company.name}. Alle rettigheter forbeholdt.</p>
      </div>
    </footer>
  );
}
