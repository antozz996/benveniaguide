"use client";

import { useCallback, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  trackEvent,
  type AnalyticsEventName,
} from "@/lib/analytics";
import type { ButtonSize, ButtonVariant } from "@/components/ui/Button";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-ivory shadow-soft hover:bg-forest-700 hover:shadow-lift",
  outline:
    "border border-forest/25 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/5",
  "ghost-dark":
    "border border-ivory/30 bg-transparent text-ivory hover:border-ivory/70 hover:bg-ivory/10",
  light: "bg-ivory text-forest hover:bg-white",
  copper: "bg-copper-700 text-white hover:bg-copper-600",
  quiet: "bg-sage-100 text-forest hover:bg-sage-200",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Nome evento analytics inviato al click (es. "cta_click"). */
  event?: AnalyticsEventName;
  eventParams?: Record<string, unknown>;
}

/**
 * Link CTA con tracciamento analytics opzionale.
 * Il click viene sempre propagato anche se il tracciamento non è attivo.
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  event,
  eventParams,
}: CtaLinkProps) {
  const handleClick = useCallback(() => {
    if (event) trackEvent(event, { ...eventParams, destination: href });
  }, [event, eventParams, href]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
