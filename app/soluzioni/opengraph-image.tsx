import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Soluzioni Benvenia Guide per B&B, case vacanza, boutique hotel e property manager";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Soluzioni",
    title: "Una guida per ogni modo di accogliere.",
  });
}
