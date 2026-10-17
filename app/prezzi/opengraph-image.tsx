import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Prezzi Benvenia Guide — offerta su misura, senza listini preconfezionati";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Prezzi",
    title: "Un'offerta costruita sul tuo caso, non su un listino.",
  });
}
