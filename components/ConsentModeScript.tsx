import Script from 'next/script';

export default function ConsentModeScript() {
  return (
    <Script id="apex-consent-mode-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        var defaultConsent = {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        };

        gtag('consent', 'default', defaultConsent);

        try {
          var match = document.cookie.match(/(?:^|; )apex_consent=([^;]+)/);
          if (match) {
            var savedState = JSON.parse(decodeURIComponent(match[1]));
            if (navigator.globalPrivacyControl) {
              savedState.ad_storage = 'denied';
              savedState.ad_user_data = 'denied';
              savedState.ad_personalization = 'denied';
            }
            gtag('consent', 'update', savedState);
          }
        } catch (error) {}
      `}
    </Script>
  );
}
