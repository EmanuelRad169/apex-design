"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ESTIMATE_LABEL = "HAHKCKCcwqccEI-nz8RD";
const CONTACT_LABEL = "NAPqCOzv2qccEI-nz8RD";

function ConversionTrackerInner() {
  const searchParams = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const form = searchParams.get("form");
    if (form === "estimate") {
      window.gtag?.("event", "conversion", {
        send_to: `AW-18129081231/${ESTIMATE_LABEL}`,
        value: 50.0,
        currency: "USD",
      });
    } else if (form === "contact") {
      window.gtag?.("event", "conversion", {
        send_to: `AW-18129081231/${CONTACT_LABEL}`,
        value: 50.0,
        currency: "USD",
      });
    }
  }, []);

  return null;
}

export default function ConversionTracker() {
  return (
    <Suspense fallback={null}>
      <ConversionTrackerInner />
    </Suspense>
  );
}
