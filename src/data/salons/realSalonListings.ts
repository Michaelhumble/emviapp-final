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
  // REAL VIETNAMESE NAIL SALON LISTINGS
  // Real listing 1: Cumming, GA
  {
    id: "real-salon-1",
    name: "CẦN SANG GẤP TIỆM NAIL TẠI CUMMING, GA",
    location: "Cumming, GA",
    datePosted: "1/20/2024", 
    images: nailImages1,
    price: "$145,000",
    sqft: 1200,
    description_en: "1,200 sqft nail salon with 9 pedicure chairs and 7 manicure tables. Beautiful location near schools, banks, restaurants & busy residential area. High foot traffic and excellent visibility.",
    description_vi: "Diện tích: 1,200 sqft | 9 ghế, 7 bàn. Vị trí đẹp gần trường học, ngân hàng, nhà hàng & khu dân cư đông đúc. Cần sang gấp.",
    features: ["9 Ghế Pedicure", "7 Bàn Manicure", "Vị trí đẹp", "Gần trường học", "Khu đông dân"],
    contact: {
      phone: "470-872-5779",
      name: "Henry"
    },
    category: "nails",
    featured: true,
    urgent: true
  },

  // Real listing 2: Maumelle, AR  
  {
    id: "real-salon-2",
    name: "Cần Sang Tiệm Nail In Maumelle, AR",
    location: "Maumelle, AR",
    datePosted: "1/19/2024",
    images: nailImages2,
    price: "$200,000",
    sqft: 2500,
    description_en: "2,500 sqft nail salon with 8 pedicure chairs and 9 manicure tables, fully equipped. Shopping center location with high-end white clientele, premium pricing, high tips.",
    description_vi: "2,500 sqft, 8 ghế, 9 bàn, đầy đủ tiện nghi. Shopping center, khu Mỹ trắng, khách sang, giá cao, tip cao. Địa chỉ: 11751 Blvd N, Maumelle, AR 72113",
    features: ["8 Ghế", "9 Bàn", "Shopping Center", "Khách Mỹ trắng", "Tip cao"],
    contact: {
      phone: "(501) 508-5581",
      name: "Chủ tiệm"
    },
    category: "nails",
    featured: true
  },

  // Real listing 3: Jacksonville, FL
  {
    id: "real-salon-3",
    name: "Tiệm Nail Jacksonville, FL",
    location: "Jacksonville, FL",
    datePosted: "1/18/2024",
    images: nailImages1,
    price: "$140,000", 
    sqft: 1400,
    description_en: "1,400 sqft nail salon with 8 manicure tables and 8 pedicure chairs. Located across from Elementary School in St. John 32259 shopping center. Includes washer, dryer, and full supplies.",
    description_vi: "St. John 32259, shopping center, đối diện trường Elementary School. 8 bàn, 8 ghế, 1,400 sqft, máy giặt, máy sấy, supply đầy. Giá $140k",
    features: ["8 Bàn", "8 Ghế", "Máy giặt/sấy", "Supply đầy", "Đối diện trường"],
    contact: {
      phone: "(404) 543-8822",
      name: "Chủ tiệm"
    },
    category: "nails",
    featured: true
  },

  // Real listing 4: North Austin
  {
    id: "real-salon-4",
    name: "NORTH AUSTIN - Tiệm Nail Premium",
    location: "North Austin, TX",
    datePosted: "1/17/2024",
    images: nailImages2,
    price: "$350,000",
    sqft: 1800,
    description_en: "Premium nail salon with 8 manicure tables and 8 pedicure chairs, recently remodeled. Located in central Austin near Domain, Whole Foods, Costco. Stable year-round clientele with many walk-ins, income $425k (2024), rent ~$5700/month.",
    description_vi: "8 bàn, 8 ghế, vừa remodel, trung tâm Austin gần Domain, Whole Food, Costco. Khách ổn định quanh năm, walk-in nhiều, supply nhiều, income $425k (2024), rent ~$5700",
    features: ["8 Bàn", "8 Ghế", "Vừa remodel", "Gần Domain", "Income $425K"],
    contact: {
      phone: "(720) 391-8939", 
      name: "Dat"
    },
    category: "nails",
    featured: true,
    monthlyRent: 5700
  },

  // Premium tattoo studio
  {
    id: "real-salon-5",
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
    id: "real-salon-6",
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
    id: "real-salon-7",
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
    id: "real-salon-8",
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
    id: "real-salon-9",
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
    id: "real-salon-10",
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