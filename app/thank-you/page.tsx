import { Metadata } from 'next';
import ThankYouContent from '@/components/ThankYouContent';

export const metadata: Metadata = {
  title: 'Thank You | Apex Design Consultation Request Received',
  description: 'Thank you for your interest in Apex Design. We\'ll contact you within 24 hours to schedule your free in-home consultation.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}