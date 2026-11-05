import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { leadForms } from "@/content/forms";
import { evPoints } from "@/content/site";

export function SellEv({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section id="selg-elbil" aria-labelledby="elbil-tittel" className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="elbil-tittel"
            level={headingLevel}
            eyebrow="Vi kjøper din elbil"
            tone="dark"
            size={headingLevel === "h1" ? "xl" : "lg"}
            title="Selg elbilen direkte."
          >
            <p>
              Send reg.nr. og km-stand, så får du bud fra oss. Ingen auksjon og ingen mellomledd. Sammenlign gjerne med
              Nettbil.
            </p>
          </SectionHeading>

          <ul className="mt-10 border-t border-line-dark">
            {evPoints.map((point) => (
              <li key={point} className="flex gap-4 border-b border-line-dark py-4">
                <CheckIcon />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 leading-relaxed text-stone">
            Få budet vårt, sammenlign i ro og mak, og bestem deg selv. Vi er bilfolk, ikke en auksjonsplattform – du
            snakker med dem som faktisk skal kjøpe bilen.
          </p>
        </div>

        <div className="rounded-card bg-surface p-6 text-ink sm:p-10 lg:col-span-6 lg:col-start-7 lg:self-start">
          <SubHeading className="font-display text-display-md">Få bud på bilen din</SubHeading>
          <p className="mt-3 text-stone-dark">Send inn, så ser vi på bilen og kommer tilbake til deg med et bud.</p>
          <div className="mt-8">
            <LeadForm config={leadForms.elbil} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-brand-bright">
      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}
