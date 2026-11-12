import { InfoFormPage } from "@/components/info-form-page";
import { leadForms } from "@/content/forms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Innbytte",
  "Bytt inn bilen din hos AutoGrande. Send registreringsnummer og kilometerstand, så får du et tilbud.",
  "/innbytte",
);

export default function TradeInPage() {
  return (
    <InfoFormPage id="innbytte-tittel" title="Vi tar bilen din i innbytte." form={leadForms.innbytte}>
      <p>På tide å bytte bil? Vi tar gjerne bilen din i innbytte!</p>
      <p>Fyll ut skjemaet, så sender vi deg et tilbud så fort som mulig.</p>
    </InfoFormPage>
  );
}
