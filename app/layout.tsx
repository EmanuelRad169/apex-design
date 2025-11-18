import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Apex Design | Kitchen & Bath Remodeling in Orange County',
  description: 'Transform your space with precision. Licensed, insured kitchen and bathroom remodeling by OC-based Apex Design. Free in-home estimates.',
  keywords: 'kitchen remodel, bathroom remodel, Orange County, OC, home renovation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexdesign.com',
    title: 'Apex Design | Kitchen & Bath Remodeling',
    description: 'Transform your space with precision.',
    images: [
      {
        url: 'https://apexdesign.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apex Design - Kitchen & Bath Remodeling',
      },
    ],
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
      </head>
      <body className="bg-white">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
