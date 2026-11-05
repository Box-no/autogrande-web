import { ButtonLink } from "@/components/button-link";
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
    <section aria-labelledby="andre-maater-tittel" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading id="andre-maater-tittel" eyebrow="Andre måter å selge på" title="Innbytte eller formidlingssalg.">
          <p>Har du ikke elbil, eller vil du heller bytte inn? Det ordner vi også.</p>
        </SectionHeading>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col rounded-card bg-surface p-7 md:p-10">
            <h3 className="font-display text-display-md">Innbytte</h3>
            <p className="mt-5 flex-1 text-lg leading-relaxed text-stone-dark">
              På tide å bytte bil? Vi tar gjerne bilen din i innbytte! Fyll ut skjemaet, så sender vi deg et tilbud så
              fort som mulig.
            </p>
            <div className="mt-8">
              <ButtonLink href={`${legacySiteUrl}/innbytte`} variant="secondary">
                Få innbyttetilbud
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col rounded-card bg-surface p-7 md:p-10">
            <h3 className="font-display text-display-md">Formidlingssalg</h3>
            <p className="mt-5 text-lg leading-relaxed text-stone-dark">
              Ønsker du å selge bilen din med hjelp fra en forhandler? Vi tar gjerne oppdraget, og sparer deg for tid og
              arbeid knyttet til bilsalget. Vi tar en fastpris på 25 000 kr* for å gjøre jobben. Inkludert i
              fastprisen:
            </p>
            <ul className="mt-6 border-t border-line-light text-stone-dark">
              {consignmentIncludes.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line-light py-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-ink" />
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
            <div className="mt-8">
              <ButtonLink href={`${legacySiteUrl}/formidlingssalg`} variant="secondary">
                Start formidlingssalg
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
