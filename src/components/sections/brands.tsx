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
              Vi har alltid biler på lager både i Norge og i Tyskland, og meget gode kontakter på Audi i Tyskland. Vi vet
              hvilke utstyrskombinasjoner som er mulige å få – det er noe av det viktigste når vi importerer.
            </p>
            <p>Lave lagerkostnader og ingen kostbare mellomledd gir konkurransedyktige priser.</p>
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
