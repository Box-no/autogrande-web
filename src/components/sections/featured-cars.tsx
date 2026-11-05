import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { featuredCars, legacySiteUrl, type FeaturedCar } from "@/content/site";

export function FeaturedCars() {
  const [lead, ...rest] = featuredCars;

  return (
    <section aria-labelledby="utvalgte-tittel" className="bg-paper py-24 text-ink md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="utvalgte-tittel" eyebrow="Utvalgt fra lageret" title="Biler verdt å hente hjem." tone="light">
            <p>Et lite utvalg av det som står på lager akkurat nå. Godt utstyrt, grundig gjennomgått og klar for neste eier.</p>
          </SectionHeading>
          <a
            href={`${legacySiteUrl}/biler`}
            className="group inline-flex shrink-0 items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide"
          >
            Se hele lageret
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {lead ? (
            <Reveal className="md:col-span-2 lg:col-span-12">
              <CarCard car={lead} featured />
            </Reveal>
          ) : null}
          {rest.map((car, i) => (
            <Reveal key={car.id} delay={(i % 2) * 0.1} className="lg:col-span-6">
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarCard({ car, featured = false }: { car: FeaturedCar; featured?: boolean }) {
  return (
    <article className={`group relative ${featured ? "grid gap-8 lg:grid-cols-12 lg:items-end" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-card bg-bone ${
          featured ? "aspect-video lg:col-span-8" : "aspect-video"
        }`}
      >
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          quality={75}
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-1000 ease-luxe group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className={featured ? "lg:col-span-4 lg:pb-4" : "mt-6"}>
        <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">{car.make}</p>
        <h3 className={`mt-3 font-display tracking-display ${featured ? "text-display-lg" : "text-4xl"}`}>
          <a href={car.href} className="after:absolute after:inset-0">
            {car.model}
          </a>
        </h3>
        <dl className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line-light pt-5 text-sm">
          <div className="flex gap-2">
            <dt className="sr-only">Årsmodell</dt>
            <dd>{car.year}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Kilometerstand</dt>
            <dd className="text-stone-dark">{car.km}</dd>
          </div>
          <div className="ml-auto flex gap-2">
            <dt className="sr-only">Totalpris</dt>
            <dd className="text-base font-semibold">{car.price}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
