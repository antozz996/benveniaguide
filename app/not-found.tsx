import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100">
            <Compass aria-hidden="true" className="h-7 w-7 text-forest" />
          </span>
          <p className="mt-6 font-display text-sm font-semibold tracking-[0.22em] text-copper-700 uppercase">
            Errore 404
          </p>
          <h1 className="text-balance mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
            Questa pagina ha smarrito la strada.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            L&apos;indirizzo che hai aperto non esiste (o non è più qui).
            Nessun problema: torniamo insieme sulla via principale.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <CtaLink href="/">Torna alla home</CtaLink>
            <CtaLink href="/demo" variant="outline">
              Esplora la demo
            </CtaLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Cerchi qualcosa di preciso?{" "}
            <Link
              href="/contatti"
              className="text-forest underline underline-offset-2"
            >
              Scrivici dal modulo contatti
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
