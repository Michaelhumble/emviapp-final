import { Job } from '@/types/job';

// All salon images organized by category
const nailImages = [
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

// Massage salon images from Supabase storage
const massageImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png" // filler
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

// Real-life Vietnamese salon listings converted to English & Vietnamese
export const realVietnameseSalons: Job[] = [
  // Real listing 1: Cumming, GA
  {
    id: "real-vn-1",
    title: "Sunshine Nails Spa",
    company: "Sunshine Nails Spa", 
    location: "Cumming, GA",
    description: "1,200 sqft luxury nail salon with 9 pedicure chairs and 7 manicure tables. Located in prime area near schools, banks, restaurants, and busy residential neighborhoods. High foot traffic location with excellent visibility.",
    vietnamese_title: "Sunshine Nails Spa",
    vietnamese_description: "Tiệm nail 1,200 sqft với 9 ghế pedicure và 7 bàn manicure. Tọa lạc tại khu vực đẹp gần trường học, ngân hàng, nhà hàng và khu dân cư đông đúc. Vị trí đông khách, dễ nhìn thấy.",
    price: "$145,000",
    created_at: "2024-01-20T08:00:00Z",
    type: "salon",
    category: "nail-tech",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["9 Pedicure Chairs", "7 Manicure Tables", "Prime Location", "High Traffic", "Near Schools"],
    image_url: nailImages[0],
    image_urls: nailImages,
    square_feet: "1200",
    is_vietnamese_listing: true,
    fomo_message: "🔥 Act Fast - High Demand Location!"
  },

  // Real listing 2: Maumelle, AR  
  {
    id: "real-vn-2",
    title: "Golden Lotus Nail Lounge",
    company: "Golden Lotus Nail Lounge",
    location: "Maumelle, AR", 
    description: "Luxury 2,500 sqft nail salon with 8 pedicure chairs and 9 manicure tables. Fully equipped in busy shopping center with high-end clientele and exceptional tip averages. Price negotiable for serious buyers.",
    vietnamese_title: "Golden Lotus Nail Lounge",
    vietnamese_description: "Tiệm nail sang trọng 2,500 sqft với 8 ghế pedicure và 9 bàn manicure. Trang bị đầy đủ trong shopping center đông khách với clientele cao cấp và tip trung bình cao. Có thể thương lượng giá.",
    price: "$285,000",
    created_at: "2024-01-19T14:30:00Z",
    type: "salon", 
    category: "nail-tech",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view", 
      email: "inquiries@emviapp.com"
    },
    salon_features: ["8 Pedicure Chairs", "9 Manicure Tables", "Shopping Center", "High-End Clientele", "High Tips"],
    image_url: nailImages[1],
    image_urls: nailImages,
    square_feet: "2500",
    monthly_rent: "7500",
    is_vietnamese_listing: true,
    fomo_message: "💎 Luxury Location - Price Negotiable!"
  },

  // Real listing 3: Jacksonville, FL
  {
    id: "real-vn-3", 
    title: "Harmony Beauty Nail Studio",
    company: "Harmony Beauty Nail Studio",
    location: "Jacksonville, FL (St. John area, 32259)",
    description: "Well-established 1,400 sqft nail salon with 8 manicure tables and 8 pedicure chairs. Located in shopping center across from elementary school. Stable income, high tips, washer/dryer included.",
    vietnamese_title: "Harmony Beauty Nail Studio", 
    vietnamese_description: "Tiệm nail đã thành lập 1,400 sqft với 8 bàn manicure và 8 ghế pedicure. Nằm trong shopping center đối diện trường tiểu học. Thu nhập ổn định, tip cao, có máy giặt/sấy.",
    price: "$140,000",
    created_at: "2024-01-18T11:15:00Z",
    type: "salon",
    category: "nail-tech", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["8 Tables & 8 Chairs", "Near Elementary School", "Stable Income", "High Tips", "Washer/Dryer Included"],
    image_url: nailImages[2],
    image_urls: nailImages,
    square_feet: "1400",
    is_vietnamese_listing: true,
    fomo_message: "🏫 Great School Location - Stable Income!"
  },

  // Real listing 4: North Austin, TX
  {
    id: "real-vn-4",
    title: "Aurora Nail & Beauty Bar", 
    company: "Aurora Nail & Beauty Bar",
    location: "North Austin, TX",
    description: "Modern nail salon with 8 manicure tables and 8 pedicure chairs. Recently remodeled and centrally located near Costco, Whole Foods, and Sam's Club. Stable client base, strong walk-in traffic, top Google ranking, high income potential.",
    vietnamese_title: "Aurora Nail & Beauty Bar",
    vietnamese_description: "Tiệm nail hiện đại với 8 bàn manicure và 8 ghế pedicure. Mới renovate và ở vị trí trung tâm gần Costco, Whole Foods, Sam's Club. Base khách ổn định, walk-in tốt, ranking Google cao, thu nhập tiềm năng cao.",
    price: "$195,000", 
    created_at: "2024-01-17T16:45:00Z",
    type: "salon",
    category: "nail-tech",
    pricing_tier: "featured", 
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"  
    },
    salon_features: ["Recently Remodeled", "8 Tables & 8 Chairs", "Near Major Stores", "Strong Walk-ins", "Top Google Ranking"],
    image_url: nailImages[3],
    image_urls: nailImages,
    square_feet: "1600",
    is_vietnamese_listing: true,
    fomo_message: "🛍️ Prime Shopping Area - Recently Remodeled!"
  }
];

// Hair salon images from Supabase storage
const hairImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated.png"
];

// Facial/spa images from Supabase storage  
const facialImages = [
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png",
  "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(5).png"
];

// Additional featured real listings for the top section
export const featuredRealSalons: Job[] = [
  {
    id: "featured-real-1",
    title: "Elite Beverly Hills Nail Studio",
    company: "Elite Beverly Hills Nail Studio", 
    location: "Beverly Hills, CA",
    description: "Ultra-luxury 3,500 sqft nail studio in the heart of Beverly Hills. 15 premium pedicure stations, 12 manicure tables, VIP suites. Celebrity clientele, average service $150+. Valet parking, champagne service.",
    price: "$1,250,000",
    created_at: "2024-01-22T10:00:00Z",
    type: "salon",
    category: "nail-tech",
    pricing_tier: "diamond",
    status: "active", 
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Celebrity Clientele", "Valet Parking", "Champagne Service", "VIP Suites", "Beverly Hills Location"],
    image_url: nailImages2[0],
    image_urls: nailImages2,
    square_feet: "3500",
    monthly_rent: "25000",
    fomo_message: "🌟 Celebrity Clientele - Ultra Exclusive!"
  },
  
  {
    id: "featured-real-2", 
    title: "Miami Beach Oceanview Spa",
    company: "Miami Beach Oceanview Spa",
    location: "Miami Beach, FL", 
    description: "Stunning 2,800 sqft oceanfront nail spa with panoramic Atlantic views. 12 pedicure chairs, 10 manicure stations. High-end tourist clientele, seasonal revenue spikes. Instagram-famous location.",
    price: "$685,000",
    created_at: "2024-01-21T15:30:00Z", 
    type: "salon",
    category: "full-service",
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp", 
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Ocean Views", "Tourist Clientele", "Instagram Famous", "Seasonal Revenue Spikes", "Premium Location"],
    image_url: facialImages[0],
    image_urls: facialImages,
    square_feet: "2800",
    monthly_rent: "18000",
    fomo_message: "🌊 Ocean Views - Instagram Famous Location!"
  },

  {
    id: "featured-real-3",
    title: "Westside Hair Lounge", 
    company: "Westside Hair Lounge",
    location: "West Hollywood, CA",
    description: "Modern 2,200 sqft hair salon with 12 styling stations and color bar. Prime location in trendy West Hollywood. Celebrity stylists, high-end clientele, social media presence with 50K followers.",
    price: "$485,000",
    created_at: "2024-01-20T12:00:00Z",
    type: "salon",
    category: "hair-salon", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["12 Styling Stations", "Color Bar", "Celebrity Stylists", "50K Social Media", "Trendy Location"],
    image_url: hairImages[0],
    image_urls: hairImages,
    square_feet: "2200", 
    monthly_rent: "12000",
    fomo_message: "🎬 Celebrity Stylists - Social Media Famous!"
  },

  // Additional diverse salon listings
  {
    id: "featured-real-4",
    title: "Ink Dynasty Tattoo Studio", 
    company: "Ink Dynasty Tattoo Studio",
    location: "Austin, TX",
    description: "Premium 1,800 sqft tattoo studio with 6 private rooms and custom art gallery. Featured in Tattoo Magazine, celebrity artist portfolio. High-end clientele, booking 3 months out.",
    price: "$320,000",
    created_at: "2024-01-19T09:00:00Z",
    type: "salon",
    category: "tattoo-studio", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["6 Private Rooms", "Custom Art Gallery", "Celebrity Artists", "3-Month Booking", "Magazine Featured"],
    image_url: tattooImages[0],
    image_urls: tattooImages,
    square_feet: "1800", 
    monthly_rent: "8500",
    fomo_message: "🎨 Celebrity Artists - Booked 3 Months Out!"
  },

  {
    id: "featured-real-5",
    title: "Classic Cuts Barbershop", 
    company: "Classic Cuts Barbershop",
    location: "Brooklyn, NY",
    description: "Traditional 1,200 sqft barbershop with 8 vintage chairs and straight razor service. Established 1985, loyal multigenerational clientele. Prime location in trendy neighborhood.",
    price: "$225,000",
    created_at: "2024-01-18T14:00:00Z",
    type: "salon",
    category: "barbershop", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["8 Vintage Chairs", "Straight Razor Service", "Est. 1985", "Loyal Clientele", "Trendy Location"],
    image_url: barberImages[0],
    image_urls: barberImages,
    square_feet: "1200", 
    monthly_rent: "6500",
    fomo_message: "✂️ Established 1985 - Loyal Clientele!"
  },

  {
    id: "featured-real-6",
    title: "Zen Massage & Wellness", 
    company: "Zen Massage & Wellness",
    location: "Scottsdale, AZ",
    description: "Luxury 2,000 sqft wellness center with 4 massage rooms, sauna, and meditation space. High-end resort area clientele. Spa packages $200-400. Fully licensed and equipped.",
    price: "$395,000",
    created_at: "2024-01-17T11:30:00Z",
    type: "salon",
    category: "massage-spa", 
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["4 Massage Rooms", "Sauna & Meditation", "Resort Clientele", "$200-400 Packages", "Fully Licensed"],
    image_url: massageImages[0],
    image_urls: massageImages,
    square_feet: "2000", 
    monthly_rent: "9500",
    fomo_message: "🧘 Resort Area - Premium Spa Packages!"
  },

  {
    id: "featured-real-7",
    title: "Glam Beauty Studio", 
    company: "Glam Beauty Studio",
    location: "Nashville, TN",
    description: "Modern 1,400 sqft makeup and beauty studio with professional lighting, photo booth, and bridal suite. Popular with influencers and brides. Booking 6 weeks out for events.",
    price: "$180,000",
    created_at: "2024-01-16T13:15:00Z",
    type: "salon",
    category: "makeup-studio", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Professional Lighting", "Photo Booth", "Bridal Suite", "Influencer Clients", "6-Week Booking"],
    image_url: makeupImages[0],
    image_urls: makeupImages,
    square_feet: "1400", 
    monthly_rent: "5200",
    fomo_message: "💄 Influencer Favorite - Booked 6 Weeks Out!"
  },

  {
    id: "featured-real-8",
    title: "Perfect Brow & Lash Bar", 
    company: "Perfect Brow & Lash Bar",
    location: "Orange County, CA",
    description: "Boutique 900 sqft brow and lash studio with 6 treatment beds. Microblading, lash extensions, and brow lamination. High-end clientele, social media following 25K+.",
    price: "$155,000",
    created_at: "2024-01-15T16:45:00Z",
    type: "salon",
    category: "brow-lash", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["6 Treatment Beds", "Microblading Expert", "Lash Extensions", "25K Social Media", "High-End Clientele"],
    image_url: browLashesImages[0],
    image_urls: browLashesImages,
    square_feet: "900", 
    monthly_rent: "4800",
    fomo_message: "👁️ 25K Followers - Microblading Expert!"
  }
];