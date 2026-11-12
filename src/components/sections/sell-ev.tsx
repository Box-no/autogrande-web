import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { leadForms } from "@/content/forms";
import { sellSteps } from "@/content/site";

export function SellEv({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <section id="selg-elbil" aria-labelledby="elbil-tittel" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            id="elbil-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
            title="Vi selger bilen din."
          >
            <p>Vi tester bilen, tar bildene og selger den for deg.</p>
          </SectionHeading>

          <ol className="mt-10 border-t-2 border-ink">
            {sellSteps.map((step, index) => (
              <li key={step.title} className="grid gap-2 border-b border-line-light py-6 sm:grid-cols-[3rem_1fr] md:py-8">
                <span className="font-display text-display-sm text-stone tabular-nums">{index + 1}</span>
                <div>
                  <h2 className="font-display text-display-sm">{step.title}</h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-stone-dark">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-card bg-surface p-6 shadow-card sm:p-10 lg:col-span-5 lg:self-start">
          <SubHeading className="font-display text-display-md">Start med bilen din</SubHeading>
          <p className="mt-3 text-stone-dark">
            Send registreringsnummer og kilometerstand. Du får en side der du kan følge sjekken og tilbudet.
          </p>
          <div className="mt-8">
            <LeadForm config={leadForms.elbil} />
          </div>
        </div>
      </div>
    </section>
  );
}
