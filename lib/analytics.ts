// Analytics tracking utilities

type LeadConversionAction = 'estimate' | 'contact';

type LeadSubmissionData = {
  conversionAction: LeadConversionAction;
  service?: string;
  projectType?: string;
  budget?: string;
  zipCode?: string;
};

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

const isDevelopment = process.env.NODE_ENV === 'development';

export const trackGoogleAdsConversion = (sendTo: string) => {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined' || !(window as any).gtag) {
      resolve();
      return;
    }

    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    window.setTimeout(finish, 1200);

    (window as any).gtag('event', 'conversion', {
      send_to: sendTo,
      value: 0,
      currency: 'USD',
      event_callback: () => {
        if (isDevelopment) {
          console.log('Google Ads conversion fired', sendTo);
        }
        finish();
      },
      event_timeout: 1000,
    });
  });
};

export const trackLeadSubmissionAndWait = async (data: LeadSubmissionData) => {
  trackGAEvent('generate_lead', {
    event_category: 'Lead',
    event_label: data.service || data.projectType || 'unknown',
    value: data.budget || 'unknown',
    location: data.zipCode || 'unknown',
  });

  trackFBPixel('Lead', {
    content_name: data.service || data.projectType || 'unknown',
    content_category: 'Lead Form',
    value: 0,
    currency: 'USD',
  });

  if (isDevelopment) {
    console.log('Lead submission tracked:', data);
  }
};
