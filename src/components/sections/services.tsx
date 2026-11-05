import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/site";

export function Services() {
  return (
    <section aria-labelledby="tjenester-tittel" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading id="tjenester-tittel" eyebrow="Hele veien" title="Alt rundt bilkjøpet, på ett sted." />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li
              key={service.title}
              className="group relative flex flex-col rounded-card border-2 border-transparent bg-surface p-7 transition-colors duration-200 hover:border-ink motion-reduce:transition-none"
            >
              <h3 className="font-display text-display-sm">{service.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-stone-dark">{service.body}</p>
              <a
                href={service.href}
                className="mt-8 w-fit text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] after:absolute after:inset-0 group-hover:text-brand-deep"
              >
                {service.cta}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone-dark">
          * Omregistreringsavgift kommer i tillegg til fastprisen for formidlingssalg. Se fullstendige vilkår.
        </p>
      </div>
    </section>
  );
}
