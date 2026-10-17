import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Demo interattiva di una Guest Guide Benvenia — struttura dimostrativa";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Demo interattiva",
    title: "Prova una Guest Guide come la vedrà il tuo ospite.",
  });
}
