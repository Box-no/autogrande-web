import type { Metadata } from "next";
import { Suspense } from "react";
import { loginStaff } from "@/app/actions/staff";
import { PageFrame } from "@/components/page-frame";
import { buttonClasses } from "@/components/button-link";

export const metadata: Metadata = {
  title: "Intern innlogging",
  robots: { index: false, follow: false },
};

export const instant = false;

export default function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ feil?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <PageFrame>
          <p className="mx-auto max-w-site px-5 py-24 text-stone-dark md:px-10">Laster …</p>
        </PageFrame>
      }
    >
      <Login searchParams={searchParams} />
    </Suspense>
  );
}

async function Login({ searchParams }: { searchParams: Promise<{ feil?: string }> }) {
  const { feil } = await searchParams;
  const message =
    feil === "feil-kode" ? "Feil kode." : feil === "ikke-satt" ? "Innlogging er ikke satt opp på denne serveren." : "";

  return (
    <PageFrame>
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-md px-5 md:px-10">
          <h1 className="font-display text-display-lg">Internt</h1>
          <form action={loginStaff} className="mt-8 rounded-card bg-surface p-6 shadow-card">
            <label htmlFor="kode" className="mb-2 block text-sm font-semibold">
              Tilgangskode
            </label>
            <input
              id="kode"
              name="kode"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-control border-2 border-line-light bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
            />
            <button type="submit" className={`${buttonClasses("primary")} mt-6`}>
              Logg inn
            </button>
            {message ? (
              <p role="status" className="mt-4 text-sm text-brand-deep">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </PageFrame>
  );
}
