import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitchen Remodeling in Orange County | Custom Kitchen Design',
  description: 'Transform your kitchen with Apex Design. Custom cabinetry, premium countertops, professional appliance integration. Licensed, insured kitchen remodeling in Orange County.',
  keywords: 'kitchen remodeling Orange County, custom kitchen design, kitchen cabinets, countertops, kitchen renovation OC, Irvine kitchen remodel',
  alternates: {
    canonical: '/services/kitchen',
  },
  openGraph: {
    title: 'Kitchen Remodeling in Orange County | Custom Kitchen Design',
    description: 'Transform your kitchen with Apex Design. Custom cabinetry, premium countertops, professional appliance integration.',
    url: 'https://apexdbr.com/services/kitchen',
    images: ['/images/services-1.jpg'],
  },
};

const kitchenData = {
  title: 'Kitchen Remodeling',
  subtitle: 'The Heart of Your Home',
  description: 'Transform your kitchen into a beautiful, functional space that brings your family together. From custom cabinetry to premium countertops, we create kitchens that blend style with functionality.',
  heroImage: '/images/services-1.jpg',
  services: [
    {
      name: 'Complete Kitchen Renovation',
      description: 'Full kitchen transformation including layout redesign, new cabinetry, countertops, flooring, and appliances.',
      features: [
        'Custom cabinet design & installation',
        'Premium countertop materials',
        'Professional appliance integration',
        'Electrical & plumbing updates',
        'Designer lighting solutions',
        'Flooring installation'
      ],
      priceRange: '$35,000 - $80,000'
    },
    {
      name: 'Kitchen Refresh',
      description: 'Update your existing kitchen with new finishes, hardware, and select upgrades for a fresh new look.',
      features: [
        'Cabinet refinishing or painting',
        'New hardware & fixtures',
        'Backsplash installation',
        'Countertop replacement',
        'Updated lighting',
        'Minor layout adjustments'
      ],
      priceRange: '$15,000 - $35,000'
    },
    {
      name: 'Custom Cabinetry',
      description: 'Beautiful, functional storage solutions designed specifically for your space and lifestyle.',
      features: [
        'Custom cabinet design',
        'Premium wood selections',
        'Soft-close hinges & drawers',
        'Interior organization systems',
        'Crown molding & trim',
        'Professional installation'
      ],
      priceRange: '$20,000 - $50,000'
    },
    {
      name: 'Kitchen Island Addition',
      description: 'Add functionality and style with a custom kitchen island designed for your space.',
      features: [
        'Custom island design',
        'Additional storage space',
        'Seating options',
        'Electrical integration',
        'Plumbing for prep sink',
        'Matching cabinetry'
      ],
      priceRange: '$8,000 - $25,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Design Consultation',
      description: 'We discuss your vision, assess your space, and create initial design concepts.'
    },
    {
      step: 2,
      title: 'Planning & Permits',
      description: 'Detailed plans, material selections, and securing necessary permits.'
    },
    {
      step: 3,
      title: 'Construction',
      description: 'Professional demolition and construction with minimal disruption to your daily life.'
    },
    {
      step: 4,
      title: 'Final Walkthrough',
      description: 'Quality inspection and walkthrough to ensure everything meets our high standards.'
    }
  ],
  gallery: [
    {
      before: '/images/before-kitchen-1.jpg',
      after: '/images/after-kitchen-1.jpg',
      title: 'Tustin Kitchen Transformation',
      budget: '$25,000'
    },
    {
      before: '/images/before-kitchen-2.jpg',
      after: '/images/after-kitchen-2.jpg',
      title: 'Newport Beach Modern Kitchen',
      budget: '$32,000'
    }
  ]
};

export default function KitchenPage() {
  return <ServicePageTemplate {...kitchenData} />;
}