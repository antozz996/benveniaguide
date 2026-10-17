import { Scale } from "lucide-react";

export function DraftNotice() {
  return (
    <div
      role="note"
      className="rounded-2xl border border-copper/50 bg-copper/10 px-5 py-4"
    >
      <div className="flex items-start gap-3.5">
        <Scale aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-copper-700" />
        <div className="text-sm leading-relaxed text-charcoal">
          <p className="font-medium">
            Bozza in attesa di revisione legale.
          </p>
          <p className="mt-1.5">
            Questo testo descrive in modo trasparente come il sito tratta i
            dati, ma non è ancora la versione definitiva: i riferimenti
            societari e i recapiti ufficiali saranno completati e l&apos;intero
            documento sarà revisionato prima del lancio pubblico.
          </p>
        </div>
      </div>
    </div>
  );
}
