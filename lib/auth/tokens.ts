import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { and, eq, gt, isNull, lt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { magicLinkTokens } from "@/lib/db/schema";

/** Validità del link di accesso: 15 minuti. */
export const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function now(): Date {
  return new Date();
}

/** Genera un token monouso e salva in database solo il suo hash. */
export async function createMagicLinkToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const db = getDb();

  // Pulizia opportunistica dei token scaduti da oltre un giorno.
  await db
    .delete(magicLinkTokens)
    .where(
      lt(
        magicLinkTokens.expiresAt,
        new Date(now().getTime() - 24 * 60 * 60 * 1000),
      ),
    );

  await db.insert(magicLinkTokens).values({
    email,
    tokenHash: hashToken(token),
    expiresAt: new Date(now().getTime() + MAGIC_LINK_TTL_MS),
  });

  return token;
}

/**
 * Consuma il token (se valido, non scaduto e non usato) e restituisce
 * l'email associata. L'update condizionale garantisce l'uso singolo anche
 * in caso di richieste concorrenti.
 */
export async function consumeMagicLinkToken(
  token: string,
): Promise<{ email: string } | null> {
  const consumed = await getDb()
    .update(magicLinkTokens)
    .set({ usedAt: now() })
    .where(
      and(
        eq(magicLinkTokens.tokenHash, hashToken(token)),
        isNull(magicLinkTokens.usedAt),
        gt(magicLinkTokens.expiresAt, now()),
      ),
    )
    .returning({ email: magicLinkTokens.email });

  return consumed[0] ?? null;
}
