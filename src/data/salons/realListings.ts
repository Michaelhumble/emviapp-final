import { Job } from '@/types/job';

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
    category: "Nail Tech",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["9 Pedicure Chairs", "7 Manicure Tables", "Prime Location", "High Traffic", "Near Schools"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/premium-nail-salon-1.jpg",
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
    category: "Nail Tech",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view", 
      email: "inquiries@emviapp.com"
    },
    salon_features: ["8 Pedicure Chairs", "9 Manicure Tables", "Shopping Center", "High-End Clientele", "High Tips"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/luxury-nail-salon-2.jpg",
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
    category: "Nail Tech", 
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["8 Tables & 8 Chairs", "Near Elementary School", "Stable Income", "High Tips", "Washer/Dryer Included"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/modern-nail-salon-3.jpg",
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
    category: "Nail Tech",
    pricing_tier: "featured", 
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"  
    },
    salon_features: ["Recently Remodeled", "8 Tables & 8 Chairs", "Near Major Stores", "Strong Walk-ins", "Top Google Ranking"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/elegant-nail-salon-4.jpg",
    square_feet: "1600",
    is_vietnamese_listing: true,
    fomo_message: "🛍️ Prime Shopping Area - Recently Remodeled!"
  }
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
    category: "Ultra Luxury",
    pricing_tier: "diamond",
    status: "active", 
    contact_info: {
      owner_name: "Contact via EmviApp",
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Celebrity Clientele", "Valet Parking", "Champagne Service", "VIP Suites", "Beverly Hills Location"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/luxury-nail-salon-5.jpg",
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
    category: "Oceanfront Spa",
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Contact via EmviApp", 
      phone: "Hidden - Sign in to view",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Ocean Views", "Tourist Clientele", "Instagram Famous", "Seasonal Revenue Spikes", "Premium Location"],
    image_url: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/oceanview-nail-spa-6.jpg",
    square_feet: "2800",
    monthly_rent: "18000",
    fomo_message: "🌊 Ocean Views - Instagram Famous Location!"
  }
];