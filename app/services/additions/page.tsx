import ServicePageTemplate from '@/components/ServicePageTemplate';

const additionData = {
  title: 'Home Additions',
  subtitle: 'Expand Your Living Space',
  description: 'Add valuable square footage to your home with seamlessly integrated additions. From extra bedrooms to expanded kitchens, we help you grow your home to fit your family\'s needs.',
  heroImage: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  services: [
    {
      name: 'Room Additions',
      description: 'Add new rooms that blend seamlessly with your existing home architecture.',
      features: [
        'Architectural design & planning',
        'Foundation & structural work',
        'Roofing & exterior finishing',
        'Electrical & plumbing systems',
        'Insulation & drywall',
        'Flooring & interior finishes'
      ],
      priceRange: '$50,000 - $120,000'
    },
    {
      name: 'Second Story Addition',
      description: 'Double your living space by adding a complete second floor to your home.',
      features: [
        'Structural engineering',
        'Staircase design & installation',
        'Multiple bedroom suites',
        'Additional bathroom facilities',
        'HVAC system expansion',
        'Exterior design integration'
      ],
      priceRange: '$100,000 - $250,000'
    },
    {
      name: 'Kitchen Expansion',
      description: 'Expand your kitchen into adjacent spaces for better flow and functionality.',
      features: [
        'Wall removal & structural support',
        'Kitchen island installation',
        'Additional cabinet storage',
        'Expanded counter space',
        'Improved traffic flow',
        'Natural light optimization'
      ],
      priceRange: '$40,000 - $80,000'
    },
    {
      name: 'ADU (Accessory Dwelling Unit)',
      description: 'Create a separate living space for guests, rental income, or multi-generational living.',
      features: [
        'Complete separate unit design',
        'Full kitchen & bathroom',
        'Private entrance',
        'Separate utilities',
        'Permit & code compliance',
        'Landscaping integration'
      ],
      priceRange: '$80,000 - $200,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Feasibility Study',
      description: 'Assess your property and determine the best addition options.'
    },
    {
      step: 2,
      title: 'Design & Permits',
      description: 'Create architectural plans and secure all necessary permits.'
    },
    {
      step: 3,
      title: 'Construction',
      description: 'Build your addition with minimal disruption to your daily life.'
    },
    {
      step: 4,
      title: 'Integration',
      description: 'Seamlessly connect new and existing spaces for a cohesive home.'
    }
  ],
  gallery: []
};

export default function AdditionsPage() {
  return <ServicePageTemplate {...additionData} />;
}