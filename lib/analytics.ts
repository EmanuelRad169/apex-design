// Analytics tracking utilities

// Google Analytics
export const trackGAEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Facebook Pixel
export const trackFBPixel = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventParams);
  }
};

const normalizeGoogleAdsId = (id?: string) => {
  if (!id) return undefined;
  return id.startsWith('AW-') ? id : `AW-${id}`;
};

// Combined tracking function for lead submissions
export const trackLeadSubmission = (data: {
  conversionAction?: 'estimate' | 'contact';
  service?: string;
  projectType?: string;
  budget?: string;
  zipCode?: string;
}) => {
  // Google Analytics
  trackGAEvent('generate_lead', {
    event_category: 'Lead',
    event_label: data.service || data.projectType || 'unknown',
    value: data.budget || 'unknown',
    location: data.zipCode || 'unknown',
  });

  const googleAdsId =
    data.conversionAction === 'contact'
      ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
      : process.env.NEXT_PUBLIC_GOOGLE_ADS_ESTIMATE_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const leadConversionLabel =
    data.conversionAction === 'contact'
      ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL || process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL
      : process.env.NEXT_PUBLIC_GOOGLE_ADS_ESTIMATE_CONVERSION_LABEL || process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL;
  const normalizedGoogleAdsId = normalizeGoogleAdsId(googleAdsId);

  if (normalizedGoogleAdsId && leadConversionLabel) {
    trackGAEvent('conversion', {
      send_to: `${normalizedGoogleAdsId}/${leadConversionLabel}`,
      value: 0,
      currency: 'USD',
    });
  }

  // Facebook Pixel
  trackFBPixel('Lead', {
    content_name: data.service || data.projectType || 'unknown',
    content_category: 'Lead Form',
    value: 0,
    currency: 'USD',
  });

  // Console log for debugging (remove in production if needed)
  console.log('📊 Lead submission tracked:', data);
};
