import ServicePageTemplate from '@/components/ServicePageTemplate';

const exteriorData = {
  title: 'Exterior Renovations',
  subtitle: 'Enhance Your Curb Appeal',
  description: 'Transform your home\'s exterior with modern siding, windows, and architectural details. Create stunning curb appeal that increases your property value and makes a lasting impression.',
  heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
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