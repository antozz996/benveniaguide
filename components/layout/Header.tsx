"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { mainNavigation, ctas } from "@/lib/site";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState<{
    pathname: string;
    open: boolean;
  }>({ pathname, open: false });
  // Il menu si chiude da solo quando cambia pagina: lo stato è legato al
  // pathname con cui è stato aperto, senza effect di sincronizzazione.
  const open = menuState.open && menuState.pathname === pathname;
  const setOpen = useCallback(
    (value: boolean) => setMenuState({ pathname, open: value }),
    [pathname],
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-line bg-ivory/92 shadow-[0_8px_30px_-24px_rgb(21_47_43/0.4)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8">
        <Logo />

        <nav aria-label="Navigazione principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-2.5 py-2 text-sm font-medium transition-colors xl:px-3.5",
                    isActive(item.href)
                      ? "bg-forest/8 text-forest"
                      : "text-charcoal/75 hover:bg-forest/5 hover:text-forest",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ctas.primary.href}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.ctaClick, {
                cta: "header_demo",
                destination: ctas.primary.href,
              })
            }
            className="hidden items-center gap-1.5 rounded-full bg-forest px-4.5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-colors hover:bg-forest-700 sm:inline-flex"
          >
            {ctas.primary.label}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/8 lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-line bg-ivory px-5 pt-6 pb-10 lg:hidden"
        >
          <nav aria-label="Navigazione mobile">
            <ul className="flex flex-col gap-1">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-2xl px-4 py-3.5 font-display text-xl font-semibold transition-colors",
                      isActive(item.href)
                        ? "bg-sage-100 text-forest"
                        : "text-charcoal hover:bg-forest/5",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={ctas.primary.href}
              onClick={() => {
                setOpen(false);
                trackEvent(ANALYTICS_EVENTS.ctaClick, {
                  cta: "mobile_menu_demo",
                  destination: ctas.primary.href,
                });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-base font-medium text-ivory shadow-soft"
            >
              {ctas.primary.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href={ctas.secondary.href}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/25 px-6 py-3.5 text-base font-medium text-forest"
            >
              {ctas.secondary.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
