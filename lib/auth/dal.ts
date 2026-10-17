import "server-only";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/auth/users";
import { getSession } from "@/lib/session";
import type { User, UserRole } from "@/lib/db/schema";

/** Dati utente minimi esposti al resto dell'applicazione (mai l'intera riga). */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  clientId: string | null;
}

function toSessionUser(user: User): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    clientId: user.clientId,
  };
}

/**
 * Data Access Layer: verifica la sessione (cookie cifrato + utente a
 * database) e reindirizza ad /accedi se non autenticato.
 * Da usare nei Server Component, dentro un boundary <Suspense>.
 */
export async function getCurrentUser(): Promise<SessionUser> {
  "use cache: private";

  const { userId } = await getSession();
  if (!userId) redirect("/accedi");

  const user = await findUserById(userId);
  if (!user) redirect("/accedi");

  return toSessionUser(user);
}

/** Come getCurrentUser, ma richiede il ruolo admin. */
export async function requireAdmin(): Promise<SessionUser> {
  "use cache: private";

  const { userId } = await getSession();
  if (!userId) redirect("/accedi");

  const user = await findUserById(userId);
  if (!user) redirect("/accedi");
  if (user.role !== "admin") redirect("/area");

  return toSessionUser(user);
}
