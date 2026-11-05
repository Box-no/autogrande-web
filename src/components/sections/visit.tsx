import { SectionHeading } from "@/components/section-heading";
import { company, openingHours } from "@/content/site";

export function Visit({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="kontakt" aria-labelledby="kontakt-tittel" className="bg-ink py-24 md:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="kontakt-tittel"
            level={headingLevel}
            eyebrow="Besøk oss"
            title={
              <>
                Velkommen innom <span className="italic text-stone">i Skien.</span>
              </>
            }
          >
            <p>Du er hjertelig velkommen innom for en prat, en titt eller en prøvetur.</p>
          </SectionHeading>

          <address className="mt-12 space-y-2 text-2xl not-italic leading-snug">
            <p>{company.street}</p>
            <p>
              {company.postalCode} {company.city}
            </p>
          </address>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center rounded-pill bg-brand px-8 py-4 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-brand-deep"
            >
              Ring {company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center justify-center rounded-pill border border-bone/30 px-8 py-4 text-sm font-semibold tracking-wide transition-colors hover:border-bone"
            >
              {company.email}
            </a>
            <a
              href={company.mapsUrl}
              className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold tracking-wide text-bone/80 hover:text-bone"
            >
              Veibeskrivelse <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone">Åpningstider</h3>
          <dl className="mt-6 border-t border-line-dark">
            {openingHours.map((row) => (
              <div key={row.days} className="flex items-baseline justify-between gap-6 border-b border-line-dark py-5">
                <dt className="text-stone">{row.days}</dt>
                <dd className="font-display text-2xl">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
