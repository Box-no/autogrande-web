import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { team } from "@/content/site";

function telHref(phone: string) {
  return `tel:+47${phone.replace(/\s/g, "")}`;
}

export function Team({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="om-oss" aria-labelledby="om-oss-tittel" className="bg-bone py-24 text-ink md:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="om-oss-tittel"
            level={headingLevel}
            eyebrow="Om oss"
            tone="light"
            title={
              <>
                Folkene bak AutoGrande. <span className="italic text-stone-dark">Vi elsker biler.</span>
              </>
            }
          >
            <p>
              Eierne av AutoGrande AS har drevet med salg og import av bil siden 2007. AutoGrande AS ble etablert
              1. januar 2016, og har siden den gang solgt og levert i snitt 300 biler hvert år.
            </p>
            <p className="mt-4">
              Vår visjon er å selge biler med høy kvalitet uten kostbare mellomledd. Vi har fokus på at bilene våre skal
              være meget godt utstyrte til riktig pris. Vi har kompetanse på hvilke utstyrskombinasjoner som er mulige å
              få, og det er en av våre høyeste prioriteringer når vi importerer biler.
            </p>
            <p className="mt-4">
              Vi leverer kvalitetsbiler til den kvalitetsbevisste forbrukeren, og hjelper mer enn gjerne til med å
              konfigurere din drømmebil. Du er hjertelig velkommen til å besøke oss i Håvundvegen 214 i Skien.
            </p>
            <p className="mt-4">Vi som jobber og brenner for AutoGrande AS er:</p>
          </SectionHeading>
        </div>

        <ul className="grid gap-px self-start overflow-hidden rounded-card border border-line-light bg-line-light sm:grid-cols-2 lg:col-span-7">
          {team.map((person, i) => (
            <li key={person.name} className="bg-bone p-8">
              <Reveal delay={(i % 2) * 0.08}>
                <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">{person.role}</p>
                <h3 className="mt-4 font-display text-3xl tracking-display">{person.name}</h3>
                {"phone" in person || "email" in person ? (
                  <ul className="mt-5 space-y-1 text-sm">
                    {"phone" in person ? (
                      <li>
                        <a href={telHref(person.phone)} className="underline-offset-4 hover:underline">
                          {person.phone}
                        </a>
                      </li>
                    ) : null}
                    {"email" in person ? (
                      <li>
                        <a href={`mailto:${person.email}`} className="text-stone-dark underline-offset-4 hover:underline">
                          {person.email}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
