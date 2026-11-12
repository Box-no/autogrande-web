import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { cars, getCar } from "@/content/cars";
import { company, heroCar, openingHours } from "@/content/site";

export function Hero() {
  const pictured = getCar("251612-mercedes-benz-c63-2015");
  return (
    <section id="top" aria-labelledby="hero-tittel" className="bg-paper">
      <div className="mx-auto grid max-w-site px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="py-12 md:py-16 lg:col-span-5 lg:py-20">
          <p className="text-sm text-stone-dark">
            {company.street}, {company.postalCode} {company.city}
          </p>
          <h1 id="hero-tittel" className="mt-4 font-display text-display-xl text-balance">
            Audi, BMW og Mercedes-Benz fra Tyskland.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-dark">
            Selvstendig importør siden 2016. Vi finner, henter og kjører bilene hjem selv – og garantien følger med.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/biler">Se {cars.length} biler på lager</ButtonLink>
            <ButtonLink href="/selg-elbil" variant="secondary">
              Selg bilen din
            </ButtonLink>
          </div>

          <div className="mt-12 max-w-md border-t border-line-light pt-6 text-sm">
            <p className="flex justify-between gap-6">
              <span className="text-stone-dark">Telefon</span>
              <a href={company.phoneHref} className="font-semibold tabular-nums underline-offset-4 hover:underline">
                {company.phoneDisplay}
              </a>
            </p>
            <h2 className="mt-5 text-stone-dark">Åpningstider</h2>
            <dl className="mt-2 space-y-1">
              {openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6">
                  <dt>{row.days}</dt>
                  <dd className="font-semibold tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <figure className="relative -mx-5 min-h-80 md:mx-0 lg:col-span-7 lg:my-10">
          <Image
            src={heroCar.image}
            alt={heroCar.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[60%_center] md:rounded-card"
          />
          {pictured ? (
            <figcaption className="absolute bottom-0 left-0 bg-carbon px-4 py-3 text-sm text-paper md:rounded-bl-card">
              <Link href={`/biler/${pictured.slug}`} className="underline-offset-4 hover:underline">
                {pictured.title} · <span className="font-semibold">{pictured.price}</span>
              </Link>
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
