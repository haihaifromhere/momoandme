import { NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { getClientKeepsakeContent } from "@/content/keepsake-content";

export async function GET() {
  const unlocked = await isUnlocked();
  if (!unlocked) {
    return NextResponse.json({ ok: true, unlocked: false });
  }

  return NextResponse.json({
    ok: true,
    unlocked: true,
    content: getClientKeepsakeContent(),
  });
}
