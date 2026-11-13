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
    // Always preventDefault so React state updates can't cancel a native
    // form POST on iOS Safari (a common mobile unlock failure).
    e.preventDefault();
    const form = e.currentTarget;
    const password = String(new FormData(form).get("password") || "").trim();

    if (!password) {
      setError("Enter the password.");
      return;
    }

    setError("");
    setBusy(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

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
      // Last resort: full page form POST (bypasses stuck fetch).
      HTMLFormElement.prototype.submit.call(form);
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
        <p className="unlock-prompt" id="keepsake-prompt">
          Only for momo to see, write the magic words pookie!
        </p>
        <label htmlFor="keepsake-password" className="sr-only">
          Magic words
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
          aria-describedby="keepsake-prompt"
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
      </form>
    </div>
  );
}
