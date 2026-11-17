import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { ModuloForm } from "@/components/forms/ModuloForm";
import { buildMetadata } from "@/lib/metadata";

/**
 * Modulo struttura per i clienti (link inviato in privato, con ?pacchetto=).
 * Pagina noindex (meta + X-Robots-Tag in next.config.ts), fuori dalla
 * sitemap e senza GA4 (vedi isUntrackedPath in lib/analytics.ts).
 */
export const metadata: Metadata = buildMetadata({
  title: "Dati della tua struttura",
  description:
    "Il modulo con cui ci racconti la tua struttura: con queste informazioni scriviamo la guida per i tuoi ospiti.",
  path: "/modulo",
  noIndex: true,
});

export default function ModuloPage() {
  return (
    <>
      <PageHero
        eyebrow="Modulo struttura"
        title={
          <>
            Raccontaci la tua{" "}
            <em className="font-serif font-medium italic">struttura</em>.
          </>
        }
        lead="Bastano circa 15 minuti. Con queste informazioni scriviamo la guida per i tuoi ospiti e te la mandiamo da approvare entro 48 ore."
        crumbs={[{ label: "Home", href: "/" }, { label: "Modulo struttura" }]}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ModuloForm />
          </div>
        </Container>
      </section>
    </>
  );
}
