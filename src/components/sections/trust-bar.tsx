import { trustFacts } from "@/content/site";

export function TrustBar() {
  return (
    <section aria-label="AutoGrande i tall" className="border-y border-line-light bg-surface">
      <dl className="mx-auto grid max-w-site grid-cols-2 gap-px bg-line-light lg:grid-cols-4">
        {trustFacts.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse justify-end gap-1 bg-surface px-5 py-6 md:px-10">
            <dt className="text-sm leading-snug text-stone-dark">{fact.label}</dt>
            <dd className="font-display text-display-md tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
