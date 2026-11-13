"use client";

import { FormEvent, useState } from "react";
import type { KeepsakeContent } from "@/content/keepsake-content";
import BoxShell from "@/components/BoxShell";

type Props = {
  onUnlocked: (content: KeepsakeContent) => void;
  initialError?: string;
};

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

    // Prefer fetch when JS is alive. On network failure, fall back to POST /unlock.
    e.preventDefault();
    setError("");
    setBusy(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
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
      // Client JS/fetch broken or timed out (common on mobile tunnels).
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
          type="password"
          maxLength={64}
          required
          autoComplete="current-password"
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
          {opening ? "Opening..." : busy ? "Checking..." : "Open box"}
        </button>
        {error ? (
          <p className="unlock-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
