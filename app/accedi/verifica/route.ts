import { NextResponse, type NextRequest } from "next/server";
import { consumeMagicLinkToken } from "@/lib/auth/tokens";
import {
  ensureAdminUser,
  findUserByEmail,
  isAdminEmail,
  normalizeEmail,
} from "@/lib/auth/users";
import { createSession } from "@/lib/session";

/**
 * Verifica il magic link: consuma il token (monouso), apre la sessione
 * e reindirizza all'area corretta (admin → /area/admin, client → /area).
 */
export async function GET(request: NextRequest) {
  const invalidRedirect = NextResponse.redirect(
    new URL("/accedi/link-non-valido", request.url),
  );

  const token = request.nextUrl.searchParams.get("token");
  if (!token) return invalidRedirect;

  const consumed = await consumeMagicLinkToken(token);
  if (!consumed) return invalidRedirect;

  const email = normalizeEmail(consumed.email);
  let user = await findUserByEmail(email);

  if (!user) {
    if (isAdminEmail(email)) {
      user = await ensureAdminUser(email);
    } else {
      return invalidRedirect;
    }
  }

  await createSession(user.id);

  const target = user.role === "admin" ? "/area/admin" : "/area";
  return NextResponse.redirect(new URL(target, request.url));
}
