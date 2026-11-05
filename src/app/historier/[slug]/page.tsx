import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { PageFrame } from "@/components/page-frame";
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
      <article className="bg-paper">
        <header className="mx-auto max-w-site px-5 pt-14 md:px-10 md:pt-20">
          <nav aria-label="Brødsmulesti" className="text-sm text-stone-dark">
            <Link href="/historier" className="font-semibold text-ink underline-offset-4 hover:underline">
              Historier
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{story.eyebrow}</span>
          </nav>
          <div className="mt-10 max-w-4xl">
            <p className="text-sm text-stone-dark">
              <span className="font-semibold text-ink">{story.eyebrow}</span> · {story.readingMinutes} min lesing
            </p>
            <h1 className="mt-4 font-display text-display-xl text-balance">{story.title}</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-stone-dark md:text-2xl">{story.standfirst}</p>
          </div>
        </header>

        <figure className="mx-auto mt-14 max-w-site md:px-10">
          <div className="relative aspect-video overflow-hidden bg-line-light md:rounded-card">
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

        <div className="mx-auto max-w-2xl px-5 py-16 md:py-24">
          {story.body.map((block, i) =>
            block.type === "h2" ? (
              <h2 key={i} className="mt-12 font-display text-display-sm first:mt-0">
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                className="mt-5 text-lg leading-relaxed text-stone-dark first:mt-0 first:text-xl first:text-ink"
              >
                {block.text}
              </p>
            ),
          )}
        </div>
      </article>

      <aside aria-labelledby="flere-historier" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="flere-historier" className="font-display text-display-md">
              Flere historier
            </h2>
            <ButtonLink href="/historier" variant="secondary" className="self-start sm:self-auto">
              Alle historier
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/historier/${other.slug}`}
                  className="group flex h-full flex-col rounded-card bg-surface p-7 shadow-card"
                >
                  <p className="text-sm font-semibold text-brand">{other.eyebrow}</p>
                  <h3 className="mt-3 font-display text-display-sm">{other.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone-dark">{other.standfirst}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </PageFrame>
  );
}
