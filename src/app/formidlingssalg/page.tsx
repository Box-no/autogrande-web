import { InfoFormPage } from "@/components/info-form-page";
import { leadForms } from "@/content/forms";
import { pageMetadata } from "@/lib/metadata";

const included = [
  "Intern takstrapport av bilens tilstand",
  "Vask, fotografering og annonse",
  "Visning, prøvekjøring og annen kundeoppfølging",
  "Papirarbeid som kontrakt og registrering",
] as const;

export const metadata = pageMetadata(
  "Formidlingssalg",
  "Vi selger bilen din for en fastpris på 25 000 kr. Takst, foto, annonse, visning og papirarbeid er inkludert.",
  "/formidlingssalg",
);

export default function ConsignmentPage() {
  return (
    <InfoFormPage
      id="formidling-tittel"
      title="Vi selger bilen for deg."
      form={leadForms.formidling}
    >
      <p>
        Ønsker du å selge bilen din med hjelp fra en forhandler? Vi tar gjerne oppdraget. Det sparer deg for tid og
        arbeid knyttet til et bilsalg.
      </p>
      <p>Vi tar en fastpris på 25 000 kr* for å gjøre jobben. I fastprisen er følgende inkludert:</p>
      <ul className="list-disc space-y-1 pl-5">
        {included.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        Dersom nybilgarantien på bilen din har utløpt, leverer vi bilen til neste eier med 1 års bruktbilgaranti, dersom
        bilen oppfyller garantivilkårene. Kostnaden for garanti kommer i tillegg til fastprisen.
      </p>
      <p>
        Det er når som helst mulig å trekke oppdraget. Ved kansellering faktureres et gebyr på 4 000 kroner.
      </p>
      <p className="text-base">
        * Omregistreringsavgift kommer i tillegg. Ytterligere pristillegg kan forekomme ved behov for ekstra vask,
        annonsering, dekkskift, polering, rens av bilen o.l. Uforutsette tillegg avklares med deg på forhånd.
      </p>
    </InfoFormPage>
  );
}
