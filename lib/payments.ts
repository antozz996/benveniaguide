/**
 * Coordinate di pagamento (bonifico e Revolut), lette dalle variabili
 * d'ambiente al build. DA CONFIGURARE su Vercel: finché mancano, la pagina
 * /paga mostra solo il rimando ai contatti (mai coordinate inventate).
 */

function env(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export interface BankTransferConfig {
  holder: string;
  iban: string;
  bank: string | null;
}

export interface PaymentConfig {
  bankTransfer: BankTransferConfig | null;
  /** Username Revolut (revolut.me/<username>), senza "@". */
  revolutUsername: string | null;
}

export function getPaymentConfig(): PaymentConfig {
  const holder = env("PAYMENT_BANK_HOLDER");
  const iban = env("PAYMENT_BANK_IBAN");
  const revolut = env("PAYMENT_REVOLUT_USERNAME")?.replace(/^@/, "") ?? null;

  return {
    bankTransfer:
      holder && iban
        ? { holder, iban: iban.replace(/\s+/g, "").toUpperCase(), bank: env("PAYMENT_BANK_NAME") }
        : null,
    revolutUsername: revolut,
  };
}

export function revolutMeUrl(username: string): string {
  return `https://revolut.me/${encodeURIComponent(username)}`;
}

/** IBAN raggruppato a blocchi di 4 per la lettura. */
export function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}
