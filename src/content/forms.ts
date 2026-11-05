export type LeadKind = "elbil" | "verksted";

export type LeadField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  options?: readonly string[];
  span?: "full" | "half";
};

export type LeadFormConfig = {
  kind: LeadKind;
  submitLabel: string;
  successMessage: string;
  fields: readonly LeadField[];
};

export const leadForms: Record<LeadKind, LeadFormConfig> = {
  elbil: {
    kind: "elbil",
    submitLabel: "Få bud på bilen din",
    successMessage: "Takk! Vi ser på bilen og kommer tilbake til deg med et bud.",
    fields: [
      {
        name: "regnr",
        label: "Registreringsnummer",
        type: "text",
        required: true,
        placeholder: "AB 12345",
        autoComplete: "off",
        span: "half",
      },
      {
        name: "km",
        label: "Kilometerstand",
        type: "text",
        required: true,
        inputMode: "numeric",
        placeholder: "F.eks. 45 000",
        span: "half",
      },
      {
        name: "onsketPris",
        label: "Ønsket pris (valgfritt)",
        type: "text",
        inputMode: "numeric",
        placeholder: "kr",
        span: "full",
      },
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "half" },
      {
        name: "telefon",
        label: "Telefon",
        type: "tel",
        required: true,
        autoComplete: "tel",
        inputMode: "tel",
        span: "half",
      },
    ],
  },
  verksted: {
    kind: "verksted",
    submitLabel: "Bestill time",
    successMessage: "Takk! Vi tar kontakt for å avtale tidspunkt og pris.",
    fields: [
      {
        name: "tjeneste",
        label: "Hva gjelder det?",
        type: "select",
        required: true,
        options: ["Service", "Dekkskift", "Bremser", "Tilstandssjekk", "Annet"],
        span: "full",
      },
      {
        name: "regnr",
        label: "Registreringsnummer",
        type: "text",
        required: true,
        placeholder: "AB 12345",
        autoComplete: "off",
        span: "half",
      },
      {
        name: "telefon",
        label: "Telefon",
        type: "tel",
        required: true,
        autoComplete: "tel",
        inputMode: "tel",
        span: "half",
      },
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "full" },
      { name: "melding", label: "Kort om behovet (valgfritt)", type: "textarea", span: "full" },
    ],
  },
};
