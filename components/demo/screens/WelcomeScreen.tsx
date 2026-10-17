"use client";

import {
  BedDouble,
  BookOpen,
  ChevronRight,
  MapPin,
  Phone,
  Wifi,
} from "lucide-react";
import { PlaceArt } from "@/components/demo/PlaceArt";
import { DemoDisclaimer } from "@/components/demo/parts";
import type {
  DemoGuideContent,
  DemoQuickLink,
  DemoScreen,
} from "@/data/demo-guide";

const quickLinkIcons: Record<DemoQuickLink["icon"], typeof BedDouble> = {
  bed: BedDouble,
  wifi: Wifi,
  book: BookOpen,
  map: MapPin,
  phone: Phone,
};

export function WelcomeScreen({
  content,
  onNavigate,
}: {
  content: DemoGuideContent;
  onNavigate: (screen: DemoScreen) => void;
}) {
  const { welcome, structure, ui } = content;

  return (
    <div>
      <div className="relative">
        <PlaceArt kind="lake" className="h-40 w-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent px-4 pt-10 pb-3 rounded-b-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-ivory/80 uppercase">
            {welcome.eyebrow}
          </p>
          <p className="font-display text-base font-semibold text-ivory">
            {structure.name}
          </p>
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-forest">
        {welcome.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        {welcome.message}
      </p>
      <p className="mt-2 font-serif text-xs italic text-copper-700">
        {welcome.signature}
      </p>

      <h4 className="mt-5 mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-forest/70 uppercase">
        {welcome.quickLinksTitle}
      </h4>
      <ul className="grid grid-cols-2 gap-2.5">
        {welcome.quickLinks.map((link, index) => {
          const Icon = quickLinkIcons[link.icon];
          const isHighlight = index === 0;
          return (
            <li key={link.id} className={isHighlight ? "col-span-2" : undefined}>
              <button
                type="button"
                onClick={() => onNavigate(link.screen)}
                className={
                  isHighlight
                    ? "flex w-full items-center gap-3 rounded-2xl bg-forest px-4 py-3.5 text-left transition-transform duration-200 hover:-translate-y-0.5"
                    : "flex w-full flex-col gap-2 rounded-2xl border border-line bg-paper px-3.5 py-3.5 text-left transition-transform duration-200 hover:-translate-y-0.5"
                }
              >
                <span
                  className={
                    isHighlight
                      ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ivory/15 text-ivory"
                      : "flex h-8 w-8 items-center justify-center rounded-xl bg-sage-100 text-forest"
                  }
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className={isHighlight ? "min-w-0" : "min-w-0 flex-1"}>
                  <span
                    className={
                      isHighlight
                        ? "block text-sm font-semibold text-ivory"
                        : "block text-[13px] font-semibold text-forest"
                    }
                  >
                    {link.label}
                  </span>
                  <span
                    className={
                      isHighlight
                        ? "block text-[11px] text-ivory/70"
                        : "block text-[11px] text-muted"
                    }
                  >
                    {link.hint}
                  </span>
                </span>
                {isHighlight ? (
                  <ChevronRight
                    aria-hidden="true"
                    className="ml-auto h-4 w-4 shrink-0 text-ivory/70"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <DemoDisclaimer text={structure.disclaimer} />
      <p className="sr-only">{ui.demoNotice}</p>
    </div>
  );
}
