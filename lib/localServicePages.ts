export type LocalServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  imageAlt: string;
  serviceType: string;
  lead: string;
  sections: Array<{
    heading: string;
    body: string;
    items: Array<{
      title: string;
      text: string;
    }>;
  }>;
  process: Array<{
    title: string;
    text: string;
  }>;
  internalLinks: Array<{
    label: string;
    href: string;
    text: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const siteUrl = 'https://apexdbr.com';

export const orangeCountyCities = [
  'Irvine',
  'Newport Beach',
  'Laguna Beach',
  'Mission Viejo',
  'Rancho Santa Margarita',
  'Tustin',
  'Anaheim Hills',
];

export const localServicePages: Record<string, LocalServicePage> = {
  'bathroom-remodeling-orange-county': {
    slug: 'bathroom-remodeling-orange-county',
    title: 'Bathroom Remodeling Orange County',
    metaTitle: 'Bathroom Remodeling Orange County | Apex Design Build & Remodel',
    metaDescription:
      'Apex Design Build & Remodel creates custom bathroom remodels in Orange County, including Irvine, Newport Beach, Laguna Beach, Mission Viejo, Tustin, and Anaheim Hills. Request a free estimate.',
    keywords: [
      'bathroom remodeling Orange County',
      'bathroom remodel Irvine',
      'walk-in shower Orange County',
      'custom bathroom renovation OC',
    ],
    h1: 'Bathroom Remodeling in Orange County',
    eyebrow: 'Custom bathrooms built around comfort, storage, and long-term value',
    intro:
      'Apex Design Build & Remodel helps Orange County homeowners turn outdated bathrooms into clean, comfortable, high-performing spaces. We remodel bathrooms throughout Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and nearby communities.',
    heroImage: '/images/service-bathroom-renovation.jpg',
    imageAlt: 'Modern Orange County bathroom remodel with custom vanity and walk-in shower',
    serviceType: 'Bathroom remodeling',
    lead:
      'From guest bath updates to full primary suite renovations, our team handles layout planning, waterproofing, tile, fixtures, cabinetry, lighting, and finish details with a clear schedule and a clean jobsite.',
    sections: [
      {
        heading: 'Bathroom remodels designed for daily life',
        body:
          'A great bathroom remodel should feel beautiful on day one and practical years later. We focus on moisture control, storage, lighting, durable materials, and layouts that make the room easier to use.',
        items: [
          {
            title: 'Primary bathroom renovations',
            text: 'Spa-inspired showers, soaking tubs, double vanities, private water closets, linen storage, and upgraded lighting.',
          },
          {
            title: 'Guest and hall bathrooms',
            text: 'Efficient remodels that improve storage, fixtures, tile, ventilation, and everyday durability.',
          },
          {
            title: 'Accessible bathroom upgrades',
            text: 'Low-threshold showers, grab bar blocking, wider clearances, slip-resistant finishes, and thoughtful fixture placement.',
          },
        ],
      },
      {
        heading: 'Local Orange County bathroom expertise',
        body:
          'Homes in Irvine, Tustin, Newport Beach, and Mission Viejo often have different construction eras, plumbing conditions, and design expectations. We plan your remodel around the existing structure, permitting needs, and the way your household uses the space.',
        items: [
          {
            title: 'Material guidance',
            text: 'We help select tile, counters, fixtures, mirrors, hardware, and glass that fit your budget and design goals.',
          },
          {
            title: 'Conversion planning',
            text: 'Tub-to-shower conversions, larger shower footprints, niche placement, bench options, and drainage planning.',
          },
          {
            title: 'Finish coordination',
            text: 'A cohesive palette across tile, stone, cabinetry, lighting, and plumbing trim for a polished final result.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'In-home consultation',
        text: 'We review your bathroom, listen to your goals, and identify layout, plumbing, and finish opportunities.',
      },
      {
        title: 'Scope and selections',
        text: 'You receive a clear remodeling plan with material direction, schedule expectations, and budget alignment.',
      },
      {
        title: 'Build and protect',
        text: 'Our crew manages demolition, waterproofing, installation, and finish work while protecting adjacent areas.',
      },
      {
        title: 'Final walkthrough',
        text: 'We review the completed bathroom with you and confirm the details are ready for daily use.',
      },
    ],
    internalLinks: [
      {
        label: 'Kitchen Remodeling Orange County',
        href: '/kitchen-remodeling-orange-county',
        text: 'Planning a larger renovation? Pair your bathroom project with a custom kitchen remodel.',
      },
      {
        label: 'Home Remodeling Orange County',
        href: '/home-remodeling-orange-county',
        text: 'Explore whole-home upgrades for flooring, layout, interior finishes, and connected living spaces.',
      },
      {
        label: 'Walk-in Shower Remodeling',
        href: '/walk-in-shower-remodeling',
        text: 'See our focused walk-in shower remodeling options for safer, cleaner, more modern bathrooms.',
      },
    ],
    faqs: [
      {
        question: 'How much does bathroom remodeling cost in Orange County?',
        answer:
          'Bathroom remodeling cost depends on size, layout changes, tile, fixtures, cabinetry, and plumbing scope. Apex provides a detailed estimate after an in-home consultation.',
      },
      {
        question: 'Do you remodel bathrooms in Irvine and Newport Beach?',
        answer:
          'Yes. We serve homeowners across Orange County, including Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, and Anaheim Hills.',
      },
      {
        question: 'Can you convert a bathtub into a walk-in shower?',
        answer:
          'Yes. Tub-to-shower conversions are one of our most requested bathroom remodeling services and can include custom tile, glass, niches, benches, and safety upgrades.',
      },
    ],
  },
  'kitchen-remodeling-orange-county': {
    slug: 'kitchen-remodeling-orange-county',
    title: 'Kitchen Remodeling Orange County',
    metaTitle: 'Kitchen Remodeling Orange County | Custom Kitchens by Apex',
    metaDescription:
      'Custom kitchen remodeling in Orange County by Apex Design Build & Remodel. Serving Irvine, Newport Beach, Laguna Beach, Mission Viejo, Tustin, Anaheim Hills, and nearby OC cities.',
    keywords: [
      'kitchen remodeling Orange County',
      'custom kitchen remodel Irvine',
      'kitchen renovation Newport Beach',
      'Orange County kitchen contractor',
    ],
    h1: 'Kitchen Remodeling in Orange County',
    eyebrow: 'Functional, polished kitchens built for the way your family lives',
    intro:
      'Apex Design Build & Remodel creates custom kitchens for Orange County homeowners who want better storage, stronger layouts, premium finishes, and a smoother remodeling experience. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and surrounding areas.',
    heroImage: '/images/service-kitchen-remodel.jpg',
    imageAlt: 'Bright custom kitchen remodel in Orange County with island and modern cabinetry',
    serviceType: 'Kitchen remodeling',
    lead:
      'Whether you need a full kitchen renovation, a better island layout, new cabinets, upgraded countertops, or a more open connection to the living area, we build kitchens that look refined and work hard every day.',
    sections: [
      {
        heading: 'Kitchen remodeling with layout-first planning',
        body:
          'Before choosing finishes, we study how your kitchen moves. Appliance zones, prep space, storage, lighting, island seating, and traffic flow all shape a remodel that feels natural after construction is complete.',
        items: [
          {
            title: 'Complete kitchen renovations',
            text: 'Cabinetry, counters, backsplash, flooring, lighting, appliances, plumbing, electrical, and finish carpentry.',
          },
          {
            title: 'Custom cabinetry and storage',
            text: 'Smarter pantry storage, drawer organization, appliance garages, pull-outs, and island storage.',
          },
          {
            title: 'Open-concept kitchen updates',
            text: 'Wall removal planning, structural coordination, larger islands, and improved connections to dining and living areas.',
          },
        ],
      },
      {
        heading: 'Premium finishes without the guesswork',
        body:
          'From homes near the coast in Newport Beach and Laguna Beach to family homes in Mission Viejo, Tustin, and Anaheim Hills, we help you choose materials that fit the architecture and your budget.',
        items: [
          {
            title: 'Countertops and backsplash',
            text: 'Quartz, stone-look surfaces, slab backsplashes, tile accents, and durable family-friendly materials.',
          },
          {
            title: 'Lighting and electrical',
            text: 'Layered lighting, under-cabinet lighting, island pendants, outlet planning, and appliance-ready circuits.',
          },
          {
            title: 'Project coordination',
            text: 'A clear schedule, proactive communication, and on-time, on-budget craftsmanship from start to finish.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'Kitchen discovery',
        text: 'We measure the space and discuss cooking habits, storage needs, style, appliances, and budget.',
      },
      {
        title: 'Design direction',
        text: 'We shape the layout, cabinetry plan, finish direction, and construction scope.',
      },
      {
        title: 'Permits and build',
        text: 'Our team coordinates the construction details, trade work, installation, and finish sequencing.',
      },
      {
        title: 'Completion review',
        text: 'We walk the finished kitchen with you and confirm the details are complete.',
      },
    ],
    internalLinks: [
      {
        label: 'Bathroom Remodeling Orange County',
        href: '/bathroom-remodeling-orange-county',
        text: 'Update bathrooms alongside your kitchen for a more complete home refresh.',
      },
      {
        label: 'Home Remodeling Orange County',
        href: '/home-remodeling-orange-county',
        text: 'Explore larger interior remodeling plans for open layouts and connected living spaces.',
      },
      {
        label: 'Room Addition Orange County',
        href: '/room-addition-orange-county',
        text: 'Need a larger footprint? A room addition can expand your kitchen and living area.',
      },
    ],
    faqs: [
      {
        question: 'How long does a kitchen remodel take in Orange County?',
        answer:
          'Timeline depends on layout changes, cabinetry, permits, material lead times, and inspection needs. After the consultation, Apex provides a project schedule before construction begins.',
      },
      {
        question: 'Can Apex help with cabinets, countertops, and layout?',
        answer:
          'Yes. We help with kitchen layout planning, cabinetry, countertops, backsplash, lighting, appliance coordination, and finish selections.',
      },
      {
        question: 'Do you serve coastal and inland Orange County cities?',
        answer:
          'Yes. We remodel kitchens in Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and surrounding OC communities.',
      },
    ],
  },
  'adu-construction-orange-county': {
    slug: 'adu-construction-orange-county',
    title: 'ADU Construction Orange County',
    metaTitle: 'ADU Construction Orange County | Backyard Homes by Apex',
    metaDescription:
      'Build a custom ADU in Orange County with Apex Design Build & Remodel. Garage conversions, detached ADUs, guest suites, and rental-ready backyard homes in Irvine, Tustin, Mission Viejo, and nearby cities.',
    keywords: [
      'ADU construction Orange County',
      'ADU builder Irvine',
      'garage conversion Orange County',
      'backyard home contractor OC',
    ],
    h1: 'ADU Construction in Orange County',
    eyebrow: 'Accessory dwelling units for family flexibility, rental potential, and long-term value',
    intro:
      'Apex Design Build & Remodel helps Orange County homeowners plan and build ADUs that feel intentional, code-conscious, and comfortable. We work throughout Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and nearby areas.',
    heroImage: '/images/services-4.jpg',
    imageAlt: 'Orange County ADU construction with bright modern living space',
    serviceType: 'ADU construction',
    lead:
      'From detached backyard cottages to garage conversions and attached guest suites, we help you evaluate feasibility, design the space, coordinate construction, and create a finished unit that supports your family or investment goals.',
    sections: [
      {
        heading: 'ADUs planned around your property',
        body:
          'Every lot is different. We look at access, utilities, setbacks, parking, privacy, existing structures, and the way the ADU should relate to the main home.',
        items: [
          {
            title: 'Detached ADUs',
            text: 'Standalone backyard units with private entries, kitchens, bathrooms, sleeping areas, and efficient storage.',
          },
          {
            title: 'Garage conversions',
            text: 'Transform underused garage space into a livable studio, guest suite, office, or rental unit.',
          },
          {
            title: 'Attached ADUs',
            text: 'Add a connected but independent living area for relatives, guests, or flexible household needs.',
          },
        ],
      },
      {
        heading: 'Design-build support from concept to completion',
        body:
          'ADU projects need careful coordination. We help homeowners in Irvine, Tustin, Mission Viejo, Rancho Santa Margarita, and Anaheim Hills move from early ideas into a realistic build plan.',
        items: [
          {
            title: 'Efficient interiors',
            text: 'Compact kitchens, bathrooms, laundry, built-ins, storage, and durable finishes for small-space living.',
          },
          {
            title: 'Utility coordination',
            text: 'Electrical, plumbing, HVAC, water heating, and practical tie-ins planned with the main property in mind.',
          },
          {
            title: 'Investment-minded finish planning',
            text: 'Materials and layouts selected for durability, comfort, maintenance, and long-term property value.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'Feasibility review',
        text: 'We discuss your goals, review the property, and identify the most practical ADU path.',
      },
      {
        title: 'Design and scope',
        text: 'We define the layout, finishes, utility approach, and construction scope.',
      },
      {
        title: 'Construction coordination',
        text: 'Our team manages the build sequence and communicates clearly through each phase.',
      },
      {
        title: 'Move-in readiness',
        text: 'We complete the finish details so the ADU is ready for guests, family, work, or rental use.',
      },
    ],
    internalLinks: [
      {
        label: 'Room Addition Orange County',
        href: '/room-addition-orange-county',
        text: 'Compare ADU construction with a traditional room addition for more connected living space.',
      },
      {
        label: 'Home Remodeling Orange County',
        href: '/home-remodeling-orange-county',
        text: 'Coordinate an ADU with broader home upgrades for a cohesive property plan.',
      },
      {
        label: 'Kitchen Remodeling Orange County',
        href: '/kitchen-remodeling-orange-county',
        text: 'Explore kitchen remodeling ideas that can inform compact ADU kitchen design.',
      },
    ],
    faqs: [
      {
        question: 'What type of ADU can I build in Orange County?',
        answer:
          'Options may include detached ADUs, attached ADUs, garage conversions, and junior ADUs depending on your property and local requirements. Apex starts with a feasibility review.',
      },
      {
        question: 'Can an ADU be used for rental income or family housing?',
        answer:
          'Many Orange County homeowners build ADUs for extended family, guests, home offices, or rental flexibility. We help design the unit around your intended use.',
      },
      {
        question: 'Do you build ADUs in Irvine, Tustin, and Mission Viejo?',
        answer:
          'Yes. We serve Irvine, Tustin, Mission Viejo, Rancho Santa Margarita, Newport Beach, Laguna Beach, Anaheim Hills, and surrounding Orange County communities.',
      },
    ],
  },
  'home-remodeling-orange-county': {
    slug: 'home-remodeling-orange-county',
    title: 'Home Remodeling Orange County',
    metaTitle: 'Home Remodeling Orange County | Whole-Home Remodeling by Apex',
    metaDescription:
      'Whole-home remodeling in Orange County by Apex Design Build & Remodel. Kitchens, bathrooms, layout updates, flooring, additions, and custom interiors in Irvine, Newport Beach, Laguna Beach, Mission Viejo, Tustin, and Anaheim Hills.',
    keywords: [
      'home remodeling Orange County',
      'whole home remodel Irvine',
      'Orange County remodeling contractor',
      'custom home renovation OC',
    ],
    h1: 'Home Remodeling in Orange County',
    eyebrow: 'Integrated remodeling for kitchens, bathrooms, additions, and full-home transformations',
    intro:
      'Apex Design Build & Remodel provides whole-home remodeling for Orange County homeowners who want a more functional, beautiful, and cohesive home. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and nearby communities.',
    heroImage: '/images/services-1.jpg',
    imageAlt: 'Orange County whole-home remodel with open kitchen and living space',
    serviceType: 'Home remodeling',
    lead:
      'Whether you are modernizing an older home, opening up the floor plan, updating multiple rooms, or preparing for a major lifestyle change, we bring design-build coordination and careful craftsmanship to the entire project.',
    sections: [
      {
        heading: 'Whole-home remodeling with one coordinated plan',
        body:
          'Large remodels succeed when the details work together. We coordinate scope, sequencing, finishes, trade work, and communication so each room supports the next.',
        items: [
          {
            title: 'Interior layout updates',
            text: 'Open-concept planning, wall changes, improved circulation, better natural light, and connected living spaces.',
          },
          {
            title: 'Kitchen and bath remodeling',
            text: 'High-impact updates to the rooms that most affect daily comfort and resale value.',
          },
          {
            title: 'Finish modernization',
            text: 'Flooring, trim, doors, lighting, paint, surfaces, storage, and architectural details.',
          },
        ],
      },
      {
        heading: 'Built for Orange County homes',
        body:
          'From coastal properties in Newport Beach and Laguna Beach to family homes in Irvine, Mission Viejo, Rancho Santa Margarita, Tustin, and Anaheim Hills, we tailor each remodel to the home, neighborhood, and owner.',
        items: [
          {
            title: 'Custom remodeling solutions',
            text: 'No copy-paste plans. We shape the remodel around the way you cook, gather, work, host, and relax.',
          },
          {
            title: 'Clear budget conversations',
            text: 'We help prioritize high-value improvements and avoid scope confusion before construction starts.',
          },
          {
            title: 'On-time and on-budget craftsmanship',
            text: 'Our process emphasizes planning, communication, quality control, and practical scheduling.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'Home evaluation',
        text: 'We walk the home, clarify your goals, and identify structural, layout, and finish opportunities.',
      },
      {
        title: 'Remodeling roadmap',
        text: 'We organize scope, priorities, design direction, and budget into a practical project plan.',
      },
      {
        title: 'Coordinated construction',
        text: 'Our team sequences trade work to reduce friction and keep the project moving.',
      },
      {
        title: 'Final detailing',
        text: 'We complete the finish work and walk the remodeled home with you before closeout.',
      },
    ],
    internalLinks: [
      {
        label: 'Kitchen Remodeling Orange County',
        href: '/kitchen-remodeling-orange-county',
        text: 'Start with the kitchen if your remodel centers on cooking, storage, and entertaining.',
      },
      {
        label: 'Bathroom Remodeling Orange County',
        href: '/bathroom-remodeling-orange-county',
        text: 'Upgrade bathrooms as part of a more complete home transformation.',
      },
      {
        label: 'Room Addition Orange County',
        href: '/room-addition-orange-county',
        text: 'Expand your home when the existing footprint no longer supports your lifestyle.',
      },
    ],
    faqs: [
      {
        question: 'What is included in whole-home remodeling?',
        answer:
          'Whole-home remodeling can include kitchens, bathrooms, flooring, layout changes, lighting, interior finishes, exterior updates, additions, and other improvements depending on your goals.',
      },
      {
        question: 'Can Apex remodel multiple rooms at once?',
        answer:
          'Yes. Coordinating multiple rooms under one plan can improve finish consistency, schedule efficiency, and budget control.',
      },
      {
        question: 'Where in Orange County do you work?',
        answer:
          'We serve homeowners in Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and surrounding communities.',
      },
    ],
  },
  'walk-in-shower-remodeling': {
    slug: 'walk-in-shower-remodeling',
    title: 'Walk-in Shower Remodeling',
    metaTitle: 'Walk-in Shower Remodeling Orange County | Apex Design Build & Remodel',
    metaDescription:
      'Walk-in shower remodeling in Orange County with custom tile, glass, benches, niches, low-threshold entries, and safety upgrades. Serving Irvine, Newport Beach, Laguna Beach, Mission Viejo, Tustin, and Anaheim Hills.',
    keywords: [
      'walk-in shower remodeling',
      'walk-in shower Orange County',
      'tub to shower conversion Irvine',
      'custom shower remodel OC',
    ],
    h1: 'Walk-in Shower Remodeling in Orange County',
    eyebrow: 'Cleaner, safer, more comfortable shower spaces with custom finishes',
    intro:
      'Apex Design Build & Remodel designs and builds walk-in showers for Orange County homeowners who want a more modern, accessible, and low-maintenance bathroom. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and surrounding OC areas.',
    heroImage: '/images/service-walk-in-shower.jpg',
    imageAlt: 'Custom walk-in shower remodel in Orange County with glass enclosure and tile walls',
    serviceType: 'Walk-in shower remodeling',
    lead:
      'A walk-in shower can transform the feel and function of your bathroom without always requiring a full-home renovation. We plan the waterproofing, drainage, tile layout, glass, storage, and comfort features that make the shower feel finished.',
    sections: [
      {
        heading: 'Custom walk-in showers for everyday comfort',
        body:
          'We design shower remodels around safety, ease of cleaning, layout, and style. That means the right entry height, drainage plan, tile scale, glass configuration, and storage placement from the beginning.',
        items: [
          {
            title: 'Tub-to-shower conversions',
            text: 'Replace an unused bathtub with a spacious walk-in shower, custom tile, glass enclosure, and built-in storage.',
          },
          {
            title: 'Low-threshold shower entries',
            text: 'Improve accessibility and reduce trip points with cleaner, easier shower access.',
          },
          {
            title: 'Built-in benches and niches',
            text: 'Add comfort and storage with seating, recessed shelves, corner ledges, and thoughtful fixture placement.',
          },
        ],
      },
      {
        heading: 'A focused upgrade with high daily impact',
        body:
          'For homeowners in Irvine, Mission Viejo, Tustin, Rancho Santa Margarita, and Anaheim Hills, a walk-in shower remodel is often the fastest path to a bathroom that feels current and easier to use.',
        items: [
          {
            title: 'Waterproofing details',
            text: 'A beautiful shower starts behind the tile with proper waterproofing, slope, and substrate preparation.',
          },
          {
            title: 'Glass and hardware',
            text: 'Frameless, semi-frameless, sliding, or fixed-panel options matched to your bathroom layout.',
          },
          {
            title: 'Safety-minded design',
            text: 'Blocking for grab bars, slip-resistant tile, handheld shower heads, and seating options when desired.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'Shower assessment',
        text: 'We inspect the current tub or shower, measure the space, and discuss your access and style goals.',
      },
      {
        title: 'Tile and fixture planning',
        text: 'We help select tile, trim, valve placement, glass, niches, benches, and shower hardware.',
      },
      {
        title: 'Waterproof build',
        text: 'Our crew handles demolition, substrate prep, waterproofing, tile, fixtures, and glass coordination.',
      },
      {
        title: 'Clean completion',
        text: 'We finish the details and confirm the new walk-in shower is ready for everyday use.',
      },
    ],
    internalLinks: [
      {
        label: 'Bathroom Remodeling Orange County',
        href: '/bathroom-remodeling-orange-county',
        text: 'Need more than a shower? Explore complete bathroom remodeling services.',
      },
      {
        label: 'Home Remodeling Orange County',
        href: '/home-remodeling-orange-county',
        text: 'Coordinate bathroom updates with broader home remodeling improvements.',
      },
      {
        label: 'Kitchen Remodeling Orange County',
        href: '/kitchen-remodeling-orange-county',
        text: 'Modernize another high-use area of your home with a custom kitchen remodel.',
      },
    ],
    faqs: [
      {
        question: 'Can you replace my bathtub with a walk-in shower?',
        answer:
          'Yes. Apex remodels tubs into walk-in showers with custom tile, low-threshold entries, glass enclosures, niches, benches, and updated fixtures.',
      },
      {
        question: 'Is a walk-in shower good for aging in place?',
        answer:
          'A well-planned walk-in shower can improve accessibility with lower entries, seating, handheld shower heads, slip-resistant tile, and grab bar blocking.',
      },
      {
        question: 'Do you offer walk-in shower remodeling across Orange County?',
        answer:
          'Yes. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and nearby Orange County cities.',
      },
    ],
  },
  'room-addition-orange-county': {
    slug: 'room-addition-orange-county',
    title: 'Room Addition Orange County',
    metaTitle: 'Room Addition Orange County | Add Living Space with Apex',
    metaDescription:
      'Room additions in Orange County by Apex Design Build & Remodel. Add bedrooms, offices, expanded kitchens, family rooms, and attached living space in Irvine, Newport Beach, Mission Viejo, Tustin, and Anaheim Hills.',
    keywords: [
      'room addition Orange County',
      'home addition Irvine',
      'add living space Orange County',
      'Orange County addition contractor',
    ],
    h1: 'Room Addition Contractors in Orange County',
    eyebrow: 'Seamless added square footage for growing families and changing lifestyles',
    intro:
      'Apex Design Build & Remodel creates room additions for Orange County homeowners who need more space without giving up the home and neighborhood they love. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and nearby communities.',
    heroImage: '/images/services-4.jpg',
    imageAlt: 'Orange County room addition with bright expanded living area',
    serviceType: 'Room addition construction',
    lead:
      'From extra bedrooms and home offices to expanded kitchens, family rooms, and guest suites, we plan additions that connect naturally to your existing home and support your long-term needs.',
    sections: [
      {
        heading: 'Room additions that feel original to the home',
        body:
          'A successful addition should not feel tacked on. We consider rooflines, exterior materials, windows, flooring transitions, ceiling heights, traffic flow, and the way the new room changes the rest of the house.',
        items: [
          {
            title: 'Bedroom and guest suite additions',
            text: 'Add private sleeping space, closets, bathrooms, and flexible guest accommodations.',
          },
          {
            title: 'Home office additions',
            text: 'Create a dedicated workspace with sound control, lighting, storage, and separation from busy living areas.',
          },
          {
            title: 'Family room expansions',
            text: 'Build larger gathering spaces that connect to kitchens, patios, or existing living rooms.',
          },
        ],
      },
      {
        heading: 'Orange County addition planning and craftsmanship',
        body:
          'Room additions in Irvine, Newport Beach, Laguna Beach, Mission Viejo, Tustin, Rancho Santa Margarita, and Anaheim Hills need careful planning around structure, utilities, and neighborhood expectations.',
        items: [
          {
            title: 'Structural coordination',
            text: 'Foundation, framing, roof integration, openings, and support conditions planned before construction begins.',
          },
          {
            title: 'Interior finish matching',
            text: 'Flooring, trim, paint, lighting, doors, and details selected to blend new and existing spaces.',
          },
          {
            title: 'Lifestyle-first scope',
            text: 'We help you decide whether a room addition, ADU, or whole-home remodel best fits your goals.',
          },
        ],
      },
    ],
    process: [
      {
        title: 'Addition consultation',
        text: 'We review your home, site conditions, goals, and the type of space you want to add.',
      },
      {
        title: 'Planning and scope',
        text: 'We define the addition footprint, finish direction, utility needs, and construction approach.',
      },
      {
        title: 'Build integration',
        text: 'Our team manages foundation, framing, exterior tie-ins, systems, insulation, drywall, and finishes.',
      },
      {
        title: 'Final connection',
        text: 'We complete the transition details so the addition feels connected to the rest of the home.',
      },
    ],
    internalLinks: [
      {
        label: 'ADU Construction Orange County',
        href: '/adu-construction-orange-county',
        text: 'Compare a room addition with a detached or attached ADU for more independent living space.',
      },
      {
        label: 'Home Remodeling Orange County',
        href: '/home-remodeling-orange-county',
        text: 'Coordinate your addition with a larger interior remodel for a unified result.',
      },
      {
        label: 'Kitchen Remodeling Orange County',
        href: '/kitchen-remodeling-orange-county',
        text: 'Explore kitchen remodeling if your addition includes a larger kitchen or open living area.',
      },
    ],
    faqs: [
      {
        question: 'What types of room additions does Apex build?',
        answer:
          'We build bedroom additions, guest suites, family rooms, home offices, kitchen expansions, and other attached living spaces based on your property and goals.',
      },
      {
        question: 'Can a room addition match my existing home?',
        answer:
          'Yes. We plan rooflines, exterior materials, windows, flooring, trim, and finishes so the addition feels integrated with the original home.',
      },
      {
        question: 'Do you build room additions throughout Orange County?',
        answer:
          'Yes. We serve Irvine, Newport Beach, Laguna Beach, Mission Viejo, Rancho Santa Margarita, Tustin, Anaheim Hills, and surrounding Orange County cities.',
      },
    ],
  },
};
