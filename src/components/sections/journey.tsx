import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { journeySteps } from "@/content/site";

export function Journey() {
  return (
    <section aria-labelledby="reisen-tittel" className="bg-ink py-24 md:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="reisen-tittel"
              eyebrow="Reisen fra Tyskland"
              title={
                <>
                  Hentet i Tyskland.
                  <span className="block italic text-stone">Kjørt hjem av oss.</span>
                </>
              }
            >
              <p>
                Vi snakker som bilentusiaster, ikke selgere. Derfor forteller vi hvor bilen kommer fra, hvem som hentet
                den – og hva vi fant da vi gikk den etter.
              </p>
            </SectionHeading>

            <figure className="mt-12 flex aspect-video items-center justify-center rounded-card border border-dashed border-line-dark bg-carbon p-8 text-center">
              <figcaption className="max-w-xs text-sm leading-relaxed text-stone">
                [PLACEHOLDER: bilde eller video fra en henting i Tyskland – by, dato og hvem som hentet]
              </figcaption>
            </figure>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {journeySteps.map((step, i) => (
            <li key={step.title} className="border-t border-line-dark py-12 first:border-t-0 first:pt-0 lg:first:pt-4">
              <Reveal>
                <p aria-hidden="true" className="font-display text-xl italic text-brand-bright">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-display-md tracking-display">{step.title}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-stone">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
