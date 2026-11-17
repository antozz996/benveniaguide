import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Immagini dei post Instagram (HOS-33): servono solo come URL pubblico
        // per la pubblicazione, non vanno indicizzate. Niente Disallow in
        // robots.txt, altrimenti il crawler di Meta potrebbe non scaricarle.
        source: "/social/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        // Modulo struttura per i clienti: link privato, mai indicizzato.
        source: "/modulo",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        // Le pagine di contenuto non contengono dati sensibili: cache CDN generosa.
        source: "/(privacy|condizioni|cookie-policy|prezzi|soluzioni|funzionalita|come-funziona)(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
