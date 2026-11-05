import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { carImage, featuredStock, type Car } from "@/content/cars";

type FeaturedCarsProps = {
  headingLevel?: "h1" | "h2";
  cars?: readonly Car[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  showListingLink?: boolean;
};

export function FeaturedCars({
  headingLevel = "h2",
  cars = featuredStock(),
  eyebrow = "Utvalgt fra lageret",
  title = "Biler verdt å hente hjem.",
  intro = "Et lite utvalg av det som står på lager akkurat nå. Godt utstyrt, grundig gjennomgått og klar for neste eier.",
  showListingLink = true,
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
          eyebrow={eyebrow}
          title={title}
        >
          <p>{intro}</p>
        </SectionHeading>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} heading={cardHeading} />
            </li>
          ))}
        </ul>

        {showListingLink ? (
          <div className="mt-12 flex justify-center">
            <ButtonLink href="/biler" variant="secondary">
              Se alle bilene
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CarCard({ car, heading: Heading }: { car: Car; heading: "h2" | "h3" }) {
  const image = carImage(car);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-soft">
        {image ? (
          <Image
            src={image}
            alt={car.title}
            fill
            quality={75}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-center transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-stone-dark">Ingen bilde i annonsen</p>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pt-2 pb-6">
        <p className="text-sm text-stone-dark tabular-nums">
          {car.year}
          {car.km ? <span aria-hidden="true"> · </span> : null}
          {car.km}
        </p>
        <Heading className="mt-2 font-display text-display-sm">
          <Link href={`/biler/${car.slug}`} className="after:absolute after:inset-0">
            {car.title}
          </Link>
        </Heading>
        <p className="relative mt-4 font-display text-xl text-brand tabular-nums">{car.price}</p>
      </div>
    </article>
  );
}
