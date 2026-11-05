import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { featuredCars, type FeaturedCar } from "@/content/site";

type FeaturedCarsProps = {
  headingLevel?: "h1" | "h2";
  listingHref?: string;
  listingLabel?: string;
};

export function FeaturedCars({
  headingLevel = "h2",
  listingHref = "/biler",
  listingLabel = "Se alle bilene",
}: FeaturedCarsProps) {
  const [lead, ...rest] = featuredCars;
  const cardHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section aria-labelledby="utvalgte-tittel" className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="utvalgte-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
            eyebrow="Utvalgt fra lageret"
            title="Biler verdt å hente hjem."
            tone="dark"
          >
            <p>Et lite utvalg av det som står på lager akkurat nå. Godt utstyrt, grundig gjennomgått og klar for neste eier.</p>
          </SectionHeading>
          <ButtonLink href={listingHref} variant="secondary" tone="dark" className="shrink-0 self-start md:self-auto">
            {listingLabel}
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {lead ? (
            <li className="md:col-span-2">
              <CarCard car={lead} heading={cardHeading} featured />
            </li>
          ) : null}
          {rest.map((car) => (
            <li key={car.id}>
              <CarCard car={car} heading={cardHeading} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type CarCardProps = {
  car: FeaturedCar;
  heading: "h2" | "h3";
  featured?: boolean;
};

function CarCard({ car, heading: Heading, featured = false }: CarCardProps) {
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-card bg-carbon ${
        featured ? "lg:grid lg:grid-cols-12" : "flex flex-col"
      }`}
    >
      <div className={`relative aspect-3/2 overflow-hidden bg-line-dark ${featured ? "lg:col-span-8 lg:aspect-auto lg:min-h-[28rem]" : ""}`}>
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          quality={75}
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className={`flex flex-1 flex-col p-6 md:p-8 ${featured ? "lg:col-span-4 lg:justify-end" : ""}`}>
        <p className="text-sm font-semibold text-stone">{car.make}</p>
        <Heading className={`mt-1 font-display ${featured ? "text-display-lg" : "text-display-md"}`}>
          <a href={car.href} className="after:absolute after:inset-0">
            {car.model}
          </a>
        </Heading>
        <dl className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-3 border-t border-line-dark pt-5 text-sm text-stone tabular-nums">
          <div>
            <dt className="sr-only">Årsmodell</dt>
            <dd>{car.year}</dd>
          </div>
          <div>
            <dt className="sr-only">Kilometerstand</dt>
            <dd>{car.km}</dd>
          </div>
          <div className="ml-auto text-paper">
            <dt className="sr-only">Totalpris</dt>
            <dd className="font-display text-display-sm tabular-nums">{car.price}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
