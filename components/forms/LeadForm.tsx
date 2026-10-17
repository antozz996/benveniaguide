"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import {
  formatZodErrors,
  leadFormSchema,
  structureTypeOptions,
  type LeadFormValues,
} from "@/lib/validation";
import {
  ANALYTICS_EVENTS,
  getStoredUtmParams,
  trackEvent,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";
type DeliveryMode = "email" | "dev" | null;

const initialValues: LeadFormValues = {
  name: "",
  structureName: "",
  email: "",
  structureType: "beb",
  website: "",
  message: "",
  privacy: false as unknown as true,
};

const fieldBase =
  "w-full rounded-2xl border bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/60 focus:outline-none";

export function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<DeliveryMode>(null);
  const parent = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number>(0);
  const startTracked = useRef(false);
  const formStarted = useRef(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const reportFormStart = useCallback(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    trackEvent(ANALYTICS_EVENTS.leadFormStart, { form: "lead_demo" });
  }, []);

  const update = <K extends keyof LeadFormValues>(
    key: K,
    value: LeadFormValues[K],
  ) => {
    if (!formStarted.current) {
      formStarted.current = true;
      reportFormStart();
    }
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const parsed = leadFormSchema.safeParse(values);
    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      setFieldErrors(errors);
      setStatus("error");
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const field = parent.current?.querySelector<HTMLElement>(
          `[name="${firstKey}"]`,
        );
        field?.focus();
      }
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    trackEvent(ANALYTICS_EVENTS.leadFormSubmit, { form: "lead_demo" });

    const honeypotInput = parent.current?.querySelector<HTMLInputElement>(
      'input[name="fax"]',
    );

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          honeypot: honeypotInput?.value ?? "",
          elapsedMs: Math.max(0, Date.now() - mountedAt.current),
          utm: getStoredUtmParams() ?? undefined,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        delivery?: DeliveryMode;
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setFieldErrors(result?.fieldErrors ?? {});
        setGeneralError(
          result?.error ??
            "Qualcosa non ha funzionato. Riprova tra qualche minuto.",
        );
        return;
      }

      setDelivery(result.delivery ?? "email");
      setStatus("success");
      trackEvent(ANALYTICS_EVENTS.leadFormSuccess, {
        form: "lead_demo",
        delivery: result.delivery ?? "email",
      });
    } catch {
      setStatus("error");
      setGeneralError(
        "Connessione non disponibile. Controlla la rete e riprova.",
      );
    }
  };

  const reset = () => {
    setValues(initialValues);
    setFieldErrors({});
    setGeneralError(null);
    setStatus("idle");
    setDelivery(null);
    mountedAt.current = Date.now();
    startTracked.current = false;
    formStarted.current = false;
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
          Richiesta ricevuta, grazie!
        </h2>
        {delivery === "dev" ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <strong className="font-medium text-charcoal">
              Modalità sviluppo:
            </strong>{" "}
            la richiesta è stata validata correttamente ma l&apos;email non è
            stata inviata, perché il servizio di invio non è ancora
            configurato (variabili RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO,
            LEAD_EMAIL_FROM). Prima del lancio pubblico l&apos;invio reale deve
            essere configurato e testato.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ti ricontatteremo al più presto all&apos;indirizzo indicato per
            fissare una call breve e senza impegno. Se serve modificare
            qualcosa, puoi rispondere direttamente alla nostra email.
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:border-forest/60"
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form
      ref={parent}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Modulo di richiesta demo"
      className="rounded-[2rem] border border-line bg-paper p-7 shadow-soft sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-name"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Nome e cognome
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "lead-name-error" : undefined}
            className={cn(
              fieldBase,
              fieldErrors.name ? "border-copper-700" : "border-line",
            )}
            placeholder="Maria Rossi"
          />
          {fieldErrors.name ? (
            <p id="lead-name-error" className="mt-1.5 text-xs text-copper-700">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="lead-structure"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Nome della struttura
          </label>
          <input
            id="lead-structure"
            name="structureName"
            type="text"
            autoComplete="organization"
            required
            value={values.structureName}
            onChange={(event) => update("structureName", event.target.value)}
            aria-invalid={Boolean(fieldErrors.structureName)}
            aria-describedby={
              fieldErrors.structureName ? "lead-structure-error" : undefined
            }
            className={cn(
              fieldBase,
              fieldErrors.structureName ? "border-copper-700" : "border-line",
            )}
            placeholder="B&B Vista Lago"
          />
          {fieldErrors.structureName ? (
            <p
              id="lead-structure-error"
              className="mt-1.5 text-xs text-copper-700"
            >
              {fieldErrors.structureName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="lead-email"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "lead-email-error" : undefined}
            className={cn(
              fieldBase,
              fieldErrors.email ? "border-copper-700" : "border-line",
            )}
            placeholder="maria@struttura.it"
          />
          {fieldErrors.email ? (
            <p id="lead-email-error" className="mt-1.5 text-xs text-copper-700">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="lead-structure-type"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Tipologia di struttura
          </label>
          <select
            id="lead-structure-type"
            name="structureType"
            required
            value={values.structureType}
            onChange={(event) =>
              update(
                "structureType",
                event.target.value as LeadFormValues["structureType"],
              )
            }
            aria-invalid={Boolean(fieldErrors.structureType)}
            aria-describedby={
              fieldErrors.structureType ? "lead-structure-type-error" : undefined
            }
            className={cn(
              fieldBase,
              "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%23202827%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10",
              fieldErrors.structureType ? "border-copper-700" : "border-line",
            )}
          >
            {structureTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.structureType ? (
            <p
              id="lead-structure-type-error"
              className="mt-1.5 text-xs text-copper-700"
            >
              {fieldErrors.structureType}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="lead-website"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Sito web della struttura{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
          </label>
          <input
            id="lead-website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
            aria-invalid={Boolean(fieldErrors.website)}
            aria-describedby={
              fieldErrors.website ? "lead-website-error" : undefined
            }
            className={cn(
              fieldBase,
              fieldErrors.website ? "border-copper-700" : "border-line",
            )}
            placeholder="https://www.latastruttura.it"
          />
          {fieldErrors.website ? (
            <p
              id="lead-website-error"
              className="mt-1.5 text-xs text-copper-700"
            >
              {fieldErrors.website}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="lead-message"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Messaggio{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? "lead-message-error" : undefined
            }
            className={cn(
              fieldBase,
              "resize-y",
              fieldErrors.message ? "border-copper-700" : "border-line",
            )}
            placeholder="Raccontaci in due righe la tua struttura e cosa vorresti comunicare agli ospiti."
          />
          {fieldErrors.message ? (
            <p id="lead-message-error" className="mt-1.5 text-xs text-copper-700">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Campo trappola antispam: invisibile agli utenti, ignorato dagli screen reader. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lead-fax">Non compilare questo campo</label>
        <input id="lead-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            checked={Boolean(values.privacy)}
            onChange={(event) =>
              update("privacy", event.target.checked as unknown as true)
            }
            aria-invalid={Boolean(fieldErrors.privacy)}
            aria-describedby={
              fieldErrors.privacy ? "lead-privacy-error" : undefined
            }
            className="mt-0.5 h-5 w-5 shrink-0 rounded accent-forest"
          />
          <span className="text-sm leading-relaxed text-muted">
            Ho preso visione dell&apos;{" "}
            <a
              href="/privacy"
              className="text-forest underline underline-offset-2"
            >
              informativa privacy
            </a>{" "}
            e acconsento al trattamento dei dati per essere ricontattato in
            merito alla mia richiesta.
          </span>
        </label>
        {fieldErrors.privacy ? (
          <p id="lead-privacy-error" className="mt-1.5 text-xs text-copper-700">
            {fieldErrors.privacy}
          </p>
        ) : null}
      </div>

      {generalError ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-copper/50 bg-copper/10 px-4 py-3.5"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-copper-700"
          />
          <p className="text-sm text-charcoal">{generalError}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          Usiamo i tuoi dati solo per rispondere alla richiesta. Nessuna
          cessione a terzi, nessuna iscrizione automatica a comunicazioni
          commerciali.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-medium text-ivory shadow-soft transition-colors hover:bg-forest-700 disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Invio in corso…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              Invia la richiesta
            </>
          )}
        </button>
      </div>
    </form>
  );
}
