import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/site";

export function Services() {
  return (
    <section aria-labelledby="tjenester-tittel" className="bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading id="tjenester-tittel" eyebrow="Hele veien" title="Alt rundt bilkjøpet, på ett sted." />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.title} className="group relative bg-ink transition-colors duration-500 hover:bg-carbon">
              <Reveal delay={i * 0.06} className="flex h-full flex-col p-8 md:p-10">
                <h3 className="font-display text-3xl tracking-display">{service.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-stone">{service.body}</p>
                <a
                  href={service.href}
                  className="mt-10 inline-flex items-center gap-3 text-sm font-semibold tracking-wide after:absolute after:inset-0"
                >
                  {service.cta}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone">
          * Omregistreringsavgift kommer i tillegg til fastprisen for formidlingssalg. Se fullstendige vilkår.
        </p>
      </div>
    </section>
  );
}
