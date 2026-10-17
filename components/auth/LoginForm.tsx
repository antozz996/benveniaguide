"use client";

import { useActionState } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  requestMagicLinkAction,
  type LoginFormState,
} from "@/lib/auth/actions";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    requestMagicLinkAction,
    initialState,
  );

  if (state.status === "sent") {
    return (
      <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-forest">
          <MailCheck aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-forest">
          Controlla la tua casella di posta
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Se l&apos;indirizzo è abilitato, riceverai a breve un&apos;email con
          il link per accedere. Il link scade dopo 15 minuti e può essere usato
          una sola volta.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-forest">
        Accedi con la tua email
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Ti inviamo un link di accesso: nessuna password da ricordare. Funziona
        solo con gli indirizzi abilitati a Benvenia Guide.
      </p>

      <label
        htmlFor="email"
        className="mt-6 block text-sm font-medium text-charcoal"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="nome@struttura.it"
        className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/60 focus:outline-none"
      />

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mt-3 rounded-2xl border border-copper/50 bg-copper/10 px-4 py-3 text-sm text-copper-700"
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="mt-5 w-full">
        {pending ? "Invio in corso…" : "Inviami il link di accesso"}
      </Button>
    </form>
  );
}
