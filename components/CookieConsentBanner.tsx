'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ConsentValue = 'granted' | 'denied';

type ConsentState = {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
  functionality_storage: 'granted';
  security_storage: 'granted';
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ApexConsent?: {
      open: () => void;
      accept: () => void;
      reject: () => void;
    };
  }

  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

const COOKIE_NAME = 'apex_consent';

const buildConsentState = (analytics: boolean, advertising: boolean): ConsentState => ({
  ad_storage: advertising ? 'granted' : 'denied',
  ad_user_data: advertising ? 'granted' : 'denied',
  ad_personalization: advertising ? 'granted' : 'denied',
  analytics_storage: analytics ? 'granted' : 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
});

const applyGpc = (state: ConsentState): ConsentState => {
  if (typeof navigator !== 'undefined' && navigator.globalPrivacyControl) {
    return {
      ...state,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    };
  }

  return state;
};

const getCookie = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
};

const writeConsentCookie = (state: ConsentState) => {
  const maxAge = 60 * 60 * 24 * 395;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
};

export default function CookieConsentBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);

  const updateConsent = (state: ConsentState) => {
    const finalState = applyGpc(state);
    window.gtag?.('consent', 'update', finalState);
    writeConsentCookie(finalState);
    setAnalyticsEnabled(finalState.analytics_storage === 'granted');
    setAdvertisingEnabled(finalState.ad_storage === 'granted');
    setIsBannerVisible(false);
    setIsModalOpen(false);
  };

  const acceptAll = () => updateConsent(buildConsentState(true, true));
  const rejectAll = () => updateConsent(buildConsentState(false, false));
  const savePreferences = () => updateConsent(buildConsentState(analyticsEnabled, advertisingEnabled));

  const openPreferences = () => {
    setIsBannerVisible(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const existingCookie = getCookie();

    if (!existingCookie) {
      setIsBannerVisible(true);
    } else {
      try {
        const savedState = applyGpc(JSON.parse(decodeURIComponent(existingCookie)) as ConsentState);
        setAnalyticsEnabled(savedState.analytics_storage === 'granted');
        setAdvertisingEnabled(savedState.ad_storage === 'granted');
      } catch {
        setIsBannerVisible(true);
      }
    }

    window.ApexConsent = {
      open: openPreferences,
      accept: acceptAll,
      reject: rejectAll,
    };

    return () => {
      delete window.ApexConsent;
    };
    // The public API should be registered once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isBannerVisible && !isModalOpen) {
    return null;
  }

  return (
    <>
      {isBannerVisible && !isModalOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4"
          role="dialog"
          aria-modal="false"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 rounded-lg border border-white/10 bg-[#0f172a] p-4 text-white shadow-2xl sm:p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-white/90 md:max-w-3xl">
              We use cookies to run this site, measure traffic, and improve our advertising. You can accept all, reject all, or customize your choices. See our{' '}
              <Link href="/privacy-policy" className="font-semibold text-[#f97316] underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col gap-2 min-[600px]:flex-row">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-md border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-md border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-md bg-[#f97316] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 px-4 py-6 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="w-full max-w-2xl rounded-lg bg-white shadow-2xl"
          >
            <div className="border-b border-gray-200 p-5 sm:p-6">
              <h2 id="cookie-preferences-title" className="text-xl font-bold text-primary">
                Cookie Preferences
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Manage how Apex Design Build & Remodel uses cookies for analytics and advertising. Strictly necessary cookies stay on so the site can work.
              </p>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Strictly Necessary</h3>
                  <p className="text-sm text-gray-600">Required for site functionality and security.</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">Always On</span>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
                <span>
                  <span className="block font-semibold text-gray-900">Analytics</span>
                  <span className="block text-sm text-gray-600">Allows GA4 to measure traffic and site performance.</span>
                </span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  className="h-5 w-5 accent-[#f97316]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
                <span>
                  <span className="block font-semibold text-gray-900">Advertising</span>
                  <span className="block text-sm text-gray-600">Allows Google Ads storage, user data, and personalization signals.</span>
                </span>
                <input
                  type="checkbox"
                  checked={advertisingEnabled}
                  disabled={typeof navigator !== 'undefined' && navigator.globalPrivacyControl}
                  onChange={(event) => setAdvertisingEnabled(event.target.checked)}
                  className="h-5 w-5 accent-[#f97316] disabled:cursor-not-allowed disabled:opacity-40"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-200 p-5 min-[600px]:flex-row min-[600px]:justify-end sm:p-6">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-md bg-[#f97316] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
