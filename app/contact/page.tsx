import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Apex Design | Free In-Home Consultation Orange County',
  description: 'Get your free, no-pressure in-home consultation with Apex Design. Licensed, insured remodeling contractor serving Orange County. Call (888) 888-2774.',
  keywords: 'contact Apex Design, free consultation Orange County, remodeling estimate, kitchen bathroom quote, home renovation consultation',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Apex Design | Free In-Home Consultation Orange County',
    description: 'Get your free, no-pressure in-home consultation with Apex Design. Licensed, insured remodeling contractor serving Orange County.',
    url: 'https://apexdbr.com/contact',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}