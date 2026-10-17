import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatZodErrors, leadRequestSchema, type LeadRequest } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

/** Tempo minimo di compilazione: sotto questa soglia la richiesta è sospetta. */
const MIN_ELAPSED_MS = 1500;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPlainText(data: LeadRequest): string {
  const lines = [
    "Nuova richiesta di demo — Benvenia Guide",
    "",
    `Nome: ${data.name}`,
    `Struttura: ${data.structureName}`,
    `Email: ${data.email}`,
    `Tipologia: ${data.structureType}`,
    `Sito web: ${data.website || "—"}`,
    "",
    "Messaggio:",
    data.message || "—",
    "",
    "Attribuzione campagna:",
    data.utm && Object.keys(data.utm).length > 0
      ? Object.entries(data.utm)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      : "—",
  ];
  return lines.join("\n");
}

function buildHtml(data: LeadRequest): string {
  const utmRows =
    data.utm && Object.keys(data.utm).length > 0
      ? Object.entries(data.utm)
          .map(
            ([key, value]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")
      : `<tr><td colspan="2" style="color:#5f6f6a">—</td></tr>`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#202827;line-height:1.6;max-width:560px">
      <h1 style="font-size:18px;color:#152f2b">Nuova richiesta di demo — Benvenia Guide</h1>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">Nome</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">Struttura</td><td>${escapeHtml(data.structureName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">Email</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">Tipologia</td><td>${escapeHtml(data.structureType)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">Sito web</td><td>${escapeHtml(data.website || "—")}</td></tr>
      </table>
      <h2 style="font-size:14px;color:#152f2b;margin-top:20px">Messaggio</h2>
      <p style="font-size:14px;white-space:pre-wrap">${escapeHtml(data.message || "—")}</p>
      <h2 style="font-size:14px;color:#152f2b;margin-top:20px">Attribuzione campagna</h2>
      <table style="border-collapse:collapse;font-size:14px">${utmRows}</table>
    </div>
  `;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

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
        { structureType: data.structureType },
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
      subject: `Nuova richiesta demo — ${data.structureName}`,
      text: buildPlainText(data),
      html: buildHtml(data),
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
