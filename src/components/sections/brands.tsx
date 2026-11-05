import { ButtonLink } from "@/components/button-link";
import { brands, company } from "@/content/site";

export function Brands() {
  return (
    <section aria-labelledby="merker-tittel" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <p className="text-sm font-semibold text-stone-dark">Spesialister</p>
        <h2 id="merker-tittel" className="sr-only">
          Spesialisert på Audi, BMW og Mercedes-Benz
        </h2>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {brands.map((brand) => (
            <li key={brand} className="rounded-card bg-surface px-6 py-8 font-display text-display-md shadow-card">
              {brand}
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <p className="font-display text-display-md text-balance lg:col-span-5">
            Skreddersy drømmebilen gjennom vårt kontaktnett.
          </p>
          <div className="space-y-5 text-lg leading-relaxed text-stone-dark lg:col-span-6 lg:col-start-7">
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
            <div className="pt-3">
              <ButtonLink href={company.phoneHref}>Fortell oss hva du ser etter – {company.phoneDisplay}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
