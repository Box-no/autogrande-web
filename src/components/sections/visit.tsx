import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { company, heroCar, openingHours } from "@/content/site";

export function VisitBanner() {
  return (
    <section aria-labelledby="besok-banner" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-site gap-10 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="besok-banner" className="font-display text-display-lg text-balance">
            Velkommen innom i Skien.
          </h2>
          <p className="mt-4 max-w-md text-stone-dark">
            Du er hjertelig velkommen innom for en prat, en titt eller en prøvetur.
          </p>
          <address className="mt-8 font-display text-display-sm not-italic">
            {company.street}
            <br />
            {company.postalCode} {company.city}
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={company.phoneHref}>Ring {company.phoneDisplay}</ButtonLink>
            <ButtonLink href={company.mapsUrl} variant="secondary">
              Veibeskrivelse
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-card lg:col-span-7">
          <Image
            src={heroCar.image}
            alt=""
            fill
            quality={75}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[70%_center]"
          />
        </div>
      </div>
    </section>
  );
}

export function Visit({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section id="kontakt" aria-labelledby="kontakt-tittel" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="kontakt-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
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
            <ButtonLink href={`mailto:${company.email}`} variant="secondary">
              {company.email}
            </ButtonLink>
            <ButtonLink href={company.mapsUrl} variant="text" className="py-3 sm:px-2">
              Veibeskrivelse
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-start">
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
