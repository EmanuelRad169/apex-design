import Script from 'next/script';

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-4PQT7BW6VC';
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-MBNK8VXX';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PWC4NFZR';
const googleAdsId = 'AW-18129081231';

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
            window.gtag('config', '${googleAdsId}');
          `}
        </Script>
      )}
    </>
  );
}
