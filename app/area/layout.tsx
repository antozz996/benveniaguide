import { Suspense } from "react";
import { AreaNav, AreaNavSkeleton } from "@/components/area/AreaNav";
import { Container } from "@/components/ui/Container";

/**
 * Layout dell'area riservata. Il controllo di sessione avviene dentro
 * AreaNav (e in ogni pagina) dietro un boundary <Suspense>, come da pattern
 * Next 16 + Cache Components. La guardia rapida è nel proxy.
 */
export default function AreaLayout({ children }: LayoutProps<"/area">) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Suspense fallback={<AreaNavSkeleton />}>
          <AreaNav />
        </Suspense>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
