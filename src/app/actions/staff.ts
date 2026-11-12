"use server";

import { redirect } from "next/navigation";
import { accessCodeMatches, clearStaffCookie, setStaffCookie, staffAccessConfigured } from "@/lib/staff-auth";

export async function loginStaff(formData: FormData) {
  if (!staffAccessConfigured()) redirect("/intern/innlogging?feil=ikke-satt");
  const code = String(formData.get("kode") ?? "");
  if (!accessCodeMatches(code)) redirect("/intern/innlogging?feil=feil-kode");
  await setStaffCookie();
  redirect("/intern/saker");
}

export async function logoutStaff() {
  await clearStaffCookie();
  redirect("/intern/innlogging");
}
