import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Accedi alla tua area",
  description:
    "Accedi all'area riservata di Benvenia Guide: inserisci la tua email e riceverai un link di accesso sicuro, senza password.",
  path: "/accedi",
  noIndex: true,
});

export default function AccediPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-semibold tracking-[0.2em] text-copper-700 uppercase">
            Area riservata
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">
            Accedi alla tua area
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            L&apos;area riservata è disponibile per i clienti Benvenia Guide.
            Se non hai ancora un accesso, scrivici dal form contatti.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
