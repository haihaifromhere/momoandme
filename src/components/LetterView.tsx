"use client";

type Props = {
  letter: string;
  onBack: () => void;
};

export default function LetterView({ letter, onBack }: Props) {
  return (
    <div className="overlay-view letter-view">
      <button type="button" className="back-btn focus-ring" onClick={onBack}>
        ← Back to box
      </button>
      <article className="letter-sheet paper-grain" aria-label="Letter">
        <pre className="letter-body">{letter}</pre>
      </article>
    </div>
  );
}
