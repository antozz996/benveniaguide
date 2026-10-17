import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Percorso di navigazione" className={cn(className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-xs",
          tone === "dark" ? "text-ivory/60" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight aria-hidden="true" className="h-3 w-3 opacity-60" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded transition-colors",
                    tone === "dark"
                      ? "hover:text-ivory"
                      : "hover:text-forest",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    tone === "dark" ? "text-ivory/85" : "text-forest/85",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
