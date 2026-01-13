import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exterior Renovations in Orange County | Curb Appeal Enhancements',
  description: 'Enhance your curb appeal with Apex Design. Siding, windows, doors, roofing improvements. Professional exterior renovations in Orange County that increase property value.',
  keywords: 'exterior renovations Orange County, siding replacement, window replacement, curb appeal, exterior remodel OC, home exterior',
  alternates: {
    canonical: '/services/exteriors',
  },
  openGraph: {
    title: 'Exterior Renovations in Orange County | Curb Appeal Enhancements',
    description: 'Enhance your curb appeal with Apex Design. Siding, windows, doors, roofing improvements.',
    url: 'https://apexdbr.com/services/exteriors',
    images: ['/images/services-5.jpg'],
  },
};

const exteriorData = {
  title: 'Exterior Renovations',
  subtitle: 'Enhance Your Curb Appeal',
  description: 'Transform your home\'s exterior with modern siding, windows, and architectural details. Create stunning curb appeal that increases your property value and makes a lasting impression.',
  heroImage: '/images/services-5.jpg',
  services: [
    {
      name: 'Complete Exterior Makeover',
      description: 'Transform your home\'s entire exterior with new siding, windows, and architectural features.',
      features: [
        'Siding replacement or repair',
        'Window & door upgrades',
        'Roofing improvements',
        'Exterior paint & finishes',
        'Architectural details',
        'Landscaping coordination'
      ],
      priceRange: '$40,000 - $100,000'
    },
    {
      name: 'Window & Door Replacement',
      description: 'Upgrade to energy-efficient windows and stylish entry doors.',
      features: [
        'Energy-efficient windows',
        'Custom entry doors',
        'Professional installation',
        'Trim & casing work',
        'Weather sealing',
        'Hardware upgrades'
      ],
      priceRange: '$15,000 - $35,000'
    },
    {
      name: 'Siding & Exterior Finishes',
      description: 'Update your home\'s exterior with modern siding materials and finishes.',
      features: [
        'Fiber cement or vinyl siding',
        'Stone or brick accents',
        'Trim & molding details',
        'Color consultation',
        'Moisture barrier installation',
        'Exterior painting'
      ],
      priceRange: '$20,000 - $50,000'
    },
    {
      name: 'Front Porch & Entryway',
      description: 'Create an inviting entrance with custom porch and entryway design.',
      features: [
        'Covered porch construction',
        'Custom railings & columns',
        'Decorative lighting',
        'Pathway improvements',
        'Landscape integration',
        'Seating areas'
      ],
      priceRange: '$10,000 - $30,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Exterior Assessment',
      description: 'Evaluate your home\'s current condition and improvement opportunities.'
    },
    {
      step: 2,
      title: 'Design Planning',
      description: 'Develop exterior design concepts and material selections.'
    },
    {
      step: 3,
      title: 'Installation',
      description: 'Professional installation with attention to weather protection.'
    },
    {
      step: 4,
      title: 'Final Details',
      description: 'Complete all finishing touches and landscaping coordination.'
    }
  ],
  gallery: []
};

export default function ExteriorsPage() {
  return <ServicePageTemplate {...exteriorData} />;
}