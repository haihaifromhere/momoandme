import { createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { keepsakeContent } from "@/content/keepsake-content";

const PRIVATE_ROOT = path.join(process.cwd(), "private");

const ALLOWED = new Set([
  `cards/${keepsakeContent.memoryCardsCover}`,
  ...keepsakeContent.memoryCards.map((f) => `cards/${f}`),
  ...keepsakeContent.photos.map((f) => `photos/${f}`),
]);

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const unlocked = await isUnlocked();
  if (!unlocked) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path: parts } = await context.params;
  const relative = parts.join("/");

  if (!ALLOWED.has(relative) || relative.includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const absolute = path.join(PRIVATE_ROOT, relative);
  if (!absolute.startsWith(PRIVATE_ROOT) || !existsSync(absolute)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stat = statSync(absolute);
  const stream = createReadStream(absolute);
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    headers: {
      "Content-Type": contentTypeFor(absolute),
      "Content-Length": String(stat.size),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
