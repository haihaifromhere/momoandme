"use client";

import { ReactNode } from "react";

type Props = {
  className?: string;
  opening?: boolean;
  open?: boolean;
  children?: ReactNode;
  label?: string;
};

export default function BoxShell({
  className = "",
  opening = false,
  open = false,
  children,
  label = "For you.",
}: Props) {
  return (
    <div
      className={`keepsake-box ${open ? "is-open" : ""} ${opening ? "is-opening" : ""} ${className}`.trim()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="box-photo"
        src="/images/keepsake-box.png"
        alt=""
        draggable={false}
      />

      <div className="box-floor">{children}</div>

      {!open ? (
        <div className="box-cover paper-grain" aria-hidden="true">
          <p className="lid-label">{label}</p>
        </div>
      ) : null}
    </div>
  );
}
