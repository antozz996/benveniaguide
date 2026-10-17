# Benvenia Guide — sito ufficiale

Sito marketing di **Benvenia Guide**, la Guest Guide digitale per B&B, case
vacanza, boutique hotel e property manager.

Stack: Next.js 16 (App Router, Turbopack, `cacheComponents`), React 19,
TypeScript, Tailwind CSS v4, Zod, Resend, Playwright.

## Comandi

```bash
npm run dev        # sviluppo (http://localhost:3000)
npm run build      # build di produzione
npm run start      # avvia la build di produzione
npm run lint       # ESLint
npm run typecheck  # TypeScript senza emit
npm run test:e2e   # Playwright (avvia build+start in automatico)
```

## Struttura

- `app/` — pagine (home, demo, come-funziona, funzionalita, soluzioni, prezzi,
  contatti, privacy, cookie-policy), API `/api/lead`, sitemap, robots, OG image.
- `components/` — UI riutilizzabile, layout, demo interattiva, form, consenso.
- `data/` — contenuti editoriali versionati (demo, soluzioni, FAQ, prezzi).
- `lib/` — configurazione sito, metadata, validazione, analytics, JSON-LD.
- `tests/e2e/` — test Playwright su build di produzione.

## Variabili d'ambiente

Copiare `.env.example` in `.env.local` e compilare:

| Variabile | Ruolo |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (canonical, sitemap, OG) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4, caricato solo con consenso |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | meta tag di verifica per Google Search Console |
| `RESEND_API_KEY` | invio email form contatti |
| `LEAD_EMAIL_FROM` | mittente verificato su Resend (default: `Benvenia Guide <no-reply@benveniaguide.it>`) |
| `LEAD_NOTIFY_EMAIL_TO` | destinatario interno delle richieste (default: `info@benveniaguide.it`) |

Senza le variabili Resend: in sviluppo l'API risponde `delivery: "dev"`
(nessuna email, nessuna simulazione di invio reale); in produzione risponde
`503` — il lancio è bloccato finché l'invio non è configurato e testato.

## Contenuti e dati non inventati

Il sito non pubblica prezzi, recensioni, statistiche o dati societari non
verificati. L'attività non è formalizzata: privacy e cookie policy
identificano il titolare come "Benvenia Guide", contattabile via
`info@benveniaguide.it`, e `legalName`/`vatNumber` in `lib/site.ts` restano
`null`. Se l'attività verrà costituita, aggiornare quei campi, la sede e il
titolare nell'informativa (vedi `pendingLaunchConfig`).

## Deploy su Vercel

1. Creare il progetto su Vercel collegando il repository.
2. Impostare le variabili d'ambiente di produzione (vedi sopra).
3. Verificare il dominio `benveniaguide.it` e impostare
   `NEXT_PUBLIC_SITE_URL=https://www.benveniaguide.it`.
4. Nei deployment di preview `VERCEL_ENV != production` → `robots.txt`
   risponde `Disallow: /` automaticamente.
5. Dopo il deploy: verificare `/sitemap.xml`, `/robots.txt`, OG image e invio
   reale del form contatti.

## Test E2E

`npm run test:e2e` compila il sito e lo serve su `http://localhost:3000`
(configurazione in `playwright.config.ts`). I test coprono home, demo
interattiva, form contatti (inclusa la trappola temporale antispam), pagine
legali e responsività a 375/768/1440 px.
