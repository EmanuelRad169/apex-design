'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const tidioPublicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY || 'quutayvjemteby8it3qjt5m7o0tdib7w';
const isProduction = process.env.NODE_ENV === 'production';

export default function TidioChat() {
  useEffect(() => {
    if (!isProduction || !tidioPublicKey) {
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
  }, []);

  if (!isProduction || !tidioPublicKey) {
    return null;
  }

  return (
    <Script
      id="tidio-chat-widget"
      src={`https://code.tidio.co/${tidioPublicKey}.js`}
      strategy="afterInteractive"
    />
  );
}
