import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logoutStaff } from "@/app/actions/staff";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import {
  caseGroup,
  caseStatusLabel,
  caseStoreIsEphemeral,
  formatCaseDate,
  isDemoCase,
  listCases,
  staffNextStepCopy,
  type CaseGroup,
  type SellCase,
} from "@/lib/cases";
import { isStaff } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Saker",
  robots: { index: false, follow: false },
};

export const instant = false;

const groups: { id: CaseGroup; title: string; empty: string }[] = [
  { id: "todo", title: "Må følges opp", empty: "Ingen saker venter på dere." },
  { id: "waiting", title: "Venter på selgeren", empty: "Ingen tilbud ute hos selgere nå." },
  { id: "done", title: "Ferdige", empty: "Ingen ferdige saker ennå." },
];

export default function StaffListPage() {
  return (
    <Suspense
      fallback={
        <PageFrame>
          <p className="mx-auto max-w-site px-5 py-24 text-stone-dark md:px-10">Laster saker …</p>
        </PageFrame>
      }
    >
      <StaffList />
    </Suspense>
  );
}

async function StaffList() {
  if (!(await isStaff())) redirect("/intern/innlogging");
  const cases = await listCases();
  const hasDemo = cases.some((item) => isDemoCase(item.token));

  return (
    <PageFrame>
      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="font-display text-display-xl">Biler folk vil selge</h1>
              <p className="mt-3 text-lg leading-relaxed text-stone-dark">
                Hver bil som kommer inn fra skjemaet «Selg bilen» havner her. Trykk på en bil for å se alt om den og
                gå videre til neste steg.
              </p>
            </div>
            <form action={logoutStaff}>
              <button type="submit" className={buttonClasses("secondary")}>
                Logg ut
              </button>
            </form>
          </div>

          {hasDemo ? (
            <p className="mt-6 max-w-2xl border-l-4 border-ink bg-surface px-5 py-4 text-stone-dark">
              Bilene merket «Demo» er eksempler, én i hvert steg. Beløpene er annonseprisen fra lageret, ikke ekte
              tilbud.
              {caseStoreIsEphemeral() ? " Ekte henvendelser lagres ikke trygt på denne serveren ennå." : ""}
            </p>
          ) : null}

          {groups.map((group) => {
            const items = cases.filter((item) => caseGroup(item.status) === group.id);
            return (
              <section key={group.id} aria-labelledby={`gruppe-${group.id}`} className="mt-12">
                <h2 id={`gruppe-${group.id}`} className="flex items-baseline gap-3 border-b-2 border-ink pb-3 font-display text-display-md">
                  {group.title}
                  <span className="text-base font-normal text-stone-dark tabular-nums">{items.length}</span>
                </h2>
                {items.length === 0 ? (
                  <p className="py-6 text-stone-dark">{group.empty}</p>
                ) : (
                  <ul className="divide-y divide-line-light">
                    {items.map((item) => (
                      <li key={item.token}>
                        <CaseRow item={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </PageFrame>
  );
}

function CaseRow({ item }: { item: SellCase }) {
  const title = item.vehicle || item.seller.regnr || "Bil uten reg.nr.";
  return (
    <Link
      href={`/intern/saker/${item.token}`}
      className="group grid gap-4 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-soft sm:w-40">
        {item.photoUrls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- staff paste photo links from any https host
          <img src={item.photoUrls[0]} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-stone-dark">Ingen bilder ennå</span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold">
          <span className="text-brand-deep">{caseStatusLabel(item.status)}</span>
          {isDemoCase(item.token) ? <span className="ml-2 rounded-control bg-soft px-2 py-0.5 text-stone-dark">Demo</span> : null}
        </p>
        <h3 className="mt-1 font-display text-display-sm group-hover:underline group-hover:underline-offset-4">{title}</h3>
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-dark">
          <Fact label="Selger" value={item.seller.name} />
          <Fact label="Telefon" value={item.seller.phone} />
          <Fact label="Km" value={item.seller.km} />
          <Fact label="Ønsket pris" value={item.seller.wishedPrice} />
          <Fact label="Mottatt" value={formatCaseDate(item.createdAt)} />
        </dl>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed">
          <span className="font-semibold">Neste steg: </span>
          {staffNextStepCopy(item.status)}
        </p>
      </div>
      <span className={`${buttonClasses("secondary")} justify-self-start`}>Åpne</span>
    </Link>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-1">
      <dt>{label}:</dt>
      <dd className="font-semibold text-ink tabular-nums">{value}</dd>
    </div>
  );
}
