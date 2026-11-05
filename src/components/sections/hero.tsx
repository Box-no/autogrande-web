import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { company, heroCar } from "@/content/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-tittel" className="bg-ink text-paper">
      <div className="mx-auto max-w-site px-5 pt-14 md:px-10 md:pt-20">
        <p className="text-sm font-semibold text-stone">Audi · BMW · Mercedes-Benz — {company.city}</p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 id="hero-tittel" className="font-display text-display-xl text-balance lg:col-span-8">
            Hver bil har en historie. Vi henter den hjem fra Tyskland.
          </h1>

          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-md text-lg leading-relaxed text-stone">
              Selvstendig importør siden 2016. Vi finner, henter og kjører bilene hjem selv – og garantien følger med.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/biler">Se bilene på lager</ButtonLink>
              <ButtonLink href="/selg-elbil" variant="secondary" tone="dark">
                Få bud på elbilen din
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <figure className="mx-auto mt-14 max-w-site md:mt-20 md:px-10">
        <div className="relative aspect-4/3 overflow-hidden bg-carbon sm:aspect-video lg:aspect-[21/9] md:rounded-t-card">
          <Image
            src={heroCar.image}
            alt={heroCar.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1408px) 1328px, 100vw"
            className="object-cover object-[60%_center]"
          />
        </div>
        <figcaption className="flex flex-col gap-3 bg-surface px-5 py-5 text-ink sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-sm">
            <span className="font-semibold">På lager nå</span>
            <span aria-hidden="true" className="mx-3 text-line-light">
              |
            </span>
            {heroCar.label}
          </p>
          <a
            href={heroCar.href}
            className="group inline-flex items-baseline gap-3 font-display text-display-sm tabular-nums"
          >
            {heroCar.price}
            <span className="font-sans text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] group-hover:text-brand-deep">
              Se bilen
            </span>
            <span className="sr-only">– Mercedes-Benz C63</span>
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
