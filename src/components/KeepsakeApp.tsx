"use client";

import { useEffect, useRef, useState } from "react";
import type { KeepsakeContent } from "@/content/keepsake-content";
import LockedBox from "@/components/LockedBox";
import OpenBox from "@/components/OpenBox";
import LetterView from "@/components/LetterView";
import CardGallery from "@/components/CardGallery";
import TicketView from "@/components/TicketView";
import PhotoView from "@/components/PhotoView";
import BackgroundMusic from "@/components/BackgroundMusic";

/** Daniel Caesar — Cyanide (CASE STUDY 01) */
const CYANIDE_SPOTIFY_ID = "7lmsi1pVDa3HnfeinsL89t";

type View =
  | { type: "box" }
  | { type: "letter" }
  | { type: "cards" }
  | { type: "ticket" }
  | { type: "photo"; index: number }
  | { type: "calendar" }
  | { type: "lego" };

type Props = {
  initiallyUnlocked: boolean;
  initialContent: KeepsakeContent | null;
  unlockError?: boolean;
};

export default function KeepsakeApp({
  initiallyUnlocked,
  initialContent,
  unlockError = false,
}: Props) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [content, setContent] = useState<KeepsakeContent | null>(initialContent);
  const [view, setView] = useState<View>({ type: "box" });
  const [openingIn, setOpeningIn] = useState(false);
  const letterRef = useRef<HTMLButtonElement | null>(null);
  const returnFocus = useRef<"letter" | null>(null);

  useEffect(() => {
    if (view.type !== "box") return;
    if (returnFocus.current === "letter") {
      letterRef.current?.focus();
      returnFocus.current = null;
    }
  }, [view]);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const res = await fetch("/api/session", { credentials: "same-origin" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (data.ok && data.unlocked && data.content) {
          setContent(data.content);
          setUnlocked(true);
        }
      } catch {
        // Stay locked if session check fails.
      }
    }

    if (!initiallyUnlocked) {
      void restoreSession();
    }

    return () => {
      cancelled = true;
    };
  }, [initiallyUnlocked]);

  function handleUnlocked(next: KeepsakeContent) {
    setContent(next);
    setOpeningIn(true);
    setUnlocked(true);
    window.setTimeout(() => setOpeningIn(false), 50);
  }

  if (!unlocked || !content) {
    return (
      <LockedBox
        onUnlocked={handleUnlocked}
        initialError={
          unlockError ? "That didn't open it. Try again?" : ""
        }
      />
    );
  }

  let main = null;

  if (view.type === "letter") {
    main = (
      <LetterView
        letter={content.letter}
        onBack={() => {
          returnFocus.current = "letter";
          setView({ type: "box" });
        }}
      />
    );
  } else if (view.type === "cards") {
    main = (
      <CardGallery
        cards={content.memoryCards}
        captions={content.memoryCardCaptions}
        title={content.memoryCardsTitle}
        onClose={() => setView({ type: "box" })}
      />
    );
  } else if (view.type === "ticket") {
    main = (
      <TicketView
        artist={content.concert.artist}
        date={content.concert.date}
        venue={content.concert.venue}
        onClose={() => setView({ type: "box" })}
      />
    );
  } else if (view.type === "photo") {
    main = (
      <PhotoView
        filename={content.photos[view.index]}
        label={`Photo ${view.index + 1}`}
        onClose={() => setView({ type: "box" })}
      />
    );
  } else if (view.type === "calendar") {
    main = (
      <div className="overlay-view">
        <button
          type="button"
          className="close-btn focus-ring"
          onClick={() => setView({ type: "box" })}
        >
          Close
        </button>
        <figure className="calendar-large">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/november-calendar.png"
            alt="November 2026 calendar"
            className="calendar-large-img"
          />
        </figure>
      </div>
    );
  } else if (view.type === "lego") {
    main = (
      <div className="overlay-view">
        <button
          type="button"
          className="close-btn focus-ring"
          onClick={() => setView({ type: "box" })}
        >
          Close
        </button>
        <figure className="lego-large">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lego-duo.png"
            alt="LEGO duo"
            className="lego-large-img"
          />
        </figure>
      </div>
    );
  } else {
    main = (
      <div className={openingIn ? "just-opened" : undefined}>
        <OpenBox
          content={content}
          letterRef={letterRef}
          onOpenLetter={() => setView({ type: "letter" })}
          onOpenCards={() => setView({ type: "cards" })}
          onOpenTicket={() => setView({ type: "ticket" })}
          onOpenPhoto={(index) => setView({ type: "photo", index })}
          onOpenCalendar={() => setView({ type: "calendar" })}
          onOpenLego={() => setView({ type: "lego" })}
        />
      </div>
    );
  }

  return (
    <>
      {main}
      <BackgroundMusic
        trackId={CYANIDE_SPOTIFY_ID}
        visible={view.type === "box"}
      />
    </>
  );
}
