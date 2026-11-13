"use client";

type Props = {
  /** Spotify track id, e.g. Cyanide */
  trackId: string;
  title?: string;
  /** Hide when viewing box content overlays (keeps audio if already playing). */
  visible?: boolean;
};

export default function BackgroundMusic({
  trackId,
  title = "Cyanide — Daniel Caesar",
  visible = true,
}: Props) {
  const src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <div
      className={`bg-music${visible ? "" : " bg-music--hidden"}`}
      aria-hidden={!visible}
      aria-label={`Background music: ${title}`}
    >
      <p className="bg-music-label">{title}</p>
      <iframe
        title={title}
        src={src}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        tabIndex={visible ? 0 : -1}
      />
    </div>
  );
}
