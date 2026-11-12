import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const COOKIE = "ag_staff";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

function secret() {
  const value = process.env.STAFF_ACCESS_CODE;
  if (!value) return null;
  return value;
}

export function staffAccessConfigured() {
  return Boolean(secret());
}

export function accessCodeMatches(input: string) {
  const expected = secret();
  if (!expected) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function sign(expiresAt: string) {
  const key = secret();
  if (!key) throw new Error("STAFF_ACCESS_CODE er ikke satt.");
  return createHmac("sha256", key).update(expiresAt).digest("base64url");
}

export async function setStaffCookie() {
  const expiresAt = String(Date.now() + MAX_AGE_SECONDS * 1000);
  const jar = await cookies();
  jar.set(COOKIE, `${expiresAt}.${sign(expiresAt)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearStaffCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isStaff() {
  await connection();
  if (!secret()) return false;
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const [expiresAt, signature] = raw.split(".");
  if (!expiresAt || !signature) return false;
  const expected = sign(expiresAt);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  return Number(expiresAt) > Date.now();
}
