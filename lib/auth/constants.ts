/**
 * Costanti di autenticazione senza dipendenze server: importabili anche dal
 * proxy (edge/Node middleware) oltre che da lib/session.ts.
 */

/** Nome del cookie di sessione. */
export const SESSION_COOKIE_NAME = "bg_session";

/** Durata della sessione (30 giorni). */
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
