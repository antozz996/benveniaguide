import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { ctas } from "@/lib/site";

interface CTASectionProps {
  title?: string;
  description?: string;
  note?: string;
}

export function CTASection({
  title = "Pronto a trasformare l'accoglienza in un'esperienza digitale?",
  description = "Raccontaci la tua struttura: ti mostriamo come apparirebbe la tua Guest Guide e come potrebbe accompagnare i tuoi ospiti dal check-in alla partenza.",
  note = "Demo gratuita e senza impegno. Nessun costo nascosto.",
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest px-6 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-copper/20 blur-3xl"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 240 240"
              className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 text-ivory/6"
              fill="none"
            >
              <path
                d="M120 20c-55 0-95 40-95 95v105h50V120a45 45 0 0 1 90 0v100h50V115c0-55-40-95-95-95Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M120 55c-35 0-60 25-60 60v105h35V120a25 25 0 0 1 50 0v100h35V115c0-35-25-60-60-60Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <div className="relative max-w-2xl">
              <h2 className="text-balance font-display text-3xl leading-tight font-semibold tracking-tight text-ivory sm:text-4xl">
                {title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ivory/75 sm:text-lg">
                {description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <CtaLink
                  href={ctas.primary.href}
                  size="lg"
                  variant="light"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "final_demo" }}
                >
                  {ctas.primary.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
                <CtaLink
                  href={ctas.secondary.href}
                  size="lg"
                  variant="ghost-dark"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "final_guide" }}
                >
                  <PlayCircle aria-hidden="true" className="h-4 w-4" />
                  {ctas.secondary.label}
                </CtaLink>
              </div>
              <p className="mt-6 text-sm text-ivory/60">{note}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
