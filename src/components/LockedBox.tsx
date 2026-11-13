"use client";

import { FormEvent, useState } from "react";
import type { KeepsakeContent } from "@/content/keepsake-content";
import BoxShell from "@/components/BoxShell";

type Props = {
  onUnlocked: (content: KeepsakeContent) => void;
  initialError?: string;
};

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
}

export default function LockedBox({ onUnlocked, initialError = "" }: Props) {
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const password = String(new FormData(form).get("password") || "").trim();

    if (!password) {
      e.preventDefault();
      setError("Enter the password.");
      return;
    }

    // Mobile / tunnel: native form POST is more reliable than fetch.
    if (isCoarsePointer()) {
      setBusy(true);
      // Do not preventDefault — browser posts to /unlock and redirects back.
      return;
    }

    e.preventDefault();
    setError("");
    setBusy(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok || !data.content) {
        setError(data.error || "That didn't open it. Try again?");
        setBusy(false);
        return;
      }

      try {
        sessionStorage.setItem("keepsake_unlocked", "1");
      } catch {
        // ignore
      }

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        onUnlocked(data.content);
        return;
      }

      setOpening(true);
      window.setTimeout(() => {
        onUnlocked(data.content);
      }, 850);
    } catch {
      window.clearTimeout(timeout);
      // Fall back to native form POST.
      form.submit();
    }
  }

  return (
    <div className="scene locked-scene">
      <BoxShell opening={opening} />

      <form
        className="unlock-form"
        method="post"
        action="/unlock"
        onSubmit={handleSubmit}
      >
        <label htmlFor="keepsake-password" className="unlock-label">
          Password
        </label>
        <input
          id="keepsake-password"
          name="password"
          className="unlock-input focus-ring"
          type="text"
          inputMode="text"
          maxLength={64}
          required
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          disabled={busy || opening}
          // Safari/iOS may rewrite capitalization/autocorrect attrs before hydrate.
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="unlock-btn focus-ring"
          disabled={busy || opening}
        >
          {opening ? "Opening..." : busy ? "Opening..." : "Open box"}
        </button>
        {error ? (
          <p className="unlock-error" role="alert">
            {error}
          </p>
        ) : null}
        <p className="unlock-hint">Password: case doesn&apos;t matter</p>
      </form>
    </div>
  );
}
