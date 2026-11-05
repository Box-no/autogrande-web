import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { leadForms } from "@/content/forms";
import { workshopPromises, workshopServices } from "@/content/site";

export function Workshop() {
  return (
    <section id="verksted" aria-labelledby="verksted-tittel" className="bg-paper py-24 text-ink md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading
          id="verksted-tittel"
          eyebrow="Verksted i Grenland"
          tone="light"
          title={
            <>
              Avtalt pris. <span className="italic text-stone-dark">Ingen overraskelser.</span>
            </>
          }
        >
          <p>
            Vi gjør det som skal gjøres, til prisen vi ble enige om. Hvis noe blir dyrere, får du beskjed før vi går
            videre.
          </p>
          <p className="mt-4 text-base">[PLACEHOLDER: merker og tjenester verkstedet tar imot]</p>
        </SectionHeading>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-line-light bg-line-light md:grid-cols-3">
          {workshopPromises.map((promise, i) => (
            <li key={promise.title} className="bg-paper p-8 md:p-10">
              <Reveal delay={i * 0.08}>
                <p aria-hidden="true" className="font-display text-xl italic text-brand-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-display text-3xl tracking-display">{promise.title}</h3>
                <p className="mt-4 leading-relaxed text-stone-dark">{promise.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">Tjenester med fra-pris</h3>
            <dl className="mt-6 border-t border-line-light">
              {workshopServices.map((service) => (
                <div key={service.name} className="flex items-baseline justify-between gap-6 border-b border-line-light py-5">
                  <dt className="font-display text-3xl tracking-display">{service.name}</dt>
                  <dd className="text-right text-sm text-stone-dark">{service.price}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-card border border-line-light bg-bone p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-4xl tracking-display">Bestill time</h3>
            <p className="mt-3 text-stone-dark">Vi ringer deg tilbake og avtaler tidspunkt og pris før vi starter.</p>
            <div className="mt-10">
              <LeadForm config={leadForms.verksted} tone="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
