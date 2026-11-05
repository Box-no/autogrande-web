import { trustFacts } from "@/content/site";

export function TrustBar() {
  return (
    <section aria-label="AutoGrande i tall" className="bg-paper">
      <dl className="mx-auto grid max-w-site grid-cols-2 gap-4 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-4">
        {trustFacts.map((fact) => (
          <div key={fact.label} className="rounded-card bg-surface px-6 py-7 shadow-card">
            <dd className="font-display text-display-md tabular-nums">{fact.value}</dd>
            <dt className="mt-2 max-w-48 text-sm leading-snug text-stone-dark">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
