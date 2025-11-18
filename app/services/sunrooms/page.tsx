import ServicePageTemplate from '@/components/ServicePageTemplate';

const sunroomData = {
  title: 'Sunrooms & Outdoor Living',
  subtitle: 'Year-Round Outdoor Enjoyment',
  description: 'Extend your living space with beautiful sunrooms and outdoor living areas. Enjoy the beauty of the outdoors in comfort, regardless of the weather.',
  heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  services: [
    {
      name: 'Three-Season Sunroom',
      description: 'Enjoy outdoor views in comfort with a screened and windowed sunroom addition.',
      features: [
        'Aluminum frame construction',
        'Insulated glass windows',
        'Screen options for ventilation',
        'Ceiling fan installation',
        'Electrical & lighting',
        'Flooring options'
      ],
      priceRange: '$25,000 - $50,000'
    },
    {
      name: 'Four-Season Sunroom',
      description: 'Year-round comfort with fully insulated and climate-controlled sunroom.',
      features: [
        'Insulated construction',
        'HVAC integration',
        'Energy-efficient windows',
        'Tile or hardwood flooring',
        'Recessed lighting',
        'Custom window treatments'
      ],
      priceRange: '$40,000 - $80,000'
    },
    {
      name: 'Covered Patio & Deck',
      description: 'Create the perfect outdoor entertaining space with covered patios and decks.',
      features: [
        'Custom deck or patio design',
        'Pergola or roof structures',
        'Outdoor lighting systems',
        'Built-in seating & planters',
        'Fire pit or fireplace',
        'Outdoor kitchen prep'
      ],
      priceRange: '$15,000 - $40,000'
    },
    {
      name: 'Pool House & Cabana',
      description: 'Complete your backyard oasis with a functional and stylish pool house.',
      features: [
        'Changing room facilities',
        'Storage for pool equipment',
        'Kitchenette or bar area',
        'Bathroom facilities',
        'Covered lounge area',
        'Electrical & plumbing'
      ],
      priceRange: '$30,000 - $75,000'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Site Evaluation',
      description: 'Assess your outdoor space and discuss your vision for outdoor living.'
    },
    {
      step: 2,
      title: 'Custom Design',
      description: 'Create designs that complement your home and landscape.'
    },
    {
      step: 3,
      title: 'Construction',
      description: 'Build your outdoor living space with quality materials and craftsmanship.'
    },
    {
      step: 4,
      title: 'Completion',
      description: 'Final inspections and preparation for your enjoyment.'
    }
  ],
  gallery: []
};

export default function SunroomsPage() {
  return <ServicePageTemplate {...sunroomData} />;
}