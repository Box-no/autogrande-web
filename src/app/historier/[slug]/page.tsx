import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/reveal";
import { getStory, stories } from "@/content/stories";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps<"/historier/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return pageMetadata(story.title, story.standfirst, `/historier/${story.slug}`);
}

export default async function StoryPage({ params }: PageProps<"/historier/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <PageFrame>
      <article className="bg-paper text-ink">
        <header className="mx-auto max-w-site px-5 pt-16 md:px-10 md:pt-24">
          <nav aria-label="Brødsmulesti" className="text-sm text-stone-dark">
            <Link href="/historier" className="underline-offset-4 hover:underline">
              Historier
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{story.eyebrow}</span>
          </nav>
          <div className="mt-10 max-w-4xl">
            <p className="flex items-center gap-3 text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              {story.eyebrow} · {story.readingMinutes} min lesing
            </p>
            <h1 className="mt-6 font-display text-display-lg tracking-display">{story.title}</h1>
            <p className="mt-8 max-w-2xl font-display text-3xl italic leading-snug text-stone-dark">
              {story.standfirst}
            </p>
          </div>
        </header>

        <figure className="mx-auto mt-16 max-w-site px-5 md:px-10">
          <div className="relative aspect-video overflow-hidden rounded-card bg-bone">
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              preload
              quality={85}
              sizes="(min-width: 1408px) 1328px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </figure>

        <div className="mx-auto max-w-2xl px-5 py-20 md:py-28">
          {story.body.map((block, i) =>
            block.type === "h2" ? (
              <h2 key={i} className="mt-14 font-display text-4xl tracking-display first:mt-0">
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                className="mt-6 text-lg leading-relaxed text-stone-dark first:mt-0 first:text-xl first:text-ink"
              >
                {block.text}
              </p>
            ),
          )}
        </div>
      </article>

      <aside aria-labelledby="flere-historier" className="border-t border-line-light bg-bone py-20 text-ink md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <h2 id="flere-historier" className="font-display text-display-md tracking-display">
            Flere historier
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {others.map((other, i) => (
              <li key={other.slug}>
                <Reveal delay={i * 0.08}>
                  <Link href={`/historier/${other.slug}`} className="group block rounded-card">
                    <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-stone-dark">{other.eyebrow}</p>
                    <h3 className="mt-3 font-display text-3xl tracking-display group-hover:underline">{other.title}</h3>
                    <p className="mt-3 leading-relaxed text-stone-dark">{other.standfirst}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <Link
            href="/historier"
            className="mt-14 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold tracking-wide"
          >
            Alle historier <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    </PageFrame>
  );
}
