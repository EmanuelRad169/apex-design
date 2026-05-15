'use client';

import Link from 'next/link';

const PHONE = 'tel:9494320359';

function scrollToEstimate() {
  const el = document.getElementById('get-estimate');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = '/contact';
  }
}

function track(event: string) {
  window.dataLayer?.push({ event, event_category: 'service_cta', event_label: event });
  window.gtag?.('event', event, { event_category: 'service_cta', event_label: event });
}

interface ServiceCtaCardProps {
  /** Compact layout for mobile inline use */
  compact?: boolean;
}

export default function ServiceCtaCard({ compact = false }: ServiceCtaCardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-100 bg-white shadow-xl ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      {!compact && (
        <>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
            Free Consultation
          </p>
          <h3 className="mb-2 text-xl font-bold text-primary">
            Ready to get started?
          </h3>
          <p className="mb-5 text-sm leading-6 text-neutral-600">
            Get a no-pressure in-home estimate from Orange County's trusted remodeling team.
          </p>
        </>
      )}

      {/* Primary CTA: Estimate */}
      <button
        type="button"
        onClick={() => { track('service_cta_estimate_click'); scrollToEstimate(); }}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-center font-bold text-white shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F4841A]/30 active:scale-[0.98]"
        style={{ backgroundColor: '#F4841A', minHeight: 48 }}
      >
        <EstimateIcon />
        Request a Free Estimate
      </button>

      {/* Secondary CTA: Call */}
      <Link
        href={PHONE}
        onClick={() => track('service_cta_call_click')}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-center font-bold transition-colors hover:bg-[#0B2E47] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2E47]/30"
        style={{ borderColor: '#0B2E47', color: '#0B2E47', minHeight: 48 }}
      >
        <PhoneIcon />
        Call Apex Remodeling Today
      </Link>

      {/* Trust line */}
      {!compact && (
        <p className="mt-5 text-center text-xs leading-5 text-neutral-400">
          Licensed • Bonded • Orange County Local
        </p>
      )}

      {compact && (
        <p className="mt-3 text-center text-xs text-neutral-400">
          Licensed • Bonded • Orange County Local
        </p>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 flex-shrink-0"
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
      className="h-4 w-4 flex-shrink-0"
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
