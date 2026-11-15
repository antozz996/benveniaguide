import "server-only";
import { Resend } from "resend";
import { MAGIC_LINK_TTL_MS } from "@/lib/auth/tokens";
import { siteConfig } from "@/lib/site";
import { packageLabel, type LeadRequest } from "@/lib/validation";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Pacchetto scelto, con il numero di strutture per Multi. */
function describePackage(data: LeadRequest): string {
  const label = packageLabel(data.package);
  return data.package === "multi"
    ? `${label} — ${data.structuresCount} strutture`
    : label;
}

/** Email di notifica interna per un nuovo lead del form contatti. */
export function buildLeadEmail(data: LeadRequest): {
  subject: string;
  text: string;
  html: string;
} {
  const pkg = describePackage(data);
  const utmEntries = data.utm ? Object.entries(data.utm) : [];

  const text = [
    "Nuova richiesta — Benvenia Guide",
    "",
    `Pacchetto: ${pkg}`,
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
    utmEntries.length > 0
      ? utmEntries.map(([key, value]) => `${key}: ${value}`).join("\n")
      : "—",
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#5f6f6a">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`;

  const utmRows =
    utmEntries.length > 0
      ? utmEntries.map(([key, value]) => row(key, value)).join("")
      : `<tr><td colspan="2" style="color:#5f6f6a">—</td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#202827;line-height:1.6;max-width:560px">
      <h1 style="font-size:18px;color:#152f2b">Nuova richiesta — Benvenia Guide</h1>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Pacchetto", pkg)}
        ${row("Nome", data.name)}
        ${row("Struttura", data.structureName)}
        ${row("Email", data.email)}
        ${row("Tipologia", data.structureType)}
        ${row("Sito web", data.website || "—")}
      </table>
      <h2 style="font-size:14px;color:#152f2b;margin-top:20px">Messaggio</h2>
      <p style="font-size:14px;white-space:pre-wrap">${escapeHtml(data.message || "—")}</p>
      <h2 style="font-size:14px;color:#152f2b;margin-top:20px">Attribuzione campagna</h2>
      <table style="border-collapse:collapse;font-size:14px">${utmRows}</table>
    </div>
  `;

  return {
    subject: `Nuova richiesta (${packageLabel(data.package)}) — ${data.structureName}`,
    text,
    html,
  };
}

/** In sviluppo il link viene mostrato nei log del server. In produzione no. */
export function isAuthDevDeliveryAllowed(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.AUTH_ALLOW_DEV_LINK === "true"
  );
}

interface MagicLinkEmailInput {
  to: string;
  url: string;
}

/**
 * Invia l'email con il link di accesso. Se Resend non è configurato:
 * in sviluppo (o con flag di test) non invia e non fallisce; in produzione
 * registra l'errore senza mai bloccare la risposta neutra del form.
 */
export async function sendMagicLinkEmail({
  to,
  url,
}: MagicLinkEmailInput): Promise<void> {
  const minutes = Math.round(MAGIC_LINK_TTL_MS / 60_000);

  const text = [
    "Ciao,",
    "",
    `hai richiesto di accedere alla tua area riservata di ${siteConfig.productName}.`,
    `Apri questo link per entrare (vale ${minutes} minuti e può essere usato una sola volta):`,
    url,
    "",
    "Se non hai richiesto tu questo accesso, puoi ignorare questa email.",
    "",
    `${siteConfig.productName} — ${siteConfig.domain}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#202827;line-height:1.6;max-width:560px">
      <h1 style="font-size:18px;color:#152f2b">Accedi alla tua area riservata</h1>
      <p style="font-size:14px">Ciao, hai richiesto di accedere alla tua area riservata di ${escapeHtml(siteConfig.productName)}.</p>
      <p style="font-size:14px">
        <a href="${escapeHtml(url)}" style="display:inline-block;background:#152f2b;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px">Accedi ora</a>
      </p>
      <p style="font-size:13px;color:#5f6f6a">Il link vale ${minutes} minuti e può essere usato una sola volta.</p>
      <p style="font-size:13px;color:#5f6f6a">Se non hai richiesto tu questo accesso, puoi ignorare questa email.</p>
      <p style="font-size:12px;color:#5f6f6a">${escapeHtml(siteConfig.productName)} — ${escapeHtml(siteConfig.domain)}</p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !from) {
    if (isAuthDevDeliveryAllowed()) {
      console.info(
        "[auth] Modalità sviluppo: email di accesso non inviata (Resend non configurato).",
      );
      return;
    }
    console.error(
      "[auth] Configurazione email mancante: RESEND_API_KEY o LEAD_EMAIL_FROM non impostati. Link di accesso non inviato.",
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Il tuo link di accesso a ${siteConfig.productName}`,
      text,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // Nessun dato sensibile nei log: solo la causa tecnica.
    console.error(
      "[auth] Invio email di accesso fallito:",
      error instanceof Error ? error.message : "errore sconosciuto",
    );
  }
}
