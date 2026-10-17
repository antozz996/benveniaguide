import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { footerNavigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">
              {siteConfig.description}
            </p>
            <p className="mt-6 rounded-2xl border border-ivory/15 bg-ivory/5 px-4 py-3 text-xs leading-relaxed text-ivory/60">
              La Guest Guide presente su questo sito è una dimostrazione:
              struttura, nomi e contenuti sono fittizi.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNavigation.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-xs font-semibold tracking-[0.18em] text-copper uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/12 pt-8 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.productName}. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-ivory"
            >
              Cookie policy
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
