"use client";

type Props = {
  /** Spotify track id, e.g. Cyanide */
  trackId: string;
  title?: string;
};

export default function BackgroundMusic({
  trackId,
  title = "Cyanide — Daniel Caesar",
}: Props) {
  const src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <div className="bg-music" aria-label={`Background music: ${title}`}>
      <p className="bg-music-label">{title}</p>
      <iframe
        title={title}
        src={src}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        allowFullScreen
      />
    </div>
  );
}
