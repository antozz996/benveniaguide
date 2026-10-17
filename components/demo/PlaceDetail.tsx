"use client";

import { ArrowLeft, Lightbulb, MapPin, Navigation } from "lucide-react";
import { PlaceArt } from "@/components/demo/PlaceArt";
import type { DemoGuideContent, DemoPlace } from "@/data/demo-guide";

export function PlaceDetail({
  place,
  content,
  onClose,
  onDemoAction,
}: {
  place: DemoPlace;
  content: DemoGuideContent;
  onClose: () => void;
  onDemoAction: (target: string) => void;
}) {
  const labels = content.explore.detailLabels;

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-ivory">
      <div className="relative">
        <PlaceArt kind={place.art} className="h-44 w-full rounded-none" />
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-forest shadow-soft transition-colors hover:bg-paper"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 no-scrollbar">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-copper-700 uppercase">
          {place.category}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug font-semibold text-forest">
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

        <button
          type="button"
          onClick={() => onDemoAction("place_directions")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 text-[13px] font-semibold text-ivory transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Navigation aria-hidden="true" className="h-4 w-4" />
          {content.contacts.actions.directions}
        </button>
      </div>
    </div>
  );
}
