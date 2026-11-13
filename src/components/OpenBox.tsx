"use client";

import { RefObject } from "react";
import type { KeepsakeContent } from "@/content/keepsake-content";
import BoxShell from "@/components/BoxShell";

export type BoxFocusTarget =
  | "letter"
  | "cassette"
  | "cards"
  | "ticket"
  | "photo-0"
  | "photo-1"
  | "photo-2"
  | "photo-3"
  | "calendar"
  | "lego";

type Props = {
  content: KeepsakeContent;
  letterRef: RefObject<HTMLButtonElement | null>;
  focusTarget?: BoxFocusTarget | null;
  onOpenLetter: () => void;
  onOpenCards: () => void;
  onOpenTicket: () => void;
  onOpenPhoto: (index: number) => void;
  onOpenCalendar: () => void;
  onOpenLego: () => void;
};

export default function OpenBox({
  content,
  letterRef,
  onOpenLetter,
  onOpenCards,
  onOpenTicket,
  onOpenPhoto,
  onOpenCalendar,
  onOpenLego,
}: Props) {
  const playlist = content.spotifyPlaylistUrl.trim();

  function handleCassette() {
    if (!playlist) {
      window.alert("Playlist coming soon");
      return;
    }
    window.open(playlist, "_blank", "noopener,noreferrer");
  }

  const cover = content.memoryCardsCover || content.memoryCards[0];
  const cardsTitle = content.memoryCardsTitle || "Memory cards";

  return (
    <div className="scene open-scene">
      <BoxShell open>
        <div className="object-field" role="group" aria-label="Open keepsake box">
          <button
            ref={letterRef}
            type="button"
            className="keepsake-object obj-letter focus-ring"
            onClick={onOpenLetter}
            aria-label="Folded letter"
          >
            <span className="letter-fold paper-grain">
              <span className="letter-fold-label">Letter</span>
            </span>
          </button>

          <button
            type="button"
            className="keepsake-object obj-cards focus-ring"
            onClick={onOpenCards}
            aria-label={cardsTitle}
          >
            <span className="card-stack">
              <span className="card-edge edge-2" />
              <span className="card-edge edge-1" />
              <span className="card-face">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/media/cards/${cover}`} alt="" />
                ) : (
                  <span className="card-fallback">{cardsTitle}</span>
                )}
              </span>
            </span>
          </button>

          <button
            type="button"
            className="keepsake-object obj-cassette focus-ring"
            onClick={handleCassette}
            aria-label="Cassette tape: Our playlist"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cassette-photo"
              src="/images/cassette.png"
              alt=""
              draggable={false}
            />
          </button>

          <button
            type="button"
            className="keepsake-object obj-ticket focus-ring"
            onClick={onOpenTicket}
            aria-label="Daniel Caesar concert ticket"
          >
            <span className="ticket-mini">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="ticket-mini-img"
                src="/images/daniel-caesar-ticket.png"
                alt=""
              />
            </span>
          </button>

          {content.photos.map((filename, i) => (
            <button
              key={filename}
              type="button"
              className={`keepsake-object obj-photo obj-photo-${i} focus-ring`}
              onClick={() => onOpenPhoto(i)}
              aria-label={`Photo print ${i + 1}`}
            >
              <span className="photo-print">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/media/photos/${filename}`} alt="" />
              </span>
            </button>
          ))}

          <button
            type="button"
            className="keepsake-object obj-calendar focus-ring"
            onClick={onOpenCalendar}
            aria-label="November 2026 calendar"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="calendar-scrap"
              src="/images/november-calendar.png"
              alt=""
              draggable={false}
            />
          </button>

          <button
            type="button"
            className="keepsake-object obj-lego focus-ring"
            onClick={onOpenLego}
            aria-label="LEGO duo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lego-duo"
              src="/images/lego-duo.png"
              alt=""
              draggable={false}
            />
          </button>
        </div>
      </BoxShell>

      {!playlist ? (
        <p className="playlist-hint">Cassette · Playlist coming soon</p>
      ) : null}
    </div>
  );
}
