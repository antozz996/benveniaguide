import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-sage-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-[-12%] h-72 w-72 rounded-full bg-copper/10 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <Breadcrumbs items={crumbs} />
          <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-copper-700 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-balance mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-semibold tracking-tight text-forest sm:text-5xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
