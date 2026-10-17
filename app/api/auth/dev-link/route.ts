import { connection, NextResponse, type NextRequest } from "next/server";
import { createMagicLinkToken } from "@/lib/auth/tokens";
import {
  findUserByEmail,
  isAdminEmail,
  normalizeEmail,
} from "@/lib/auth/users";

/**
 * Solo per sviluppo e test E2E: restituisce un link di accesso senza inviare
 * email. Attivo unicamente in sviluppo oppure con AUTH_ALLOW_DEV_LINK=true
 * (mai in produzione reale).
 */
export async function GET(request: NextRequest) {
  // Il flusso dipende dalla richiesta e dalle env var a runtime:
  // senza questa chiamata la route verrebbe prerenderizzata alla build.
  await connection();

  const devDeliveryAllowed =
    process.env.NODE_ENV !== "production" ||
    process.env.AUTH_ALLOW_DEV_LINK === "true";

  if (!devDeliveryAllowed) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const email = normalizeEmail(
    request.nextUrl.searchParams.get("email") ?? "",
  );
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Parametro email mancante." },
      { status: 400 },
    );
  }

  const user = await findUserByEmail(email);
  if (!user && !isAdminEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Indirizzo non abilitato." },
      { status: 404 },
    );
  }

  const token = await createMagicLinkToken(email);
  const url = `${request.nextUrl.origin}/accedi/verifica?token=${encodeURIComponent(token)}`;

  return NextResponse.json({ ok: true, url });
}
