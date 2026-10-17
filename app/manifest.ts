import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.productName} — Guest Guide digitale per la tua struttura`,
    short_name: siteConfig.productName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5ee",
    theme_color: "#152f2b",
    lang: "it",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
