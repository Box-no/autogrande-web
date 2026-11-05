import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { team } from "@/content/site";

function telHref(phone: string) {
  return `tel:+47${phone.replace(/\s/g, "")}`;
}

export function Team() {
  return (
    <section id="om-oss" aria-labelledby="om-oss-tittel" className="bg-bone py-24 text-ink md:py-36">
      <div className="mx-auto grid max-w-site gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="om-oss-tittel"
            eyebrow="Om oss"
            tone="light"
            title={
              <>
                Folkene bak AutoGrande. <span className="italic text-stone-dark">Vi elsker biler.</span>
              </>
            }
          >
            <p>
              Eierne av AutoGrande har drevet med salg og import av bil siden 2007. AutoGrande AS ble etablert 1. januar
              2016, og har siden levert i snitt 300 biler hvert år.
            </p>
            <p className="mt-4">
              Visjonen er enkel: biler med høy kvalitet, godt utstyrt, til riktig pris – uten kostbare mellomledd.
            </p>
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
