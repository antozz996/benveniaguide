import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildModuloEmail } from "@/lib/emails";
import { formatModuloErrors, moduloRequestSchema } from "@/lib/modulo";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Modulo struttura: stessa catena di /api/lead (rate limit, zod, antispam,
 * Resend) con destinatari e mittente condivisi (LEAD_*). Nessun salvataggio
 * su database: i dati restano solo nell'email al team.
 */

/** Il modulo è lungo: sotto i 5 secondi l'invio non è credibile. */
const MIN_ELAPSED_MS = 5000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit({
    key: `modulo:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Hai inviato il modulo diverse volte in poco tempo. Riprova tra qualche minuto.",
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

  const parsed = moduloRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Controlla i campi evidenziati e riprova.",
        fieldErrors: formatModuloErrors(parsed.error),
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
      // Nessun dato del modulo nei log: solo il pacchetto.
      console.info(
        "[modulo] Modalità sviluppo: email non inviata. Configurare RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO e LEAD_EMAIL_FROM per l'invio reale.",
        { package: data.package },
      );
      return NextResponse.json({ ok: true, delivery: "dev" });
    }
    console.error(
      "[modulo] Configurazione email mancante: RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO o LEAD_EMAIL_FROM non impostati. Modulo non inoltrato.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Il servizio di invio non è ancora configurato. Riprova più tardi o scrivici a info@benveniaguide.it.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: data.clientEmail,
      ...buildModuloEmail(data),
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // Nessun dato sensibile nei log: solo la causa tecnica.
    console.error(
      "[modulo] Invio email fallito:",
      error instanceof Error ? error.message : "errore sconosciuto",
    );
    return NextResponse.json(
      {
        ok: false,
        error: "Invio non riuscito. Riprova tra qualche minuto.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivery: "email" });
}
