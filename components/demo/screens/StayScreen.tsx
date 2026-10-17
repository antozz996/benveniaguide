"use client";

import {
  Bath,
  Car,
  ChevronDown,
  Coffee,
  Copy,
  Recycle,
  Snowflake,
  Waves,
} from "lucide-react";
import { DemoCard, ScreenHeading } from "@/components/demo/parts";
import type { DemoGuideContent, ServiceIcon } from "@/data/demo-guide";

const serviceIcons: Record<ServiceIcon, typeof Coffee> = {
  coffee: Coffee,
  car: Car,
  waves: Waves,
  bath: Bath,
  snowflake: Snowflake,
  recycle: Recycle,
};

export function StayScreen({
  content,
  onDemoAction,
}: {
  content: DemoGuideContent;
  onDemoAction: (target: string) => void;
}) {
  const { stay } = content;

  return (
    <div>
      <ScreenHeading
        eyebrow={stay.eyebrow}
        title={stay.title}
        intro={stay.intro}
      />

      <div className="grid grid-cols-2 gap-2.5">
        <DemoCard className="rounded-2xl border border-line bg-paper p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-copper-700 uppercase">
            {stay.checkin.title}
          </p>
          <p className="mt-1 text-[13px] leading-snug font-semibold text-forest">
            {stay.checkin.time}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            {stay.checkin.detail}
          </p>
        </DemoCard>
        <DemoCard className="rounded-2xl border border-line bg-paper p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-copper-700 uppercase">
            {stay.checkout.title}
          </p>
          <p className="mt-1 text-[13px] leading-snug font-semibold text-forest">
            {stay.checkout.time}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            {stay.checkout.detail}
          </p>
        </DemoCard>
      </div>

      <DemoCard className="mt-2.5 rounded-2xl bg-forest p-4 text-ivory">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-copper uppercase">
          {stay.wifi.title}
        </p>
        <dl className="mt-2.5 space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[11px] text-ivory/70">
              {stay.wifi.networkLabel}
            </dt>
            <dd className="font-mono text-xs font-semibold">
              {stay.wifi.network}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[11px] text-ivory/70">
              {stay.wifi.passwordLabel}
            </dt>
            <dd className="flex items-center gap-2 font-mono text-xs font-semibold">
              {stay.wifi.password}
              <button
                type="button"
                onClick={() => onDemoAction("wifi_copy")}
                className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-ivory/10 text-ivory/80 transition-colors hover:bg-ivory/20 hover:text-ivory"
                aria-label={`Copia ${stay.wifi.passwordLabel.toLowerCase()} (demo)`}
              >
                <Copy aria-hidden="true" className="h-3 w-3" />
              </button>
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-[10px] leading-relaxed text-ivory/60">
          {stay.wifi.note}
        </p>
      </DemoCard>

      <h4 className="mt-5 mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-forest/70 uppercase">
        {stay.servicesTitle}
      </h4>
      <ul className="space-y-2">
        {stay.services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <li
              key={service.id}
              className="flex items-start gap-3 rounded-2xl border border-line bg-paper px-3.5 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-forest">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13px] font-semibold text-forest">
                    {service.name}
                  </p>
                  {service.hours ? (
                    <p className="shrink-0 text-[10px] font-medium text-copper-700">
                      {service.hours}
                    </p>
                  ) : null}
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                  {service.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <h4 className="mt-5 mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-forest/70 uppercase">
        {stay.rulesTitle}
      </h4>
      <p className="mb-2.5 text-[11px] text-muted">{stay.rulesIntro}</p>
      <div className="space-y-2">
        {stay.rules.map((rule) => (
          <details
            key={rule.id}
            className="group rounded-2xl border border-line bg-paper px-3.5 py-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-medium text-forest [&::-webkit-details-marker]:hidden">
              {rule.title}
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              {rule.detail}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
