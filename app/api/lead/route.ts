import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildLeadEmail } from "@/lib/emails";
import { formatZodErrors, leadRequestSchema } from "@/lib/validation";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";

/** Tempo minimo di compilazione: sotto questa soglia la richiesta è sospetta. */
const MIN_ELAPSED_MS = 1500;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit({
    key: `lead:${ip}`,
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Hai inviato diverse richieste in poco tempo. Riprova tra qualche minuto.",
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

  const parsed = leadRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Controlla i campi evidenziati e riprova.",
        fieldErrors: formatZodErrors(parsed.error),
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
    // Modalità sviluppo (NODE_ENV != production) o build di test con flag
    // esplicito LEAD_ALLOW_DEV_DELIVERY=true: nessun invio reale, nessuna
    // simulazione di successo. In produzione senza flag: 503.
    const devDeliveryAllowed =
      process.env.NODE_ENV !== "production" ||
      process.env.LEAD_ALLOW_DEV_DELIVERY === "true";

    if (devDeliveryAllowed) {
      console.info(
        "[lead] Modalità sviluppo: email non inviata. Configurare RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO e LEAD_EMAIL_FROM per l'invio reale.",
        { structureType: data.structureType, package: data.package },
      );
      return NextResponse.json({ ok: true, delivery: "dev" });
    }
    console.error(
      "[lead] Configurazione email mancante: RESEND_API_KEY, LEAD_NOTIFY_EMAIL_TO o LEAD_EMAIL_FROM non impostati. Richiesta non inoltrata.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Il servizio di invio non è ancora configurato. Riprova più tardi.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: data.email,
      ...buildLeadEmail(data),
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // Nessun dato sensibile nei log: solo la causa tecnica.
    console.error(
      "[lead] Invio email fallito:",
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
