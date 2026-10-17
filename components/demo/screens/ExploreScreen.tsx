"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { PlaceArt } from "@/components/demo/PlaceArt";
import { ScreenHeading } from "@/components/demo/parts";
import type { DemoGuideContent, DemoPlace } from "@/data/demo-guide";
import { cn } from "@/lib/utils";

export function ExploreScreen({
  content,
  onOpenPlace,
  onInteraction,
}: {
  content: DemoGuideContent;
  onOpenPlace: (place: DemoPlace) => void;
  onInteraction: (action: string, detail?: string) => void;
}) {
  const { explore } = content;
  const [activeGroup, setActiveGroup] = useState(explore.groups[0].id);
  const group = explore.groups.find((item) => item.id === activeGroup) ?? explore.groups[0];

  return (
    <div>
      <ScreenHeading
        eyebrow={explore.eyebrow}
        title={explore.title}
        intro={explore.intro}
      />

      <div
        role="tablist"
        aria-label={explore.title}
        className="mb-3 flex gap-1.5 rounded-full border border-line bg-paper p-1"
      >
        {explore.groups.map((item) => {
          const isActive = item.id === group.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveGroup(item.id);
                onInteraction("group_change", item.id);
              }}
              className={cn(
                "flex-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                isActive
                  ? "bg-forest text-ivory"
                  : "text-muted hover:text-forest",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <ul className="space-y-2.5">
        {group.places.map((place) => (
          <li key={place.id}>
            <button
              type="button"
              onClick={() => onOpenPlace(place)}
              className="flex w-full items-center gap-3 rounded-2xl border border-line bg-paper p-2.5 text-left transition-transform duration-200 hover:-translate-y-0.5"
            >
              <PlaceArt kind={place.art} className="h-16 w-16 shrink-0 rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-forest">
                  {place.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-copper-700 uppercase">
                  {place.category}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted">
                  {place.distance}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
