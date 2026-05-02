import Script from 'next/script';

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-Y4P635F67M';
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-P844N79W';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PWC4NFZR';
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18128958378';
const googleAdsEstimateId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ESTIMATE_ID;
const googleAdsContactId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_ID;

const normalizeGoogleAdsId = (id?: string) => {
  if (!id) return undefined;
  return id.startsWith('AW-') ? id : `AW-${id}`;
};

const normalizedGoogleAdsId = normalizeGoogleAdsId(googleAdsId);
const normalizedEstimateAdsId = normalizeGoogleAdsId(googleAdsEstimateId);
const normalizedContactAdsId = normalizeGoogleAdsId(googleAdsContactId);
const googleAdsConfigIds = Array.from(
  new Set([normalizedGoogleAdsId, normalizedEstimateAdsId, normalizedContactAdsId].filter(Boolean))
);

const gtagId = googleTagId || gaId || normalizedGoogleAdsId;

export default function GoogleTags() {
  return (
    <>
      {gtmId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      )}

      {gtagId && (
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);}
            var gtagScript = document.createElement('script');
            gtagScript.async = true;
            gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=${gtagId}';
            document.head.appendChild(gtagScript);
            window.gtag('js', new Date());
            ${googleTagId ? `window.gtag('config', '${googleTagId}');` : ''}
            ${gaId ? `window.gtag('config', '${gaId}');` : ''}
            ${googleAdsConfigIds.map((id) => `window.gtag('config', '${id}');`).join('\n            ')}
          `}
        </Script>
      )}
    </>
  );
}
