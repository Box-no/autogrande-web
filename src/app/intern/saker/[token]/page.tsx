import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { saveCaseAction } from "@/app/actions/case-desk";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import { caseStatuses, caseStatusLabel, getCase, sellerPath } from "@/lib/cases";
import { isStaff } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Sak",
  robots: { index: false, follow: false },
};

export const instant = false;

const fieldClass =
  "w-full rounded-control border-2 border-line-light bg-surface px-4 py-3 text-ink outline-none focus:border-ink";

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

  return (
    <PageFrame>
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <p className="text-sm font-semibold text-brand">
            <Link href="/intern/saker" className="underline-offset-4 hover:underline">
              Saker
            </Link>
          </p>
          <h1 className="mt-4 font-display text-display-xl">{item.seller.regnr}</h1>
          <p className="mt-3 text-stone-dark">
            {item.seller.name} · {item.seller.phone} · {item.seller.km}
            {item.seller.wishedPrice ? ` · ønsket ${item.seller.wishedPrice}` : ""}
          </p>
          <p className="mt-4">
            <Link href={sellerPath(item.token)} className="font-semibold text-ink underline-offset-4 hover:underline">
              Selgerens side
            </Link>
          </p>

          {query.lagret ? (
            <p role="status" className="mt-6 text-sm font-semibold text-ink">
              Lagret.
            </p>
          ) : null}
          {query.feil ? (
            <p role="status" className="mt-6 text-sm font-semibold text-brand-deep">
              {query.feil}
            </p>
          ) : null}

          <form action={saveCaseAction} className="mt-8 grid gap-6 rounded-card bg-surface p-6 shadow-card sm:p-8">
            <input type="hidden" name="token" value={item.token} />

            <label className="grid gap-2 text-sm font-semibold">
              Status
              <select name="status" defaultValue={item.status} className={fieldClass}>
                {caseStatuses.map((status) => (
                  <option key={status} value={status}>
                    {caseStatusLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <Field label="Avtale, synlig for selger" name="avtale" defaultValue={item.bookingNote} />
            <Field label="Kjøreturen, synlig for selger" name="kjort" defaultValue={item.workshop.driven} />
            <Field label="Verkstedet, synlig for selger" name="sjekk" defaultValue={item.workshop.check} />
            <Field label="Feil og mangler som kan utbedres, synlig for selger" name="feil" defaultValue={item.workshop.faults} />
            <Field
              label="Bildelenker, én https-adresse per linje"
              name="bilder"
              defaultValue={item.photoUrls.join("\n")}
            />
            <Field label="Pris om AutoGrande kjøper bilen" name="kjop" defaultValue={item.offers.buyPrice} rows={2} />
            <Field
              label="Vilkår om vi selger bilen for deg"
              name="salg"
              defaultValue={item.offers.sellTerms}
              placeholder="Fastpris for formidlingssalg er 25 000 kr. Omregistreringsavgift kommer i tillegg."
            />
            <Field label="Bare internt" name="internt" defaultValue={item.internalNote} />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" name="intent" value="save" className={buttonClasses("secondary")}>
                Lagre
              </button>
              <button type="submit" name="intent" value="publish" className={buttonClasses("primary")}>
                Send tilbud til selger
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageFrame>
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
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <textarea name={name} rows={rows} defaultValue={defaultValue} placeholder={placeholder} className={fieldClass} />
    </label>
  );
}
