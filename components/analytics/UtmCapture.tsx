"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureUtmParams } from "@/lib/analytics";

function UtmCaptureInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams();
  }, [searchParams]);

  return null;
}

/** Cattura i parametri UTM della sessione (first touch) per l'attribuzione campagne. */
export function UtmCapture() {
  return (
    <Suspense fallback={null}>
      <UtmCaptureInner />
    </Suspense>
  );
}
