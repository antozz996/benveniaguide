import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Come funziona Benvenia Guide — dalla call alla guida nelle mani degli ospiti";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Come funziona",
    title: "Tre passaggi per la guida della tua struttura.",
  });
}
