'use client';

import { useEffect, useRef, useState } from 'react';

const PHONE = 'tel:9494320359';

function track(event: string) {
  window.dataLayer?.push({ event, event_category: 'floating_cta', event_label: event });
  window.gtag?.('event', event, { event_category: 'floating_cta', event_label: event });
}

function scrollToEstimate() {
  const el = document.getElementById('estimate-form') || document.getElementById('get-estimate');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = '/contact';
  }
}

export default function StickyConversionBar() {
  const [mounted, setMounted] = useState(false);
  const [cookieOffset, setCookieOffset] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    setMounted(true);

    const measureBanner = () => {
      const banner = document.querySelector<HTMLElement>('[aria-label="Cookie consent"]');
      if (!banner) {
        setCookieOffset(0);
        return;
      }

      const rect = banner.getBoundingClientRect();
      const styles = window.getComputedStyle(banner);
      const isVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && rect.height > 0;
      setCookieOffset(isVisible ? Math.ceil(window.innerHeight - rect.top) : 0);
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

  const mobileBaseOffset = cookieOffset > 0 ? cookieOffset + 16 : 12;
  const mobileBottom = `calc(${mobileBaseOffset}px + env(safe-area-inset-bottom))`;

  return (
    <>
      <aside
        aria-label="Ready to get started?"
        data-floating-cta="desktop"
        className="hidden fixed left-6 z-[60] w-[min(320px,calc(100vw-48px))] rounded-2xl border border-neutral-100 bg-white text-[#0B2E47] shadow-2xl lg:block"
        style={{ bottom: 24 }}
      >
        <button
          type="button"
          onClick={() => setIsMinimized((value) => !value)}
          className="absolute right-3 top-3 rounded-full p-2 text-[#0B2E47]/55 transition-colors hover:bg-neutral-100 hover:text-[#0B2E47] focus:outline-none focus:ring-2 focus:ring-[#F4841A]/40"
          aria-label={isMinimized ? 'Expand estimate box' : 'Minimize estimate box'}
        >
          {isMinimized ? <ExpandIcon /> : <MinimizeIcon />}
        </button>

        <div className={isMinimized ? 'p-4 pr-12' : 'p-5 pr-12'}>
          {isMinimized ? (
            <button
              type="button"
              onClick={() => { track('floating_estimate_click'); scrollToEstimate(); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4841A] px-4 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F4841A]/30"
            >
              <EstimateIcon />
              Free Estimate
            </button>
          ) : (
            <>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#F4841A]">Free Consultation</p>
              <h2 className="mb-2 text-xl font-extrabold leading-tight">Ready to get started?</h2>
              <p className="mb-5 text-sm leading-6 text-neutral-600">
                Get a no-pressure in-home estimate from Orange County's trusted remodeling team.
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => { track('floating_estimate_click'); scrollToEstimate(); }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4841A] px-5 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F4841A]/30"
                >
                  <EstimateIcon />
                  Get Free Estimate
                </button>
                <a
                  href={PHONE}
                  onClick={() => track('floating_call_click')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0B2E47] px-5 py-3 text-sm font-bold text-[#0B2E47] transition-colors hover:bg-[#0B2E47] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2E47]/20"
                >
                  <PhoneIcon />
                  Call Us Today
                </a>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-neutral-400">
                Licensed • Bonded • Orange County Local
              </p>
            </>
          )}
        </div>
      </aside>

      <aside
        aria-label="Ready to get started?"
        data-floating-cta="mobile"
        className="fixed inset-x-3 z-[70] rounded-2xl border border-neutral-100 bg-white p-3 text-[#0B2E47] shadow-2xl transition-all duration-300 lg:hidden"
        style={{ bottom: mobileBottom }}
      >
        <button
          type="button"
          onClick={() => setIsMinimized((value) => !value)}
          className="absolute right-2 top-2 rounded-full p-2 text-[#0B2E47]/55 transition-colors hover:bg-neutral-100 hover:text-[#0B2E47] focus:outline-none focus:ring-2 focus:ring-[#F4841A]/40"
          aria-label={isMinimized ? 'Expand estimate box' : 'Minimize estimate box'}
        >
          {isMinimized ? <ExpandIcon /> : <MinimizeIcon />}
        </button>

        {isMinimized ? (
          <button
            type="button"
            onClick={() => { track('floating_estimate_click'); scrollToEstimate(); }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4841A] px-4 py-3 text-sm font-bold text-white shadow-md active:opacity-90"
          >
            <EstimateIcon />
            Request a Free Estimate
          </button>
        ) : (
          <div className="pr-9">
            <h2 className="mb-1 text-base font-extrabold">Ready to get started?</h2>
            <p className="mb-3 text-xs leading-5 text-neutral-600">
              Free in-home remodeling consultation.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { track('floating_estimate_click'); scrollToEstimate(); }}
                className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[#F4841A] px-3 py-3 text-xs font-bold text-white shadow-md active:opacity-90"
              >
                <EstimateIcon />
                Estimate
              </button>
              <a
                href={PHONE}
                onClick={() => track('floating_call_click')}
                className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl border-2 border-[#0B2E47] px-3 py-3 text-xs font-bold text-[#0B2E47] active:bg-[#0B2E47] active:text-white"
              >
                <PhoneIcon />
                Call Today
              </a>
            </div>
          </div>
        )}
      </aside>
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

function MinimizeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M6 12h12" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M12 6v12M6 12h12" />
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
