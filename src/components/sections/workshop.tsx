import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { leadForms } from "@/content/forms";
import { workshopPromises, workshopServices } from "@/content/site";

export function Workshop({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section id="verksted" aria-labelledby="verksted-tittel">
      <div className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <SectionHeading
            id="verksted-tittel"
            level={headingLevel}
            eyebrow="Verksted i Grenland"
            size={headingLevel === "h1" ? "xl" : "lg"}
            title="Avtalt pris. Ingen overraskelser."
          >
            <p>
              Vi gjør det som skal gjøres, til prisen vi ble enige om. Hvis noe blir dyrere, får du beskjed før vi går
              videre.
            </p>
            <p className="mt-4 text-base">[PLACEHOLDER: hvilke merker verkstedet tar imot]</p>
          </SectionHeading>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {workshopPromises.map((promise) => (
              <li key={promise.title} className="rounded-card bg-surface p-7 shadow-card md:p-9">
                <SubHeading className="font-display text-display-sm">{promise.title}</SubHeading>
                <p className="mt-4 leading-relaxed text-stone-dark">{promise.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SubHeading className="font-display text-display-md">Tjenester med fra-pris</SubHeading>
            <dl className="mt-8 rounded-card bg-surface px-6 shadow-card">
              {workshopServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-baseline justify-between gap-6 border-b border-line-light py-5 last:border-b-0"
                >
                  <dt className="font-display text-display-sm">{service.name}</dt>
                  <dd className="text-right text-sm text-stone-dark tabular-nums">{service.price}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-card bg-surface p-6 shadow-card sm:p-10 lg:col-span-6 lg:col-start-7">
            <SubHeading className="font-display text-display-md">Bestill time</SubHeading>
            <p className="mt-3 text-stone-dark">Vi ringer deg tilbake og avtaler tidspunkt og pris før vi starter.</p>
            <div className="mt-8">
              <LeadForm config={leadForms.verksted} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
