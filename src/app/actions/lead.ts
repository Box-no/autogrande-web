"use server";

import { createCase, sellerPath } from "@/lib/cases";
import { leadForms, type LeadKind } from "@/content/forms";
import { company } from "@/content/site";

export type LeadState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
  values?: Record<string, string>;
  followPath?: string;
};

const MAX_LENGTH = 1000;

function isLeadKind(value: unknown): value is LeadKind {
  return typeof value === "string" && value in leadForms;
}

export async function submitLead(
  kind: LeadKind,
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  if (!isLeadKind(kind)) {
    return { status: "error", message: "Ukjent skjema.", fieldErrors: {} };
  }

  // Honeypot: bots fill every field, humans never see this one.
  if (String(formData.get("firma") ?? "").length > 0) {
    return { status: "success", message: leadForms[kind].successMessage, fieldErrors: {} };
  }

  const config = leadForms[kind];
  const values: Record<string, string> = {};
  const fieldErrors: Record<string, string> = {};

  for (const field of config.fields) {
    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw.trim().slice(0, MAX_LENGTH) : "";
    values[field.name] = value;

    if (field.required && value.length === 0) {
      fieldErrors[field.name] = `${field.label} må fylles ut.`;
      continue;
    }
    if (field.name === "regnr" && value && !/^[A-ZÆØÅ]{1,2}\s?\d{4,5}$/i.test(value)) {
      fieldErrors[field.name] = "Skriv reg.nr. som f.eks. AB 12345.";
    }
    if (field.type === "tel" && value && value.replace(/[\s+]/g, "").replace(/^47/, "").length !== 8) {
      fieldErrors[field.name] = "Skriv et norsk telefonnummer med 8 siffer.";
    }
    if (field.options && value && !field.options.includes(value)) {
      fieldErrors[field.name] = "Velg et av alternativene.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Sjekk feltene som er markert.", fieldErrors, values };
  }

  let followPath: string | undefined;
  if (kind === "elbil") {
    try {
      const created = await createCase({
        name: values.navn ?? "",
        phone: values.telefon ?? "",
        regnr: (values.regnr ?? "").toUpperCase(),
        km: values.km ?? "",
        wishedPrice: values.onsketPris ?? "",
      });
      followPath = sellerPath(created.token);
    } catch (error) {
      console.error("[lead] case store failed", error);
    }
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    if (!followPath && process.env.NODE_ENV === "production") {
      return {
        status: "error",
        message: `Skjemaet er ikke tilgjengelig akkurat nå. Ring oss på ${company.phoneDisplay}.`,
        fieldErrors: {},
        values,
      };
    }
    console.info("[lead]", kind, values, followPath ?? "");
    return { status: "success", message: config.successMessage, fieldErrors: {}, followPath };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        values,
        submittedAt: new Date().toISOString(),
        followPath,
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[lead] delivery failed", error);
    if (followPath) {
      return { status: "success", message: config.successMessage, fieldErrors: {}, followPath };
    }
    return {
      status: "error",
      message: `Noe gikk galt. Prøv igjen, eller ring oss på ${company.phoneDisplay}.`,
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", message: config.successMessage, fieldErrors: {}, followPath };
}
