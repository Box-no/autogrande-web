import { HeroMedia } from "@/components/sections/hero-media";
import { company, heroCar, legacySiteUrl } from "@/content/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-tittel" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroMedia src={heroCar.image} alt={heroCar.alt} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <div className="mx-auto flex w-full max-w-site flex-1 flex-col justify-end px-5 pb-12 pt-32 md:px-10 md:pb-16">
        <p className="flex items-center gap-3 text-eyebrow font-medium uppercase tracking-eyebrow text-bone/80">
          <span aria-hidden="true" className="h-px w-10 bg-brand" />
          Audi · BMW · Mercedes-Benz — {company.city}
        </p>

        <h1 id="hero-tittel" className="mt-8 max-w-5xl font-display text-display-xl tracking-display">
          Hver bil har en historie.
          <span className="block italic text-bone/75">Vi henter den hjem fra Tyskland.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
          Selvstendig importør siden 2016. Vi finner, henter og kjører bilene hjem selv – og garantien følger med.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={`${legacySiteUrl}/biler`}
            className="inline-flex items-center justify-center gap-3 rounded-pill bg-bone px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-paper"
          >
            Se bilene på lager <span aria-hidden="true">→</span>
          </a>
          <a
            href="#selg-elbil"
            className="inline-flex items-center justify-center gap-3 rounded-pill border border-bone/30 px-8 py-4 text-sm font-semibold tracking-wide transition-colors hover:border-bone"
          >
            Få bud på elbilen din
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-bone/15 pt-6 text-sm text-bone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-bone/50">På lager nå — </span>
            {heroCar.label}
          </p>
          <a href={heroCar.href} className="group inline-flex items-center gap-2 text-bone">
            {heroCar.price}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="sr-only">– se Mercedes-Benz C63</span>
          </a>
        </div>
      </div>
    </section>
  );
}
