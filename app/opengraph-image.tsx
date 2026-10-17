import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Benvenia Guide — la Guest Guide digitale per la tua struttura ricettiva";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Guest Guide digitale",
    title: "L'accoglienza migliore continua oltre il check-in.",
  });
}
