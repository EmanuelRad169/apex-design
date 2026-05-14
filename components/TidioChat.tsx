'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const tidioPublicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY || 'quutayvjemteby8it3qjt5m7o0tdib7w';
const isProduction = process.env.NODE_ENV === 'production';
const loadDelay = 3500;

export default function TidioChat() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!isProduction || !tidioPublicKey || hasLoaded.current) {
      return undefined;
    }

    const load = () => {
      hasLoaded.current = true;
      setShouldLoad(true);
    };

    const timeoutId = window.setTimeout(load, loadDelay);
    const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, load, { once: true, passive: true });
    });

    return () => {
      window.clearTimeout(timeoutId);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, load);
      });
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) {
      return undefined;
    }

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

    return () => {
      document.removeEventListener('tidioChat-open', trackChatOpen);
    };
  }, [shouldLoad]);

  if (!shouldLoad || !tidioPublicKey) {
    return null;
  }

  return (
    <Script
      id="tidio-chat-widget"
      src={`https://code.tidio.co/${tidioPublicKey}.js`}
      strategy="lazyOnload"
    />
  );
}
