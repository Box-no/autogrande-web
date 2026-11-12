export const company = {
  name: "AutoGrande AS",
  tagline: "Hver bil har en historie – vi henter den fra Tyskland til deg.",
  phoneDisplay: "97 66 63 80",
  phoneHref: "tel:+4797666380",
  email: "bil@autogrande.no",
  street: "Håvundvegen 214",
  postalCode: "3746",
  city: "Skien",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=H%C3%A5vundvegen+214%2C+3746+Skien",
  facebookUrl: "https://www.facebook.com/autogporsgrunn/?locale=nb_NO",
} as const;

export const openingHours = [
  { days: "Mandag – onsdag", hours: "09.00 – 17.00" },
  { days: "Torsdag", hours: "09.00 – 19.00" },
  { days: "Fredag", hours: "09.00 – 17.00" },
  { days: "Lørdag", hours: "10.00 – 14.00" },
  { days: "Søndag", hours: "Stengt" },
] as const;

export const navItems = [
  { label: "Biler på lager", href: "/biler" },
  { label: "Selg bilen", href: "/selg-elbil" },
  { label: "Verksted", href: "/verksted" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Historier", href: "/historier" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const tracks = [
  {
    href: "/biler",
    eyebrow: "Biler fra Tyskland",
    title: "Hentet og kjørt hjem av oss.",
    body: "Audi, BMW og Mercedes-Benz, funnet gjennom kontaktnettet vårt og levert med garanti.",
  },
  {
    href: "/selg-elbil",
    eyebrow: "Selg bilen",
    title: "Vi tester, tar bilder og selger den.",
    body: "Eget verksted og egen fotohall. Etter testen får du et tilbud og velger selv om du vil fortsette.",
  },
  {
    href: "/verksted",
    eyebrow: "Verksted i Grenland",
    title: "Avtalt pris. Ingen overraskelser.",
    body: "Vi gjør det vi ble enige om. Blir noe dyrere, får du beskjed før vi går videre.",
  },
] as const;

export const trustFacts = [
  { value: "2016", label: "Selvstendig importør siden" },
  { value: "≈ 300", label: "Biler levert i snitt per år" },
  { value: "1 år", label: "Minimum garanti på nesten alle biler vi annonserer" },
  { value: "2007", label: "Eierne har importert bil siden" },
] as const;

export type FeaturedCar = {
  id: string;
  make: string;
  model: string;
  year: number;
  km: string;
  price: string;
  image: string;
  href: string;
};

/** Snapshot of the live stock on autogrande.no/biler, 05.11.2026. Replace with CMS/feed data. */
export const featuredCars: FeaturedCar[] = [
  {
    id: "238139",
    make: "Mercedes-Benz",
    model: "SL63",
    year: 2013,
    km: "44 459 km",
    price: "kr 989 000",
    image: "https://cdn.autonet.no/ads-12154/b8a90d4fIMG_3715.JPG",
    href: "/biler/238139-mercedes-benz-sl63-2013",
  },
  {
    id: "237686",
    make: "Bentley",
    model: "Continental GT",
    year: 2013,
    km: "113 538 km",
    price: "kr 779 000",
    image: "https://cdn.autonet.no/ads-86838/c-8b21b671EGM04900.jpg",
    href: "/biler/237686-bentley-continental-gt-2013",
  },
  {
    id: "254716",
    make: "Mercedes-Benz",
    model: "EQE 500 SUV",
    year: 2024,
    km: "77 476 km",
    price: "kr 749 000",
    image: "https://cdn.autonet.no/ads-90683/c-3a7cf4d1EGM06300.jpg",
    href: "/biler/254716-mercedes-benz-eqe-500-suv-2024",
  },
  {
    id: "256924",
    make: "BMW",
    model: "M6",
    year: 2015,
    km: "48 661 km",
    price: "kr 749 000",
    image: "https://cdn.autonet.no/ads-73000/c-410b4550EGM06200.jpg",
    href: "/biler/256924-bmw-m6-2015",
  },
  {
    id: "253838",
    make: "Porsche",
    model: "911 Carrera",
    year: 2000,
    km: "131 711 km",
    price: "kr 429 000",
    image: "https://cdn.autonet.no/ads-87243/c-26e33fc6EGM05200.jpg",
    href: "/biler/253838-porsche-911-carrera-2000",
  },
];

export const heroCar = {
  label: "Mercedes-Benz C63 · 2015 · 83 162 km",
  price: "kr 759 000",
  href: "/biler/251612-mercedes-benz-c63-2015",
  image: "/images/hero-c63-amg.jpg",
  alt: "Svart Mercedes-Benz C63 med røde bremsekalipere, fotografert foran AutoGrandes lokaler i Skien",
} as const;

export const journeySteps = [
  {
    title: "Vi finner bilen",
    body: "Gjennom et solid kontaktnett over hele Tyskland, bygget opp gjennom en årrekke. Vi ser etter et høyt og ettertraktet utstyrsnivå – ikke bare riktig pris.",
  },
  {
    title: "Vi henter den selv",
    body: "Bilen blir hentet og kjørt hjem av oss. Da vet vi hvordan den oppfører seg på veien, ikke bare hvordan den ser ut på bilder.",
  },
  {
    title: "Vi går den nøye etter",
    body: "Vi gjør en grundig gjennomgang før salg. Men en brukt bil kan ha feil vi ikke har funnet – det sier vi rett ut.",
  },
  {
    title: "Garantien følger med",
    body: "Derfor leveres nesten alle bilene vi annonserer med minimum ett års garanti, med mulighet for utvidelse etter ønske.",
  },
] as const;

export const brands = ["Audi", "BMW", "Mercedes-Benz"] as const;

export const sellSteps = [
  {
    title: "Vi tester bilen din",
    body: "Vi har eget verksted. Vi kjører en runde og tar en full sjekk. Eventuelle feil og mangler som kan utbedres kommer frem her. Du får et tilbud, og velger selv om du vil fortsette prosessen.",
  },
  {
    title: "Vi tar bilder av bilen din",
    body: "Vi har egen fotohall, så du slipper å gjøre det selv.",
  },
  {
    title: "Vi selger bilen din",
    body: "Vi selger bilen for deg.",
  },
] as const;

export const sellFaq = [
  {
    question: "Hvordan foregår salget?",
    answer:
      "Først tester vi bilen. Deretter tar vi bilder. Så selger vi bilen for deg. Etter testen får du et tilbud, og du velger selv om du vil fortsette.",
  },
  {
    question: "Hva innebærer testen?",
    answer:
      "Vi kjører en runde og tar en full sjekk på eget verksted. Eventuelle feil og mangler som kan utbedres kommer frem der.",
  },
  {
    question: "Må jeg fortsette etter at bilen er testet?",
    answer: "Nei. Du får et tilbud og velger selv om du vil fortsette prosessen.",
  },
  {
    question: "Må jeg ta bilder av bilen selv?",
    answer: "Nei. Vi tar bilder i egen fotohall.",
  },
] as const;

export const workshopPromises = [
  {
    title: "Avtalt pris",
    body: "Vi gjør det som skal gjøres, til prisen vi ble enige om.",
  },
  {
    title: "Beskjed før det blir dyrere",
    body: "Finner vi noe mer, får du beskjed før vi går videre. Ingen overraskelser på fakturaen.",
  },
  {
    title: "Rett på sak",
    body: "Du snakker med folk som kan bil. Vi forklarer hva som må gjøres nå, og hva som trygt kan vente til neste gang.",
  },
] as const;

export const workshopServices = [
  { name: "Service", price: "[PLACEHOLDER: fra-pris]" },
  { name: "Dekkskift", price: "[PLACEHOLDER: fra-pris]" },
  { name: "Bremser", price: "[PLACEHOLDER: fra-pris]" },
] as const;

export const services = [
  {
    title: "Finansiering",
    body: "Lån eller leasing gjennom Santander Consumer Bank AS og AS Financiering.",
    href: "/finansiering",
    cta: "Søk finansiering",
  },
  {
    title: "Innbytte",
    body: "På tide å bytte bil? Vi tar gjerne bilen din i innbytte! Send oss opplysningene, så sender vi deg et tilbud så fort som mulig.",
    href: "/innbytte",
    cta: "Få innbyttetilbud",
  },
  {
    title: "Formidlingssalg",
    body: "Vi selger bilen din for en fastpris på 25 000 kr*. Takst, foto, annonse, visning og papirarbeid er inkludert.",
    href: "/formidlingssalg",
    cta: "Les vilkårene",
  },
  {
    title: "Reklamasjon",
    body: "Vi tar din reklamasjon på alvor. Vi bestreber oss på å svare alle innen 7 dager – haster det, skriv det i beskrivelsen.",
    href: "/reklamasjon",
    cta: "Meld inn sak",
  },
] as const;

export const team = [
  {
    name: "Magnus Melfald",
    role: "Selger / Daglig leder",
    phone: "97 66 63 80",
    email: "magnus@autogrande.no",
    image: "/images/team/magnus-melfald.webp",
  },
  {
    name: "Bård Eikenes",
    role: "Selger / Taksering",
    phone: "48 05 43 31",
    email: "bard@autogrande.no",
    image: "/images/team/bard-eikenes.webp",
  },
  {
    name: "Aina Grande Melfald",
    role: "Eier / Regnskapsmedarbeider",
    image: "/images/team/aina-grande-melfald.webp",
  },
  {
    name: "Emma Grande Melfald",
    role: "Foto / Annonsering",
    email: "emma@autogrande.no",
    image: "/images/team/emma-grande-melfald.webp",
  },
  { name: "Ionut Radu", role: "Bilklargjører", image: "/images/team/ionut-radu.webp" },
  { name: "Harald Melfald", role: "Regnskapsmedarbeider", image: "/images/team/harald-melfald.webp" },
] as const satisfies ReadonlyArray<{
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
}>;
