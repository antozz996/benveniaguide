"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import {
  formatRecessoErrors,
  recessoFormSchema,
  type RecessoFormValues,
} from "@/lib/recesso";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";
type DeliveryMode = "email" | "dev" | null;
type FormState = Required<{ [K in keyof RecessoFormValues]: string }>;
type FieldKey = keyof FormState;

const initialValues: FormState = {
  name: "",
  order: "",
  email: "",
  orderDate: "",
  message: "",
};

const fieldBase =
  "w-full rounded-2xl border bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/60 focus:outline-none";

const fields: {
  key: FieldKey;
  label: string;
  type?: "text" | "email" | "date";
  autoComplete?: string;
  optional?: boolean;
  hint?: string;
  multiline?: boolean;
}[] = [
  { key: "name", label: "Nome e cognome", autoComplete: "name" },
  { key: "order", label: "Nome della struttura o numero d'ordine" },
  {
    key: "email",
    label: "Email a cui mandare la conferma",
    type: "email",
    autoComplete: "email",
  },
  { key: "orderDate", label: "Data dell'ordine", type: "date", optional: true },
  {
    key: "message",
    label: "Messaggio",
    optional: true,
    multiline: true,
    hint: "Non serve dare motivi.",
  },
];

export function RecessoForm() {
  const [values, setValues] = useState<FormState>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<DeliveryMode>(null);
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [sentTo, setSentTo] = useState("");
  const parent = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const parsed = recessoFormSchema.safeParse(values);
    if (!parsed.success) {
      const errors = formatRecessoErrors(parsed.error);
      setFieldErrors(errors);
      setStatus("error");
      setGeneralError("Controlla i campi evidenziati e riprova.");
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        parent.current
          ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
          ?.focus();
      }
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    const honeypotInput = parent.current?.querySelector<HTMLInputElement>(
      'input[name="fax"]',
    );

    try {
      const response = await fetch("/api/recesso", {
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
        error?: string;
        fieldErrors?: Record<string, string>;
        delivery?: DeliveryMode;
        confirmationSent?: boolean;
      } | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setFieldErrors(result?.fieldErrors ?? {});
        setGeneralError(
          result?.error ??
            "Qualcosa non ha funzionato. Riprova o scrivici a info@benveniaguide.it.",
        );
        return;
      }

      setSentTo(parsed.data.email);
      setDelivery(result.delivery ?? "email");
      setConfirmationSent(result.confirmationSent ?? true);
      setStatus("success");
    } catch {
      setStatus("error");
      setGeneralError(
        "Connessione non disponibile. Riprova o scrivici a info@benveniaguide.it.",
      );
    }
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
          Richiesta di recesso ricevuta
        </h2>
        <p className="mt-3 text-base leading-relaxed break-words text-charcoal">
          Abbiamo ricevuto la tua richiesta di recesso.{" "}
          {confirmationSent
            ? `Ti abbiamo mandato una conferma a ${sentTo}.`
            : `Non siamo riusciti a mandarti la conferma a ${sentTo}: te la mandiamo noi a mano al più presto.`}{" "}
          Se hai già pagato, ti rimborsiamo entro 14 giorni con lo stesso mezzo
          di pagamento.
        </p>
        {delivery === "dev" ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <strong className="font-medium text-charcoal">
              Ambiente di sviluppo:
            </strong>{" "}
            le email non sono state inviate.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      ref={parent}
      noValidate
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8"
    >
      {fields.map((field) => {
        const id = `recesso-${field.key}`;
        const error = fieldErrors[field.key];
        const describedBy =
          [field.hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined;
        const common = {
          id,
          name: field.key,
          value: values[field.key],
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) =>
            setValues((current) => ({
              ...current,
              [field.key]: event.target.value,
            })),
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy,
          className: cn(
            fieldBase,
            field.multiline && "resize-y",
            error ? "border-copper-700" : "border-line",
          ),
        };
        return (
          <div key={field.key}>
            <label
              htmlFor={id}
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              {field.label}
              {field.optional ? (
                <span className="font-normal text-muted"> (facoltativo)</span>
              ) : null}
            </label>
            {field.multiline ? (
              <textarea rows={4} {...common} />
            ) : (
              <input
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                required={!field.optional}
                {...common}
              />
            )}
            {field.hint ? (
              <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
                {field.hint}
              </p>
            ) : null}
            {error ? (
              <p id={`${id}-error`} className="mt-1.5 text-xs text-copper-700">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Campo trappola antispam: invisibile agli utenti, ignorato dagli screen reader. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="recesso-fax">Non compilare questo campo</label>
        <input id="recesso-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-ivory shadow-soft transition-colors hover:bg-forest-700 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Invio in corso…
          </>
        ) : (
          "Conferma recesso"
        )}
      </button>
    </form>
  );
}
