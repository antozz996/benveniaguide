import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Prezzi Benvenia Guide — da €49, una tantum, nessun abbonamento";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Prezzi",
    title: "Paghi una volta. Nessun abbonamento. Da €49.",
  });
}
