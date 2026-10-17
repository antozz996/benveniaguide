import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth/dal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "La tua area",
  description: "Area riservata di Benvenia Guide.",
  path: "/area",
  noIndex: true,
});

export default function AreaPage() {
  return (
    <Suspense fallback={<AreaContentSkeleton />}>
      <AreaContent />
    </Suspense>
  );
}

function AreaContentSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-72 animate-pulse rounded-[2rem] border border-line bg-paper"
    />
  );
}

async function AreaContent() {
  const user = await getCurrentUser();

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
        <h1 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
          {user.name ? `Ciao, ${user.name}` : "Ciao"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Questa è la tua area riservata. Da qui potrai modificare i contenuti
          della tua Guest Guide: benvenuto, soggiorno, territorio e contatti.
        </p>
        <p className="mt-6 rounded-2xl border border-dashed border-forest/20 bg-ivory px-4 py-3.5 text-sm text-muted">
          L&apos;editor guidato della guida è in preparazione: sarà attivo qui
          a breve.
        </p>
      </div>

      <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-forest">
          Il tuo account
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="mt-0.5 font-medium text-charcoal break-all">
              {user.email}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Ruolo</dt>
            <dd className="mt-0.5 font-medium text-charcoal">
              {user.role === "admin" ? "Amministratore" : "Cliente"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
