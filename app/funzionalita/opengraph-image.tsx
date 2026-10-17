import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Funzionalità di Benvenia Guide — cosa può contenere la tua Guest Guide";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Funzionalità",
    title: "Tutto ciò che l'ospite cerca, in un unico posto.",
  });
}
