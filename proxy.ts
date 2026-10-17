import { NextResponse, type NextRequest } from "next/server";
import { articles } from "@/data/articles";

/**
 * Con Partial Prerendering il 404 di `notFound()` dentro la route dinamica
 * arriva dopo l'avvio dello streaming (status 200 + noindex).
 * Per gli URL di /risorse/[slug] inesistenti serviamo un vero 404:
 * il check è su una lista di slug nota, quindi resta veloce.
 */

const knownArticlePaths = new Set(
  articles.map((article) => `/risorse/${article.slug}`),
);

const reservedSegments = new Set(["opengraph-image"]);

/**
 * Path che non corrisponde a nessuna route: il router risponde con un vero
 * 404 e la UI di app/not-found.tsx. Non creare mai una route con questo path.
 */
const NOT_FOUND_REWRITE_TARGET = "/risorse-slug-non-trovato";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = /^\/risorse\/([^/]+)\/?$/.exec(pathname);
  if (!match || reservedSegments.has(match[1])) return NextResponse.next();

  if (knownArticlePaths.has(`/risorse/${match[1]}`)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(NOT_FOUND_REWRITE_TARGET, request.url),
  );
}

export const config = {
  matcher: ["/risorse/:path*"],
};
