'use client';

import { useEffect, useRef, useState } from 'react';

const tidioPublicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY || 'quutayvjemteby8it3qjt5m7o0tdib7w';
const FALLBACK_DELAY_MS = 3000;
const DEV_LOGS = process.env.NODE_ENV !== 'production';
const TIDIO_SCRIPT_ID = 'tidio-chat-widget';
const TIDIO_SCRIPT_SRC = `https://code.tidio.co/${tidioPublicKey}.js`;

const TIDIO_VISIBLE_SELECTORS = [
  '#tidio-chat',
  '#tidio-chat iframe',
  'iframe[src*="tidio.co"]',
  'iframe[title*="chat" i]',
  'iframe[title*="tidio" i]',
];

function isElementVisible(element: Element | null) {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  const bounds = element.getBoundingClientRect();

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    bounds.width > 0 &&
    bounds.height > 0
  );
}

function logTidioDebug(message: string, details?: Record<string, unknown>) {
  if (!DEV_LOGS) return;

  // eslint-disable-next-line no-console
  console.info(message, details ?? '');
}

function hasVisibleTidioLauncher() {
  if (window.tidioChatApi) {
    const tidioHost = document.querySelector('#tidio-chat');
    if (isElementVisible(tidioHost)) return true;
  }

  return TIDIO_VISIBLE_SELECTORS.some((selector) =>
    Array.from(document.querySelectorAll(selector)).some((node) => isElementVisible(node)),
  );
}

export default function TidioChat() {
  const [showFallback, setShowFallback] = useState(false);
  const [showFallbackActions, setShowFallbackActions] = useState(false);
  const retryCountRef = useRef(0);

  useEffect(() => {
    if (!tidioPublicKey) return undefined;

    const trackChatOpen = () => {
      window.dataLayer?.push({
        event: 'tidio_chat_open',
        event_category: 'chat',
        event_label: 'Tidio chat opened',
      });
      window.gtag?.('event', 'tidio_chat_open', {
        event_category: 'chat',
        event_label: 'Tidio chat opened',
      });
    };

    document.addEventListener('tidioChat-open', trackChatOpen);
    return () => document.removeEventListener('tidioChat-open', trackChatOpen);
  }, []);

  useEffect(() => {
    if (!tidioPublicKey) return undefined;

    logTidioDebug('Tidio diagnostics', {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      publicKey: tidioPublicKey,
    });

    const evaluateTidioState = () => {
      const visibleLauncher = hasVisibleTidioLauncher();

      if (visibleLauncher) {
        setShowFallback((currentValue) => (currentValue ? false : currentValue));
        setShowFallbackActions((currentValue) => (currentValue ? false : currentValue));
        return;
      }

      setShowFallback((currentValue) => {
        if (!currentValue) {
          logTidioDebug('Fallback launcher displayed');
        }

        return true;
      });
    };

    const timeoutId = window.setTimeout(evaluateTidioState, FALLBACK_DELAY_MS);

    const observer = new MutationObserver(() => {
      evaluateTidioState();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleFallbackAction = () => {
    if (window.tidioChatApi?.open) {
      window.tidioChatApi.open();
      window.setTimeout(() => {
        if (!hasVisibleTidioLauncher()) {
          setShowFallbackActions(true);
        }
      }, 500);
      return;
    }

    setShowFallbackActions((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (!tidioPublicKey) return undefined;

    let cancelled = false;

    const ensureVisible = () => {
      window.tidioChatApi?.show?.();
    };

    const attachReadyHandler = () => {
      if (!window.tidioChatApi) return false;

      logTidioDebug('tidioChatApi available');
      window.tidioChatApi.on?.('ready', ensureVisible);
      ensureVisible();
      return true;
    };

    const injectScript = () => {
      if (cancelled) return;

      const existingScript = document.getElementById(TIDIO_SCRIPT_ID) as HTMLScriptElement | null;

      if (existingScript) {
        const existingStatus = existingScript.dataset.tidioStatus;

        if (existingStatus === 'loaded') {
          attachReadyHandler();
          return;
        }

        if (existingStatus === 'loading') {
          return;
        }

        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = TIDIO_SCRIPT_ID;
      script.async = true;
      script.src = TIDIO_SCRIPT_SRC;
      script.dataset.tidioStatus = 'loading';

      script.onload = () => {
        if (cancelled) return;

        script.dataset.tidioStatus = 'loaded';
        logTidioDebug('Tidio script loaded');
        attachReadyHandler();
      };

      script.onerror = () => {
        if (cancelled) return;

        script.dataset.tidioStatus = 'error';
        logTidioDebug('Tidio script failed to load');

        if (retryCountRef.current < 1) {
          retryCountRef.current += 1;
          script.remove();
          window.setTimeout(injectScript, 1000);
          return;
        }

        setShowFallback(true);
      };

      document.head.appendChild(script);
      logTidioDebug('Tidio script injected', { src: script.src });
    };

    injectScript();

    const readyPollId = window.setInterval(() => {
      if (attachReadyHandler()) {
        window.clearInterval(readyPollId);
      }
    }, 250);

    const readyPollTimeoutId = window.setTimeout(() => window.clearInterval(readyPollId), 10000);

    return () => {
      cancelled = true;
      window.clearInterval(readyPollId);
      window.clearTimeout(readyPollTimeoutId);
    };
  }, []);

  if (!tidioPublicKey) return null;

  return (
    <>
      {showFallback && (
        <div className="fixed bottom-[calc(168px+env(safe-area-inset-bottom))] right-4 z-[999999] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
          {showFallbackActions && (
            <div className="w-[min(20rem,calc(100vw-3rem))] rounded-3xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700 shadow-2xl">
              <p className="font-semibold text-neutral-900">We’re here to help</p>
              <p className="mt-1 text-neutral-600">If chat is unavailable, reach us directly:</p>
              <div className="mt-3 space-y-2">
                <a className="block rounded-2xl bg-neutral-100 px-4 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-200" href="/contact">
                  Contact form
                </a>
                <a className="block rounded-2xl bg-neutral-100 px-4 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-200" href="tel:+19498783250">
                  Call (949) 878-3250
                </a>
                <a className="block rounded-2xl bg-neutral-100 px-4 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-200" href="mailto:info@apexdesign.com">
                  Email info@apexdesign.com
                </a>
              </div>
            </div>
          )}
          <button
            type="button"
            aria-label="Chat with Apex Remodeling"
            title="Chat with Apex Remodeling"
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/30"
            onClick={() => {
              window.dataLayer?.push({
                event: 'chat_fallback_click',
                event_category: 'chat',
                event_label: 'Fallback chat button',
              });
              window.gtag?.('event', 'chat_fallback_click', {
                event_category: 'chat',
                event_label: 'Fallback chat button',
              });
              handleFallbackAction();
            }}
          >
            <svg
              aria-hidden="true"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
