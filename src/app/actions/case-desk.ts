"use server";

import { redirect } from "next/navigation";
import {
  decideIfOffered,
  getCase,
  httpsUrls,
  isCaseStatus,
  isDemoCase,
  saveCase,
  sellerPath,
  type SellCase,
} from "@/lib/cases";

const demoOutcome = { buy: "demo-kjop", sell: "demo-salg", decline: "demo-avslaatt" } as const;
import { isStaff } from "@/lib/staff-auth";

function clip(value: FormDataEntryValue | null, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(token: string, message: string): never {
  redirect(`/intern/saker/${token}?feil=${encodeURIComponent(message)}`);
}

export async function saveCaseAction(formData: FormData) {
  if (!(await isStaff())) redirect("/intern/innlogging");

  const token = clip(formData.get("token"), 80);
  const current = await getCase(token);
  if (!current) redirect("/intern/saker");
  if (isDemoCase(token)) fail(token, "Dette er en demo. Endringer lagres ikke på demo-bilene.");

  const statusValue = clip(formData.get("status"), 40);
  if (!isCaseStatus(statusValue)) fail(token, "Ukjent status.");

  let photoUrls: string[] = [];
  try {
    photoUrls = httpsUrls(clip(formData.get("bilder"), 8000));
  } catch {
    fail(token, "Hver bildeadresse må starte med https://");
  }
  if (photoUrls.length > 24) fail(token, "Maks 24 bilder.");

  const next: SellCase = {
    ...current,
    status: statusValue,
    bookingNote: clip(formData.get("avtale")),
    workshop: {
      driven: clip(formData.get("kjort")),
      check: clip(formData.get("sjekk")),
      faults: clip(formData.get("feil")),
    },
    photoUrls,
    offers: {
      buyPrice: clip(formData.get("kjop")),
      sellTerms: clip(formData.get("salg")),
    },
    internalNote: clip(formData.get("internt")),
  };

  const publishing = formData.get("intent") === "publish";
  if (publishing) next.status = "offered";

  if (next.status === "offered" && (!next.offers.buyPrice || !next.offers.sellTerms)) {
    fail(token, "Skriv både kjøpspris og vilkår for salg før tilbudet sendes.");
  }

  try {
    await saveCase(token, next);
  } catch (error) {
    console.error("[case] save failed", error);
    fail(token, "Kunne ikke lagre saken.");
  }

  redirect(`/intern/saker/${token}?lagret=1`);
}

export async function decideCase(formData: FormData) {
  const token = clip(formData.get("token"), 80);
  const choice = clip(formData.get("choice"), 20);
  if (choice !== "buy" && choice !== "sell" && choice !== "decline") redirect(sellerPath(token));
  if (isDemoCase(token)) redirect(sellerPath(token === "demo-tilbud" ? demoOutcome[choice] : token));

  try {
    await decideIfOffered(token, choice);
  } catch (error) {
    console.error("[case] decision failed", error);
  }

  redirect(sellerPath(token));
}
