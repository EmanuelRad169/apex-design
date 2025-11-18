import ServicePageTemplate from '@/components/ServicePageTemplate';

const interiorData = {
  title: 'Interior Design & Renovation',
  subtitle: 'Transform Your Living Spaces',
  description: 'Create cohesive, beautiful interiors that reflect your personal style. From living rooms to bedrooms, we design spaces that are both functional and inspiring.',
  heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  services: [
    {
      name: 'Complete Interior Makeover',
      description: 'Transform your entire home with cohesive design, new finishes, and custom elements.',
      features: [
        'Space planning & layout design',
        'Color scheme development',
        'Custom millwork & built-ins',
        'Flooring & wall treatments',
        'Lighting design',
        'Furniture & decor coordination'
      ],
      priceRange: '$30,000 - $75,000'
    },
    {
      name: 'Living Room Renovation',
      description: 'Create the perfect gathering space for family and entertaining.',
      features: [
        'Built-in entertainment centers',
        'Custom fireplace surrounds',
        'Ceiling treatments',
        'Hardwood or luxury flooring',
        'Ambient lighting design',
        'Window treatments'
      ],
      priceRange: '$15,000 - $40,000'
    },
    {
      name: 'Master Bedroom Suite',
      description: 'Design a peaceful retreat with custom closets and luxury finishes.',
      features: [
        'Walk-in closet organization',
        'Built-in storage solutions',
        'Luxury flooring options',
        'Custom headboard walls',
        'Lighting & electrical updates',
        'Sitting area design'
      ],
      priceRange: '$20,000 - $50,000'
    },
    {
      name: 'Home Office Design',
      description: 'Create a productive workspace tailored to your professional needs.',
      features: [
        'Custom desk & storage',
        'Built-in bookshelves',
        'Ergonomic design elements',
        'Technology integration',
        'Soundproofing options',
        'Professional lighting'
      ],
      priceRange: '$10,000 - $25,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Style Discovery',
      description: 'Understand your preferences, lifestyle, and functional needs.'
    },
    {
      step: 2,
      title: 'Design Development',
      description: 'Create detailed designs with material and color selections.'
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Professional installation of all design elements and finishes.'
    },
    {
      step: 4,
      title: 'Styling & Completion',
      description: 'Final styling touches to bring your vision to life.'
    }
  ],
  gallery: []
};

export default function InteriorsPage() {
  return <ServicePageTemplate {...interiorData} />;
}