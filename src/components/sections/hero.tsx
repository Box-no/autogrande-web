import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { company, heroCar } from "@/content/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-tittel" className="bg-paper pt-6 pb-4 md:pt-10">
      <div className="mx-auto grid max-w-site gap-4 px-5 md:px-10 lg:grid-cols-12">
        <div className="relative min-h-[32rem] overflow-hidden rounded-card lg:col-span-8">
          <Image
            src={heroCar.image}
            alt={heroCar.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover object-[60%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />
          <div className="relative flex h-full min-h-[32rem] flex-col justify-end p-7 text-surface md:p-12">
            <p className="text-sm font-medium text-surface/80">Audi · BMW · Mercedes-Benz — {company.city}</p>
            <h1 id="hero-tittel" className="mt-4 max-w-xl font-display text-display-xl text-balance">
              Hver bil har en historie. Vi henter den hjem fra Tyskland.
            </h1>
            <p className="mt-4 max-w-md text-surface/85">
              Selvstendig importør siden 2016. Vi finner, henter og kjører bilene hjem selv – og garantien følger med.
            </p>
            <div className="mt-8">
              <ButtonLink href="/biler">Se bilene på lager</ButtonLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 rounded-card bg-soft p-7 md:p-10 lg:col-span-4">
          <div>
            <p className="text-sm font-semibold text-brand">Vi kjøper din elbil</p>
            <h2 className="mt-4 font-display text-display-md text-balance">Bud direkte, uten mellomledd.</h2>
            <p className="mt-4 leading-relaxed text-stone-dark">
              Send reg.nr. og km-stand. Du får bud fra oss, og kan sammenligne med Nettbil.
            </p>
          </div>
          <ButtonLink href="/selg-elbil">Få bud på elbilen din</ButtonLink>
        </div>
      </div>
    </section>
  );
}
