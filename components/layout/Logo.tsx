import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md",
        className,
      )}
      aria-label="Benvenia Guide — torna alla home"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <rect
          width="32"
          height="32"
          rx="10"
          className={tone === "dark" ? "fill-ivory" : "fill-forest"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 6.8c-4.9 0-8.9 4-8.9 8.9V25.2h5.6V15.9c0-1.8 1.5-3.3 3.3-3.3s3.3 1.5 3.3 3.3v9.3h5.6V15.7C24.9 10.8 20.9 6.8 16 6.8Z"
          className={tone === "dark" ? "fill-forest" : "fill-ivory"}
        />
        <circle
          cx="16"
          cy="27.4"
          r="1.7"
          className="fill-copper"
        />
      </svg>
      <span
        className={cn(
          "font-display text-lg leading-none font-bold tracking-tight",
          tone === "dark" ? "text-ivory" : "text-forest",
        )}
      >
        Benvenia{" "}
        <span
          className={cn(
            "font-semibold",
            tone === "dark" ? "text-copper" : "text-copper-700",
          )}
        >
          Guide
        </span>
      </span>
    </Link>
  );
}
