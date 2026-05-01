import Script from 'next/script';

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-Y4P635F67M';
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-P844N79W';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PWC4NFZR';
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18129081231';

const gtagId = googleTagId || gaId || googleAdsId;

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
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${googleTagId ? `gtag('config', '${googleTagId}');` : ''}
              ${gaId ? `gtag('config', '${gaId}');` : ''}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ''}
            `}
          </Script>
        </>
      )}
    </>
  );
}
