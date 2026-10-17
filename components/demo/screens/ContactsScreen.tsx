"use client";

import {
  ChevronDown,
  Mail,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import { DemoDisclaimer, DemoCard, ScreenHeading } from "@/components/demo/parts";
import type { DemoGuideContent } from "@/data/demo-guide";

export function ContactsScreen({
  content,
  onDemoAction,
}: {
  content: DemoGuideContent;
  onDemoAction: (target: string) => void;
}) {
  const { contacts, structure } = content;

  return (
    <div>
      <ScreenHeading
        eyebrow={contacts.eyebrow}
        title={contacts.title}
        intro={contacts.intro}
      />

      <DemoCard className="rounded-2xl border border-line bg-paper p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-ivory">
            {contacts.host.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-forest">
              {contacts.host.name}
            </p>
            <p className="text-[11px] text-muted">{contacts.host.role}</p>
          </div>
          <Sparkles
            aria-hidden="true"
            className="ml-auto h-4 w-4 text-copper"
          />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          {contacts.host.note}
        </p>
      </DemoCard>

      <div className="mt-3 space-y-2">
        <button
          type="button"
          onClick={() => onDemoAction("call")}
          className="flex w-full items-center gap-3 rounded-2xl bg-forest px-4 py-3.5 text-left text-ivory transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          <span className="text-[13px] font-semibold">
            {contacts.actions.call}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onDemoAction("email")}
          className="flex w-full items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5 text-left text-forest transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
          <span className="text-[13px] font-semibold">
            {contacts.actions.email}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onDemoAction("directions")}
          className="flex w-full items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5 text-left text-forest transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Navigation aria-hidden="true" className="h-4 w-4" />
          <span className="text-[13px] font-semibold">
            {contacts.actions.directions}
          </span>
        </button>
      </div>

      <h4 className="mt-5 mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-forest/70 uppercase">
        {contacts.faqTitle}
      </h4>
      <div className="space-y-2">
        {contacts.faq.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-line bg-paper px-3.5 py-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-medium text-forest [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <DemoDisclaimer text={structure.disclaimer} />
    </div>
  );
}
