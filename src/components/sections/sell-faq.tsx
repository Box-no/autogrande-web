import { SectionHeading } from "@/components/section-heading";
import { company, sellFaq } from "@/content/site";

export function SellFaq() {
  return (
    <section aria-labelledby="faq-tittel" className="bg-paper pb-16 md:pb-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <SectionHeading id="faq-tittel" eyebrow="Spørsmål og svar" title="Ofte stilte spørsmål">
          <p>Det vi kan svare på ut fra hvordan salget foregår hos oss.</p>
        </SectionHeading>

        <div className="mt-10 divide-y divide-line-light overflow-hidden rounded-card bg-surface shadow-card">
          {sellFaq.map((item) => (
            <details key={item.question} className="group px-6 py-5 md:px-8">
              <summary className="cursor-pointer list-none rounded-control font-display text-display-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-6">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block text-brand transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-stone-dark">{item.answer}</p>
            </details>
          ))}
          <details className="group px-6 py-5 md:px-8">
            <summary className="cursor-pointer list-none rounded-control font-display text-display-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-6">
                Jeg finner ikke svar på det jeg lurer på
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block text-brand transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl leading-relaxed text-stone-dark">
              Ring oss på{" "}
              <a href={company.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
                {company.phoneDisplay}
              </a>{" "}
              eller send e-post til{" "}
              <a href={`mailto:${company.email}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                {company.email}
              </a>
              .
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
