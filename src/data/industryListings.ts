import { IndustryListing, IndustryConfig } from '@/types/industryListing';
import { realVietnameseNailListings } from './realVietnameseNailListings';
import { 
  comprehensiveHairListings,
  comprehensiveBarberListings,
  comprehensiveMassageListings,
  comprehensiveSkincareListings,
  comprehensiveMakeupListings,
  comprehensiveBrowsLashesListings,
  comprehensiveTattooListings
} from './comprehensiveIndustryListings';

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

// Nail Industry Listings - Now using real Vietnamese nail job listings
export const nailListings = [
  magicNailsDiamondListing,
  ...realVietnameseNailListings,
  // Additional Diamond listings (total 3 max)
  {
    id: 'diamond-nails-vegas',
    title: 'Platinum Nails Palace – Las Vegas',
    location: 'Las Vegas, NV',
    salary: '$3,200–$4,500/week',
    tier: 'diamond' as const,
    summary: 'Luxury Vegas nail studio with VIP clientele and premium treatments.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png',
    phone: '(702) 555-0199',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Exclusive Las Vegas nail palace seeking master technicians for our VIP clientele.',
    isPositionFilled: false
  },
  
  // Premium listings (6-10 total)
  {
    id: 'emvi-house-ad-1',
    title: 'Premium Nail Tech Positions',
    location: 'Nationwide',
    salary: '$2,000–$3,500/week',
    tier: 'premium' as const,
    summary: 'Join EmviApp\'s exclusive network of top-tier nail salons.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png',
    rating: 5.0,
    fullDescription: 'Access to the most exclusive nail positions in luxury salons nationwide. EmviApp connects you with premium opportunities.',
    isHouseAd: true
  },
  {
    id: 'luxury-nails-la',
    title: 'Luxury Nails Studio – Beverly Hills',
    location: 'Beverly Hills, CA',
    salary: '$2,500–$4,000/week',
    tier: 'premium' as const,
    summary: 'High-end celebrity clientele, artistic nail designs, premium location.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png',
    rating: 4.8,
    fullDescription: 'Seeking master nail artists for our Beverly Hills location. Celebrity clientele, artistic freedom, exceptional compensation.',
    urgencyBadge: 'Hiring Now'
  },
  {
    id: 'manhattan-nail-bar',
    title: 'Manhattan Nail Bar – NYC',
    location: 'New York, NY', 
    salary: '$2,800–$3,800/week',
    tier: 'premium' as const,
    summary: 'Upscale NYC nail bar, high-volume luxury clientele.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png',
    rating: 4.7,
    fullDescription: 'Premier Manhattan nail bar seeking experienced nail technicians for our luxury location.',
    applicationDeadline: '2025-01-15'
  },
  {
    id: 'chicago-nail-lounge',
    title: 'Chicago Nail Lounge – IL',
    location: 'Chicago, IL',
    salary: '$2,200–$3,400/week',
    tier: 'premium' as const,
    summary: 'Modern nail lounge in downtown Chicago, artistic nail designs.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png',
    rating: 4.6,
    fullDescription: 'Contemporary nail lounge seeking creative nail artists for our Chicago location.'
  },
  {
    id: 'miami-nails-spa',
    title: 'Miami Beach Nails Spa – FL',
    location: 'Miami Beach, FL',
    salary: '$2,400–$3,600/week',
    tier: 'premium' as const,
    summary: 'Beachfront nail spa, resort clientele, tropical nail art.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated02.png',
    rating: 4.8,
    fullDescription: 'Luxury beachfront nail spa seeking skilled technicians for our Miami Beach location.'
  },
  
  // Featured listings (10-20 total)
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
    id: 'seattle-nail-studio',
    title: 'Seattle Nail Studio – WA',
    location: 'Seattle, WA',
    salary: '$1,800–$2,800/week',
    tier: 'featured' as const,
    summary: 'Pacific Northwest nail studio, natural nail care, eco-friendly.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(04).png',
    rating: 4.5,
    fullDescription: 'Eco-friendly nail studio in Seattle seeking nail technicians passionate about natural nail care.'
  },
  {
    id: 'austin-nail-collective',
    title: 'Austin Nail Collective – TX',
    location: 'Austin, TX',
    salary: '$1,600–$2,400/week',
    tier: 'featured' as const,
    summary: 'Creative nail collective, artistic freedom, music city vibes.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(1)0.png',
    rating: 4.6,
    fullDescription: 'Creative nail collective in Austin seeking artistic nail technicians.'
  },
  {
    id: 'denver-nail-bar',
    title: 'Denver Nail Bar – CO',
    location: 'Denver, CO',
    salary: '$1,700–$2,500/week',
    tier: 'featured' as const,
    summary: 'Mountain city nail bar, relaxed atmosphere, loyal clientele.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated-26.png',
    rating: 4.4,
    fullDescription: 'Friendly nail bar in Denver seeking reliable nail technicians.'
  },
  {
    id: 'emvi-house-ad-2',
    title: 'Diamond Tier Opportunities',
    location: 'Select Markets',
    salary: '$3,000–$5,000/week',
    tier: 'featured' as const,
    summary: 'Exclusive access to the highest-paying nail positions in the industry.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png',
    rating: 5.0,
    fullDescription: 'EmviApp Diamond members get first access to the most exclusive, highest-paying positions in luxury nail salons.',
    isHouseAd: true
  },
  
  // Free listings (1-2 total) - No images, smaller cards
  {
    id: 'basic-nail-salon-phoenix',
    title: 'Nail Studio Phoenix – AZ',
    location: 'Phoenix, AZ',
    salary: '$1,200–$1,800/week',
    tier: 'free' as const,
    summary: 'Growing nail salon seeking part-time nail technician.',
    rating: 4.2,
    fullDescription: 'Small nail salon in Phoenix looking for a part-time nail technician to join our growing team. Flexible schedule available.',
    contact: {
      name: 'Maria Rodriguez',
      phone: '(602) 555-0123',
      email: 'maria@nailstudiophx.com'
    }
  }
];

// Hair Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const hairListings = comprehensiveHairListings;

// Barber Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const barberListings = comprehensiveBarberListings;

// Massage Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const massageListings = comprehensiveMassageListings;

// Facial/Skincare Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const facialListings = comprehensiveSkincareListings;

// Makeup Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const makeupListings = comprehensiveMakeupListings;

// Brows & Lashes Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const browLashListings = comprehensiveBrowsLashesListings;

// Tattoo Industry Listings - Using comprehensive listings with 30 expired + 20 active
export const tattooListings = comprehensiveTattooListings;

// Legacy aliases for backward compatibility
export const skincareListings = facialListings;
export const browsLashesListings = browLashListings;

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
    listings: facialListings,
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
    listings: browLashListings,
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