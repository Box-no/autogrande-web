import { InfoFormPage } from "@/components/info-form-page";
import { leadForms } from "@/content/forms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Reklamasjon",
  "Meld inn reklamasjon til AutoGrande. Vi bestreber oss på å svare innen 7 dager.",
  "/reklamasjon",
);

export default function ComplaintPage() {
  return (
    <InfoFormPage id="reklamasjon-tittel" eyebrow="Reklamasjon" title="Meld inn reklamasjon." form={leadForms.reklamasjon}>
      <p>
        Vi tar din reklamasjon på alvor. Dersom du opplever problemer eller feil med bilen du har kjøpt av oss, fyll ut
        skjemaet. Vi bestreber oss på å svare alle innen 7 dager. Haster det, skriv det i beskrivelsen.
      </p>
    </InfoFormPage>
  );
}