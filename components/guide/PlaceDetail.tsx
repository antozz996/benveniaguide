"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { ArrowLeft, Lightbulb, MapPin, Navigation } from "lucide-react";
import { PlaceArt } from "@/components/guide/PlaceArt";
import { GuideAction } from "@/components/guide/parts";
import type { GuideContent, GuidePlace } from "@/lib/guide/types";

function MaybeWrap({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return className ? <div className={className}>{children}</div> : children;
}

export function PlaceDetail({
  place,
  content,
  onClose,
  onAction,
  className = "absolute inset-0 z-20",
  contentClassName,
  hideUnlinkedActions = false,
  modal = false,
}: {
  place: GuidePlace;
  content: GuideContent;
  onClose: () => void;
  onAction: (target: string) => void;
  /** Posizionamento dell'overlay (fullpage: fixed). */
  className?: string;
  /** Classi del contenuto scorrevole (fullpage: ingrandimento). */
  contentClassName?: string;
  hideUnlinkedActions?: boolean;
  /**
   * Telefono reale: overlay come dialog modale (focus sul bottone indietro,
   * chiusura con Escape, bottone indietro da 44px).
   */
  modal?: boolean;
}) {
  const labels = content.explore.detailLabels;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modal) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modal, onClose]);

  return (
    <div
      className={`${className} flex flex-col bg-ivory`}
      {...(modal
        ? { role: "dialog", "aria-modal": true, "aria-labelledby": titleId }
        : {})}
    >
      <div className="relative">
        <PlaceArt kind={place.art} className="h-44 w-full rounded-none" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className={`absolute top-3 left-3 inline-flex ${modal ? "h-11 w-11" : "h-9 w-9"} items-center justify-center rounded-full bg-ivory/90 text-forest shadow-soft transition-colors hover:bg-paper`}
        >
          <ArrowLeft aria-hidden="true" className={modal ? "h-5 w-5" : "h-4 w-4"} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 no-scrollbar">
        <MaybeWrap className={contentClassName}>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-copper-700 uppercase">
          {place.category}
        </p>
        <h3 id={titleId} className="mt-1.5 font-display text-xl leading-snug font-semibold text-forest">
          {place.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-copper-700" />
          {labels.distance}: {place.distance}
        </p>

        <p className="mt-4 text-xs leading-relaxed text-charcoal/85">
          {place.description}
        </p>

        <div className="mt-4 rounded-2xl border-l-4 border-copper bg-sage-100/70 px-4 py-3.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-copper-700 uppercase">
            <Lightbulb aria-hidden="true" className="h-3.5 w-3.5" />
            {labels.tip}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-forest/85">
            {place.tip}
          </p>
        </div>

        <GuideAction
          hideWithoutHref={hideUnlinkedActions}
          href={place.mapsUrl}
          onClick={() => onAction("place_directions")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 text-[13px] font-semibold text-ivory transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Navigation aria-hidden="true" className="h-4 w-4" />
          {content.contacts.actions.directions}
        </GuideAction>
        </MaybeWrap>
      </div>
    </div>
  );
}
