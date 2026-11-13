import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "keepsake_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.KEEPSAKE_PASSWORD;
  if (!secret) {
    throw new Error("SESSION_SECRET or KEEPSAKE_PASSWORD must be set");
  }
  return new TextEncoder().encode(secret);
}

export async function createUnlockToken(): Promise<string> {
  return new SignJWT({ unlocked: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(getSecret());
}

export async function verifyUnlockToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.unlocked === true;
  } catch {
    return false;
  }
}

export async function isUnlocked(): Promise<boolean> {
  const jar = await cookies();
  return verifyUnlockToken(jar.get(SESSION_COOKIE)?.value);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.KEEPSAKE_PASSWORD;
  if (!expected) return false;
  return password.trim() === expected.trim();
}
