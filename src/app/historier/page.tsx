import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
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
      <section aria-labelledby="historier-tittel" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <SectionHeading id="historier-tittel" level="h1" size="xl" eyebrow="Fra bilhuset" title="Historier">
            <p>Seks korte tekster om bilene vi henter hjem, og om hvorfor vi gjør det.</p>
          </SectionHeading>

          <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <li key={story.slug}>
                <Link
                  href={`/historier/${story.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border-2 border-transparent bg-surface transition-colors duration-200 hover:border-ink motion-reduce:transition-none"
                >
                  <div className="relative aspect-3/2 overflow-hidden bg-line-light">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      quality={75}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-sm text-stone-dark">
                      <span className="font-semibold text-ink">{story.eyebrow}</span> · {story.readingMinutes} min lesing
                    </p>
                    <h2 className="mt-3 font-display text-display-sm">{story.title}</h2>
                    <p className="mt-3 flex-1 leading-relaxed text-stone-dark">{story.standfirst}</p>
                    <span className="mt-6 w-fit text-sm font-semibold underline decoration-brand decoration-2 underline-offset-[6px] group-hover:text-brand-deep">
                      Les historien
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
