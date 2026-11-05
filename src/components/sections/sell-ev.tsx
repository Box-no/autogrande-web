import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { leadForms } from "@/content/forms";
import { evPoints } from "@/content/site";

export function SellEv({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="selg-elbil" aria-labelledby="elbil-tittel" className="bg-carbon py-24 md:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="elbil-tittel"
            level={headingLevel}
            eyebrow="Vi kjøper din elbil"
            title={
              <>
                Selg elbilen <span className="italic text-stone">direkte.</span>
              </>
            }
          >
            <p>
              Send reg.nr. og km-stand, så får du bud fra oss. Ingen auksjon og ingen mellomledd. Sammenlign gjerne med
              Nettbil.
            </p>
          </SectionHeading>

          <ul className="mt-12 space-y-5">
            {evPoints.map((point) => (
              <li key={point} className="flex gap-4 text-bone/90">
                <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-brand" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 leading-relaxed text-stone">
            Få budet vårt, sammenlign i ro og mak, og bestem deg selv. Vi er bilfolk, ikke en auksjonsplattform – du
            snakker med dem som faktisk skal kjøpe bilen.
          </p>
        </div>

        <div className="rounded-card border border-line-dark bg-ink p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
          <h3 className="font-display text-4xl tracking-display">Få bud på bilen din</h3>
          <p className="mt-3 text-stone">Send inn, så ser vi på bilen og kommer tilbake til deg med et bud.</p>
          <div className="mt-10">
            <LeadForm config={leadForms.elbil} />
          </div>
        </div>
      </div>
    </section>
  );
}
