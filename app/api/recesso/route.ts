import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildRecessoConfirmationEmail,
  buildRecessoTeamEmail,
} from "@/lib/emails";
import { formatRecessoErrors, recessoRequestSchema } from "@/lib/recesso";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

/**
 * Recesso del consumatore (art. 54-bis Codice del Consumo): stessa catena di
 * /api/modulo (rate limit, zod, antispam, Resend, variabili LEAD_*). Manda la
 * richiesta al team e la conferma di ricezione con data e ora al cliente.
 * Nessun salvataggio su database.
 */

/** Modulo breve: sotto i 2 secondi l'invio non è credibile. */
const MIN_ELAPSED_MS = 2000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit({
    key: `recesso:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Hai inviato la richiesta diverse volte in poco tempo. Riprova tra qualche minuto o scrivici a info@benveniaguide.it.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 },
    );
  }

  const parsed = recessoRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Controlla i campi evidenziati e riprova.",
        fieldErrors: formatRecessoErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Antispam: campo trappola compilato → risposta neutra, nessun invio.
  if (data.honeypot.trim() !== "") {
    return NextResponse.json({ ok: true, delivery: "email" });
  }

  // Antispam: compilazione troppo rapida per essere umana.
  if (data.elapsedMs > 0 && data.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json(
      {
        ok: false,
        error: "L'invio è stato troppo rapido. Attendi un momento e riprova.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !notifyTo || !from) {
    const devDeliveryAllowed =
      process.env.NODE_ENV !== "production" ||
      process.env.LEAD_ALLOW_DEV_DELIVERY === "true";

    if (devDeliveryAllowed) {
      // Nessun dato della richiesta nei log.
      console.info(
        "[recesso] Modalità sviluppo: email non inviate. Configurare RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO e LEAD_EMAIL_FROM per l'invio reale.",
      );
      return NextResponse.json({ ok: true, delivery: "dev" });
    }
    console.error(
      "[recesso] Configurazione email mancante: RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO o LEAD_EMAIL_FROM non impostati. Richiesta non inoltrata.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Il servizio di invio non è disponibile. Per recedere scrivici a info@benveniaguide.it: vale come dichiarazione di recesso.",
      },
      { status: 503 },
    );
  }

  const receivedAt = new Date();
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: data.email,
      ...buildRecessoTeamEmail(data, receivedAt),
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // Nessun dato personale nei log: solo la causa tecnica.
    console.error(
      "[recesso] Invio email al team fallito:",
      error instanceof Error ? error.message : "errore sconosciuto",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Invio non riuscito. Riprova tra qualche minuto o scrivici a info@benveniaguide.it.",
      },
      { status: 502 },
    );
  }

  // La richiesta è arrivata al team: un errore sulla conferma non la annulla.
  let confirmationSent = true;
  try {
    const { error } = await resend.emails.send({
      from,
      to: data.email,
      replyTo: siteConfig.contact.email,
      ...buildRecessoConfirmationEmail(data, receivedAt),
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    confirmationSent = false;
    console.error(
      "[recesso] Invio conferma al cliente fallito:",
      error instanceof Error ? error.message : "errore sconosciuto",
    );
  }

  return NextResponse.json({
    ok: true,
    delivery: "email",
    confirmationSent,
  });
}
