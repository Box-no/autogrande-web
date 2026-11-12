import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { carImage, featuredStock, type Car } from "@/content/cars";

type FeaturedCarsProps = {
  headingLevel?: "h1" | "h2";
  cars?: readonly Car[];
  title?: string;
  intro?: string;
  showListingLink?: boolean;
};

export function FeaturedCars({
  headingLevel = "h2",
  cars = featuredStock(),
  title = "Biler verdt å hente hjem.",
  intro = "Et lite utvalg av det som står på lager akkurat nå. Godt utstyrt, grundig gjennomgått og klar for neste eier.",
  showListingLink = true,
}: FeaturedCarsProps) {
  const cardHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section aria-labelledby="utvalgte-tittel" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="utvalgte-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
            title={title}
          >
            <p>{intro}</p>
          </SectionHeading>
          {showListingLink ? (
            <ButtonLink href="/biler" variant="secondary" className="shrink-0">
              Se alle bilene
            </ButtonLink>
          ) : (
            <p className="shrink-0 text-sm text-stone-dark tabular-nums">{cars.length} biler</p>
          )}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} heading={cardHeading} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function highlight(car: Car, label: string) {
  return car.highlights.find((line) => line.label === label)?.value ?? "";
}

function CarCard({ car, heading: Heading }: { car: Car; heading: "h2" | "h3" }) {
  const image = carImage(car);
  const facts = [String(car.year ?? ""), car.km, highlight(car, "Drivstoff"), highlight(car, "Girkasse")].filter(Boolean);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        {image ? (
          <Image
            src={image}
            alt={car.title}
            fill
            quality={75}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-center transition-transform duration-500 ease-out-quart group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-stone-dark">Ingen bilde i annonsen</p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-display text-display-sm">
          <Link href={`/biler/${car.slug}`} className="after:absolute after:inset-0">
            {car.title}
          </Link>
        </Heading>
        <ul className="mt-2 mb-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-stone-dark tabular-nums">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p className="mt-auto flex items-baseline justify-between border-t border-line-light pt-4">
          <span className="text-sm text-stone-dark">Totalpris</span>
          <span className="font-display text-xl tabular-nums">{car.price}</span>
        </p>
      </div>
    </article>
  );
}
