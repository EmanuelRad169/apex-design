'use client';

import { useEffect, useRef, useState } from 'react';

const PHONE = 'tel:9494320359';
const PHONE_DISPLAY = '(949) 432-0359';

function track(event: string) {
  window.dataLayer?.push({ event, event_category: 'sticky_cta', event_label: event });
  window.gtag?.('event', event, { event_category: 'sticky_cta', event_label: event });
}

function scrollToEstimate() {
  const el = document.getElementById('get-estimate');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = '/contact';
  }
}

export default function StickyConversionBar() {
  const [mounted, setMounted] = useState(false);
  // Height of the cookie consent banner when visible, so we can slide above it
  const [cookieOffset, setCookieOffset] = useState(0);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    setMounted(true);

    const measureBanner = () => {
      // Cookie banner uses role="dialog" aria-label="Cookie consent"
      const banner = document.querySelector<HTMLElement>('[aria-label="Cookie consent"]');
      setCookieOffset(banner ? banner.getBoundingClientRect().height : 0);
    };

    measureBanner();

    observerRef.current = new MutationObserver(measureBanner);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    // Re-measure on resize (orientation change, etc.)
    window.addEventListener('resize', measureBanner);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('resize', measureBanner);
    };
  }, []);

  if (!mounted) return null;

  // Mobile bar sits above cookie banner; also respects iOS safe-area
  const mobileBottom = cookieOffset > 0 ? cookieOffset : 0;

  return (
    <>
      {/* ── Desktop: floating pill stack, lower-right ─────────────────
          z-50 keeps it below Tidio (z-[999999]) and cookie modal (z-[100])
          but above normal page content. 108px from bottom clears Tidio.  */}
      <div className="hidden lg:flex flex-col gap-3 fixed right-5 bottom-[108px] z-50">
        <a
          href={PHONE}
          onClick={() => track('sticky_call_click')}
          aria-label="Call Apex Remodeling Today"
          className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#0B2E47]/30 whitespace-nowrap"
          style={{ backgroundColor: '#0B2E47', minHeight: 44 }}
        >
          <PhoneIcon />
          Call Us Today
        </a>

        <button
          type="button"
          onClick={() => { track('sticky_free_estimate_click'); scrollToEstimate(); }}
          aria-label="Request a Free Estimate"
          className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#F4841A]/30 whitespace-nowrap"
          style={{ backgroundColor: '#F4841A', minHeight: 44 }}
        >
          <EstimateIcon />
          Free Estimate
        </button>
      </div>

      {/* ── Mobile: full-width sticky bottom bar ──────────────────────
          z-[80] — above page content and sticky bar (z-50), below cookie
          banner (z-[90]) and cookie modal (z-[100]).
          bottom offset pushes it above the cookie banner when visible.    */}
      <div
        className="lg:hidden fixed inset-x-0 z-[80] flex shadow-2xl transition-all duration-300"
        style={{
          bottom: mobileBottom,
          paddingBottom: cookieOffset > 0 ? 0 : 'env(safe-area-inset-bottom)',
        }}
      >
        <a
          href={PHONE}
          onClick={() => track('sticky_call_click')}
          aria-label={`Call Apex Remodeling at ${PHONE_DISPLAY}`}
          className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-white text-sm active:opacity-80"
          style={{ backgroundColor: '#0B2E47', minHeight: 56 }}
        >
          <PhoneIcon />
          Call Now
        </a>

        <div className="w-px bg-white/20 flex-shrink-0" />

        <button
          type="button"
          onClick={() => { track('sticky_free_estimate_click'); scrollToEstimate(); }}
          aria-label="Request a Free Estimate"
          className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-white text-sm active:opacity-80"
          style={{ backgroundColor: '#F4841A', minHeight: 56 }}
        >
          <EstimateIcon />
          Free Estimate
        </button>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 21.7 16l.22.92Z" />
    </svg>
  );
}

function EstimateIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
