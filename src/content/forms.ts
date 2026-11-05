export type LeadKind = "elbil" | "verksted" | "finansiering" | "innbytte" | "formidling" | "reklamasjon";

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
  finansiering: {
    kind: "finansiering",
    submitLabel: "Send inn",
    successMessage: "Takk! Vi ser på opplysningene og kommer tilbake med et tilbud.",
    fields: [
      {
        name: "type",
        label: "Lån eller leasing",
        type: "select",
        required: true,
        options: ["Lån", "Leasing"],
        span: "half",
      },
      {
        name: "kjorelengde",
        label: "Ønsket kjørelengde (leasing)",
        type: "text",
        inputMode: "numeric",
        span: "half",
      },
      { name: "egenkapital", label: "Egenkapital", type: "text", inputMode: "numeric", span: "half" },
      {
        name: "bilpris",
        label: "Hva koster bilen du ønsker å kjøpe?",
        type: "text",
        inputMode: "numeric",
        span: "half",
      },
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "half" },
      { name: "telefon", label: "Telefon", type: "tel", required: true, autoComplete: "tel", inputMode: "tel", span: "half" },
      { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", inputMode: "email", span: "full" },
      { name: "melding", label: "Spørsmål og annen informasjon", type: "textarea", span: "full" },
    ],
  },
  innbytte: {
    kind: "innbytte",
    submitLabel: "Send",
    successMessage: "Takk! Vi sender deg et innbyttetilbud så fort som mulig.",
    fields: [
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "half" },
      { name: "telefon", label: "Telefon", type: "tel", required: true, autoComplete: "tel", inputMode: "tel", span: "half" },
      { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", inputMode: "email", span: "full" },
      { name: "onsketBil", label: "Ønsket bil", type: "text", span: "full" },
      {
        name: "regnr",
        label: "Registreringsnummer innbyttebil",
        type: "text",
        required: true,
        placeholder: "AB 12345",
        span: "half",
      },
      { name: "km", label: "Kilometerstand innbyttebil", type: "text", required: true, inputMode: "numeric", span: "half" },
      { name: "melding", label: "Fritekst", type: "textarea", span: "full" },
    ],
  },
  formidling: {
    kind: "formidling",
    submitLabel: "Send",
    successMessage: "Takk! Vi tar kontakt om formidlingssalget.",
    fields: [
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "half" },
      { name: "telefon", label: "Telefon", type: "tel", required: true, autoComplete: "tel", inputMode: "tel", span: "half" },
      { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", inputMode: "email", span: "full" },
      { name: "pris", label: "Ønsket salgspris", type: "text", inputMode: "numeric", span: "half" },
      { name: "km", label: "Kilometerstand", type: "text", required: true, inputMode: "numeric", span: "half" },
      {
        name: "regnr",
        label: "Registreringsnummer",
        type: "text",
        required: true,
        placeholder: "AB 12345",
        span: "full",
      },
      { name: "melding", label: "Fritekst", type: "textarea", span: "full" },
    ],
  },
  reklamasjon: {
    kind: "reklamasjon",
    submitLabel: "Send inn",
    successMessage: "Takk! Vi har mottatt reklamasjonen og svarer så fort vi kan.",
    fields: [
      { name: "navn", label: "Navn", type: "text", required: true, autoComplete: "name", span: "half" },
      { name: "telefon", label: "Telefon", type: "tel", required: true, autoComplete: "tel", inputMode: "tel", span: "half" },
      { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", inputMode: "email", span: "full" },
      {
        name: "regnr",
        label: "Registreringsnummer",
        type: "text",
        required: true,
        placeholder: "AB 12345",
        span: "half",
      },
      { name: "kjopsdato", label: "Kjøpsdato", type: "text", placeholder: "DD.MM.ÅÅÅÅ", span: "half" },
      { name: "melding", label: "Beskrivelse", type: "textarea", required: true, span: "full" },
    ],
  },
};
