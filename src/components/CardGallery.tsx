"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  cards: string[];
  captions?: string[];
  title?: string;
  onClose: () => void;
};

export default function CardGallery({ cards, captions = [], title, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = cards.length;

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex((i) => (next + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % Math.max(total, 1));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + Math.max(total, 1)) % Math.max(total, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, total]);

  if (total === 0) {
    return (
      <div className="overlay-view">
        <button type="button" className="close-btn focus-ring" onClick={onClose}>
          Close
        </button>
        <p className="muted">No cards yet.</p>
      </div>
    );
  }

  const src = `/api/media/cards/${cards[index]}`;
  const caption = captions[index]?.trim() ?? "";

  return (
    <div
      className="overlay-view card-gallery"
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 40) return;
        go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      <div className="gallery-toolbar">
        <div className="gallery-heading">
          {title ? <p className="gallery-title">{title}</p> : null}
          <p className="gallery-count">
            {index + 1} / {total}
          </p>
        </div>
        <button type="button" className="close-btn focus-ring" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="gallery-stage">
        <button
          type="button"
          className="nav-btn focus-ring"
          aria-label="Previous card"
          onClick={() => go(index - 1)}
        >
          ‹
        </button>

        <div className="gallery-card-stack">
          <div className="gallery-card-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Memory card ${index + 1}`} className="gallery-card-img" />
          </div>
          {caption ? (
            <p className="gallery-card-caption" key={index}>
              {caption}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          className="nav-btn focus-ring"
          aria-label="Next card"
          onClick={() => go(index + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
