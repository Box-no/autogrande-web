import Image from "next/image";
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
                Vi snakker som bilentusiaster, ikke selgere. Spør oss gjerne hvor bilen kommer fra og hva vi fant da vi
                gikk den etter – vi forteller det rett ut.
              </p>
            </SectionHeading>

            <figure className="mt-12">
              <div className="relative aspect-video overflow-hidden rounded-card bg-carbon">
                <Image
                  src="https://cdn.autonet.no/ads-87243/c-26e33fc6EGM05200.jpg"
                  alt="Svart Porsche 911 Carrera fra 2000 foran AutoGrandes lokaler i Skien"
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-4 text-sm text-stone">
                Porsche 911 Carrera (2000), på lager hos oss i Skien.
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
