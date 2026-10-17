import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cornice smartphone elegante per la Guest Guide demo.
 * Lo "schermo" contiene l'app mobile realmente navigabile.
 */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  label,
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("relative mx-auto w-[300px] shrink-0 sm:w-[345px]", className)}
      role="group"
      aria-label={label}
    >
      <div className="rounded-[2.75rem] border border-forest/10 bg-forest p-2.5 shadow-lift">
        <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded-[2.15rem] bg-ivory",
            "h-[560px] sm:h-[620px]",
            screenClassName,
          )}
        >
          {children}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-forest"
      />
    </div>
  );
}
