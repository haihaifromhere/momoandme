"use client";

import { useEffect } from "react";

type Props = {
  filename: string;
  label: string;
  onClose: () => void;
};

export default function PhotoView({ filename, label, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay-view photo-popup" role="dialog" aria-label={label}>
      <button type="button" className="close-btn photo-popup-close focus-ring" onClick={onClose}>
        Close
      </button>
      <figure className="photo-large photo-popup-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/api/media/photos/${filename}`} alt={label} />
      </figure>
    </div>
  );
}
