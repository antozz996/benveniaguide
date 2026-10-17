import "server-only";
import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";
import {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
} from "@/lib/auth/constants";

export interface SessionData {
  userId?: string;
}

function getSessionPassword(): string {
  const password = process.env.SESSION_PASSWORD;
  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_PASSWORD mancante o troppo corta: servono almeno 32 caratteri (vedi .env.example).",
    );
  }
  return password;
}

/** Legge e decifra il cookie di sessione (vuoto se assente o non valido). */
export async function getSession(): Promise<SessionData> {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return {};

  try {
    return await unsealData<SessionData>(cookie, {
      password: getSessionPassword(),
      ttl: SESSION_TTL_SECONDS,
    });
  } catch {
    return {};
  }
}

/** Crea il cookie di sessione (solo da Server Action o Route Handler). */
export async function createSession(userId: string): Promise<void> {
  const seal = await sealData({ userId } satisfies SessionData, {
    password: getSessionPassword(),
    ttl: SESSION_TTL_SECONDS,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, seal, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

/** Elimina il cookie di sessione (solo da Server Action o Route Handler). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
