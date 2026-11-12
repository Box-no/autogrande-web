import type { ReactNode } from "react";
import { LeadForm } from "@/components/lead-form";
import { PageFrame } from "@/components/page-frame";
import { SectionHeading } from "@/components/section-heading";
import type { LeadFormConfig } from "@/content/forms";
import { company } from "@/content/site";

type InfoFormPageProps = {
  id: string;
  title: string;
  form: LeadFormConfig;
  children: ReactNode;
};

export function InfoFormPage({ id, title, form, children }: InfoFormPageProps) {
  return (
    <PageFrame>
      <section aria-labelledby={id} className="bg-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-site gap-12 px-5 md:px-10 lg:grid-cols-12">
          <div className="max-w-xl text-lg leading-relaxed text-stone-dark lg:col-span-5">
            <SectionHeading id={id} level="h1" size="xl" title={title} />
            <div className="mt-6 space-y-4">{children}</div>
            <p className="mt-6 text-base">
              Bilder kan sendes til{" "}
              <a className="font-semibold text-ink underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              .
            </p>
          </div>
          <div className="rounded-card bg-surface p-6 shadow-card sm:p-10 lg:col-span-6 lg:col-start-7 lg:self-start">
            <LeadForm config={form} />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
