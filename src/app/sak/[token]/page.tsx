import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { decideCase } from "@/app/actions/case-desk";
import { CaseProgress } from "@/components/case-progress";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import { formatCaseDate, getCase, isDemoCase, sellerStatusCopy, type SellCase } from "@/lib/cases";
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
  const hasWorkshop = [item.workshop.driven, item.workshop.check, item.workshop.faults].some((part) => part.length > 0);
  const demo = isDemoCase(item.token);

  return (
    <PageFrame>
      <article className="bg-paper py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <p className="text-sm text-stone-dark">
            Saken din hos AutoGrande{demo ? " · Demo" : ""}
          </p>
          <h1 className="mt-2 font-display text-display-xl text-balance">{item.vehicle || "Bilen din"}</h1>

          <div className="mt-8">
            <CaseProgress status={item.status} />
          </div>

          <p className="mt-8 border-l-4 border-brand bg-surface px-5 py-4 text-lg leading-relaxed">
            {sellerStatusCopy(item.status)}
          </p>
          {demo ? (
            <p className="mt-3 text-sm text-stone-dark">
              Dette er en demo. Beløpet er annonseprisen fra lageret, ikke et ekte tilbud.
            </p>
          ) : null}

          <Block title="Bilen">
            <dl className="grid gap-x-8 sm:grid-cols-2">
              <Row label="Registreringsnummer" value={item.seller.regnr} />
              <Row label="Kilometerstand" value={item.seller.km} />
              <Row label="Prisen du ønsket" value={item.seller.wishedPrice} />
              <Row label="Sendt inn" value={formatCaseDate(item.createdAt)} />
            </dl>
          </Block>

          <Block title="Avtalen">
            <Text value={item.bookingNote} empty="Vi ringer deg for å avtale når bilen kan testes." />
          </Block>

          <Block title="Sjekken">
            {hasWorkshop ? (
              <div className="grid gap-6">
                <Note title="Kjøreturen" body={item.workshop.driven} />
                <Note title="Verkstedet" body={item.workshop.check} />
                <Note title="Feil og mangler som kan utbedres" body={item.workshop.faults} />
              </div>
            ) : (
              <Text value="" empty="Når bilen er testet, står resultatet her." />
            )}
          </Block>

          <Block title="Bilder">
            {photos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((url) => (
                  <li key={url} className="relative aspect-[4/3] overflow-hidden rounded-card bg-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element -- staff paste photo links from any https host */}
                    <img src={url} alt={item.vehicle || ""} loading="lazy" className="absolute inset-0 size-full object-cover" />
                  </li>
                ))}
              </ul>
            ) : (
              <Text value="" empty="Vi tar bildene i egen fotohall. De dukker opp her." />
            )}
          </Block>

          <Block title="Tilbudet">
            {item.status === "offered" ? (
              <Offers item={item} />
            ) : item.decision ? (
              <Decision item={item} />
            ) : (
              <Text value="" empty="Du får to tilbud her etter testen, og velger selv om du vil gå videre." />
            )}
          </Block>

          <p className="mt-12 border-t border-line-light pt-6 text-stone-dark">
            Spørsmål? Ring{" "}
            <a href={company.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
              {company.phoneDisplay}
            </a>{" "}
            eller send e-post til{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-ink underline-offset-4 hover:underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      </article>
    </PageFrame>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 border-t-2 border-ink pt-5">
      <h2 className="font-display text-display-md">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-line-light py-3">
      <dt className="text-stone-dark">{label}</dt>
      <dd className="text-right font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function Text({ value, empty }: { value: string; empty: string }) {
  if (value) return <p className="whitespace-pre-wrap leading-relaxed">{value}</p>;
  return <p className="leading-relaxed text-stone-dark">{empty}</p>;
}

function Note({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 whitespace-pre-wrap leading-relaxed text-stone-dark">{body}</p>
    </div>
  );
}

function Offers({ item }: { item: SellCase }) {
  return (
    <div>
      <p className="text-stone-dark">Velg ett av tilbudene, eller takk nei. Du bestemmer selv.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <form action={decideCase} className="flex flex-col rounded-card bg-surface p-6 shadow-card">
          <h3 className="font-display text-display-sm">AutoGrande kjøper bilen</h3>
          <p className="mt-3 font-display text-display-md tabular-nums">{item.offers.buyPrice}</p>
          <input type="hidden" name="token" value={item.token} />
          <input type="hidden" name="choice" value="buy" />
          <button type="submit" className={`${buttonClasses("primary")} mt-auto w-full`}>
            Ja, kjøp bilen min
          </button>
        </form>
        <form action={decideCase} className="flex flex-col rounded-card bg-surface p-6 shadow-card">
          <h3 className="font-display text-display-sm">Vi selger bilen for deg</h3>
          <p className="mt-3 mb-6 whitespace-pre-wrap leading-relaxed text-stone-dark">{item.offers.sellTerms}</p>
          <input type="hidden" name="token" value={item.token} />
          <input type="hidden" name="choice" value="sell" />
          <button type="submit" className={`${buttonClasses("primary")} mt-auto w-full`}>
            Ja, selg bilen for meg
          </button>
        </form>
      </div>
      <form action={decideCase} className="mt-5">
        <input type="hidden" name="token" value={item.token} />
        <input type="hidden" name="choice" value="decline" />
        <button type="submit" className={buttonClasses("secondary")}>
          Nei takk, ingen av dem
        </button>
      </form>
    </div>
  );
}

function Decision({ item }: { item: SellCase }) {
  if (!item.decision) return null;
  const decision = item.decision;
  const title =
    decision.choice === "buy"
      ? "Du valgte at AutoGrande kjøper bilen"
      : decision.choice === "sell"
        ? "Du valgte at vi selger bilen for deg"
        : "Du takket nei til begge tilbudene";
  const body = decision.choice === "buy" ? decision.buyPrice : decision.choice === "sell" ? decision.sellTerms : "";
  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <h3 className="font-display text-display-sm">{title}</h3>
      {body ? <p className="mt-3 whitespace-pre-wrap leading-relaxed text-stone-dark">{body}</p> : null}
      <p className="mt-4 text-sm text-stone-dark">Svar sendt {formatCaseDate(decision.at)}</p>
    </div>
  );
}
