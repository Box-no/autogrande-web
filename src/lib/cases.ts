import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { demoCases } from "@/content/demo-cases";

export const caseStatuses = [
  "new",
  "booked",
  "checked",
  "offered",
  "accepted_buy",
  "accepted_sell",
  "declined",
  "listed",
] as const;

export type CaseStatus = (typeof caseStatuses)[number];

export type CaseDecision = {
  choice: "buy" | "sell" | "decline";
  buyPrice: string;
  sellTerms: string;
  at: string;
};

export type SellCase = {
  token: string;
  createdAt: string;
  updatedAt: string;
  vehicle: string;
  seller: {
    name: string;
    phone: string;
    regnr: string;
    km: string;
    wishedPrice: string;
  };
  status: CaseStatus;
  bookingNote: string;
  workshop: {
    driven: string;
    check: string;
    faults: string;
  };
  photoUrls: string[];
  offers: {
    buyPrice: string;
    sellTerms: string;
  };
  decision: CaseDecision | null;
  internalNote: string;
};

const statusLabels: Record<CaseStatus, string> = {
  new: "Ny henvendelse",
  booked: "Testing avtalt",
  checked: "Bilen er sjekket",
  offered: "Tilbud sendt",
  accepted_buy: "Godtok salg til AutoGrande",
  accepted_sell: "Godtok at vi selger bilen",
  declined: "Avslått",
  listed: "Lagt ut for salg",
};

const sellerStatusText: Record<CaseStatus, string> = {
  new: "Vi har mottatt opplysningene. Neste steg er å avtale testing på verkstedet.",
  booked: "Testing er avtalt. Vi kjører en runde og tar en full sjekk på verkstedet.",
  checked: "Bilen er sjekket. Tilbudet kommer når begge alternativene er skrevet.",
  offered: "Du kan godta ett av tilbudene, eller avslå. Du velger selv.",
  accepted_buy: "Du har godtatt at AutoGrande kjøper bilen. Vi tar kontakt om det videre.",
  accepted_sell: "Du har godtatt at vi selger bilen for deg. Vi tar kontakt om det videre.",
  declined: "Du har avslått tilbudet. Ring oss om du vil starte på nytt.",
  listed: "Bilen er lagt ut for salg.",
};

const staffNextStep: Record<CaseStatus, string> = {
  new: "Ring selgeren og avtal en tid for testing. Skriv avtalen under «Avtale», og velg «Testing avtalt».",
  booked: "Når bilen er kjørt og sjekket: skriv hva dere fant under «Sjekken», og velg «Bilen er sjekket».",
  checked: "Skriv de to tilbudene under «Tilbud», og trykk «Send tilbud til selger».",
  offered: "Selgeren har fått tilbudene. Du trenger ikke gjøre noe før selgeren har svart.",
  accepted_buy: "Selgeren vil at AutoGrande kjøper bilen. Ta kontakt med selgeren om det videre.",
  accepted_sell: "Selgeren vil at dere selger bilen. Når den er lagt ut, velg «Lagt ut for salg».",
  declined: "Selgeren takket nei til begge tilbudene. Saken er avsluttet.",
  listed: "Bilen er lagt ut for salg. Saken er ferdig her.",
};

export function caseStatusLabel(status: CaseStatus) {
  return statusLabels[status];
}

export function staffNextStepCopy(status: CaseStatus) {
  return staffNextStep[status];
}

export const caseSteps = ["Mottatt", "Testing avtalt", "Sjekket", "Tilbud sendt", "Selgers valg", "Lagt ut"] as const;

export function caseStepIndex(status: CaseStatus) {
  const order: Record<CaseStatus, number> = {
    new: 0,
    booked: 1,
    checked: 2,
    offered: 3,
    accepted_buy: 4,
    accepted_sell: 4,
    declined: 4,
    listed: 5,
  };
  return order[status];
}

export type CaseGroup = "todo" | "waiting" | "done";

export function caseGroup(status: CaseStatus): CaseGroup {
  if (status === "new" || status === "booked" || status === "checked" || status === "accepted_buy" || status === "accepted_sell") {
    return "todo";
  }
  if (status === "offered") return "waiting";
  return "done";
}

const dateFormat = new Intl.DateTimeFormat("nb-NO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Oslo",
});

const timeFormat = new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo" });

export function formatCaseDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${dateFormat.format(date)} kl. ${timeFormat.format(date)}`;
}

export function isDemoCase(token: string) {
  return token.startsWith("demo-");
}

export function sellerStatusCopy(status: CaseStatus) {
  return sellerStatusText[status];
}

export function sellerPath(token: string) {
  return `/sak/${token}`;
}

export function isCaseStatus(value: string): value is CaseStatus {
  return (caseStatuses as readonly string[]).includes(value);
}

type Store = { cases: SellCase[] };

const filePath = path.join(process.cwd(), "data", "cases.json");

let queue: Promise<void> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("cases" in parsed)) return { cases: [] };
    const cases = (parsed as { cases?: unknown }).cases;
    if (!Array.isArray(cases)) return { cases: [] };
    return { cases: cases.filter(isSellCase).map((item) => ({ ...item, vehicle: item.vehicle || "" })) };
  } catch {
    return { cases: [] };
  }
}

async function writeStore(store: Store) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  await writeFile(temporary, JSON.stringify(store, null, 2), "utf8");
  const { rename } = await import("fs/promises");
  await rename(temporary, filePath);
}

function isSellCase(value: unknown): value is SellCase {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SellCase>;
  return typeof item.token === "string" && typeof item.status === "string" && isCaseStatus(item.status);
}

export async function createCase(seller: SellCase["seller"]): Promise<SellCase> {
  return enqueue(async () => {
    const store = await readStore();
    const now = new Date().toISOString();
    const created: SellCase = {
      token: randomBytes(24).toString("base64url"),
      createdAt: now,
      updatedAt: now,
      vehicle: "",
      seller,
      status: "new",
      bookingNote: "",
      workshop: { driven: "", check: "", faults: "" },
      photoUrls: [],
      offers: { buyPrice: "", sellTerms: "" },
      decision: null,
      internalNote: "",
    };
    store.cases.push(created);
    await writeStore(store);
    return created;
  });
}

export async function listCases(): Promise<SellCase[]> {
  const store = await readStore();
  const tokens = new Set(store.cases.map((item) => item.token));
  const stored = [...store.cases].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return [...stored, ...demoCases.filter((item) => !tokens.has(item.token))];
}

export async function getCase(token: string): Promise<SellCase | null> {
  const store = await readStore();
  return store.cases.find((item) => item.token === token) ?? demoCases.find((item) => item.token === token) ?? null;
}

export async function saveCase(token: string, next: SellCase): Promise<void> {
  await enqueue(async () => {
    const store = await readStore();
    const index = store.cases.findIndex((item) => item.token === token);
    if (index === -1) throw new Error("Saken finnes ikke.");
    store.cases[index] = { ...next, token, updatedAt: new Date().toISOString() };
    await writeStore(store);
  });
}

export async function decideIfOffered(token: string, choice: CaseDecision["choice"]): Promise<boolean> {
  return enqueue(async () => {
    const store = await readStore();
    const index = store.cases.findIndex((item) => item.token === token);
    const current = index === -1 ? null : store.cases[index];
    if (!current || current.status !== "offered") return false;
    const status = choice === "buy" ? "accepted_buy" : choice === "sell" ? "accepted_sell" : "declined";
    store.cases[index] = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
      decision: {
        choice,
        buyPrice: current.offers.buyPrice,
        sellTerms: current.offers.sellTerms,
        at: new Date().toISOString(),
      },
    };
    await writeStore(store);
    return true;
  });
}

export function httpsUrls(value: string): string[] {
  return value
    .split(/\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const url = new URL(line);
      if (url.protocol !== "https:") throw new Error("Bilder må være https-adresser.");
      return url.toString();
    });
}

export function caseStoreIsEphemeral() {
  return process.env.VERCEL === "1";
}
