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
  return (
    <PageFrame>
      <section aria-labelledby="historier-tittel" className="bg-paper py-20 text-ink md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <SectionHeading id="historier-tittel" level="h1" tone="light" eyebrow="Fra bilhuset" title="Historier">
            <p>Seks korte tekster om bilene vi henter hjem, og om hvorfor vi gjør det.</p>
          </SectionHeading>

          <ul className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, i) => (
              <li key={story.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link href={`/historier/${story.slug}`} className="group flex h-full flex-col rounded-card">
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
                    <p className="mt-6 text-eyebrow font-medium uppercase tracking-eyebrow text-brand-deep">
                      {story.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-4xl tracking-display">{story.title}</h2>
                    <p className="mt-3 leading-relaxed text-stone-dark">{story.standfirst}</p>
                    <span className="mt-6 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide">
                      Les historien <span aria-hidden="true">→</span>
                    </span>
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
