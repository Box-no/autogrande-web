import type { CaseDecision, SellCase } from "@/lib/cases";

const sellTerms =
  "Fastpris for formidlingssalg er 25 000 kr. Omregistreringsavgift kommer i tillegg.";

const workshop = {
  driven: "Eksempeltekst. Her skriver verkstedet hvordan bilen oppførte seg på kjøreturen.",
  check: "Eksempeltekst. Her står resultatet av den fulle sjekken på verkstedet.",
  faults: "Eksempeltekst. Her står feil og mangler som kan utbedres før salg.",
};

const booking = "Eksempeltekst. Her står dag og klokkeslett for testingen, og hvor bilen skal leveres.";

function decision(choice: CaseDecision["choice"], at: string): CaseDecision {
  return { choice, buyPrice: "", sellTerms, at };
}

function demo(input: {
  token: string;
  at: string;
  title: string;
  km: string;
  price: string;
  photos: string[];
  status: SellCase["status"];
  bookingNote?: string;
  workshop?: SellCase["workshop"];
  offers?: boolean;
  decision?: CaseDecision["choice"];
}): SellCase {
  const buyPrice = `Demo · ${input.price}`;
  const decided = input.decision ? decision(input.decision, input.at) : null;
  if (decided) {
    decided.buyPrice = buyPrice;
    decided.sellTerms = sellTerms;
  }
  return {
    token: input.token,
    createdAt: input.at,
    updatedAt: input.at,
    vehicle: input.title,
    seller: {
      name: "Demo-selger",
      phone: "97 66 63 80",
      regnr: "",
      km: input.km,
      wishedPrice: input.price,
    },
    status: input.status,
    bookingNote: input.bookingNote ?? "",
    workshop: input.workshop ?? { driven: "", check: "", faults: "" },
    photoUrls: input.photos,
    offers: input.offers || input.decision ? { buyPrice, sellTerms } : { buyPrice: "", sellTerms: "" },
    decision: decided,
    internalNote: "Demo. Ikke en ekte henvendelse. Beløpet er annonseprisen fra lageret.",
  };
}

/** Sample cases for a client walkthrough. Prices and photos are from the stock snapshot. */
export const demoCases: SellCase[] = [
  demo({
    token: "demo-ny",
    at: "2026-11-12T08:00:00.000Z",
    title: "Volvo XC60 2018",
    km: "148 207 km",
    price: "kr 339 000",
    status: "new",
    photos: [
      "https://cdn.autonet.no/ads-90620/c-ab252ceeEGM06600.jpg",
      "https://cdn.autonet.no/ads-90620/c-031bd02dEGM06646.jpg",
      "https://cdn.autonet.no/ads-90620/c-4dc9fcfcEGM06658.jpg",
    ],
  }),
  demo({
    token: "demo-avtalt",
    at: "2026-11-12T07:00:00.000Z",
    title: "Audi Q7 2016",
    km: "131 899 km",
    price: "kr 399 000",
    status: "booked",
    bookingNote: booking,
    photos: [
      "https://cdn.autonet.no/ads-88623/c-c60e0e8cEGM05800.jpg",
      "https://cdn.autonet.no/ads-88623/c-19deb482EGM05820.jpg",
      "https://cdn.autonet.no/ads-88623/c-c2a9669bEGM05822.jpg",
    ],
  }),
  demo({
    token: "demo-sjekket",
    at: "2026-11-12T06:00:00.000Z",
    title: "BMW M2 2018",
    km: "105 504 km",
    price: "kr 649 000",
    status: "checked",
    bookingNote: booking,
    workshop,
    photos: [
      "https://cdn.autonet.no/ads-90626/c-24cffb4bEGM06500.jpg",
      "https://cdn.autonet.no/ads-90626/c-4688d601EGM06547.jpg",
      "https://cdn.autonet.no/ads-90626/c-b314ad9dEGM06560.jpg",
    ],
  }),
  demo({
    token: "demo-tilbud",
    at: "2026-11-12T05:00:00.000Z",
    title: "Mercedes-Benz EQE 500 SUV 2024",
    km: "77 476 km",
    price: "kr 749 000",
    status: "offered",
    bookingNote: booking,
    workshop,
    offers: true,
    photos: [
      "https://cdn.autonet.no/ads-90683/c-3a7cf4d1EGM06300.jpg",
      "https://cdn.autonet.no/ads-90683/c-a3e88506EGM06347.jpg",
      "https://cdn.autonet.no/ads-90683/c-cb7b539bEGM06350.jpg",
    ],
  }),
  demo({
    token: "demo-kjop",
    at: "2026-11-12T04:00:00.000Z",
    title: "BMW M6 2015",
    km: "48 661 km",
    price: "kr 749 000",
    status: "accepted_buy",
    bookingNote: booking,
    workshop,
    decision: "buy",
    photos: [
      "https://cdn.autonet.no/ads-73000/c-410b4550EGM06200.jpg",
      "https://cdn.autonet.no/ads-73000/c-8029c055EGM06296.jpg",
      "https://cdn.autonet.no/ads-73000/c-d103bd59EGM06302.jpg",
    ],
  }),
  demo({
    token: "demo-salg",
    at: "2026-11-12T03:00:00.000Z",
    title: "Mercedes-Benz SL63 2013",
    km: "44 459 km",
    price: "kr 989 000",
    status: "accepted_sell",
    bookingNote: booking,
    workshop,
    decision: "sell",
    photos: [
      "https://cdn.autonet.no/ads-12154/b8a90d4fIMG_3715.JPG",
      "https://cdn.autonet.no/ads-12154/67586bfaIMG_3718.JPG",
      "https://cdn.autonet.no/ads-12154/7c934103IMG_3719.JPG",
    ],
  }),
  demo({
    token: "demo-avslaatt",
    at: "2026-11-12T02:00:00.000Z",
    title: "Porsche 911 Carrera 2000",
    km: "131 711 km",
    price: "kr 429 000",
    status: "declined",
    bookingNote: booking,
    workshop,
    decision: "decline",
    photos: [
      "https://cdn.autonet.no/ads-87243/c-26e33fc6EGM05200.jpg",
      "https://cdn.autonet.no/ads-87243/c-4a35c6baEGM05275.jpg",
      "https://cdn.autonet.no/ads-87243/c-23e5423aEGM05278.jpg",
    ],
  }),
  demo({
    token: "demo-utlagt",
    at: "2026-11-12T01:00:00.000Z",
    title: "Bentley Continental GT 2013",
    km: "113 538 km",
    price: "kr 779 000",
    status: "listed",
    bookingNote: booking,
    workshop,
    decision: "sell",
    photos: [
      "https://cdn.autonet.no/ads-86838/c-8b21b671EGM04900.jpg",
      "https://cdn.autonet.no/ads-86838/c-e15db593EGM04983.jpg",
      "https://cdn.autonet.no/ads-86838/c-d3c57afbEGM04988.jpg",
    ],
  }),
];
