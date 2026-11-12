import { InfoFormPage } from "@/components/info-form-page";
import { leadForms } from "@/content/forms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Finansiering",
  "Lån eller leasing gjennom Santander Consumer Bank AS og AS Financiering. Send inn noen få opplysninger, så gir vi deg et tilbud.",
  "/finansiering",
);

export default function FinancePage() {
  return (
    <InfoFormPage id="finansiering-tittel" title="Lån eller leasing." form={leadForms.finansiering}>
      <p>Vi samarbeider med Santander Consumer Bank AS og AS Financiering.</p>
      <p>For å kunne gi deg et tilbud så trenger vi noen få opplysninger.</p>
    </InfoFormPage>
  );
}
