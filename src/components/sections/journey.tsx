import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { journeySteps } from "@/content/site";

export function Journey() {
  return (
    <section aria-labelledby="reisen-tittel" className="bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-site gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="reisen-tittel" eyebrow="Reisen fra Tyskland" title="Hentet i Tyskland. Kjørt hjem av oss.">
              <p>
                Vi snakker som bilentusiaster, ikke selgere. Spør oss gjerne hvor bilen kommer fra og hva vi fant da vi
                gikk den etter – vi forteller det rett ut.
              </p>
            </SectionHeading>

            <figure className="mt-10">
              <div className="relative aspect-3/2 overflow-hidden rounded-card bg-line-light">
                <Image
                  src="https://cdn.autonet.no/ads-87243/c-26e33fc6EGM05200.jpg"
                  alt="Svart Porsche 911 Carrera fra 2000 foran AutoGrandes lokaler i Skien"
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-sm text-stone-dark">
                Porsche 911 Carrera (2000), på lager hos oss i Skien.
              </figcaption>
            </figure>
          </div>
        </div>

        <ol className="space-y-4 lg:col-span-6 lg:col-start-7">
          {journeySteps.map((step, i) => (
            <li key={step.title} className="flex gap-6 rounded-card bg-surface p-7 md:gap-8 md:p-9">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-control bg-ink font-display text-lg text-paper tabular-nums"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-display-sm">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-dark">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
