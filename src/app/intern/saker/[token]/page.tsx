import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { saveCaseAction } from "@/app/actions/case-desk";
import { CaseProgress } from "@/components/case-progress";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import {
  caseStatuses,
  caseStatusLabel,
  formatCaseDate,
  getCase,
  isDemoCase,
  sellerPath,
  staffNextStepCopy,
  type SellCase,
} from "@/lib/cases";
import { isStaff } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Sak",
  robots: { index: false, follow: false },
};

export const instant = false;

const fieldClass =
  "w-full rounded-control border-2 border-line-light bg-surface px-4 py-3 text-base font-normal text-ink outline-none focus:border-ink";

export default function StaffCasePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ feil?: string; lagret?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <PageFrame>
          <p className="mx-auto max-w-site px-5 py-24 text-stone-dark md:px-10">Laster saken …</p>
        </PageFrame>
      }
    >
      <StaffCase params={params} searchParams={searchParams} />
    </Suspense>
  );
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

async function StaffCase({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ feil?: string; lagret?: string }>;
}) {
  if (!(await isStaff())) redirect("/intern/innlogging");
  const { token } = await params;
  const query = await searchParams;
  const item = await getCase(token);
  if (!item) notFound();

  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const sellerUrl = `${protocol}://${host}${sellerPath(item.token)}`;
  const title = item.vehicle || item.seller.regnr || "Bil uten reg.nr.";
  const phone = digits(item.seller.phone);
  const demo = isDemoCase(item.token);

  return (
    <PageFrame>
      <section className="bg-paper py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <nav aria-label="Brødsmulesti" className="text-sm">
            <Link href="/intern/saker" className="font-semibold underline-offset-4 hover:underline">
              ← Alle saker
            </Link>
          </nav>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <h1 className="font-display text-display-xl">{title}</h1>
            {demo ? <span className="rounded-control bg-soft px-2 py-1 text-sm font-semibold text-stone-dark">Demo</span> : null}
          </div>
          <p className="mt-2 text-stone-dark">Mottatt {formatCaseDate(item.createdAt)}</p>

          <div className="mt-8">
            <CaseProgress status={item.status} />
          </div>

          <div className="mt-8 border-l-4 border-brand bg-surface px-5 py-4">
            <p className="text-sm font-semibold">Neste steg</p>
            <p className="mt-1 text-lg leading-relaxed">{staffNextStepCopy(item.status)}</p>
          </div>

          {query.lagret ? (
            <p role="status" className="mt-6 border-l-4 border-ink bg-surface px-5 py-4 font-semibold">
              Lagret. Selgeren ser endringene på sin side.
            </p>
          ) : null}
          {query.feil ? (
            <p role="alert" className="mt-6 border-l-4 border-brand-deep bg-surface px-5 py-4 font-semibold text-brand-deep">
              {query.feil}
            </p>
          ) : null}

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <aside className="space-y-8 lg:col-span-4">
              <Panel title="Selgeren">
                <dl className="space-y-3">
                  <Row label="Navn" value={item.seller.name} />
                  <Row label="Telefon" value={item.seller.phone} />
                  <Row label="Reg.nr." value={item.seller.regnr} />
                  <Row label="Kilometerstand" value={item.seller.km} />
                  <Row label="Ønsket pris" value={item.seller.wishedPrice} />
                </dl>
                {phone ? (
                  <a href={`tel:${phone}`} className={`${buttonClasses("primary")} mt-5 w-full`}>
                    Ring {item.seller.name || "selgeren"}
                  </a>
                ) : null}
              </Panel>

              <Panel title="Selgerens side">
                <p className="text-sm leading-relaxed text-stone-dark">
                  Selgeren følger saken på denne lenken. Den viser avtalen, sjekken, bildene og tilbudet – ikke det
                  interne notatet.
                </p>
                <p className="mt-3 break-all rounded-control bg-soft px-3 py-2 font-mono text-xs select-all">{sellerUrl}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href={sellerPath(item.token)} className={buttonClasses("secondary")}>
                    Se det selgeren ser
                  </Link>
                  {phone ? (
                    <a
                      href={`sms:${phone}?body=${encodeURIComponent(`Her kan du følge saken din hos AutoGrande: ${sellerUrl}`)}`}
                      className={buttonClasses("secondary")}
                    >
                      Send lenken på SMS
                    </a>
                  ) : null}
                </div>
              </Panel>

              {item.decision ? <DecisionPanel item={item} /> : null}
            </aside>

            <form action={saveCaseAction} className="space-y-10 lg:col-span-8">
              <input type="hidden" name="token" value={item.token} />

              <Section number={1} title="Avtale" help="Når og hvor bilen skal testes. Selgeren ser dette.">
                <Field label="Avtalen" name="avtale" defaultValue={item.bookingNote} rows={3} />
              </Section>

              <Section number={2} title="Sjekken" help="Hva dere fant da bilen ble kjørt og sjekket. Selgeren ser dette.">
                <Field label="Kjøreturen" name="kjort" defaultValue={item.workshop.driven} />
                <Field label="Verkstedet" name="sjekk" defaultValue={item.workshop.check} />
                <Field label="Feil og mangler som kan utbedres" name="feil" defaultValue={item.workshop.faults} />
              </Section>

              <Section
                number={3}
                title="Bilder"
                help="Lim inn lenken til hvert bilde, ett per linje. Lenken må starte med https://. Selgeren ser bildene."
              >
                {item.photoUrls.length > 0 ? (
                  <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {item.photoUrls.map((url) => (
                      <li key={url} className="relative aspect-[4/3] overflow-hidden rounded-card bg-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element -- staff paste photo links from any https host */}
                        <img src={url} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-stone-dark">Ingen bilder lagt inn ennå.</p>
                )}
                <Field label="Bildelenker" name="bilder" defaultValue={item.photoUrls.join("\n")} rows={4} />
              </Section>

              <Section
                number={4}
                title="Tilbud"
                help="Skriv begge alternativene. Selgeren ser dem først når du trykker «Send tilbud til selger»."
              >
                <label className="grid gap-2 font-semibold">
                  Pris hvis AutoGrande kjøper bilen
                  <input
                    type="text"
                    name="kjop"
                    defaultValue={item.offers.buyPrice}
                    placeholder="F.eks. kr 250 000"
                    className={fieldClass}
                  />
                </label>
                <Field
                  label="Vilkår hvis vi selger bilen for selgeren"
                  name="salg"
                  defaultValue={item.offers.sellTerms}
                  placeholder="Fastpris for formidlingssalg er 25 000 kr. Omregistreringsavgift kommer i tillegg."
                  rows={3}
                />
              </Section>

              <Section number={5} title="Internt notat" help="Bare for dere. Selgeren ser aldri dette.">
                <Field label="Notat" name="internt" defaultValue={item.internalNote} rows={3} />
              </Section>

              <Section number={6} title="Hvor er saken nå?" help="Velg steget saken står i. Selgeren ser steget på sin side.">
                <fieldset>
                  <legend className="sr-only">Status</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {caseStatuses.map((status) => (
                      <label
                        key={status}
                        className="flex cursor-pointer items-center gap-3 rounded-control border-2 border-line-light bg-surface px-4 py-3 has-checked:border-ink has-checked:font-semibold"
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          defaultChecked={item.status === status}
                          className="size-4 accent-brand"
                        />
                        {caseStatusLabel(status)}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </Section>

              <div className="sticky bottom-0 -mx-5 border-t border-line-light bg-paper px-5 py-4 md:mx-0 md:px-0">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" name="intent" value="save" className={buttonClasses("secondary")}>
                    Lagre endringer
                  </button>
                  <button type="submit" name="intent" value="publish" className={buttonClasses("primary")}>
                    Send tilbud til selger
                  </button>
                </div>
                <p className="mt-2 text-sm text-stone-dark">
                  «Send tilbud» lagrer alt og viser begge tilbudene til selgeren.
                  {demo ? " Dette er en demo, så endringer lagres ikke." : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-card bg-surface p-5 shadow-card">
      <h2 className="font-display text-display-sm">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line-light pb-2 text-sm last:border-b-0">
      <dt className="text-stone-dark">{label}</dt>
      <dd className="text-right font-semibold tabular-nums">{value || "–"}</dd>
    </div>
  );
}

function DecisionPanel({ item }: { item: SellCase }) {
  if (!item.decision) return null;
  const choice =
    item.decision.choice === "buy"
      ? "AutoGrande kjøper bilen"
      : item.decision.choice === "sell"
        ? "AutoGrande selger bilen for selgeren"
        : "Takket nei til begge";
  const detail =
    item.decision.choice === "buy" ? item.decision.buyPrice : item.decision.choice === "sell" ? item.decision.sellTerms : "";
  return (
    <Panel title="Selgerens svar">
      <p className="font-semibold">{choice}</p>
      {detail ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-dark">{detail}</p> : null}
      <p className="mt-3 text-sm text-stone-dark">Svarte {formatCaseDate(item.decision.at)}</p>
    </Panel>
  );
}

function Section({ number, title, help, children }: { number: number; title: string; help: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-ink pt-5">
      <h2 className="flex items-baseline gap-3 font-display text-display-sm">
        <span className="text-stone tabular-nums">{number}</span>
        {title}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-stone-dark">{help}</p>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 font-semibold">
      {label}
      <textarea name={name} rows={rows} defaultValue={defaultValue} placeholder={placeholder} className={fieldClass} />
    </label>
  );
}
