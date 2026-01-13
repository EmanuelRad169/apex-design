import AboutContent from '@/components/AboutContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Apex Design | Orange County Remodeling Experts Since 2010',
  description: 'Learn about Apex Design, Orange County\'s premier remodeling contractor since 2010. Our story, values, and commitment to quality craftsmanship and client satisfaction.',
  keywords: 'about Apex Design, Orange County remodeling company, licensed contractor, remodeling experts, quality craftsmanship, home renovation team',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Apex Design | Orange County Remodeling Experts Since 2010',
    description: 'Learn about Apex Design, Orange County\'s premier remodeling contractor since 2010. Our story, values, and commitment to quality craftsmanship.',
    url: 'https://apexdbr.com/about',
    images: ['/images/about.jpg'],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}