'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const tidioPublicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY || 'quutayvjemteby8it3qjt5m7o0tdib7w';
const isProduction = process.env.NODE_ENV === 'production';

export default function TidioChat() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!isProduction || !tidioPublicKey) return undefined;

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
    if (!isProduction || !tidioPublicKey) return undefined;

    const hasMountedTidio = () =>
      Boolean(window.tidioChatApi) ||
      Boolean(document.querySelector('#tidio-chat, iframe[src*="tidio.co"]'));

    const timeoutId = window.setTimeout(() => {
      setShowFallback(!hasMountedTidio());
    }, 6000);

    const observer = new MutationObserver(() => {
      if (hasMountedTidio()) {
        setShowFallback(false);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleTidioLoad = () => {
    const ensureVisible = () => {
      window.tidioChatApi?.show?.();
    };

    if (window.tidioChatApi) {
      window.tidioChatApi.on?.('ready', ensureVisible);
      ensureVisible();
    } else {
      // tidioChatApi is set asynchronously after script load
      const pollId = window.setInterval(() => {
        if (window.tidioChatApi) {
          window.clearInterval(pollId);
          window.tidioChatApi.on?.('ready', ensureVisible);
          ensureVisible();
        }
      }, 100);
      window.setTimeout(() => window.clearInterval(pollId), 5000);
    }
  };

  if (!isProduction || !tidioPublicKey) return null;

  return (
    <>
      <Script
        id="tidio-chat-widget"
        src={`https://code.tidio.co/${tidioPublicKey}.js`}
        strategy="afterInteractive"
        onLoad={handleTidioLoad}
      />
      {showFallback && (
        <a
          href="/contact"
          aria-label="Chat with Apex Remodeling"
          className="fixed bottom-4 right-4 z-[80] inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/30 sm:bottom-6 sm:right-6"
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
        </a>
      )}
    </>
  );
}
