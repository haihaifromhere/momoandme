import { NextResponse } from "next/server";
import { checkPassword, createUnlockToken, SESSION_COOKIE } from "@/lib/auth";

function publicOrigin(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  if (host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

/** HTML form POST fallback (works even if client JS fails to hydrate on mobile). */
export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "").trim();
  const origin = publicOrigin(request);

  if (!checkPassword(password)) {
    return NextResponse.redirect(`${origin}/?error=1`, 303);
  }

  const token = await createUnlockToken();
  const response = NextResponse.redirect(`${origin}/`, 303);

  const secure =
    origin.startsWith("https:") || process.env.NODE_ENV === "production";

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
