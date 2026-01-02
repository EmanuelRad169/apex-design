import ServicePageTemplate from '@/components/ServicePageTemplate';

const bathroomData = {
  title: 'Bathroom Remodeling',
  subtitle: 'Your Personal Spa Retreat',
  description: 'Create a luxurious bathroom sanctuary with modern fixtures, elegant tile work, and smart storage solutions. From powder rooms to master suites, we design bathrooms that combine comfort with style.',
  heroImage: '/images/services-2.jpg',
  services: [
    {
      name: 'Master Bathroom Renovation',
      description: 'Complete transformation of your master bathroom into a luxurious spa-like retreat.',
      features: [
        'Walk-in shower with frameless glass',
        'Freestanding or built-in tub',
        'Double vanity with quartz tops',
        'Heated flooring options',
        'Premium tile and fixtures',
        'Custom storage solutions'
      ],
      priceRange: '$25,000 - $60,000'
    },
    {
      name: 'Guest Bathroom Remodel',
      description: 'Efficient and stylish updates for your guest or secondary bathrooms.',
      features: [
        'Modern vanity & mirror',
        'Tile shower or tub surround',
        'New fixtures & hardware',
        'Ventilation improvements',
        'Storage optimization',
        'Lighting upgrades'
      ],
      priceRange: '$12,000 - $25,000'
    },
    {
      name: 'Shower Conversion',
      description: 'Convert your outdated tub to a modern, accessible walk-in shower.',
      features: [
        'Barrier-free shower design',
        'Non-slip flooring',
        'Built-in seating options',
        'Multiple shower heads',
        'Glass enclosure',
        'Grab bars & safety features'
      ],
      priceRange: '$8,000 - $18,000'
    },
    {
      name: 'Powder Room Refresh',
      description: 'Maximize impact in your small powder room with smart design choices.',
      features: [
        'Stylish vanity installation',
        'Statement lighting',
        'Accent wall treatments',
        'Space-saving fixtures',
        'Premium finishes',
        'Ventilation upgrades'
      ],
      priceRange: '$5,000 - $12,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Space Assessment',
      description: 'Evaluate your current bathroom and discuss your needs and preferences.'
    },
    {
      step: 2,
      title: 'Design & Planning',
      description: 'Create detailed plans with material selections and timeline.'
    },
    {
      step: 3,
      title: 'Construction',
      description: 'Professional demolition and reconstruction with attention to waterproofing.'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Final installations and quality checks to ensure perfection.'
    }
  ],
  gallery: [
    {
      before: '/images/before-bath-1.jpg',
      after: '/images/after-bath-1.jpg',
      title: 'Irvine Spa Bathroom',
      budget: '$18,000'
    }
  ]
};

export default function BathroomsPage() {
  return <ServicePageTemplate {...bathroomData} />;
}