"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createMagicLinkToken } from "@/lib/auth/tokens";
import { findUserByEmail, isAdminEmail, normalizeEmail } from "@/lib/auth/users";
import { sendMagicLinkEmail } from "@/lib/emails";
import { rateLimit } from "@/lib/rate-limit";
import { destroySession } from "@/lib/session";
import { siteUrl } from "@/lib/site";

export interface LoginFormState {
  status: "idle" | "sent" | "error";
  message?: string;
}

const emailField = z
  .email("Inserisci un indirizzo email valido.")
  .max(160, "Massimo 160 caratteri.");

/**
 * Riceve l'email dal form di accesso e, se l'indirizzo è abilitato,
 * invia il magic link. La risposta è sempre neutra per non rivelare
 * quali indirizzi esistono.
 */
export async function requestMagicLinkAction(
  _previous: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = emailField.safeParse(String(formData.get("email") ?? ""));
  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Controlla l'indirizzo email.",
    };
  }

  const email = normalizeEmail(parsed.data);

  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip")?.trim() ||
    "unknown";

  const limit = rateLimit({
    key: `magic-link:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.allowed) {
    return {
      status: "error",
      message: "Troppi tentativi in poco tempo. Riprova tra qualche minuto.",
    };
  }

  const user = await findUserByEmail(email);
  const allowed = user !== null || isAdminEmail(email);

  if (allowed) {
    const token = await createMagicLinkToken(email);
    const link = `${siteUrl}/accedi/verifica?token=${encodeURIComponent(token)}`;
    await sendMagicLinkEmail({ to: email, url: link });
  }

  return { status: "sent" };
}

/** Chiude la sessione e torna alla home. */
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
