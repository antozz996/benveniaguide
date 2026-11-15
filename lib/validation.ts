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

/** Pacchetti ordinabili dal form (id allineati a `data/pricing.ts`). */
export const packageIds = ["base", "completa", "multi", "non-so"] as const;

export type PackageId = (typeof packageIds)[number];

/** Etichette con prezzo: tenere allineate al listino in `data/pricing.ts`. */
export const packageOptions: { value: PackageId; label: string }[] = [
  { value: "base", label: "Base — €49" },
  { value: "completa", label: "Completa — €79 (offerta lancio €49)" },
  { value: "multi", label: "Multi-struttura — €59 a struttura" },
  { value: "non-so", label: "Non so ancora" },
];

export function isPackageId(value: unknown): value is PackageId {
  return (packageIds as readonly unknown[]).includes(value);
}

export function packageLabel(value: PackageId): string {
  return packageOptions.find((option) => option.value === value)?.label ?? value;
}

/** Il pacchetto Multi-struttura parte da 3 strutture (vedi listino). */
export const MULTI_MIN_STRUCTURES = 3;
export const MULTI_MAX_STRUCTURES = 999;

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

const packageField = z
  .enum(packageIds, { message: "Seleziona il pacchetto." })
  .default("non-so");

/** Numero di strutture come testo del campo; obbligatorio solo per Multi. */
const structuresCountField = z
  .string()
  .trim()
  .max(4, "Inserisci un numero valido.")
  .default("");

const leadFormFields = z.object({
  name: nameField,
  structureName: structureField,
  email: emailField,
  structureType: z.enum(structureTypeIds, {
    message: "Seleziona la tipologia della struttura.",
  }),
  package: packageField,
  structuresCount: structuresCountField,
  website: websiteField,
  message: messageField,
  privacy: z.literal(true, {
    message: "Per inviare la richiesta devi prendere visione dell'informativa.",
  }),
});

function checkStructuresCount(
  data: { package: PackageId; structuresCount: string },
  ctx: z.RefinementCtx,
) {
  if (data.package !== "multi") return;
  const count = /^\d+$/.test(data.structuresCount)
    ? Number(data.structuresCount)
    : NaN;
  if (
    !Number.isInteger(count) ||
    count < MULTI_MIN_STRUCTURES ||
    count > MULTI_MAX_STRUCTURES
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["structuresCount"],
      message: `Il pacchetto Multi-struttura parte da ${MULTI_MIN_STRUCTURES} strutture: indica quante sono.`,
    });
  }
}

/** Schema dei campi visibili nel form (validazione client e server). */
export const leadFormSchema = leadFormFields.superRefine(checkStructuresCount);

export type LeadFormValues = z.infer<typeof leadFormSchema>;

/** Schema completo ricevuto dall'API, con metadati antispam e UTM. */
export const leadRequestSchema = leadFormFields
  .extend({
    honeypot: z.string().max(500).optional().default(""),
    elapsedMs: z.number().int().min(0).max(86_400_000).optional().default(0),
    utm: z.record(z.string(), z.string().max(200)).optional(),
  })
  .superRefine(checkStructuresCount);

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
