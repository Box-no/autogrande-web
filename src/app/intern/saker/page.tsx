import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logoutStaff } from "@/app/actions/staff";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";
import { caseStatusLabel, caseStoreIsEphemeral, listCases } from "@/lib/cases";
import { isStaff } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Saker",
  robots: { index: false, follow: false },
};

export const instant = false;

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

  return (
    <PageFrame>
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-display-xl">Saker</h1>
            <form action={logoutStaff}>
              <button type="submit" className={buttonClasses("text")}>
                Logg ut
              </button>
            </form>
          </div>

          <p className="mt-6 max-w-2xl text-stone-dark">
            Åtte demoer, én bil i hvert steg. Beløpene er annonseprisen fra lageret, ikke et kjøpstilbud.
          </p>
          {caseStoreIsEphemeral() ? (
            <p className="mt-4 max-w-2xl rounded-card bg-soft px-5 py-4 text-stone-dark">
              Demoene blir liggende. Ekte henvendelser lagres ikke trygt på Vercel ennå.
            </p>
          ) : null}

          {cases.length === 0 ? (
            <p className="mt-10 text-stone-dark">Ingen saker ennå. De kommer inn fra skjemaet på selg-bilen-siden.</p>
          ) : (
            <ul className="mt-10 grid gap-4">
              {cases.map((item) => (
                <li key={item.token}>
                  <Link
                    href={`/intern/saker/${item.token}`}
                    className="flex flex-col gap-4 rounded-card bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:p-6"
                  >
                    {item.photoUrls[0] ? (
                      <Image
                        src={item.photoUrls[0]}
                        alt={item.vehicle || item.seller.regnr || "Bil"}
                        width={320}
                        height={240}
                        className="aspect-[4/3] w-full rounded-card object-cover sm:w-40"
                      />
                    ) : null}
                    <span>
                      <span className="text-sm font-semibold text-brand">{caseStatusLabel(item.status)}</span>
                      <h2 className="mt-2 font-display text-display-sm">
                        {item.vehicle || item.seller.regnr || "Uten reg.nr."}
                      </h2>
                      <span className="mt-2 block text-stone-dark">
                        {item.seller.name} · {item.seller.km}
                        {item.seller.wishedPrice ? ` · ${item.seller.wishedPrice}` : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageFrame>
  );
}
