import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { legacySiteUrl } from "@/content/site";

const consignmentIncludes = [
  "Intern takstrapport av bilens tilstand",
  "Vask, fotografering og annonse",
  "Visning, prøvekjøring og annen kundeoppfølging",
  "Papirarbeid som kontrakt og registrering",
  "Har nybilgarantien utløpt, leverer vi bilen til neste eier med 1 års bruktbilgaranti, dersom bilen oppfyller garantivilkårene. Kostnaden for garanti kommer i tillegg til fastprisen.",
] as const;

export function SellOptions() {
  return (
    <section aria-labelledby="andre-maater-tittel" className="bg-paper py-24 text-ink md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading
          id="andre-maater-tittel"
          eyebrow="Andre måter å selge på"
          tone="light"
          title={
            <>
              Innbytte eller <span className="italic text-stone-dark">formidlingssalg.</span>
            </>
          }
        >
          <p>Har du ikke elbil, eller vil du heller bytte inn? Det ordner vi også.</p>
        </SectionHeading>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line-light bg-line-light lg:grid-cols-2">
          <Reveal className="h-full bg-paper p-8 md:p-12">
            <h3 className="font-display text-4xl tracking-display">Innbytte</h3>
            <p className="mt-5 text-lg leading-relaxed text-stone-dark">
              På tide å bytte bil? Vi tar gjerne bilen din i innbytte! Fyll ut skjemaet, så sender vi deg et tilbud så
              fort som mulig.
            </p>
            <a
              href={`${legacySiteUrl}/innbytte`}
              className="mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide"
            >
              Få innbyttetilbud <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal delay={0.08} className="h-full bg-paper p-8 md:p-12">
            <h3 className="font-display text-4xl tracking-display">Formidlingssalg</h3>
            <p className="mt-5 text-lg leading-relaxed text-stone-dark">
              Ønsker du å selge bilen din med hjelp fra en forhandler? Vi tar gjerne oppdraget, og sparer deg for tid og
              arbeid knyttet til bilsalget. Vi tar en fastpris på 25 000 kr* for å gjøre jobben. Inkludert i
              fastprisen:
            </p>
            <ul className="mt-6 space-y-3 text-stone-dark">
              {consignmentIncludes.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-brand" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-stone-dark">
              Oppdraget kan når som helst trekkes. Ved kansellering faktureres et gebyr på 4 000 kroner.
              <br />* Omregistreringsavgift kommer i tillegg. Ytterligere pristillegg kan forekomme ved behov for ekstra
              vask, annonsering, dekkskift, polering, rens av bilen o.l. Uforutsette tillegg avklares med deg på
              forhånd, slik at ingen får en ubehagelig overraskelse.
            </p>
            <a
              href={`${legacySiteUrl}/formidlingssalg`}
              className="mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide"
            >
              Start formidlingssalg <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
