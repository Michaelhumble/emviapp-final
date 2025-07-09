// Premium industry listings with Michael's brother's Diamond listing always first

export const magicNailsDiamondListing = {
  id: 'magic-nails-diamond',
  title: 'Magic Nails – Great Falls, MT',
  location: 'Great Falls, MT',
  salary: '$1,200–$1,500/tuần',
  tier: 'diamond' as const,
  summary: 'Magic Nails cần thợ biết làm bột và tay chân nước.',
  imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png',
  phone: '(406) 770-3070',
  rating: 4.9,
  isFeatured: true,
  fullDescription: 'Tìm Thợ Nails\n\nMagic Nails – Great Falls, MT\n\nMagic Nails cần thợ biết làm bột và tay chân nước.\n\nGreat Falls, MT\n\n(406) 770-3070\n\n$1,200–$1,500/tuần'
};

// Nail Industry Listings
export const nailListings = [
  magicNailsDiamondListing,
  {
    id: 'emvi-house-ad-1',
    title: 'Premium Nail Tech Positions',
    location: 'Nationwide',
    salary: '$2,000–$3,500/week',
    tier: 'premium' as const,
    summary: 'Join EmviApp\'s exclusive network of top-tier nail salons.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png',
    rating: 5.0,
    fullDescription: 'Access to the most exclusive nail positions in luxury salons nationwide. EmviApp connects you with premium opportunities.'
  },
  {
    id: 'luxury-nails-la',
    title: 'Luxury Nails Studio – Beverly Hills',
    location: 'Beverly Hills, CA',
    salary: '$2,500–$4,000/week',
    tier: 'premium' as const,
    summary: 'High-end celebrity clientele, artistic nail designs, premium location.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png',
    rating: 4.8,
    fullDescription: 'Seeking master nail artists for our Beverly Hills location. Celebrity clientele, artistic freedom, exceptional compensation.'
  },
  {
    id: 'downtown-nails-ny',
    title: 'Downtown Nail Lounge – Manhattan',
    location: 'New York, NY',
    salary: '$2,200–$3,200/week',
    tier: 'featured' as const,
    summary: 'Upscale Manhattan salon, designer nails, affluent clients.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png',
    rating: 4.7,
    fullDescription: 'Premier nail salon in the heart of Manhattan seeking experienced nail technicians.'
  },
  {
    id: 'emvi-house-ad-2',
    title: 'Diamond Tier Opportunities',
    location: 'Select Markets',
    salary: '$3,000–$5,000/week',
    tier: 'featured' as const,
    summary: 'Exclusive access to the highest-paying nail positions in the industry.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png',
    rating: 5.0,
    fullDescription: 'EmviApp Diamond members get first access to the most exclusive, highest-paying positions in luxury nail salons.'
  }
];

// Hair Industry Listings
export const hairListings = [
  {
    id: 'magic-hair-diamond',
    title: 'Prestige Hair Studio – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,800–$2,500/week',
    tier: 'diamond' as const,
    summary: 'Premium hair salon seeking master stylists. Luxury clientele.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Elite hair salon in Great Falls seeking experienced stylists for our luxury location.'
  },
  {
    id: 'emvi-hair-house-1',
    title: 'Elite Hair Stylist Network',
    location: 'Major Cities',
    salary: '$2,500–$4,000/week',
    tier: 'premium' as const,
    summary: 'Connect with the most prestigious hair salons nationwide.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png',
    rating: 5.0,
    fullDescription: 'EmviApp\'s exclusive network connects top hair stylists with luxury salon opportunities.'
  },
  {
    id: 'beverly-hair',
    title: 'Beverly Hills Hair Gallery',
    location: 'Beverly Hills, CA',
    salary: '$3,000–$5,000/week',
    tier: 'premium' as const,
    summary: 'Celebrity stylists needed for A-list clientele. Color specialists preferred.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png',
    rating: 4.8,
    fullDescription: 'Seeking master hair stylists for our Beverly Hills location serving celebrity clients.'
  },
  {
    id: 'soho-salon',
    title: 'SoHo Hair Collective – NYC',
    location: 'New York, NY',
    salary: '$2,800–$3,800/week',
    tier: 'featured' as const,
    summary: 'Trendy SoHo salon, cutting-edge styles, fashion-forward clients.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png',
    rating: 4.7,
    fullDescription: 'Innovative hair salon in SoHo seeking creative stylists for fashion-forward clientele.'
  },
  {
    id: 'emvi-hair-house-2',
    title: 'Platinum Stylist Opportunities',
    location: 'Luxury Markets',
    salary: '$3,500–$6,000/week',
    tier: 'featured' as const,
    summary: 'Exclusive positions for master stylists in the most prestigious salons.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated.png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum members access the highest-tier hair stylist positions available.'
  }
];

// Barber Industry Listings
export const barberListings = [
  {
    id: 'magic-barber-diamond',
    title: 'Classic Barber Co. – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,500–$2,200/week',
    tier: 'diamond' as const,
    summary: 'Traditional barbershop with modern amenities. Master barbers wanted.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premium barbershop in Great Falls seeking experienced barbers for traditional and modern cuts.'
  },
  {
    id: 'emvi-barber-house-1',
    title: 'Master Barber Network',
    location: 'Premium Locations',
    salary: '$2,000–$3,500/week',
    tier: 'premium' as const,
    summary: 'Elite barbershop opportunities for skilled professionals.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(2).png',
    rating: 5.0,
    fullDescription: 'Connect with the finest barbershops through EmviApp\'s exclusive network.'
  },
  {
    id: 'manhattan-barber',
    title: 'The Gentlemen\'s Club – NYC',
    location: 'New York, NY',
    salary: '$2,800–$4,200/week',
    tier: 'premium' as const,
    summary: 'Upscale men\'s grooming, executive clientele, luxury experience.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(3).png',
    rating: 4.8,
    fullDescription: 'Premium men\'s grooming establishment seeking master barbers for executive clientele.'
  },
  {
    id: 'west-coast-cuts',
    title: 'West Coast Cuts – Los Angeles',
    location: 'Los Angeles, CA',
    salary: '$2,500–$3,800/week',
    tier: 'featured' as const,
    summary: 'Modern barbershop, celebrity clients, artistic freedom.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(4).png',
    rating: 4.7,
    fullDescription: 'Trendy LA barbershop seeking creative barbers for celebrity and entertainment clients.'
  },
  {
    id: 'emvi-barber-house-2',
    title: 'Platinum Barber Positions',
    location: 'Exclusive Markets',
    salary: '$3,000–$5,000/week',
    tier: 'featured' as const,
    summary: 'The highest-paying barber positions in luxury establishments.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(6).png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum access to the most exclusive barber positions in luxury establishments.'
  }
];

// Continue with other industries following the same pattern...

export const massageListings = [
  {
    id: 'magic-massage-diamond',
    title: 'Serenity Spa – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,800–$2,500/week',
    tier: 'diamond' as const,
    summary: 'Luxury spa seeking licensed massage therapists. Premium wellness center.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premier wellness spa in Great Falls seeking licensed massage therapists for luxury treatments.'
  },
  {
    id: 'emvi-massage-house-1',
    title: 'Elite Spa Network',
    location: 'Luxury Resorts',
    salary: '$2,200–$3,800/week',
    tier: 'premium' as const,
    summary: 'Exclusive spa opportunities at premium wellness centers.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png',
    rating: 5.0,
    fullDescription: 'Connect with the most prestigious spas and wellness centers through EmviApp.'
  },
  {
    id: 'resort-spa-aspen',
    title: 'Mountain Resort Spa – Aspen',
    location: 'Aspen, CO',
    salary: '$3,000–$4,500/week',
    tier: 'premium' as const,
    summary: 'Luxury mountain resort, high-end clientele, therapeutic massage.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png',
    rating: 4.8,
    fullDescription: 'Exclusive mountain resort spa seeking expert massage therapists for affluent guests.'
  },
  {
    id: 'urban-wellness-sf',
    title: 'Urban Wellness Center – San Francisco',
    location: 'San Francisco, CA',
    salary: '$2,800–$3,600/week',
    tier: 'featured' as const,
    summary: 'Modern wellness center, diverse treatments, tech professionals.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png',
    rating: 4.7,
    fullDescription: 'Contemporary wellness center in SF seeking massage therapists for tech industry professionals.'
  },
  {
    id: 'emvi-massage-house-2',
    title: 'Platinum Spa Opportunities',
    location: 'Elite Destinations',
    salary: '$3,500–$5,500/week',
    tier: 'featured' as const,
    summary: 'The most exclusive massage therapy positions at world-class spas.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum access to the most exclusive massage therapy positions at luxury spas.'
  }
];

export const skincareListings = [
  {
    id: 'magic-skincare-diamond',
    title: 'Radiance Medical Spa – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,600–$2,300/week',
    tier: 'diamond' as const,
    summary: 'Medical spa seeking licensed estheticians. Advanced skincare treatments.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premium medical spa offering advanced skincare treatments seeking licensed estheticians.'
  },
  {
    id: 'emvi-skincare-house-1',
    title: 'Elite Esthetician Network',
    location: 'Medical Spas',
    salary: '$2,000–$3,500/week',
    tier: 'premium' as const,
    summary: 'Premium medical spa positions for advanced skincare specialists.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png',
    rating: 5.0,
    fullDescription: 'Access exclusive esthetician positions at top medical spas and skincare clinics.'
  },
  {
    id: 'beverly-dermatology',
    title: 'Beverly Hills Dermatology – CA',
    location: 'Beverly Hills, CA',
    salary: '$3,200–$4,800/week',
    tier: 'premium' as const,
    summary: 'Celebrity dermatology practice, advanced treatments, A-list clients.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png',
    rating: 4.8,
    fullDescription: 'Prestigious dermatology practice seeking expert estheticians for celebrity clientele.'
  },
  {
    id: 'manhattan-medspa',
    title: 'Manhattan Medical Spa – NYC',
    location: 'New York, NY',
    salary: '$2,800–$4,000/week',
    tier: 'featured' as const,
    summary: 'Cutting-edge treatments, luxury clientele, medical-grade skincare.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png',
    rating: 4.7,
    fullDescription: 'Premier medical spa in Manhattan offering the latest in skincare technology and treatments.'
  },
  {
    id: 'emvi-skincare-house-2',
    title: 'Platinum Skincare Positions',
    location: 'Luxury Markets',
    salary: '$3,500–$6,000/week',
    tier: 'featured' as const,
    summary: 'The most exclusive esthetician positions at premier medical spas.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(5).png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum members access the highest-tier esthetician positions available.'
  }
];

export const makeupListings = [
  {
    id: 'magic-makeup-diamond',
    title: 'Glamour Studio – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,400–$2,000/week',
    tier: 'diamond' as const,
    summary: 'Professional makeup studio for weddings and special events.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premier makeup studio specializing in bridal and special event makeup artistry.'
  },
  {
    id: 'emvi-makeup-house-1',
    title: 'Elite Makeup Artist Network',
    location: 'Fashion Centers',
    salary: '$2,500–$4,500/week',
    tier: 'premium' as const,
    summary: 'Exclusive opportunities for professional makeup artists.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-46.png',
    rating: 5.0,
    fullDescription: 'Connect with high-end makeup opportunities in fashion, film, and events.'
  },
  {
    id: 'hollywood-makeup',
    title: 'Hollywood Beauty Studio – LA',
    location: 'Los Angeles, CA',
    salary: '$3,500–$6,000/week',
    tier: 'premium' as const,
    summary: 'Film and TV makeup artists, celebrity clients, red carpet events.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-47.png',
    rating: 4.8,
    fullDescription: 'Premier makeup studio serving the entertainment industry and celebrity clients.'
  },
  {
    id: 'fashion-week-nyc',
    title: 'Fashion Week Collective – NYC',
    location: 'New York, NY',
    salary: '$3,000–$5,000/week',
    tier: 'featured' as const,
    summary: 'High-fashion makeup, runway shows, editorial work.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-48.png',
    rating: 4.7,
    fullDescription: 'Elite makeup opportunities for Fashion Week and high-end editorial work.'
  },
  {
    id: 'emvi-makeup-house-2',
    title: 'Platinum Artist Opportunities',
    location: 'Entertainment Hubs',
    salary: '$4,000–$7,000/week',
    tier: 'featured' as const,
    summary: 'The most exclusive makeup artist positions in entertainment.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-49.png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum access to the most exclusive makeup artist positions in entertainment.'
  }
];

export const browsLashesListings = [
  {
    id: 'magic-brows-diamond',
    title: 'Brow & Lash Boutique – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$1,300–$1,900/week',
    tier: 'diamond' as const,
    summary: 'Specialized brow and lash studio seeking certified technicians.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premium brow and lash studio specializing in microblading and lash extensions.'
  },
  {
    id: 'emvi-brows-house-1',
    title: 'Elite Brow & Lash Network',
    location: 'Beauty Districts',
    salary: '$2,000–$3,200/week',
    tier: 'premium' as const,
    summary: 'Premium positions for certified brow and lash specialists.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png',
    rating: 5.0,
    fullDescription: 'Access exclusive brow and lash positions at premium beauty studios.'
  },
  {
    id: 'beverly-brows',
    title: 'Beverly Hills Brow Bar – CA',
    location: 'Beverly Hills, CA',
    salary: '$2,800–$4,200/week',
    tier: 'premium' as const,
    summary: 'Celebrity brow artists, microblading specialists, luxury clientele.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-13.png',
    rating: 4.8,
    fullDescription: 'Exclusive brow bar serving celebrity clients and affluent Beverly Hills residents.'
  },
  {
    id: 'soho-lashes',
    title: 'SoHo Lash Lounge – NYC',
    location: 'New York, NY',
    salary: '$2,500–$3,500/week',
    tier: 'featured' as const,
    summary: 'Trendy lash studio, volume lashes, fashion-forward clients.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-14.png',
    rating: 4.7,
    fullDescription: 'High-end lash studio in SoHo specializing in volume and mega-volume lashes.'
  },
  {
    id: 'emvi-brows-house-2',
    title: 'Platinum Brow & Lash Positions',
    location: 'Luxury Markets',
    salary: '$3,200–$5,000/week',
    tier: 'featured' as const,
    summary: 'The most exclusive brow and lash positions at premier studios.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-15.png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum access to the highest-tier brow and lash specialist positions.'
  }
];

export const tattooListings = [
  {
    id: 'magic-tattoo-diamond',
    title: 'Ink Masters Studio – Great Falls, MT',
    location: 'Great Falls, MT',
    salary: '$2,000–$3,000/week',
    tier: 'diamond' as const,
    summary: 'Premium tattoo studio seeking experienced artists. Custom work.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png',
    phone: '(406) 770-3070',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Premier tattoo studio in Great Falls seeking experienced artists for custom tattoo work.'
  },
  {
    id: 'emvi-tattoo-house-1',
    title: 'Elite Tattoo Artist Network',
    location: 'Art Districts',
    salary: '$3,000–$5,500/week',
    tier: 'premium' as const,
    summary: 'Exclusive opportunities for master tattoo artists.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(2).png',
    rating: 5.0,
    fullDescription: 'Connect with the most prestigious tattoo studios and custom art opportunities.'
  },
  {
    id: 'la-ink-collective',
    title: 'LA Ink Collective – Los Angeles',
    location: 'Los Angeles, CA',
    salary: '$4,000–$7,000/week',
    tier: 'premium' as const,
    summary: 'Celebrity tattoo artists, custom designs, entertainment clientele.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(3).png',
    rating: 4.8,
    fullDescription: 'Premier tattoo collective serving celebrity clients and entertainment industry professionals.'
  },
  {
    id: 'brooklyn-ink',
    title: 'Brooklyn Ink Gallery – NYC',
    location: 'Brooklyn, NY',
    salary: '$3,500–$5,500/week',
    tier: 'featured' as const,
    summary: 'Artistic tattoo studio, custom work, creative freedom.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(4).png',
    rating: 4.7,
    fullDescription: 'Artistic tattoo studio in Brooklyn offering creative freedom and custom design work.'
  },
  {
    id: 'emvi-tattoo-house-2',
    title: 'Platinum Artist Opportunities',
    location: 'Creative Hubs',
    salary: '$5,000–$8,000/week',
    tier: 'featured' as const,
    summary: 'The most exclusive tattoo artist positions at renowned studios.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated.png',
    rating: 5.0,
    fullDescription: 'EmviApp Platinum access to the most exclusive tattoo artist positions at world-renowned studios.'
  }
];

// Industry configuration for easy access
export const industryConfig = {
  nails: {
    name: 'nails',
    displayName: 'Nails',
    listings: nailListings,
    routePath: '/nails',
    gradientColors: 'from-pink-100 via-purple-50 to-indigo-100',
    icon: 'Sparkles'
  },
  hair: {
    name: 'hair',
    displayName: 'Hair',
    listings: hairListings,
    routePath: '/hair',
    gradientColors: 'from-amber-100 via-orange-50 to-red-100',
    icon: 'Scissors'
  },
  barber: {
    name: 'barber',
    displayName: 'Barber',
    listings: barberListings,
    routePath: '/barber',
    gradientColors: 'from-blue-100 via-indigo-50 to-purple-100',
    icon: 'Scissors'
  },
  massage: {
    name: 'massage',
    displayName: 'Massage',
    listings: massageListings,
    routePath: '/massage',
    gradientColors: 'from-green-100 via-emerald-50 to-teal-100',
    icon: 'Hand'
  },
  skincare: {
    name: 'skincare',
    displayName: 'Skincare',
    listings: skincareListings,
    routePath: '/skincare',
    gradientColors: 'from-rose-100 via-pink-50 to-purple-100',
    icon: 'Droplets'
  },
  makeup: {
    name: 'makeup',
    displayName: 'Makeup',
    listings: makeupListings,
    routePath: '/makeup',
    gradientColors: 'from-fuchsia-100 via-pink-50 to-rose-100',
    icon: 'Palette'
  },
  browsLashes: {
    name: 'brows-lashes',
    displayName: 'Brows & Lashes',
    listings: browsLashesListings,
    routePath: '/brows-lashes',
    gradientColors: 'from-violet-100 via-purple-50 to-indigo-100',
    icon: 'Eye'
  },
  tattoo: {
    name: 'tattoo',
    displayName: 'Tattoo',
    listings: tattooListings,
    routePath: '/tattoo',
    gradientColors: 'from-gray-100 via-slate-50 to-zinc-100',
    icon: 'Brush'
  }
};