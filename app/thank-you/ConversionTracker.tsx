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

    // Priority 1: explicit query param (direct visits, future Netlify changes)
    let form = searchParams.get("form");

    // Priority 2: referrer pathname fallback (Netlify strips query string on redirect)
    if (!form) {
      try {
        const referrerPath = new URL(document.referrer).pathname;
        if (/^\/contact\/?$/.test(referrerPath)) {
          form = "contact";
        } else if (referrerPath === "/" || referrerPath === "") {
          form = "estimate";
        }
        // else: unknown source — do not fire
      } catch {
        // document.referrer is empty or not a valid URL — do not fire
      }
    }

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
  }, [searchParams]);

  return null;
}

export default function ConversionTracker() {
  return (
    <Suspense fallback={null}>
      <ConversionTrackerInner />
    </Suspense>
  );
}
