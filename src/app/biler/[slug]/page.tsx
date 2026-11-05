import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { CarGallery } from "@/components/car-gallery";
import { PageFrame } from "@/components/page-frame";
import { cars, getCar, specValue } from "@/content/cars";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: PageProps<"/biler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  const description = `${car.title}. ${car.price}. ${car.km}. Hos AutoGrande i Skien.`;
  return pageMetadata(car.title, description, `/biler/${car.slug}`);
}

export default function CarPage({ params }: PageProps<"/biler/[slug]">) {
  return (
    <Suspense
      fallback={
        <PageFrame>
          <p className="mx-auto max-w-site px-5 py-24 text-stone-dark md:px-10">Laster bilen …</p>
        </PageFrame>
      }
    >
      <CarDetail params={params} />
    </Suspense>
  );
}

async function CarDetail({ params }: { params: PageProps<"/biler/[slug]">["params"] }) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const others = cars.filter((item) => item.id !== car.id).slice(0, 3);

  return (
    <PageFrame>
      <article className="bg-paper py-10 md:py-16">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <nav aria-label="Brødsmulesti" className="text-sm text-stone-dark">
            <Link href="/biler" className="font-semibold text-ink underline-offset-4 hover:underline">
              Biler på lager
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{car.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <CarGallery images={car.images.length > 0 ? car.images : car.image ? [car.image] : []} alt={car.title} />
            </div>

            <div className="lg:col-span-5">
              <h1 className="font-display text-display-lg text-balance">{car.title}</h1>
              <p className="mt-3 font-display text-display-md text-brand tabular-nums">{car.price}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                {car.highlights.map((line) => (
                  <div key={line.label}>
                    <dt className="text-sm text-stone-dark">{line.label}</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{specValue(line.label, line.value)}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={company.phoneHref}>Ring {company.phoneDisplay}</ButtonLink>
                <ButtonLink href={`mailto:${company.email}`} variant="secondary">
                  {company.email}
                </ButtonLink>
              </div>
            </div>
          </div>

          {car.specs.length > 0 ? (
            <section aria-labelledby="spesifikasjoner" className="mt-16">
              <h2 id="spesifikasjoner" className="font-display text-display-sm">
                Spesifikasjoner
              </h2>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-card bg-line-light sm:grid-cols-2 lg:grid-cols-3">
                {car.specs.map((line) => (
                  <div key={line.label} className="bg-surface px-5 py-4">
                    <dt className="text-sm text-stone-dark">{line.label}</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{specValue(line.label, line.value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {car.description.length > 0 ? (
            <section aria-labelledby="annonsen" className="mx-auto mt-16 max-w-3xl">
              <h2 id="annonsen" className="font-display text-display-sm">
                Om bilen
              </h2>
              <AdText paragraphs={car.description} />
            </section>
          ) : null}
        </div>
      </article>

      <aside aria-labelledby="flere-biler" className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex items-end justify-between gap-6">
            <h2 id="flere-biler" className="font-display text-display-md">
              Flere biler
            </h2>
            <ButtonLink href="/biler" variant="secondary">
              Alle bilene
            </ButtonLink>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((other) => (
              <li key={other.id}>
                <Link href={`/biler/${other.slug}`} className="block rounded-card bg-surface p-6 shadow-card">
                  <p className="text-sm text-stone-dark tabular-nums">
                    {other.year}
                    {other.km ? ` · ${other.km}` : ""}
                  </p>
                  <h3 className="mt-2 font-display text-display-sm">{other.title}</h3>
                  <p className="mt-3 font-semibold text-brand tabular-nums">{other.price}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </PageFrame>
  );
}

function AdText({ paragraphs }: { paragraphs: readonly string[] }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={`liste-${blocks.length}`} className="mt-4 list-disc space-y-1 pl-5 text-stone-dark">
        {items.map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
      </ul>,
    );
  };

  for (const paragraph of paragraphs) {
    if (paragraph.startsWith("- ")) {
      list.push(paragraph.slice(2));
      continue;
    }
    flush();
    const heading =
      paragraph.length < 28 && !/\d/.test(paragraph) && (paragraph === paragraph.toUpperCase() || paragraph.endsWith(":"));
    if (heading) {
      blocks.push(
        <h3 key={`tittel-${blocks.length}`} className="mt-8 font-display text-xl first:mt-6">
          {paragraph.replace(/:$/, "")}
        </h3>,
      );
    } else {
      blocks.push(
        <p key={`avsnitt-${blocks.length}`} className="mt-4 leading-relaxed text-stone-dark first:mt-6">
          {paragraph}
        </p>,
      );
    }
  }
  flush();

  return <div>{blocks}</div>;
}
