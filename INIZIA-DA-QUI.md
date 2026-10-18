# Inizia da qui — Benvenia Guide

Documento di ripresa del progetto. Ultimo aggiornamento: **18 ottobre 2026**.
Leggi anche `AGENTS.md` (regole di progetto e vincoli Next.js 16).

Stato in una riga: **sito pubblico online, area riservata fase 1 in produzione, Google Analytics 4 attivo. Prossimo passo: FASE 2 (pannello admin clienti).**

---

## 1. Cos'è il progetto

Sito marketing in italiano per **Benvenia Guide**: una guida digitale per B&B, case vacanza e hotel
(`www.benveniaguide.it`). Oltre al sito vetrina (risorse, demo interattiva, form contatti) sta nascendo
un'**area riservata** in cui:

- l'admin crea gli accessi per le strutture clienti;
- i clienti accedono con **magic link** (niente password);
- i clienti compileranno una guida digitale pubblicata su `/g/[slug]` (noindex).

Repo: `https://github.com/antozz996/benveniaguide` — branch `master`.
Deploy: Vercel (progetto collegato al repo, dominio `www.benveniaguide.it`, apex 308 → www).

---

## 2. Stato attuale — cosa è FATTO

### FASE 1 — Fondamenta (completa e in produzione)

Commit chiave: `2821689` — *Area riservata fase 1: accesso con magic link, sessioni cifrate, database Neon + Drizzle, guardia /area e test e2e*.

- **Database Neon Postgres** (regione EU/Francoforte) + **Drizzle ORM**. Schema applicato con `npm run db:push`.
- Tabelle: `clients`, `users`, `magic_link_tokens` (vedi §8).
- **Autenticazione magic link** (Resend per l'email, in attesa di configurare `RESEND_API_KEY`):
  - token random 32 byte, salvato come hash SHA-256, **monouso**, scadenza **15 minuti**;
  - risposta sempre neutra (non rivela se l'email esiste);
  - rate limit **5 richieste / 10 minuti per IP** (in-memory, best effort);
  - l'utente admin (`ADMIN_EMAIL`) viene creato automaticamente al primo accesso.
- **Sessione** con **iron-session** (sealData/unsealData), cookie `bg_session` HttpOnly, SameSite=Lax,
  Secure in produzione, durata **30 giorni**. Nessuna dipendenza beta.
- Rotte: `/accedi`, `/accedi/verifica`, `/accedi/link-non-valido`, `/area`, `/area/admin`.
- **DAL** (`lib/auth/dal.ts`): `getCurrentUser` / `requireAdmin` con `'use cache: private'` + `redirect`.
- **Guardia** in `proxy.ts`: senza cookie `bg_session` → `/accedi` (matcher `/risorse/:path*`, `/area/:path*`).
- `/area` e `/area/admin` oggi sono **segnaposto** (verranno riempiti in FASE 2/3).
- **SEO**: `robots.txt` esclude `/area/`, `/accedi`, `/g/`, `/api/`; pagine area con `noindex`.
- **E2E**: `tests/e2e/auth.spec.ts` (10 test). Totale suite: **72 test verdi**.
- **Verificato in produzione**: `/accedi` 200, `/area` e `/area/admin` → redirect 307, dev-link 404.
- **Login reale confermato** con l'email admin `info@benveniaguide.it`.

### Google Analytics 4 (attivo e verificato)

Commit: `70015c2` — *Google Analytics 4: caricamento solo con consenso e test e2e dedicati*.

- Proprietà GA4 **"Benvenia Guide"** (account "Antonio Web Analytics"), flusso Web
  `https://www.benveniaguide.it` → **Measurement ID `G-7H4LFGZQ66`** (ID pubblico, può stare nei file).
- Lo script GA **non viene mai caricato senza consenso** (categoria `analytics` del banner cookie).
  Eventi già previsti in `lib/analytics.ts`: `page_view`, `demo_open`, `demo_interaction`,
  `cta_click`, `lead_form_start`, `lead_form_submit`, `lead_form_success`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` impostata su **Vercel** (tipo *Config*, Production + Preview) e in `.env.local`.
- Nei test e2e si usa un ID fittizio `G-E2ETEST01` (in `playwright.config.ts`) per non inquinare le statistiche.
- Verifiche fatte: hit `page_view` accettata (HTTP 204), **DebugView** con evento di test,
  **Realtime** con 1 utente attivo (Italia). Nota: le hit da browser *headless* risultano scartate
  come bot da Google — per verificare usa un browser reale.
- I report standard possono richiedere **24-48h** dalla prima visita.

### Sito pubblico (già completato prima dell'area riservata)

- Home, demo interattiva, funzionalità, come funziona, soluzioni, prezzi, risorse (3 articoli),
  contatti con form + API lead + antispam, privacy, cookie policy.
- 404 personalizzate reali anche per slug inesistenti di `/risorse` (rewrite del proxy verso
  `/risorse-slug-non-trovato`: **quella pagina non deve mai diventare routabile**).
- Sitemap, robots, JSON-LD, Open Graph, GSC verificato.

---

## 3. Cosa manca — prossimi passi

### FASE 2 — Pannello admin e inviti (PROSSIMO PASSO, non ancora scritto)

Obiettivo: da `/area/admin` l'admin crea clienti (struttura + referente), invia l'invito, vede la lista,
pubblica/mette in bozza le guide. Un cliente creato deve poter accedere a `/area` e non a `/area/admin`.

Decisioni già prese (seguirle):

1. **Form nuovo cliente** (in `components/admin/NewClientForm.tsx`, client component con `useActionState`):
   - Nome struttura (obbligatorio), Nome referente (facoltativo), Email referente (obbligatoria).
   - **Nessun campo slug**: generato server-side da `slugify(nome)` con suffisso `-2`, `-3`, … se occupato.
   - Email già registrata → errore sul campo ("già collegata a un account").
2. **Creazione atomica** con `db.batch([insert client, insert user])` (neon-http) e `crypto.randomUUID()`.
3. **Email di invito senza token**: `sendInviteEmail` (in `lib/emails.ts`) punta a `/accedi`;
   l'utente inserisce la sua email e riceve il magic link. Rifattorizzare il boilerplate Resend in un helper comune.
4. **Lista clienti** (`components/admin/ClientsTable.tsx`): nome, slug (`/g/...` — non linkare finché non esiste),
   email referente, badge "Bozza"/"Online"; per riga un form con `setClientStatusAction`
   (bottoni "Pubblica" / "Metti in bozza").
5. **Server Actions in `lib/admin/actions.ts`** (`requireAdminForAction` — variante **non cachata** del DAL,
   le Server Actions non possono usare `'use cache: private'`):
   - `createClientAction` con validazione zod (`clientInviteSchema` in `lib/validation.ts`);
   - `setClientStatusAction`;
   - dopo ogni mutazione: `revalidatePath("/area/admin")`.
6. **Query** in `lib/clients/queries.ts`: `listClientsWithOwners` (leftJoin users), `findClientById`.
7. **`app/area/admin/page.tsx`**: pannello reale (form + lista). **`app/area/page.tsx`**: per il cliente
   mostrare nome struttura, slug e stato; per l'admin un rimando al pannello.
8. **Test**:
   - `tests/e2e/admin.spec.ts`: crea cliente → invito → il cliente accede e vede `/area` → è bloccato da `/area/admin`;
     email duplicata rifiutata; toggle pubblica/bozza.
   - **ATTENZIONE**: locale e produzione condividono lo stesso database Neon. I test devono usare marker
     `e2e-%@example.com` (email) e `e2e-%` (slug) e un `globalTeardown` che cancella i dati creati
     (`tests/e2e/global-teardown.ts` + `globalTeardown` in `playwright.config.ts`).
   - Valutare in futuro un branch Neon dedicato ai test.
9. Facoltativo: link "Accesso clienti" nel footer (`lib/site.ts`).

Al termine: QA completa, commit, push, verifica in produzione e test manuale creando un cliente
(es. con una seconda email personale) → invito → login → `/area`.

### FASE 3 — Area cliente + editor guidato

- Editor a sezioni della guida (demo: benvenuto, soggiorno, territorio, contatti), campo EN opzionale.
- Contenuti salvati come JSON (`guide_content` jsonb) validati con zod.
- Richieste/invii del cliente all'admin (nuova tabella `requests`).
- `revalidatePath`/`updateTag` dopo i salvataggi.

### FASE 4 — Pubblicazione guide `/g/[slug]`

- Pagina pubblica data-driven (IT + EN), `noindex`, 404 per guide in bozza/inesistenti.
- **Unificare il renderer** con quello della demo (`components/demo`, `data/demo-guide.ts`) per riusare
  i guardrail già coperti dagli e2e.

### FASE 5 — Legale e chiusura

- Privacy: dati account, magic link, database Neon (DPA), cookie `bg_session`.
- Cookie policy: già parla di GA4; aggiungere il cookie di sessione.
- QA finale completa, deploy, eventuale pulizia dati demo.

---

## 4. Stack e architettura

- **Next.js 16.4.2** (App Router, Turbopack, `cacheComponents: true`, proxy al posto di middleware).
- **Tailwind CSS 4** (design token SOLO in `app/globals.css` dentro `@theme`; niente colori hardcoded).
- **TypeScript**, **zod**, **Resend** (email), **iron-session**, **Drizzle ORM** + **Neon serverless**.
- **Playwright** per gli e2e (webServer: `npm run build && npm run start`).
- Auth scelta: magic link + iron-session (non Auth.js), coerente con l'esempio ufficiale Next 16
  (`node_modules/next/dist/docs/01-app/02-guides/authentication-with-cache-components.md`).

---

## 5. Comandi

```bash
npm run dev            # sviluppo (legge .env.local)
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run build          # build produzione
npm run test:e2e       # suite Playwright completa (72 test)
npm run db:push        # applica lo schema al DB Neon
npm run db:generate    # genera migrazioni Drizzle
npm run db:migrate     # applica migrazioni
npm run db:studio      # Drizzle Studio
```

Prima di consegnare (regola AGENTS.md): `typecheck`, `lint`, `build`, `test:e2e` — tutti verdi.

---

## 6. Variabili d'ambiente (segreti NON in questo file)

In `.env.local` (gitignored) e su **Vercel**:

| Variabile | Note |
|---|---|
| `DATABASE_URL` | Neon pooled, EU Francoforte. **Stesso DB in locale e in produzione.** |
| `SESSION_PASSWORD` | ≥32 caratteri; valore locale diverso da quello di produzione. |
| `ADMIN_EMAIL` | `info@benveniaguide.it` (account admin auto-creato al primo login). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-7H4LFGZQ66` (pubblico). |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` in locale; dominio produzione su Vercel. |
| `RESEND_API_KEY` | **DA CONFIGURARE** (senza, in dev le email sono simulate). |
| `LEAD_EMAIL_FROM` / `LEAD_NOTIFY_EMAIL_TO` | Mittente e destinatario delle email. |
| `LEAD_ALLOW_DEV_DELIVERY` | Solo dev/test: simula l'invio del form contatti. |
| `AUTH_ALLOW_DEV_LINK` | Solo test: abilita `/api/auth/dev-link`. **MAI in produzione.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console (già verificato). |

Su Vercel sono configurate: `DATABASE_URL`, `SESSION_PASSWORD`, `ADMIN_EMAIL`,
`NEXT_PUBLIC_GA_MEASUREMENT_ID` (+ quelle del sito). `AUTH_ALLOW_DEV_LINK` NON deve esserci.

Il dev-link e2e (`/api/auth/dev-link?email=...`) restituisce `{ ok, url }` solo se
`NODE_ENV !== "production"` oppure `AUTH_ALLOW_DEV_LINK === "true"`; in produzione reale risponde 404.

---

## 7. Mappa dei file principali

```
app/
  accedi/                  # login magic link (pagina, verifica, link non valido)
  area/                    # layout protetto, /area (cliente), /area/admin (pannello)
  api/auth/dev-link/       # helper e2e (gated)
  api/lead/                # API form contatti
  robots.ts, sitemap.ts    # SEO
components/
  auth/LoginForm.tsx
  area/AreaNav.tsx
  admin/                   # (FASE 2: NewClientForm, ClientsTable)
  demo/                    # demo interattiva, renderer da unificare in FASE 4
  forms/LeadForm.tsx
  ui/, layout/, home/ ...
lib/
  db/schema.ts, db/index.ts        # Drizzle + getDb() lazy
  auth/constants.ts, users.ts, tokens.ts, dal.ts, actions.ts
  session.ts               # iron-session
  emails.ts                # magic link (+ inviti in FASE 2)
  validation.ts            # schemi zod (+ clientInviteSchema in FASE 2)
  analytics.ts, rate-limit.ts, site.ts, metadata.ts
data/
  demo-guide.ts, risorse.ts, faq.ts ...   # contenuti editoriali
proxy.ts                   # guardia /area + rewrite 404 risorse
drizzle.config.ts
tests/e2e/                 # auth.spec, navigation.spec, home.spec, demo.spec, ...
```

---

## 8. Modello dati attuale

- **clients**: `id` (uuid), `name`, `slug` (unique), `status` (`draft` | `live`), `createdAt`, `updatedAt`.
- **users**: `id` (uuid), `email` (unique), `name`, `role` (`admin` | `client`), `clientId` (fk → clients, nullable).
- **magic_link_tokens**: `id`, `email`, `tokenHash` (unique), `expiresAt`, `usedAt`, `createdAt`.

Previste: `guide_content` (jsonb) e `requests` in FASE 3. Lo schema si applica con `npm run db:push`.

---

## 9. Trappole note (importante)

- **Next 16 è diverso**: prima di usare API nuove consulta `node_modules/next/dist/docs/`.
- Con `cacheComponents: true`:
  - niente `Date.now()` / `Math.random()` nel render server (usa costanti, es. `siteConfig.lastUpdated`);
  - i componenti che usano la DAL con `'use cache: private'` devono stare dentro `<Suspense>`;
  - le **Server Actions NON possono usare la DAL cachata**: serve una variante senza cache
    (`requireAdminForAction` in FASE 2);
  - i **route handler** che leggono env/cookie vanno resi dinamici con `await connection()` da `next/server`
    (senza, Next li prerenderizza al build: è già successo con `/api/auth/dev-link`).
- Dopo le mutazioni usa `revalidatePath` (invariato in Next 16 e ok con cacheComponents).
- **DB condiviso locale/produzione**: gli e2e scrivono sul DB reale di produzione. Usa marker `e2e-%`
  e il teardown; valuta un branch Neon per i test.
- Il target del rewrite `/risorse-slug-non-trovato` deve restare **non routabile**.
- GA4: nessuno script senza consenso. Hit headless scartate come bot: verifica con browser reale/DebugView.
- Ambiente Windows/PowerShell; `rg` non è disponibile.

---

## 10. Cronologia git e deploy

- `70015c2` — Google Analytics 4: caricamento solo con consenso e test e2e dedicati
- `2821689` — Area riservata fase 1 (magic link, sessioni, Neon + Drizzle, guardia /area, e2e)
- `11018d0` — Privacy e cookie policy definitive senza dati societari
- `93100b2` — 404 reali per slug inesistenti di /risorse (rewrite proxy)
- `f64cbe4` — batch SEO/risorse precedente

Stato produzione verificato (18/10/2026): login reale admin funzionante, GA4 attivo con consenso,
72/72 test e2e verdi. Albero git pulito.

---

## 11. Come ripartire in 5 mosse

1. `npm install` (se serve) e controlla che `.env.local` esista (chiedi i valori, non sono nel repo).
2. `npm run dev` e verifica `/accedi` con `info@benveniaguide.it`.
3. Apri questo file alla sezione **FASE 2** e implementa i punti nell'ordine indicato.
4. QA: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`.
5. Commit + push; poi test manuale in produzione (crea un cliente, invito, login).
