"use client";

type Props = {
  artist: string;
  date: string;
  venue: string;
  onClose: () => void;
};

export default function TicketView({ artist, date, venue, onClose }: Props) {
  return (
    <div className="overlay-view">
      <button type="button" className="close-btn focus-ring" onClick={onClose}>
        Close
      </button>
      <figure className="ticket-large">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/daniel-caesar-ticket.png"
          alt={`${artist} — ${date} at ${venue}`}
          className="ticket-large-img"
        />
      </figure>
    </div>
  );
}
