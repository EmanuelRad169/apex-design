import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Apex Design | Kitchen & Bath Remodeling in Orange County',
    template: '%s | Apex Design'
  },
  description: 'Transform your Orange County home with precision. Licensed, insured kitchen and bathroom remodeling by OC-based Apex Design. Premium quality, great prices, free in-home estimates.',
  keywords: [
    'kitchen remodel Orange County',
    'bathroom remodel OC', 
    'home renovation California',
    'remodeling contractor',
    'licensed insured',
    'kitchen cabinets',
    'bathroom renovation',
    'Irvine remodeling',
    'Newport Beach contractor',
    'Costa Mesa renovation'
  ],
  authors: [{ name: 'Apex Design' }],
  creator: 'Apex Design',
  publisher: 'Apex Design',
  metadataBase: new URL('https://apexdbr.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexdbr.com',
    title: 'Apex Design | Kitchen & Bath Remodeling in Orange County',
    description: 'Transform your Orange County home with precision. Licensed, insured kitchen and bathroom remodeling by OC-based Apex Design.',
    siteName: 'Apex Design',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apex Design - Premium Kitchen & Bath Remodeling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Design | Kitchen & Bath Remodeling in Orange County',
    description: 'Transform your Orange County home with precision. Licensed, insured remodeling contractor.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Apex Design",
              "description": "Professional kitchen and bathroom remodeling services in Orange County, California",
              "url": "https://apexdbr.com",
              "logo": "https://apexdbr.com/logo.svg",
              "image": "https://apexdbr.com/og-image.jpg",
              "telephone": "+1-888-888-2774",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Orange County",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "areaServed": ["Orange County, CA", "Irvine, CA", "Newport Beach, CA", "Costa Mesa, CA", "Tustin, CA"],
              "serviceType": ["Kitchen Remodeling", "Bathroom Remodeling", "Home Renovation"],
              "priceRange": "$$$",
              "openingHours": ["Mo-Fr 09:00-17:00"],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "50"
              }
            })
          }}
        />
      </head>
      <body className="bg-white">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
