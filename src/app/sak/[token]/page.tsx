import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { decideCase } from "@/app/actions/case-desk";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import { getCase, sellerStatusCopy, caseStatusLabel, type SellCase } from "@/lib/cases";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Saken din",
  robots: { index: false, follow: false },
};

export const instant = false;

export default function SellerCasePage({ params }: { params: Promise<{ token: string }> }) {
  return (
    <Suspense
      fallback={
        <PageFrame>
          <p className="mx-auto max-w-site px-5 py-24 text-stone-dark md:px-10">Laster saken …</p>
        </PageFrame>
      }
    >
      <SellerCase params={params} />
    </Suspense>
  );
}

async function SellerCase({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const item = await getCase(token);
  if (!item) notFound();

  const photos = item.photoUrls.filter((url) => url.startsWith("https://"));
  const showWorkshop = [item.workshop.driven, item.workshop.check, item.workshop.faults].some((part) => part.length > 0);

  return (
    <PageFrame>
      <article className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <p className="text-sm font-semibold text-brand">AutoGrande{item.token.startsWith("demo-") ? " · Demo" : ""}</p>
          <h1 className="mt-4 font-display text-display-xl text-balance">{item.vehicle || "Saken din"}</h1>
          <p className="mt-4 text-stone-dark">{sellerStatusCopy(item.status)}</p>
          {item.token.startsWith("demo-") ? (
            <p className="mt-3 text-stone-dark">Demo. Beløpet er annonseprisen fra lageret, ikke et kjøpstilbud.</p>
          ) : null}

          <dl className="mt-10 grid gap-4 rounded-card bg-surface p-6 shadow-card sm:grid-cols-2 sm:p-8">
            {item.seller.regnr ? (
              <div>
                <dt className="text-sm text-stone-dark">Registreringsnummer</dt>
                <dd className="mt-1 font-display text-display-sm">{item.seller.regnr}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-sm text-stone-dark">Kilometerstand</dt>
              <dd className="mt-1 font-display text-display-sm">{item.seller.km}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-stone-dark">Status</dt>
              <dd className="mt-1 font-semibold">{caseStatusLabel(item.status)}</dd>
            </div>
          </dl>

          {item.bookingNote ? (
            <section className="mt-8">
              <h2 className="font-display text-display-sm">Avtalen</h2>
              <p className="mt-3 leading-relaxed text-stone-dark">{item.bookingNote}</p>
            </section>
          ) : null}

          {showWorkshop ? (
            <section className="mt-10">
              <h2 className="font-display text-display-md">Sjekken</h2>
              <div className="mt-4 grid gap-4">
                <Note title="Kjøreturen" body={item.workshop.driven} />
                <Note title="Verkstedet" body={item.workshop.check} />
                <Note title="Feil og mangler som kan utbedres" body={item.workshop.faults} />
              </div>
            </section>
          ) : null}

          {photos.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-display text-display-md">Bilder</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((url) => (
                  <li key={url} className="overflow-hidden rounded-card bg-surface">
                    {/* Staff paste arbitrary https URLs, which next/image cannot allow in advance. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={item.vehicle || ""} className="aspect-[4/3] w-full object-cover" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {item.status === "offered" ? <Offers item={item} /> : null}
          {item.token === "demo-tilbud" ? <DemoOutcomes /> : null}
          {item.decision ? <Decision item={item} /> : null}

          <p className="mt-12 text-stone-dark">
            Spørsmål? Ring{" "}
            <a href={company.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
              {company.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </article>
    </PageFrame>
  );
}

function DemoOutcomes() {
  const links = [
    ["/sak/demo-kjop", "Slik ser det ut når kjøpet godtas"],
    ["/sak/demo-salg", "Slik ser det ut når vi selger bilen"],
    ["/sak/demo-avslaatt", "Slik ser det ut når begge avslås"],
  ] as const;
  return (
    <ul className="mt-6 grid gap-2">
      {links.map(([href, label]) => (
        <li key={href}>
          <Link href={href} className="font-semibold text-ink underline-offset-4 hover:underline">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <h3 className="font-display text-display-sm">{title}</h3>
      <p className="mt-3 whitespace-pre-wrap leading-relaxed text-stone-dark">{body}</p>
    </div>
  );
}

function Offers({ item }: { item: SellCase }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-display-md">To tilbud</h2>
      <div className="mt-4 grid gap-4">
        <form action={decideCase} className="rounded-card bg-surface p-6 shadow-card">
          <h3 className="font-display text-display-sm">AutoGrande kjøper bilen</h3>
          <p className="mt-3 font-display text-display-md text-brand">{item.offers.buyPrice}</p>
          <input type="hidden" name="token" value={item.token} />
          <input type="hidden" name="choice" value="buy" />
          <button type="submit" className={`${buttonClasses("primary")} mt-6`}>
            Godta dette kjøpet
          </button>
        </form>
        <form action={decideCase} className="rounded-card bg-surface p-6 shadow-card">
          <h3 className="font-display text-display-sm">Vi selger bilen for deg</h3>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed text-stone-dark">{item.offers.sellTerms}</p>
          <input type="hidden" name="token" value={item.token} />
          <input type="hidden" name="choice" value="sell" />
          <button type="submit" className={`${buttonClasses("secondary")} mt-6`}>
            Godta at dere selger den
          </button>
        </form>
      </div>
      <form action={decideCase} className="mt-4">
        <input type="hidden" name="token" value={item.token} />
        <input type="hidden" name="choice" value="decline" />
        <button type="submit" className={buttonClasses("text")}>
          Avslå begge
        </button>
      </form>
    </section>
  );
}

function Decision({ item }: { item: SellCase }) {
  if (!item.decision || item.status === "offered") return null;
  const decision = item.decision;
  const body =
    decision.choice === "buy"
      ? decision.buyPrice
      : decision.choice === "sell"
        ? decision.sellTerms
        : "Begge tilbudene ble avslått.";
  const title =
    decision.choice === "buy" ? "Du godtok kjøpet" : decision.choice === "sell" ? "Du godtok at vi selger bilen" : "Du har avslått";
  return (
    <section className="mt-10 rounded-card bg-soft p-6">
      <h2 className="font-display text-display-sm">{title}</h2>
      <p className="mt-3 whitespace-pre-wrap leading-relaxed text-stone-dark">{body}</p>
    </section>
  );
}
