import { z } from "zod";
import { checkStructuresCount } from "@/lib/validation";

/**
 * Modulo struttura (/modulo): i dati per scrivere la guida (BENAA-12) più i
 * dati per la ricevuta. Nessun salvataggio su database: il riepilogo arriva
 * al team via email da /api/modulo.
 * Non chiediamo codici porta o keybox: restano all'host.
 */

/** Pacchetti ordinabili (id allineati a `data/pricing.ts`). */
export const moduloPackageIds = ["base", "completa", "multi"] as const;
export type ModuloPackageId = (typeof moduloPackageIds)[number];

export const moduloPackageOptions: { value: ModuloPackageId; label: string }[] = [
  { value: "base", label: "Base — €49" },
  { value: "completa", label: "Completa — €79 (offerta lancio €49)" },
  { value: "multi", label: "Multi-struttura — €59 a struttura" },
];

export function isModuloPackageId(value: unknown): value is ModuloPackageId {
  return (moduloPackageIds as readonly unknown[]).includes(value);
}

/** Ambientazione della guida (`welcome.heroArt`). */
export const settingOptions = [
  { value: "lago", label: "Lago" },
  { value: "borgo", label: "Borgo" },
  { value: "colline", label: "Colline" },
  { value: "mare", label: "Mare" },
  { value: "citta", label: "Città" },
  { value: "montagna", label: "Montagna" },
] as const;
const settingIds = settingOptions.map((option) => option.value) as [
  (typeof settingOptions)[number]["value"],
  ...(typeof settingOptions)[number]["value"][],
];

/** Gruppi di `explore.groups`. */
export const placeCategoryOptions = [
  { value: "vedere", label: "Cosa vedere" },
  { value: "mangiare", label: "Dove mangiare" },
  { value: "esperienze", label: "Esperienze" },
] as const;
const placeCategoryIds = placeCategoryOptions.map((option) => option.value) as [
  (typeof placeCategoryOptions)[number]["value"],
  ...(typeof placeCategoryOptions)[number]["value"][],
];

export const MIN_PLACES = 5;
export const MAX_PLACES = 10;

const yesNo = z.enum(["si", "no"], { message: "Scegli sì o no." });

const required = (min: number, max: number, message: string) =>
  z
    .string()
    .trim()
    .min(min, message)
    .max(max, `Massimo ${max} caratteri.`);

const optional = (max: number) =>
  z.string().trim().max(max, `Massimo ${max} caratteri.`).default("");

const urlField = z
  .string()
  .trim()
  .max(500, "Massimo 500 caratteri.")
  .pipe(z.url("Inserisci un link valido (es. https://maps.app.goo.gl/…)."));

const optionalUrl = z
  .union([z.literal(""), urlField])
  .default("");

/** Telefono con prefisso internazionale, cifre e spazi (es. +39 333 123 4567). */
const phoneField = z
  .string()
  .trim()
  .regex(
    /^\+\d[\d\s]{7,18}$/,
    "Inserisci il numero con il prefisso, es. +39 333 123 4567.",
  );

/** Codice fiscale (16 caratteri) o partita IVA (11 cifre). */
const taxCodeField = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, "").toUpperCase())
  .pipe(
    z
      .string()
      .regex(
        /^([A-Z0-9]{16}|\d{11})$/,
        "Inserisci un codice fiscale (16 caratteri) o una partita IVA (11 cifre).",
      ),
  );

const placeSchema = z.object({
  name: required(2, 120, "Inserisci il nome del luogo."),
  category: z.enum(placeCategoryIds, { message: "Scegli la categoria." }),
  description: required(
    10,
    600,
    "Scrivi perché andarci (almeno 10 caratteri).",
  ),
  mapsUrl: optionalUrl,
});

export type ModuloPlace = z.infer<typeof placeSchema>;

export const emptyPlace: ModuloPlace = {
  name: "",
  category: "vedere",
  description: "",
  mapsUrl: "",
};

const moduloFields = z.object({
  // 1. Struttura
  package: z.enum(moduloPackageIds, { message: "Seleziona il pacchetto." }),
  structuresCount: z.string().trim().max(4, "Inserisci un numero valido.").default(""),
  structureName: required(2, 120, "Inserisci il nome della struttura."),
  location: required(2, 120, "Indica comune e zona."),
  tagline: optional(140),
  welcomeMessage: required(
    20,
    800,
    "Scrivi un breve messaggio di benvenuto (almeno 20 caratteri).",
  ),
  signature: required(2, 80, "Indica la firma (es. Giulia e Marco)."),
  setting: z.enum(settingIds, { message: "Scegli l'ambientazione." }),
  english: yesNo,

  // 2. Soggiorno
  checkinTime: required(2, 60, "Indica l'orario di check-in."),
  checkinDetail: required(10, 800, "Descrivi come avviene il check-in."),
  checkoutTime: required(2, 60, "Indica l'orario di check-out."),
  checkoutDetail: required(10, 800, "Descrivi cosa fare al check-out."),
  wifiNetwork: required(1, 80, "Indica il nome della rete Wi-Fi."),
  wifiPassword: required(1, 80, "Indica la password del Wi-Fi."),
  wifiNote: optional(200),
  parking: required(5, 800, "Indica dove si parcheggia."),
  breakfast: optional(800),
  services: optional(1200),
  waste: optional(800),
  rules: required(5, 1500, "Scrivi almeno una regola della casa."),

  // 3. Contatti per gli ospiti
  hostContact: required(2, 120, "Indica nome e ruolo del referente."),
  guestPhone: phoneField,
  guestEmail: z
    .union([z.literal(""), z.email("Inserisci un indirizzo email valido.")])
    .default(""),
  propertyMapsUrl: urlField,
  contactPreference: optional(300),
  usefulNumbers: optional(1200),
  faq: optional(2000),

  // 4. Luoghi consigliati
  places: z
    .array(placeSchema)
    .min(MIN_PLACES, `Inserisci almeno ${MIN_PLACES} luoghi.`)
    .max(MAX_PLACES, `Massimo ${MAX_PLACES} luoghi.`),

  // 5. Dati per la ricevuta e recapito
  billingName: required(2, 160, "Inserisci nome e cognome o ragione sociale."),
  taxCode: taxCodeField,
  billingAddress: required(
    8,
    240,
    "Inserisci l'indirizzo completo (via, CAP, comune).",
  ),
  withholdingAgent: yesNo,
  clientEmail: z
    .email("Inserisci un indirizzo email valido.")
    .max(160, "Massimo 160 caratteri."),

  // 6. Chiusura
  slug: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .toLowerCase()
        .regex(
          /^[a-z0-9]+(-[a-z0-9]+)*$/,
          "Solo lettere minuscole, numeri e trattini (es. casa-del-borgo).",
        )
        .max(60, "Massimo 60 caratteri."),
    ])
    .default(""),
  notes: optional(2000),
  privacy: z.literal(true, {
    message: "Per inviare il modulo devi prendere visione dell'informativa.",
  }),
});

/** Schema dei campi visibili (validazione client e server). */
export const moduloFormSchema = moduloFields.superRefine(checkStructuresCount);

export type ModuloFormValues = z.input<typeof moduloFormSchema>;
export type ModuloFormData = z.output<typeof moduloFormSchema>;

/** Schema ricevuto dall'API, con i metadati antispam. */
export const moduloRequestSchema = moduloFields
  .extend({
    honeypot: z.string().max(500).optional().default(""),
    elapsedMs: z.number().int().min(0).max(86_400_000).optional().default(0),
  })
  .superRefine(checkStructuresCount);

export type ModuloRequest = z.output<typeof moduloRequestSchema>;

/**
 * Errori per campo con il path completo (es. "places.2.name"), così ogni
 * luogo mostra il proprio messaggio.
 */
export function formatModuloErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "form";
    if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
