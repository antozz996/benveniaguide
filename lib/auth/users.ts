import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users, type User } from "@/lib/db/schema";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Email dell'account amministratore (creato al primo accesso). */
export function getAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL;
  return email ? normalizeEmail(email) : null;
}

export function isAdminEmail(email: string): boolean {
  const adminEmail = getAdminEmail();
  return adminEmail !== null && normalizeEmail(email) === adminEmail;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const rows = await getDb()
    .select()
    .from(users)
    .where(eq(users.email, normalizeEmail(email)))
    .limit(1);
  return rows[0] ?? null;
}

export async function findUserById(id: string): Promise<User | null> {
  const rows = await getDb()
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Primo accesso dell'admin: crea l'utente se non esiste.
 * Accetta solo l'indirizzo configurato in ADMIN_EMAIL.
 */
export async function ensureAdminUser(email: string): Promise<User> {
  const normalized = normalizeEmail(email);
  if (!isAdminEmail(normalized)) {
    throw new Error("ensureAdminUser: l'email non corrisponde ad ADMIN_EMAIL.");
  }

  const existing = await findUserByEmail(normalized);
  if (existing) return existing;

  const inserted = await getDb()
    .insert(users)
    .values({ email: normalized, role: "admin", name: "Benvenia Guide" })
    .onConflictDoNothing({ target: users.email })
    .returning();

  if (inserted[0]) return inserted[0];

  const refetched = await findUserByEmail(normalized);
  if (!refetched) {
    throw new Error("ensureAdminUser: creazione utente admin non riuscita.");
  }
  return refetched;
}
