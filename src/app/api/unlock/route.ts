import { NextResponse } from "next/server";
import { checkPassword, createUnlockToken, SESSION_COOKIE } from "@/lib/auth";
import { getClientKeepsakeContent } from "@/content/keepsake-content";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "That didn't open it. Try again?" },
      { status: 400 }
    );
  }

  if (!checkPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "That didn't open it. Try again?" },
      { status: 401 }
    );
  }

  const token = await createUnlockToken();
  const response = NextResponse.json({
    ok: true,
    content: getClientKeepsakeContent(),
  });

  const proto = request.headers.get("x-forwarded-proto");
  const secure =
    proto === "https" || process.env.NODE_ENV === "production";

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // "none" on HTTPS helps some mobile browsers behind tunnels/proxies.
    sameSite: secure ? "none" : "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
