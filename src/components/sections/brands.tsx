import { Reveal } from "@/components/reveal";
import { brands, company } from "@/content/site";

export function Brands() {
  return (
    <section aria-labelledby="merker-tittel" className="bg-bone py-24 text-ink md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <p className="flex items-center gap-3 text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">
          <span aria-hidden="true" className="h-px w-10 bg-brand" />
          Spesialister
        </p>
        <h2 id="merker-tittel" className="sr-only">
          Spesialisert på Audi, BMW og Mercedes-Benz
        </h2>

        <ul className="mt-10 border-t border-line-light">
          {brands.map((brand, i) => (
            <li key={brand} className="border-b border-line-light">
              <Reveal delay={i * 0.08}>
                <p className="py-6 font-display text-display-xl tracking-display md:py-8">{brand}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <p className="font-display text-display-md tracking-display lg:col-span-6">
            Skreddersy drømmebilen <span className="italic text-stone-dark">gjennom vårt kontaktnett.</span>
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-stone-dark lg:col-span-5 lg:col-start-8">
            <p>
              Vi har valgt å spesialisere oss på Audi, BMW og Mercedes-Benz. Gjennom en årrekke har vi opparbeidet oss
              et solid kontaktnett over hele Tyskland. Det gjør at vi kan tilby deg kvalitet og sikkerhet, samt en bil
              med et høyt og ettertraktet utstyrsnivå. Vi har også meget gode kontakter på Audi i Tyskland som kan
              hjelpe deg med å skaffe drømmebilen.
            </p>
            <p>
              Vi har alltid biler på lager både i Norge og i Tyskland. På den måten kan vi tilby et rikt utvalg, og
              samtidig holde lagerkostnadene så lave som mulig – det gjør at vi kan selge bilene til enda mer
              konkurransedyktige priser.
            </p>
            <p>
              AutoGrande AS er en selvstendig importør, og bistår mer enn gjerne med å skreddersy din drømmebil gjennom
              kontaktnettet vårt.
            </p>
            <a
              href={company.phoneHref}
              className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide text-ink"
            >
              Fortell oss hva du ser etter – {company.phoneDisplay}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
