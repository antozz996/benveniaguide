import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Contatti Benvenia Guide — richiedi una demo per la tua struttura";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Contatti",
    title: "Richiedi una demo della tua Guest Guide.",
  });
}
