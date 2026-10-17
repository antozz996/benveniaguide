import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Link non valido",
  description: "Il link di accesso non è valido oppure è scaduto.",
  path: "/accedi/link-non-valido",
  noIndex: true,
});

export default function LinkNonValidoPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-lg rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-forest">
            Link non valido o già usato
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Il link di accesso è scaduto, è stato già utilizzato oppure non è
            corretto. Puoi richiederne uno nuovo: scade dopo 15 minuti e
            funziona una sola volta.
          </p>
          <Button href="/accedi" className="mt-6">
            Richiedi un nuovo link
          </Button>
        </div>
      </Container>
    </section>
  );
}
