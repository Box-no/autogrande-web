import { trustFacts } from "@/content/site";

export function TrustBar() {
  return (
    <section aria-label="AutoGrande i tall" className="border-b border-line-dark bg-ink">
      <dl className="mx-auto grid max-w-site grid-cols-2 px-5 md:px-10 lg:grid-cols-4">
        {trustFacts.map((fact, i) => (
          <div
            key={fact.label}
            className={`flex flex-col-reverse gap-3 py-10 pr-6 ${i > 0 ? "lg:border-l lg:border-line-dark lg:pl-8" : ""} ${
              i % 2 === 1 ? "border-l border-line-dark pl-6 lg:pl-8" : ""
            } ${i > 1 ? "border-t border-line-dark lg:border-t-0" : ""}`}
          >
            <dt className="max-w-48 text-sm leading-snug text-stone">{fact.label}</dt>
            <dd className="font-display text-display-md">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
