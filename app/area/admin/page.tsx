import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/dal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pannello admin",
  description: "Gestione clienti e inviti di Benvenia Guide.",
  path: "/area/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminContentSkeleton />}>
      <AdminContent />
    </Suspense>
  );
}

function AdminContentSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-72 animate-pulse rounded-[2rem] border border-line bg-paper"
    />
  );
}

async function AdminContent() {
  const admin = await requireAdmin();

  return (
    <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
      <h1 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
        Pannello admin
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Ciao {admin.email}: questo è il pannello amministratore di Benvenia
        Guide.
      </p>
      <p className="mt-6 rounded-2xl border border-dashed border-forest/20 bg-ivory px-4 py-3.5 text-sm text-muted">
        La gestione dei clienti (creazione account, inviti e pubblicazione
        delle guide) sarà attiva qui a breve.
      </p>
    </div>
  );
}
