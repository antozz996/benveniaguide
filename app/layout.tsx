import type { Metadata } from "next";
import { Analytics } from "@/components/analytics/Analytics";
import { UtmCapture } from "@/components/analytics/UtmCapture";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/lib/structured-data";
import { fraunces, inter, manrope } from "@/lib/fonts";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.productName} — La Guest Guide digitale per la tua struttura`,
    template: `%s · ${siteConfig.productName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.productName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.productName,
    title: `${siteConfig.productName} — La Guest Guide digitale per la tua struttura`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.productName} — La Guest Guide digitale per la tua struttura`,
    description: siteConfig.description,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenuto"
          className="sr-only rounded-full bg-forest px-5 py-3 text-sm font-medium text-ivory focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
        >
          Salta al contenuto
        </a>
        <Header />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <UtmCapture />
        <Analytics />
        <StructuredData />
      </body>
    </html>
  );
}
