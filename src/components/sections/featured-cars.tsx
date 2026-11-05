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
  const cardHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section aria-labelledby="utvalgte-tittel" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading
          id="utvalgte-tittel"
          level={headingLevel}
          size={headingLevel === "h1" ? "xl" : "lg"}
          align="center"
          eyebrow="Utvalgt fra lageret"
          title="Biler verdt å hente hjem."
        >
          <p>Et lite utvalg av det som står på lager akkurat nå. Godt utstyrt, grundig gjennomgått og klar for neste eier.</p>
        </SectionHeading>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredCars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} heading={cardHeading} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={listingHref} variant="secondary">
            {listingLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

type CarCardProps = {
  car: FeaturedCar;
  heading: "h2" | "h3";
};

function CarCard({ car, heading: Heading }: CarCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-soft">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          quality={75}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-2 pb-6">
        <p className="text-sm text-stone-dark">
          {car.make}
          <span aria-hidden="true"> · </span>
          <span className="tabular-nums">{car.year}</span>
          <span aria-hidden="true"> · </span>
          <span className="tabular-nums">{car.km}</span>
        </p>
        <Heading className="mt-2 font-display text-display-sm">
          <a href={car.href} className="after:absolute after:inset-0">
            {car.model}
          </a>
        </Heading>
        <p className="relative mt-4 font-display text-xl text-brand tabular-nums">{car.price}</p>
      </div>
    </article>
  );
}
