import type { PlaceArt as PlaceArtKind } from "@/data/demo-guide";
import { cn } from "@/lib/utils";

const gradients: Record<PlaceArtKind, string> = {
  lake: "bg-gradient-to-br from-sage-100 via-sage to-forest-700",
  village: "bg-gradient-to-br from-[#ead9c6] via-copper to-copper-700",
  hills: "bg-gradient-to-br from-sage-100 to-sage",
  garden: "bg-gradient-to-br from-[#f0f4ea] to-[#c2d3ba]",
  table: "bg-gradient-to-br from-[#f4e7db] to-copper",
  coffee: "bg-gradient-to-br from-[#f0e2d2] to-[#a06f4d]",
  gelato: "bg-gradient-to-br from-[#f7ebef] to-[#d8b3a2]",
  boat: "bg-gradient-to-br from-[#e2eae0] to-forest-800",
  market: "bg-gradient-to-br from-[#f2e5d1] to-[#b98563]",
  path: "bg-gradient-to-br from-[#e9efdc] to-[#8ba077]",
};

function Shapes({ kind }: { kind: PlaceArtKind }) {
  switch (kind) {
    case "lake":
      return (
        <>
          <circle cx="88" cy="22" r="9" fill="rgba(248,245,238,0.9)" />
          <path d="M0 50 Q30 44 60 50 T120 50 V80 H0 Z" fill="rgba(21,47,43,0.32)" />
          <path d="M0 61 Q30 55 60 61 T120 61 V80 H0 Z" fill="rgba(21,47,43,0.5)" />
        </>
      );
    case "village":
      return (
        <>
          <path d="M12 58 30 42l18 16v22H12Z" fill="rgba(21,47,43,0.28)" />
          <path d="M52 62 74 40l22 22v16H52Z" fill="rgba(248,245,238,0.5)" />
          <path d="M85 30v-8h6v12z" fill="rgba(21,47,43,0.4)" />
        </>
      );
    case "hills":
      return (
        <>
          <circle cx="78" cy="24" r="8" fill="rgba(248,245,238,0.85)" />
          <path d="M0 66 Q30 40 60 58 T120 54 V80 H0 Z" fill="rgba(21,47,43,0.3)" />
          <path d="M0 74 Q40 58 80 70 T120 68 V80 H0 Z" fill="rgba(21,47,43,0.42)" />
        </>
      );
    case "garden":
      return (
        <>
          <circle cx="30" cy="34" r="10" fill="rgba(185,133,99,0.55)" />
          <circle cx="58" cy="50" r="12" fill="rgba(248,245,238,0.6)" />
          <circle cx="88" cy="30" r="8" fill="rgba(185,133,99,0.45)" />
          <path d="M0 68 H120 V80 H0 Z" fill="rgba(21,47,43,0.28)" />
        </>
      );
    case "table":
      return (
        <>
          <circle cx="60" cy="42" r="22" fill="rgba(248,245,238,0.75)" />
          <circle cx="60" cy="42" r="14" fill="rgba(185,133,99,0.5)" />
          <path d="M14 68 H106" stroke="rgba(21,47,43,0.35)" strokeWidth="3" />
          <path d="M30 20v10M90 22v10" stroke="rgba(21,47,43,0.3)" strokeWidth="3" />
        </>
      );
    case "coffee":
      return (
        <>
          <path d="M42 34h34v22a12 12 0 0 1-12 12H54a12 12 0 0 1-12-12Z" fill="rgba(248,245,238,0.85)" />
          <path d="M76 40h6a8 8 0 0 1 0 16h-6" fill="none" stroke="rgba(248,245,238,0.85)" strokeWidth="4" />
          <path d="M50 22c0-4 4-4 4-8M60 22c0-4 4-4 4-8" stroke="rgba(248,245,238,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      );
    case "gelato":
      return (
        <>
          <circle cx="60" cy="34" r="14" fill="rgba(185,133,99,0.6)" />
          <circle cx="47" cy="42" r="12" fill="rgba(248,245,238,0.85)" />
          <circle cx="72" cy="42" r="12" fill="rgba(166,183,164,0.8)" />
          <path d="M60 50v20l-6-14M60 70l6-14" stroke="rgba(21,47,43,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "boat":
      return (
        <>
          <circle cx="84" cy="22" r="8" fill="rgba(248,245,238,0.85)" />
          <path d="M60 18 38 58h22Z" fill="rgba(248,245,238,0.85)" />
          <path d="M62 24 80 58H62Z" fill="rgba(248,245,238,0.6)" />
          <path d="M30 62h60l-8 12H38Z" fill="rgba(21,47,43,0.45)" />
          <path d="M0 56 Q30 50 60 56 T120 56 V80 H0 Z" fill="rgba(21,47,43,0.3)" />
        </>
      );
    case "market":
      return (
        <>
          <path d="M18 34h84v10H18Z" fill="rgba(248,245,238,0.7)" />
          <path d="M18 34c6-10 18-10 24 0 6-10 18-10 24 0 6-10 18-10 24 0h12v10H18Z" fill="rgba(185,133,99,0.75)" />
          <path d="M28 46v22h18V46Z" fill="rgba(21,47,43,0.3)" />
          <path d="M56 46v22h18V46Z" fill="rgba(21,47,43,0.42)" />
          <path d="M84 46v22h14V46Z" fill="rgba(21,47,43,0.3)" />
        </>
      );
    case "path":
      return (
        <>
          <circle cx="26" cy="22" r="7" fill="rgba(248,245,238,0.85)" />
          <path d="M0 80 Q30 52 60 62 T120 50" fill="none" stroke="rgba(248,245,238,0.75)" strokeWidth="7" strokeLinecap="round" />
          <path d="M0 80 Q30 58 60 66 T120 56" fill="none" stroke="rgba(21,47,43,0.3)" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" />
        </>
      );
  }
}

/**
 * Illustrazioni astratte generate in CSS/SVG per luoghi demo.
 * Nessuna fotografia stock: coerenti con la palette del brand.
 */
export function PlaceArt({
  kind,
  className,
}: {
  kind: PlaceArtKind;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-2xl",
        gradients[kind],
        className,
      )}
    >
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <Shapes kind={kind} />
      </svg>
    </div>
  );
}
