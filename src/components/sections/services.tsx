import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/site";

export function Services() {
  return (
    <section aria-labelledby="tjenester-tittel" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading id="tjenester-tittel" title="Alt rundt bilkjøpet, på ett sted." />

        <ul className="mt-10 border-t-2 border-ink">
          {services.map((service) => (
            <li key={service.title} className="border-b border-line-light">
              <Link
                href={service.href}
                className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <h3 className="font-display text-display-sm md:col-span-3">{service.title}</h3>
                <p className="leading-relaxed text-stone-dark md:col-span-6">{service.body}</p>
                <span className="text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] group-hover:text-brand-deep md:col-span-3 md:justify-self-end">
                  {service.cta}
                </span>
              </Link>
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
