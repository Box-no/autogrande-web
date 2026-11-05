import { trustFacts } from "@/content/site";

export function TrustBar() {
  return (
    <section aria-label="AutoGrande i tall" className="bg-ink text-paper">
      <dl className="mx-auto grid max-w-site grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:px-10 md:py-16 lg:grid-cols-4">
        {trustFacts.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse justify-end gap-3 border-t-2 border-line-dark pt-5">
            <dt className="max-w-56 text-sm leading-snug text-stone">{fact.label}</dt>
            <dd className="font-display text-display-md tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
