// Local Business Schema Data for Apex Design
export const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Apex Design",
  "description": "Professional kitchen and bathroom remodeling services in Orange County, California",
  "url": "https://apexdbr.com",
  "logo": "https://apexdbr.com/logo.svg",
  "image": "https://apexdbr.com/og-image.jpg",
  "telephone": "+1-888-888-2774",
  "email": "info@apexdesign.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Orange County",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "33.7175",
    "longitude": "-117.8311"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "California"
    },
    {
      "@type": "City",
      "name": "Irvine"
    },
    {
      "@type": "City", 
      "name": "Newport Beach"
    },
    {
      "@type": "City",
      "name": "Costa Mesa"
    },
    {
      "@type": "City",
      "name": "Tustin"
    }
  ],
  "serviceType": [
    "Kitchen Remodeling",
    "Bathroom Remodeling", 
    "Home Renovation",
    "Interior Design",
    "Home Additions",
    "Exterior Renovations"
  ],
  "priceRange": "$$$",
  "paymentAccepted": [
    "Cash",
    "Check", 
    "Credit Card"
  ],
  "openingHours": [
    "Mo-Fr 09:00-17:00"
  ],
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah T."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Apex transformed our outdated kitchen into a stunning, modern space. The attention to detail was incredible, and they stayed on budget and on time."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "5"
  }
};