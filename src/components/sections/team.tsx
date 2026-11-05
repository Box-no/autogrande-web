import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { team } from "@/content/site";

function telHref(phone: string) {
  return `tel:+47${phone.replace(/\s/g, "")}`;
}

type TeamProps = {
  headingLevel?: "h1" | "h2";
  /** Homepage shows the portraits with a short intro. The about page keeps the full text. */
  variant?: "page" | "home";
};

export function Team({ headingLevel = "h2", variant = "page" }: TeamProps) {
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  const home = variant === "home";

  return (
    <section
      id="om-oss"
      aria-labelledby="om-oss-tittel"
      className={home ? "bg-ink py-20 text-paper md:py-28" : "bg-paper py-20 md:py-28"}
    >
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className={home ? "flex flex-col gap-8 md:flex-row md:items-end md:justify-between" : "max-w-3xl"}>
          <SectionHeading
            id="om-oss-tittel"
            level={headingLevel}
            size={headingLevel === "h1" ? "xl" : "lg"}
            eyebrow="Om oss"
            tone={home ? "dark" : "light"}
            title={home ? "Folkene bak AutoGrande." : "Folkene bak AutoGrande. Vi elsker biler."}
          >
            {home ? (
              <p>Vi som jobber og brenner for AutoGrande AS er:</p>
            ) : (
              <>
                <p>
                  Eierne av AutoGrande AS har drevet med salg og import av bil siden 2007. AutoGrande AS ble etablert
                  1. januar 2016, og har siden den gang solgt og levert i snitt 300 biler hvert år.
                </p>
                <p className="mt-4">
                  Vår visjon er å selge biler med høy kvalitet uten kostbare mellomledd. Vi har fokus på at bilene våre
                  skal være meget godt utstyrte til riktig pris. Vi har kompetanse på hvilke utstyrskombinasjoner som er
                  mulige å få, og det er en av våre høyeste prioriteringer når vi importerer biler.
                </p>
                <p className="mt-4">
                  Vi leverer kvalitetsbiler til den kvalitetsbevisste forbrukeren, og hjelper mer enn gjerne til med å
                  konfigurere din drømmebil. Du er hjertelig velkommen til å besøke oss i Håvundvegen 214 i Skien.
                </p>
                <p className="mt-4">Vi som jobber og brenner for AutoGrande AS er:</p>
              </>
            )}
          </SectionHeading>
          {home ? (
            <ButtonLink href="/om-oss" variant="secondary" tone="dark" className="shrink-0 self-start md:self-auto">
              Les mer om oss
            </ButtonLink>
          ) : null}
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <li key={person.name} className={home ? "overflow-hidden rounded-card bg-carbon" : "overflow-hidden rounded-card bg-surface"}>
              <div className={`relative aspect-[4/5] ${home ? "bg-line-dark" : "bg-line-light"}`}>
                <Image
                  src={person.image}
                  alt=""
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-[center_18%]"
                />
              </div>
              <div className="p-6 md:p-7">
                <SubHeading className="font-display text-display-sm">{person.name}</SubHeading>
                <p className={`mt-1 text-sm ${home ? "text-stone" : "text-stone-dark"}`}>{person.role}</p>
                {"phone" in person || "email" in person ? (
                  <ul className={`mt-5 space-y-1 border-t pt-4 text-sm ${home ? "border-line-dark" : "border-line-light"}`}>
                    {"phone" in person ? (
                      <li>
                        <a
                          href={telHref(person.phone)}
                          className="font-semibold tabular-nums underline-offset-4 hover:underline"
                        >
                          {person.phone}
                        </a>
                      </li>
                    ) : null}
                    {"email" in person ? (
                      <li>
                        <a
                          href={`mailto:${person.email}`}
                          className={`underline-offset-4 hover:underline ${home ? "text-stone" : "text-stone-dark"}`}
                        >
                          {person.email}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
