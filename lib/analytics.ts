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

// Combined tracking function for lead submissions
export const trackLeadSubmission = (data: {
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
