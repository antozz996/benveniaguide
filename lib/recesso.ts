import { z } from "zod";

/**
 * Recesso del consumatore (/recesso, art. 54-bis Codice del Consumo).
 * Nessun salvataggio su database: la richiesta arriva al team via email e il
 * cliente riceve la conferma con data e ora da /api/recesso.
 */

/** Modulo di recesso tipo: identico in /condizioni (punto 9) e in /recesso. */
export const withdrawalFormLines = [
  "Destinatario: Antonio Avella, Benvenia Guide, info@benveniaguide.it",
  "Con la presente io/noi notifico/notifichiamo il recesso dal mio/nostro contratto per la prestazione del seguente servizio: guida digitale per gli ospiti, pacchetto [ ], struttura [ ]",
  "Ordinato il: [ ]",
  "Nome del/dei consumatore/i: [ ]",
  "Indirizzo del/dei consumatore/i: [ ]",
  "Data: [ ]",
];

const recessoFields = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Inserisci nome e cognome.")
    .max(120, "Massimo 120 caratteri."),
  order: z
    .string()
    .trim()
    .min(2, "Inserisci il nome della struttura o il numero d'ordine.")
    .max(160, "Massimo 160 caratteri."),
  email: z
    .email("Inserisci un indirizzo email valido.")
    .trim()
    .max(160, "Massimo 160 caratteri."),
  orderDate: z
    .union([
      z.literal(""),
      z.iso.date("Inserisci una data valida."),
    ])
    .default(""),
  message: z.string().trim().max(2000, "Massimo 2000 caratteri.").default(""),
});

/** Schema dei campi visibili (validazione client e server). */
export const recessoFormSchema = recessoFields;
export type RecessoFormValues = z.input<typeof recessoFormSchema>;

/** Schema ricevuto dall'API, con i metadati antispam. */
export const recessoRequestSchema = recessoFields.extend({
  honeypot: z.string().max(500).optional().default(""),
  elapsedMs: z.number().int().min(0).max(86_400_000).optional().default(0),
});
export type RecessoRequest = z.output<typeof recessoRequestSchema>;

export function formatRecessoErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "form";
    if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/** Data e ora di ricezione in ora italiana, es. "17/11/2026" e "14:05". */
export function formatReceivedAt(date: Date): { day: string; time: string } {
  const zone = { timeZone: "Europe/Rome" } as const;
  return {
    day: new Intl.DateTimeFormat("it-IT", {
      ...zone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("it-IT", {
      ...zone,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}
