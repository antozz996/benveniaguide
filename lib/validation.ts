import { z } from "zod";

export const structureTypeIds = [
  "beb",
  "casa-vacanza",
  "boutique-hotel",
  "hotel",
  "property-manager",
  "altro",
] as const;

export type StructureTypeId = (typeof structureTypeIds)[number];

export const structureTypeOptions: {
  value: StructureTypeId;
  label: string;
}[] = [
  { value: "beb", label: "B&B" },
  { value: "casa-vacanza", label: "Casa vacanza / affitto breve" },
  { value: "boutique-hotel", label: "Boutique hotel" },
  { value: "hotel", label: "Hotel indipendente" },
  { value: "property-manager", label: "Property manager" },
  { value: "altro", label: "Altro" },
];

const nameField = z
  .string()
  .trim()
  .min(2, "Inserisci almeno 2 caratteri.")
  .max(80, "Massimo 80 caratteri.");

const structureField = z
  .string()
  .trim()
  .min(2, "Inserisci il nome della struttura.")
  .max(120, "Massimo 120 caratteri.");

const emailField = z
  .email("Inserisci un indirizzo email valido.")
  .max(160, "Massimo 160 caratteri.");

const websiteField = z
  .union([z.literal(""), z.url("Inserisci un indirizzo valido (es. https://…).")])
  .transform((value) => value as string);

const messageField = z
  .string()
  .trim()
  .max(1200, "Massimo 1200 caratteri.");

/** Schema dei campi visibili nel form (validazione client e server). */
export const leadFormSchema = z.object({
  name: nameField,
  structureName: structureField,
  email: emailField,
  structureType: z.enum(structureTypeIds, {
    message: "Seleziona la tipologia della struttura.",
  }),
  website: websiteField,
  message: messageField,
  privacy: z.literal(true, {
    message: "Per inviare la richiesta devi prendere visione dell'informativa.",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

/** Schema completo ricevuto dall'API, con metadati antispam e UTM. */
export const leadRequestSchema = leadFormSchema.extend({
  honeypot: z.string().max(500).optional().default(""),
  elapsedMs: z.number().int().min(0).max(86_400_000).optional().default(0),
  utm: z.record(z.string(), z.string().max(200)).optional(),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;

export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in fieldErrors)) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}
