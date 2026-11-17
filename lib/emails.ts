import "server-only";
import { Resend } from "resend";
import { MAGIC_LINK_TTL_MS } from "@/lib/auth/tokens";
import { siteConfig } from "@/lib/site";
import { packageLabel, type LeadRequest } from "@/lib/validation";
import {
  moduloPackageOptions,
  optionLabel,
  placeCategoryOptions,
  settingOptions,
  type ModuloRequest,
} from "@/lib/modulo";

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

/** Email interna con il riepilogo del modulo struttura (/modulo). */
export function buildModuloEmail(data: ModuloRequest): {
  subject: string;
  text: string;
  html: string;
} {
  const yesNo = (value: "si" | "no") => (value === "si" ? "Sì" : "No");
  const pkgLabel = optionLabel(moduloPackageOptions, data.package);
  const pkg =
    data.package === "multi"
      ? `${pkgLabel} — ${data.structuresCount} strutture`
      : pkgLabel;

  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: "Struttura",
      rows: [
        ["Pacchetto", pkg],
        ["Nome struttura", data.structureName],
        ["Località", data.location],
        ["Frase di presentazione", data.tagline],
        ["Messaggio di benvenuto", data.welcomeMessage],
        ["Firma", data.signature],
        ["Ambientazione", optionLabel(settingOptions, data.setting)],
        ["Guida anche in inglese", yesNo(data.english)],
      ],
    },
    {
      title: "Soggiorno",
      rows: [
        ["Orario check-in", data.checkinTime],
        ["Come avviene il check-in", data.checkinDetail],
        ["Orario check-out", data.checkoutTime],
        ["Istruzioni check-out", data.checkoutDetail],
        ["Rete Wi-Fi", data.wifiNetwork],
        ["Password Wi-Fi", data.wifiPassword],
        ["Note Wi-Fi", data.wifiNote],
        ["Parcheggio", data.parking],
        ["Colazione", data.breakfast],
        ["Altri servizi", data.services],
        ["Raccolta differenziata", data.waste],
        ["Regole della casa", data.rules],
      ],
    },
    {
      title: "Contatti per gli ospiti",
      rows: [
        ["Referente", data.hostContact],
        ["Telefono / WhatsApp", data.guestPhone],
        ["Email per gli ospiti", data.guestEmail],
        ["Google Maps struttura", data.propertyMapsUrl],
        ["Preferenze di contatto", data.contactPreference],
        ["Numeri utili", data.usefulNumbers],
        ["Domande frequenti", data.faq],
      ],
    },
    {
      title: `Luoghi consigliati (${data.places.length})`,
      rows: data.places.map((place, index) => [
        `${index + 1}. ${place.name}`,
        [
          optionLabel(placeCategoryOptions, place.category),
          place.description,
          place.mapsUrl,
        ]
          .filter(Boolean)
          .join(" — "),
      ]),
    },
    {
      title: "Dati per la ricevuta",
      rows: [
        ["Nome o ragione sociale", data.billingName],
        ["Codice fiscale / P.IVA", data.taxCode],
        ["Indirizzo", data.billingAddress],
        ["Sostituto d'imposta", yesNo(data.withholdingAgent)],
        ["Email del cliente", data.clientEmail],
      ],
    },
    {
      title: "Chiusura",
      rows: [
        ["Indirizzo guida desiderato", data.slug],
        ["Note", data.notes],
      ],
    },
  ];

  const text = [
    "Modulo struttura compilato — Benvenia Guide",
    ...sections.flatMap((section) => [
      "",
      `== ${section.title} ==`,
      ...section.rows.map(([label, value]) => `${label}: ${value || "—"}`),
    ]),
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#5f6f6a;vertical-align:top">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value || "—")}</td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#202827;line-height:1.6;max-width:640px">
      <h1 style="font-size:18px;color:#152f2b">Modulo struttura compilato — Benvenia Guide</h1>
      ${sections
        .map(
          (section) => `
      <h2 style="font-size:14px;color:#152f2b;margin-top:20px">${escapeHtml(section.title)}</h2>
      <table style="border-collapse:collapse;font-size:14px">${section.rows
        .map(([label, value]) => row(label, value))
        .join("")}</table>`,
        )
        .join("")}
    </div>
  `;

  return {
    subject: `Modulo struttura (${pkgLabel.split(" — ")[0]}) — ${data.structureName}`,
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
