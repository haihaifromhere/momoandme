"use client";

import { useEffect, useRef, useState } from "react";
import type { KeepsakeContent } from "@/content/keepsake-content";
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
  content: KeepsakeContent;
};

export default function KeepsakeApp({ content }: Props) {
  const [view, setView] = useState<View>({ type: "box" });
  const letterRef = useRef<HTMLButtonElement | null>(null);
  const returnFocus = useRef<"letter" | null>(null);

  useEffect(() => {
    if (view.type !== "box") return;
    if (returnFocus.current === "letter") {
      letterRef.current?.focus();
      returnFocus.current = null;
    }
  }, [view]);

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
