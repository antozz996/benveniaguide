"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

/** Avviso informativo (es. dati fittizi). Non renderizza nulla senza testo. */
export function Disclaimer({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-4 flex items-start gap-2 rounded-2xl border border-line bg-sage-100/70 px-3.5 py-3 text-[11px] leading-relaxed text-forest/80">
      <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper-700" />
      <span>{text}</span>
    </p>
  );
}

export function ScreenHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-4">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-copper-700 uppercase">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold text-forest">
        {title}
      </h3>
      {intro ? (
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{intro}</p>
      ) : null}
    </header>
  );
}

export function GuideCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? "rounded-2xl border border-line bg-paper p-4"}>
      {children}
    </div>
  );
}

/**
 * Azione della guida: link reale se c'e' `href`, altrimenti bottone che delega
 * al genitore (toast della demo). Stesse classi in entrambi i casi.
 */
export function GuideAction({
  href,
  onClick,
  className,
  children,
  hideWithoutHref = false,
}: {
  href?: string;
  onClick: () => void;
  /** Guide reali: un'azione senza recapito non viene mostrata. */
  hideWithoutHref?: boolean;
  className: string;
  children: ReactNode;
}) {
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  if (hideWithoutHref) return null;
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
