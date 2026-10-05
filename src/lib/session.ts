import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "sesi";
const DURASI_JAM = 8;

export type SessionPayload = { userId: string; peran: "ADMIN" | "PENDAMPING" };

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET belum diisi (minimal 32 karakter)");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + DURASI_JAM * 3600 * 1000);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function readSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string") return null;
    if (payload.peran !== "ADMIN" && payload.peran !== "PENDAMPING") return null;
    return { userId: payload.userId, peran: payload.peran };
  } catch {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
