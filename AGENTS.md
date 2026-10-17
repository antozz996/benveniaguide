<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Benvenia Guide — regole di progetto

- Sito in italiano. Non inventare mai: prezzi, recensioni, statistiche, dati
  societari o recapiti. I dati mancanti stanno in `lib/site.ts`
  (`pendingLaunchConfig`) e restano `null` con commenti `DA CONFIGURARE`.
- I contenuti editoriali vivono in `data/`; la UI riutilizzabile in
  `components/`; la configurazione (site, metadata, analytics, validazione) in
  `lib/`.
- I design token (palette, ombre, animazioni) sono SOLO in `app/globals.css`
  (`@theme`). Non introdurre colori hardcoded nei componenti.
- Con `cacheComponents: true` evitare `Date.now()`/`Math.random()` nel render
  server: usare costanti (`siteConfig.lastUpdated`).
- Analytics: nessuno script senza consenso (categoria `analytics`);
  gli eventi si inviano con `trackEvent` da `lib/analytics.ts`.
- Primo styling: tailwind; prima di scrivere nuove API Next consultare
  `node_modules/next/dist/docs/` (versione 16, breaking changes).
- Prima di consegnare: `npm run typecheck`, `npm run lint`, `npm run build`,
  `npm run test:e2e`.
