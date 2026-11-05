import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { company, openingHours } from "@/content/site";

export function Visit({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section id="kontakt" aria-labelledby="kontakt-tittel" className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="kontakt-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
            eyebrow="Besøk oss"
            tone="dark"
            title="Velkommen innom i Skien."
          >
            <p>Du er hjertelig velkommen innom for en prat, en titt eller en prøvetur.</p>
          </SectionHeading>

          <address className="mt-10 font-display text-display-sm not-italic">
            {company.street}
            <br />
            {company.postalCode} {company.city}
          </address>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={company.phoneHref}>Ring {company.phoneDisplay}</ButtonLink>
            <ButtonLink href={`mailto:${company.email}`} variant="secondary" tone="dark">
              {company.email}
            </ButtonLink>
            <ButtonLink href={company.mapsUrl} variant="text" tone="dark" className="py-3.5 sm:px-3">
              Veibeskrivelse
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-card bg-surface p-7 text-ink md:p-9 lg:col-span-5 lg:col-start-8 lg:self-start">
          <SubHeading className="font-display text-display-sm">Åpningstider</SubHeading>
          <dl className="mt-6">
            {openingHours.map((row) => (
              <div
                key={row.days}
                className="flex items-baseline justify-between gap-6 border-t border-line-light py-4 first:border-t-2 first:border-ink"
              >
                <dt className="text-stone-dark">{row.days}</dt>
                <dd className="font-semibold tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
