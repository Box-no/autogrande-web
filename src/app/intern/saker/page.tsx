import type { Metadata } from "next";
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

          {caseStoreIsEphemeral() ? (
            <p className="mt-6 max-w-2xl rounded-card bg-soft px-5 py-4 text-stone-dark">
              På Vercel lagres sakene på disken til én instans, og kan forsvinne. Ikke bruk dette mot ekte kunder før
              lagringen er flyttet.
            </p>
          ) : null}

          {cases.length === 0 ? (
            <p className="mt-10 text-stone-dark">Ingen saker ennå. De kommer inn fra skjemaet på selg-bilen-siden.</p>
          ) : (
            <ul className="mt-10 grid gap-4">
              {cases.map((item) => (
                <li key={item.token}>
                  <Link href={`/intern/saker/${item.token}`} className="block rounded-card bg-surface p-6 shadow-card">
                    <p className="text-sm font-semibold text-brand">{caseStatusLabel(item.status)}</p>
                    <h2 className="mt-2 font-display text-display-sm">{item.seller.regnr || "Uten reg.nr."}</h2>
                    <p className="mt-2 text-stone-dark">
                      {item.seller.name} · {item.seller.phone} · {item.seller.km}
                    </p>
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
