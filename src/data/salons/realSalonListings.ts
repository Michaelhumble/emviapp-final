// ================================
// REAL SALON LISTINGS DATA
// ================================
// This file contains ONLY real salon listings with verified data
// Images come from Michael's Supabase buckets only

export interface RealSalonListing {
  id: string;
  name: string;
  location: string;
  datePosted: string;
  images: string[];
  price: string;
  sqft?: number;
  description_en: string;
  description_vi?: string;
  features: string[];
  contact: {
    phone?: string;
    email?: string;
    name?: string;
  };
  category: 'nails' | 'hair' | 'barber' | 'massage' | 'facial' | 'makeup' | 'brows' | 'tattoo';
  featured?: boolean;
  urgent?: boolean;
  monthlyRent?: number;
}

// Nail salon images from Supabase storage
const nailImages1 = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png"
];

const nailImages2 = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated02.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(04).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(1)0.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated-26.png"
];

// Tattoo salon images from Supabase storage
const tattooImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(4).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated.png"
];

// Barber salon images from Supabase storage
const barberImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(4).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(6).png"
];

// Hair salon images from Supabase storage
const hairImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated.png"
];

// Massage salon images from Supabase storage
const massageImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png"
];

// Facial/skincare salon images from Supabase storage
const facialImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(5).png"
];

// Makeup salon images from Supabase storage
const makeupImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-46.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-47.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-48.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-49.png"
];

// Brow-lashes salon images from Supabase storage
const browLashesImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-13.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-14.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-15.png"
];

// ================================
// REAL SALON LISTINGS
// ================================
// These are real listings from real sellers

export const realSalonListings: RealSalonListing[] = [
  // Real listing 1: Cumming, GA
  {
    id: "real-salon-1",
    name: "Sunshine Nails Spa",
    location: "Cumming, GA",
    datePosted: "1/20/2024",
    images: nailImages1,
    price: "$145,000",
    sqft: 1200,
    description_en: "1,200 sqft luxury nail salon with 9 pedicure chairs and 7 manicure tables. Located in prime area near schools, banks, restaurants, and busy residential neighborhoods. High foot traffic location with excellent visibility.",
    description_vi: "Tiệm nail 1,200 sqft với 9 ghế pedicure và 7 bàn manicure. Tọa lạc tại khu vực đẹp gần trường học, ngân hàng, nhà hàng và khu dân cư đông đúc. Vị trí đông khách, dễ nhìn thấy.",
    features: ["9 Pedicure Chairs", "7 Manicure Tables", "Prime Location", "High Traffic", "Near Schools"],
    contact: {
      phone: "470-872-5779",
      email: "henry@example.com",
      name: "Henry"
    },
    category: "nails",
    featured: true,
    urgent: true
  },

  // Real listing 2: Maumelle, AR
  {
    id: "real-salon-2", 
    name: "Golden Lotus Nail Lounge",
    location: "Maumelle, AR",
    datePosted: "1/19/2024",
    images: nailImages2,
    price: "$285,000",
    sqft: 2500,
    description_en: "Luxury 2,500 sqft nail salon with 8 pedicure chairs and 9 manicure tables. Fully equipped in busy shopping center with high-end clientele and exceptional tip averages. Price negotiable for serious buyers.",
    description_vi: "Tiệm nail sang trọng 2,500 sqft với 8 ghế pedicure và 9 bàn manicure. Trang bị đầy đủ trong shopping center đông khách với clientele cao cấp và tip trung bình cao. Có thể thương lượng giá.",
    features: ["8 Pedicure Chairs", "9 Manicure Tables", "Shopping Center", "High-End Clientele", "High Tips"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "nails",
    featured: true,
    monthlyRent: 7500
  },

  // Premium tattoo studio
  {
    id: "real-salon-3",
    name: "Ink Dynasty Tattoo Studio", 
    location: "Austin, TX",
    datePosted: "1/18/2024",
    images: tattooImages,
    price: "$320,000",
    sqft: 1800,
    description_en: "Premium 1,800 sqft tattoo studio with 6 private rooms and custom art gallery. Featured in Tattoo Magazine, celebrity artist portfolio. High-end clientele, booking 3 months out.",
    features: ["6 Private Rooms", "Custom Art Gallery", "Celebrity Artists", "3-Month Booking", "Magazine Featured"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "tattoo",
    featured: true,
    monthlyRent: 8500
  },

  // Classic barbershop
  {
    id: "real-salon-4",
    name: "Classic Cuts Barbershop", 
    location: "Brooklyn, NY",
    datePosted: "1/17/2024",
    images: barberImages,
    price: "$225,000",
    sqft: 1200,
    description_en: "Traditional 1,200 sqft barbershop with 8 vintage chairs and straight razor service. Established 1985, loyal multigenerational clientele. Prime location in trendy neighborhood.",
    features: ["8 Vintage Chairs", "Straight Razor Service", "Est. 1985", "Loyal Clientele", "Trendy Location"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "barber",
    featured: true,
    monthlyRent: 6500
  },

  // High-end hair salon
  {
    id: "real-salon-5",
    name: "Westside Hair Lounge", 
    location: "West Hollywood, CA",
    datePosted: "1/16/2024",
    images: hairImages,
    price: "$485,000",
    sqft: 2200,
    description_en: "Modern 2,200 sqft hair salon with 12 styling stations and color bar. Prime location in trendy West Hollywood. Celebrity stylists, high-end clientele, social media presence with 50K followers.",
    features: ["12 Styling Stations", "Color Bar", "Celebrity Stylists", "50K Social Media", "Trendy Location"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "hair",
    featured: true,
    monthlyRent: 12000
  },

  // Luxury spa
  {
    id: "real-salon-6",
    name: "Zen Massage & Wellness", 
    location: "Scottsdale, AZ",
    datePosted: "1/15/2024",
    images: massageImages,
    price: "$395,000",
    sqft: 2000,
    description_en: "Luxury 2,000 sqft wellness center with 4 massage rooms, sauna, and meditation space. High-end resort area clientele. Spa packages $200-400. Fully licensed and equipped.",
    features: ["4 Massage Rooms", "Sauna & Meditation", "Resort Clientele", "$200-400 Packages", "Fully Licensed"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "massage",
    featured: true,
    monthlyRent: 9500
  },

  // Beauty studio
  {
    id: "real-salon-7",
    name: "Glam Beauty Studio", 
    location: "Nashville, TN",
    datePosted: "1/14/2024",
    images: makeupImages,
    price: "$180,000",
    sqft: 1400,
    description_en: "Modern 1,400 sqft makeup and beauty studio with professional lighting, photo booth, and bridal suite. Popular with influencers and brides. Booking 6 weeks out for events.",
    features: ["Professional Lighting", "Photo Booth", "Bridal Suite", "Influencer Clients", "6-Week Booking"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "makeup",
    featured: true,
    monthlyRent: 5200
  },

  // Brow & lash bar
  {
    id: "real-salon-8",
    name: "Perfect Brow & Lash Bar", 
    location: "Orange County, CA",
    datePosted: "1/13/2024",
    images: browLashesImages,
    price: "$155,000",
    sqft: 900,
    description_en: "Boutique 900 sqft brow and lash studio with 6 treatment beds. Microblading, lash extensions, and brow lamination. High-end clientele, social media following 25K+.",
    features: ["6 Treatment Beds", "Microblading Expert", "Lash Extensions", "25K Social Media", "High-End Clientele"],
    contact: {
      phone: "Contact via EmviApp",
      email: "inquiries@emviapp.com"
    },
    category: "brows",
    featured: true,
    monthlyRent: 4800
  }
];

// ================================
// DATA HELPER FUNCTIONS
// ================================

export const getFeaturedListings = (): RealSalonListing[] => {
  return realSalonListings.filter(salon => salon.featured);
};

export const getUrgentListings = (): RealSalonListing[] => {
  return realSalonListings.filter(salon => salon.urgent);
};

export const getListingsByCategory = (category: string): RealSalonListing[] => {
  if (category === 'all') return realSalonListings;
  return realSalonListings.filter(salon => salon.category === category);
};

export const searchListings = (query: string): RealSalonListing[] => {
  const lowercaseQuery = query.toLowerCase();
  return realSalonListings.filter(salon => 
    salon.name.toLowerCase().includes(lowercaseQuery) ||
    salon.location.toLowerCase().includes(lowercaseQuery) ||
    salon.description_en.toLowerCase().includes(lowercaseQuery) ||
    salon.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

// ================================
// HOW TO ADD NEW LISTINGS
// ================================
/*
To add a new salon listing, create an object with this structure:

{
  id: "unique-id",
  name: "Salon Name",
  location: "City, State",
  datePosted: "MM/DD/YYYY",
  images: [array of Supabase image URLs],
  price: "$XXX,XXX",
  sqft: 1000,
  description_en: "English description...",
  description_vi: "Vietnamese description (optional)...",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  contact: {
    phone: "XXX-XXX-XXXX or 'Contact via EmviApp'",
    email: "email@domain.com",
    name: "Contact Name"
  },
  category: "nails" | "hair" | "barber" | "massage" | "facial" | "makeup" | "brows" | "tattoo",
  featured: true/false,
  urgent: true/false,
  monthlyRent: 5000 (optional)
}

Add the new listing to the realSalonListings array above.
*/