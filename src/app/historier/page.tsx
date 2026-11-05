import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { stories } from "@/content/stories";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Historier",
  "Historier fra AutoGrande: om samlerbiler fra Tyskland, Porsche 911, lidenskapen for bil og reisen hver bil gjør før den står hos oss i Skien.",
  "/historier",
);

export default function StoriesPage() {
  const [lead, ...rest] = stories;

  return (
    <PageFrame>
      <section aria-labelledby="historier-tittel" className="bg-paper py-20 text-ink md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <SectionHeading
            id="historier-tittel"
            level="h1"
            tone="light"
            eyebrow="Historier"
            title={
              <>
                Hver bil har en historie. <span className="italic text-stone-dark">Her er noen av våre.</span>
              </>
            }
          >
            <p>Om bilene vi henter fra Tyskland, menneskene bak AutoGrande og hvorfor vi fortsatt brenner for bil.</p>
          </SectionHeading>

          {lead ? (
            <Link
              href={`/historier/${lead.slug}`}
              className="group mt-16 grid gap-8 rounded-card md:mt-20 lg:grid-cols-12 lg:items-end"
            >
              <div className="relative aspect-video overflow-hidden rounded-card bg-bone lg:col-span-7">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">
                  {lead.eyebrow} · {lead.readingMinutes} min lesing
                </p>
                <h2 className="mt-4 font-display text-display-md tracking-display">{lead.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-stone-dark">{lead.standfirst}</p>
                <span className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide">
                  Les historien <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ) : null}

          <ul className="mt-20 grid gap-x-8 gap-y-16 border-t border-line-light pt-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((story, i) => (
              <li key={story.slug}>
                <Reveal delay={(i % 3) * 0.08}>
                  <Link href={`/historier/${story.slug}`} className="group block rounded-card">
                    <div className="relative aspect-video overflow-hidden rounded-card bg-bone">
                      <Image
                        src={story.image}
                        alt={story.imageAlt}
                        fill
                        quality={75}
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-6 text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">
                      {story.eyebrow} · {story.readingMinutes} min lesing
                    </p>
                    <h2 className="mt-3 font-display text-4xl tracking-display">{story.title}</h2>
                    <p className="mt-3 leading-relaxed text-stone-dark">{story.standfirst}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
