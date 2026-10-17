interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Structured data JSON-LD.
 * Il payload viene sanificato sostituendo "<" con \u003c per prevenire XSS.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
