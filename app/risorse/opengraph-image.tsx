import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt =
  "Risorse Benvenia Guide — idee e guide pratiche per chi accoglie";

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Risorse",
    title: "Idee e guide pratiche per chi accoglie.",
  });
}
