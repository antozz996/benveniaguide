"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  Plus,
  Send,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import {
  emptyPlace,
  formatModuloErrors,
  isModuloPackageId,
  MAX_PLACES,
  MIN_PLACES,
  moduloFormSchema,
  moduloPackageOptions,
  placeCategoryOptions,
  settingOptions,
  type ModuloFormData,
  type ModuloPackageId,
  type ModuloPlace,
} from "@/lib/modulo";
import { MULTI_MIN_STRUCTURES } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";
type DeliveryMode = "email" | "dev" | null;

/** Stato del form: tutto testo (zod valida enum e formati all'invio). */
type FormState = {
  [K in keyof ModuloFormData]: K extends "places"
    ? ModuloPlace[]
    : K extends "privacy"
      ? boolean
      : string;
};
type TextKey = Exclude<keyof FormState, "places" | "privacy">;

const initialValues: FormState = {
  package: "",
  structuresCount: "",
  structureName: "",
  location: "",
  tagline: "",
  welcomeMessage: "",
  signature: "",
  setting: "",
  english: "",
  checkinTime: "",
  checkinDetail: "",
  checkoutTime: "",
  checkoutDetail: "",
  wifiNetwork: "",
  wifiPassword: "",
  wifiNote: "",
  parking: "",
  breakfast: "",
  services: "",
  waste: "",
  rules: "",
  hostContact: "",
  guestPhone: "",
  guestEmail: "",
  propertyMapsUrl: "",
  contactPreference: "",
  usefulNumbers: "",
  faq: "",
  places: Array.from({ length: MIN_PLACES }, () => ({ ...emptyPlace })),
  billingName: "",
  taxCode: "",
  billingAddress: "",
  withholdingAgent: "",
  clientEmail: "",
  slug: "",
  notes: "",
  privacy: false,
};

const fieldBase =
  "w-full rounded-2xl border bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/60 focus:outline-none";

const selectBase =
  "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%23202827%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10";

const sectionClass =
  "rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8";
const headingClass = "font-display text-lg font-semibold text-forest";

const yesNoOptions = [
  { value: "si", label: "Sì" },
  { value: "no", label: "No" },
] as const;

/** Legge `?pacchetto=base|completa|multi` dal link mandato al cliente. */
function PackageFromUrl({
  onPackage,
}: {
  onPackage: (value: ModuloPackageId) => void;
}) {
  const param = useSearchParams().get("pacchetto");
  useEffect(() => {
    if (isModuloPackageId(param)) onPackage(param);
  }, [param, onPackage]);
  return null;
}

interface FieldOptions {
  label: string;
  hint?: string;
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "email" | "url" | "tel" | "number";
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}

export function ModuloForm() {
  const [values, setValues] = useState<FormState>(initialValues);
  const packageTouched = useRef(false);
  const applyUrlPackage = useCallback((value: ModuloPackageId) => {
    if (packageTouched.current) return;
    setValues((current) => ({ ...current, package: value }));
  }, []);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<DeliveryMode>(null);
  const parent = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const update = (key: TextKey, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const updatePlace = (
    index: number,
    key: keyof ModuloPlace,
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      places: current.places.map((place, i) =>
        i === index ? { ...place, [key]: value } : place,
      ),
    }));

  const addPlace = () =>
    setValues((current) =>
      current.places.length >= MAX_PLACES
        ? current
        : { ...current, places: [...current.places, { ...emptyPlace }] },
    );

  const removePlace = (index: number) => {
    setValues((current) =>
      current.places.length <= MIN_PLACES
        ? current
        : {
            ...current,
            places: current.places.filter((_, i) => i !== index),
          },
    );
    // Gli errori dei luoghi sono indicizzati: si ricalcolano al prossimo invio.
    setFieldErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(([key]) => !key.startsWith("places.")),
      ),
    );
  };

  const focusFirstError = (errors: Record<string, string>) => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;
    parent.current
      ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
      ?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const parsed = moduloFormSchema.safeParse(values);
    if (!parsed.success) {
      const errors = formatModuloErrors(parsed.error);
      setFieldErrors(errors);
      setStatus("error");
      setGeneralError("Controlla i campi evidenziati e riprova.");
      focusFirstError(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    const honeypotInput = parent.current?.querySelector<HTMLInputElement>(
      'input[name="fax"]',
    );

    try {
      const response = await fetch("/api/modulo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          honeypot: honeypotInput?.value ?? "",
          elapsedMs: Math.max(0, Date.now() - mountedAt.current),
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        delivery?: DeliveryMode;
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (!response.ok || !result?.ok) {
        const errors = result?.fieldErrors ?? {};
        setStatus("error");
        setFieldErrors(errors);
        setGeneralError(
          result?.error ??
            "Qualcosa non ha funzionato. Riprova tra qualche minuto.",
        );
        focusFirstError(errors);
        return;
      }

      setDelivery(result.delivery ?? "email");
      setStatus("success");
      window.scrollTo({ top: 0 });
    } catch {
      setStatus("error");
      setGeneralError(
        "Connessione non disponibile. Controlla la rete e riprova.",
      );
    }
  };

  const errorText = (key: string, id: string) =>
    fieldErrors[key] ? (
      <p id={id} className="mt-1.5 text-xs text-copper-700">
        {fieldErrors[key]}
      </p>
    ) : null;

  const describedBy = (key: string, id: string, hintId?: string) =>
    [hintId, fieldErrors[key] ? `${id}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  /** Campo di testo o area di testo collegato a una chiave dello stato. */
  const field = (
    key: string,
    value: string,
    onChange: (value: string) => void,
    options: FieldOptions,
  ) => {
    const id = `modulo-${key.replace(/\./g, "-")}`;
    const hintId = options.hint ? `${id}-hint` : undefined;
    const common = {
      id,
      name: key,
      value,
      required: !options.optional,
      placeholder: options.placeholder,
      "aria-invalid": Boolean(fieldErrors[key]),
      "aria-describedby": describedBy(key, id, hintId),
      className: cn(
        fieldBase,
        options.multiline && "resize-y",
        fieldErrors[key] ? "border-copper-700" : "border-line",
      ),
    };
    return (
      <div className={options.className}>
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          {options.label}
          {options.optional ? (
            <span className="font-normal text-muted"> (facoltativo)</span>
          ) : null}
        </label>
        {options.multiline ? (
          <textarea
            {...common}
            rows={options.rows ?? 3}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            {...common}
            type={options.type ?? "text"}
            inputMode={options.inputMode}
            autoComplete={options.autoComplete ?? "off"}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        {options.hint ? (
          <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-muted">
            {options.hint}
          </p>
        ) : null}
        {errorText(key, `${id}-error`)}
      </div>
    );
  };

  const text = (key: TextKey, options: FieldOptions) =>
    field(key, values[key], (value) => update(key, value), options);

  /** Gruppo di scelte (radio) con target touch di almeno 44 px. */
  const choice = (
    key: TextKey,
    label: string,
    options: readonly { value: string; label: string }[],
    className?: string,
  ) => {
    const id = `modulo-${key}`;
    return (
      <fieldset
        className={className}
        aria-invalid={Boolean(fieldErrors[key])}
        aria-describedby={fieldErrors[key] ? `${id}-error` : undefined}
      >
        <legend className="mb-1.5 block text-sm font-medium text-charcoal">
          {label}
        </legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors has-[:checked]:border-forest has-[:checked]:bg-sage-100 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-forest",
                fieldErrors[key] ? "border-copper-700" : "border-line",
              )}
            >
              <input
                type="radio"
                name={key}
                value={option.value}
                checked={values[key] === option.value}
                onChange={() => update(key, option.value)}
                className="h-4 w-4 accent-forest"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errorText(key, `${id}-error`)}
      </fieldset>
    );
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[2rem] border border-line bg-paper p-7 shadow-soft sm:p-9"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-forest" />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold text-forest">
          Modulo ricevuto
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal">
          Grazie! Scriviamo la tua guida e te la mandiamo da approvare entro 48
          ore. Dopo la tua approvazione ricevi in privato le istruzioni di
          pagamento e la ricevuta.
        </p>
        {delivery === "dev" ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <strong className="font-medium text-charcoal">
              Modalità sviluppo:
            </strong>{" "}
            il modulo è stato validato ma l&apos;email non è stata inviata,
            perché il servizio di invio non è configurato (RESEND_API_KEY,
            LEAD_NOTIFY_EMAIL_TO, LEAD_EMAIL_FROM).
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Se ti accorgi di aver dimenticato qualcosa, rispondi alla nostra
            email o scrivi a{" "}
            <a
              href="mailto:info@benveniaguide.it"
              className="font-medium text-forest underline underline-offset-2"
            >
              info@benveniaguide.it
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      ref={parent}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Modulo dati della struttura"
      className="space-y-6"
    >
      <Suspense fallback={null}>
        <PackageFromUrl onPackage={applyUrlPackage} />
      </Suspense>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          1. La struttura
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className={values.package === "multi" ? undefined : "sm:col-span-2"}>
            <label
              htmlFor="modulo-package"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Pacchetto scelto
            </label>
            <select
              id="modulo-package"
              name="package"
              required
              value={values.package}
              onChange={(event) => {
                packageTouched.current = true;
                update("package", event.target.value);
              }}
              aria-invalid={Boolean(fieldErrors.package)}
              aria-describedby={describedBy("package", "modulo-package")}
              className={cn(
                fieldBase,
                selectBase,
                fieldErrors.package ? "border-copper-700" : "border-line",
              )}
            >
              <option value="" disabled>
                Seleziona…
              </option>
              {moduloPackageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errorText("package", "modulo-package-error")}
          </div>
          {values.package === "multi"
            ? text("structuresCount", {
                label: "Numero di strutture",
                type: "number",
                inputMode: "numeric",
                placeholder: `Da ${MULTI_MIN_STRUCTURES} in su`,
                hint: "Compila un modulo per ogni struttura.",
              })
            : null}
          {text("structureName", {
            label: "Nome della struttura",
            autoComplete: "organization",
            placeholder: "B&B Vista Lago",
          })}
          {text("location", {
            label: "Località",
            placeholder: "Bardolino, Lago di Garda",
            hint: "Comune e zona.",
          })}
          {text("tagline", {
            label: "Frase di presentazione",
            optional: true,
            className: "sm:col-span-2",
            hint: "Una riga, es. «Tre camere sul lago, a due passi dal porto».",
          })}
          {text("welcomeMessage", {
            label: "Messaggio di benvenuto per gli ospiti",
            multiline: true,
            rows: 4,
            className: "sm:col-span-2",
            hint: "2-4 frasi, con il tono che usi di solito con i tuoi ospiti.",
          })}
          {text("signature", {
            label: "Firma",
            placeholder: "Giulia e Marco",
          })}
          {choice("english", "Vuoi la guida anche in inglese?", yesNoOptions)}
          {choice(
            "setting",
            "Ambientazione prevalente",
            settingOptions,
            "sm:col-span-2",
          )}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          2. Il soggiorno
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {text("checkinTime", {
            label: "Orario di check-in",
            placeholder: "15:00-20:00",
          })}
          {text("checkoutTime", {
            label: "Orario di check-out",
            placeholder: "entro le 10:30",
          })}
          {text("checkinDetail", {
            label: "Come avviene il check-in",
            multiline: true,
            className: "sm:col-span-2",
            hint: "Accoglienza di persona, self check-in, dove si trovano le chiavi. Non scrivere codici della porta o della keybox: li comunichi tu agli ospiti.",
          })}
          {text("checkoutDetail", {
            label: "Istruzioni per il check-out",
            multiline: true,
            className: "sm:col-span-2",
            hint: "Dove lasciare le chiavi, rifiuti, cosa fare prima di partire.",
          })}
          {text("wifiNetwork", { label: "Nome della rete Wi-Fi" })}
          {text("wifiPassword", {
            label: "Password del Wi-Fi",
            hint: "Comparirà nella guida, che non è indicizzata dai motori di ricerca.",
          })}
          {text("wifiNote", {
            label: "Note sul Wi-Fi",
            optional: true,
            className: "sm:col-span-2",
            placeholder: "Router in soggiorno, copertura anche in giardino",
          })}
          {text("parking", {
            label: "Parcheggio",
            multiline: true,
            className: "sm:col-span-2",
            hint: "Dove, gratuito o a pagamento, ZTL, garage.",
          })}
          {text("breakfast", {
            label: "Colazione",
            optional: true,
            multiline: true,
            className: "sm:col-span-2",
            hint: "Inclusa? Orari e dove.",
          })}
          {text("services", {
            label: "Altri servizi e orari",
            optional: true,
            multiline: true,
            className: "sm:col-span-2",
            hint: "Piscina, aria condizionata, lavatrice, biancheria, bici.",
          })}
          {text("waste", {
            label: "Raccolta differenziata",
            optional: true,
            multiline: true,
            className: "sm:col-span-2",
            hint: "Come si divide e dove si butta.",
          })}
          {text("rules", {
            label: "Regole della casa",
            multiline: true,
            rows: 4,
            className: "sm:col-span-2",
            hint: "Una per riga: fumo, animali, silenzio, ospiti esterni, feste.",
          })}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          3. Contatti per gli ospiti
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {text("hostContact", {
            label: "Nome e ruolo del referente",
            placeholder: "Giulia, host",
          })}
          {text("guestPhone", {
            label: "Telefono / WhatsApp per gli ospiti",
            type: "tel",
            inputMode: "tel",
            placeholder: "+39 333 123 4567",
          })}
          {text("guestEmail", {
            label: "Email per gli ospiti",
            type: "email",
            optional: true,
            placeholder: "ciao@vistalago.it",
          })}
          {text("propertyMapsUrl", {
            label: "Link Google Maps della struttura",
            type: "url",
            inputMode: "url",
            placeholder: "https://maps.app.goo.gl/…",
          })}
          {text("contactPreference", {
            label: "Quando e come preferisci essere contattato",
            optional: true,
            className: "sm:col-span-2",
            placeholder: "WhatsApp dalle 8 alle 21, chiamate solo per urgenze",
          })}
          {text("usefulNumbers", {
            label: "Numeri utili",
            optional: true,
            multiline: true,
            className: "sm:col-span-2",
            hint: "Guardia medica, farmacia, taxi.",
          })}
          {text("faq", {
            label: "Domande che gli ospiti fanno sempre (con la risposta)",
            optional: true,
            multiline: true,
            rows: 4,
            className: "sm:col-span-2",
          })}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          4. Luoghi consigliati
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Da {MIN_PLACES} a {MAX_PLACES} posti che consiglieresti a un amico:
          cosa vedere, dove mangiare, esperienze da fare.
        </p>
        {errorText("places", "modulo-places-error")}
        <ol className="mt-5 space-y-5">
          {values.places.map((place, index) => (
            <li
              key={index}
              className="rounded-2xl border border-line bg-ivory/60 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-forest">
                  Luogo {index + 1}
                </h3>
                {values.places.length > MIN_PLACES ? (
                  <button
                    type="button"
                    onClick={() => removePlace(index)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-copper-700 hover:bg-copper/10"
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                    Rimuovi<span className="sr-only"> il luogo {index + 1}</span>
                  </button>
                ) : null}
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {field(
                  `places.${index}.name`,
                  place.name,
                  (value) => updatePlace(index, "name", value),
                  { label: `Nome del luogo ${index + 1}` },
                )}
                <div>
                  <label
                    htmlFor={`modulo-places-${index}-category`}
                    className="mb-1.5 block text-sm font-medium text-charcoal"
                  >
                    Categoria del luogo {index + 1}
                  </label>
                  <select
                    id={`modulo-places-${index}-category`}
                    name={`places.${index}.category`}
                    value={place.category}
                    onChange={(event) =>
                      updatePlace(index, "category", event.target.value)
                    }
                    className={cn(fieldBase, selectBase, "border-line")}
                  >
                    {placeCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {field(
                  `places.${index}.description`,
                  place.description,
                  (value) => updatePlace(index, "description", value),
                  {
                    label: `Perché andarci (luogo ${index + 1})`,
                    multiline: true,
                    rows: 2,
                    className: "sm:col-span-2",
                    hint: "Distanza dalla struttura, cosa lo rende speciale, un consiglio pratico.",
                  },
                )}
                {field(
                  `places.${index}.mapsUrl`,
                  place.mapsUrl,
                  (value) => updatePlace(index, "mapsUrl", value),
                  {
                    label: `Link Google Maps (luogo ${index + 1})`,
                    optional: true,
                    type: "url",
                    inputMode: "url",
                    className: "sm:col-span-2",
                  },
                )}
              </div>
            </li>
          ))}
        </ol>
        {values.places.length < MAX_PLACES ? (
          <button
            type="button"
            onClick={addPlace}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 text-sm font-medium text-forest transition-colors hover:border-forest/60"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
            Aggiungi un luogo
          </button>
        ) : null}
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          5. Dati per la ricevuta
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Servono per intestare la ricevuta. Il pagamento si fa solo dopo che
          hai approvato la guida: le istruzioni arrivano in privato.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {text("billingName", {
            label: "Nome e cognome o ragione sociale",
            autoComplete: "name",
          })}
          {text("taxCode", {
            label: "Codice fiscale o partita IVA",
            autoComplete: "off",
          })}
          {text("billingAddress", {
            label: "Indirizzo",
            autoComplete: "street-address",
            className: "sm:col-span-2",
            placeholder: "Via Roma 1, 37011 Bardolino (VR)",
          })}
          {text("clientEmail", {
            label: "La tua email",
            type: "email",
            autoComplete: "email",
            hint: "Qui ti mandiamo la guida da approvare e la ricevuta.",
          })}
          {choice(
            "withholdingAgent",
            "Sei sostituto d'imposta?",
            yesNoOptions,
          )}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Sostituto d&apos;imposta: di solito società o ditte con dipendenti. Se
          sei un privato o non sei sicuro, scegli «No» e ne parliamo noi.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>
          6. Ultime cose
        </h2>
        <div className="mt-5 grid gap-5">
          {text("slug", {
            label: "Indirizzo desiderato della guida",
            optional: true,
            placeholder: "casa-del-borgo",
            hint: "Diventerà benveniaguide.it/g/casa-del-borgo. Se lo lasci vuoto, lo scegliamo noi.",
          })}
          {text("notes", {
            label: "Note",
            optional: true,
            multiline: true,
            hint: "Altro da sapere. Le foto puoi mandarcele rispondendo alla nostra email.",
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-ivory p-4 text-xs leading-relaxed text-muted sm:p-5">
          <p className="font-medium text-charcoal">Come usiamo questi dati</p>
          <p className="mt-1.5">
            Titolare del trattamento è Benvenia Guide (info@benveniaguide.it).
            Usiamo i dati del modulo solo per scrivere la tua guida e per
            emettere la ricevuta. Li riceviamo via email tramite il servizio
            Resend e non li salviamo nel database del sito. I dati di contatto
            e del soggiorno compaiono nella guida per i tuoi ospiti; quelli per
            la ricevuta no. Non li cediamo a terzi e puoi chiederne in ogni
            momento la modifica o la cancellazione, salvo quanto serve per gli
            obblighi fiscali. Dettagli nell&apos;{" "}
            <a
              href="/privacy"
              className="text-forest underline underline-offset-2"
            >
              informativa privacy
            </a>
            .
          </p>
        </div>

        <div className="mt-5">
          <label className="flex min-h-11 items-start gap-3">
            <input
              type="checkbox"
              name="privacy"
              checked={values.privacy}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  privacy: event.target.checked,
                }))
              }
              aria-invalid={Boolean(fieldErrors.privacy)}
              aria-describedby={
                fieldErrors.privacy ? "modulo-privacy-error" : undefined
              }
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-forest"
            />
            <span className="text-sm leading-relaxed text-muted">
              Ho letto come vengono usati i dati e acconsento al trattamento
              per la creazione della guida e l&apos;emissione della ricevuta.
            </span>
          </label>
          {errorText("privacy", "modulo-privacy-error")}
        </div>
      </section>

      {/* Campo trappola antispam: invisibile agli utenti, ignorato dagli screen reader. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="modulo-fax">Non compilare questo campo</label>
        <input id="modulo-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {generalError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-copper/50 bg-copper/10 px-4 py-3.5"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-copper-700"
          />
          <p className="text-sm text-charcoal">{generalError}</p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-medium text-ivory shadow-soft transition-colors hover:bg-forest-700 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Invio in corso…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              Invia il modulo
            </>
          )}
        </button>
      </div>
    </form>
  );
}
