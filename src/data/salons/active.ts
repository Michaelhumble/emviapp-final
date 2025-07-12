import { Job } from '@/types/job';

// Active premium salon listings for sale
export const activeSalons: Job[] = [
  {
    id: "premium-salon-1",
    title: "Luxe Nail Studio & Spa",
    company: "Luxe Nail Studio & Spa",
    location: "Beverly Hills, CA",
    description: "2,800 sqft luxury nail studio in prime Beverly Hills location. 12 premium pedicure chairs, 10 manicure stations. High-end clientele, avg tip $80+. Recently renovated with Italian marble floors.",
    price: "$485,000",
    created_at: "2024-01-20T10:30:00Z",
    type: "salon",
    category: "Nail Tech",
    pricing_tier: "premium",
    status: "active",
    contact_info: {
      owner_name: "Sarah Chen",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["12 Pedicure Chairs", "10 Manicure Stations", "VIP Room", "Parking Available"],
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    square_feet: "2800",
    monthly_rent: "8500"
  },
  {
    id: "premium-salon-2",
    title: "Elegance Beauty Lounge",
    company: "Elegance Beauty Lounge",
    location: "Manhattan, NY",
    description: "Premium full-service beauty lounge in Midtown Manhattan. 3,200 sqft with nail services, hair styling, and skincare. Established 8 years, loyal celebrity clientele.",
    price: "$750,000",
    created_at: "2024-01-19T14:20:00Z",
    type: "salon",
    category: "Full Service",
    pricing_tier: "premium",
    status: "active",
    contact_info: {
      owner_name: "Isabella Rodriguez",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Celebrity Clientele", "Full Service", "Prime Location", "High Revenue"],
    image_url: "https://images.unsplash.com/photo-1622287162716-f311baa1d300?w=800&h=600&fit=crop",
    square_feet: "3200",
    monthly_rent: "12000"
  },
  {
    id: "featured-salon-1",
    title: "Serenity Nail & Wellness",
    company: "Serenity Nail & Wellness",
    location: "Austin, TX",
    description: "Award-winning nail salon and wellness center. 2,000 sqft with organic products focus. Featured in Texas Monthly. Strong social media presence (15K+ followers).",
    price: "$320,000",
    created_at: "2024-01-18T09:15:00Z",
    type: "salon",
    category: "Nail Tech",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Michelle Johnson",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Award Winner", "Organic Focus", "15K Social Media", "Prime Austin Location"],
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    square_feet: "2000",
    monthly_rent: "4800"
  },
  {
    id: "diamond-salon-1",
    title: "Platinum Nails & Spa Empire",
    company: "Platinum Nails & Spa Empire",
    location: "Scottsdale, AZ",
    description: "Ultra-luxury nail spa empire with 4,500 sqft flagship location. 20 premium stations, private VIP suites, champagne service. $2M+ annual revenue. Celebrity clientele.",
    price: "$1,250,000",
    created_at: "2024-01-21T11:45:00Z",
    type: "salon",
    category: "Nail Tech",
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Victoria Sterling",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["$2M+ Revenue", "Celebrity Clients", "VIP Suites", "Champagne Service"],
    image_url: "https://images.unsplash.com/photo-1562322140-8d73dd88f5fa?w=800&h=600&fit=crop",
    square_feet: "4500",
    monthly_rent: "18000"
  },
  {
    id: "premium-salon-3",
    title: "Harmony Hair & Nail Studio",
    company: "Harmony Hair & Nail Studio",
    location: "Miami Beach, FL",
    description: "Trendy dual-service salon in heart of South Beach. 2,400 sqft with ocean views. Popular with influencers and tourists. Strong walk-in traffic year-round.",
    price: "$425,000",
    created_at: "2024-01-17T16:30:00Z",
    type: "salon",
    category: "Hair & Nails",
    pricing_tier: "premium",
    status: "active",
    contact_info: {
      owner_name: "Carlos Martinez",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Ocean Views", "Tourist Area", "Influencer Clients", "Year-Round Traffic"],
    image_url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop",
    square_feet: "2400",
    monthly_rent: "7200"
  },
  {
    id: "featured-salon-2",
    title: "Zen Beauty Collective",
    company: "Zen Beauty Collective",
    location: "Portland, OR",
    description: "Eco-friendly beauty collective with sustainable practices. 1,800 sqft modern space. Specializes in non-toxic treatments. Featured in Vogue sustainability article.",
    price: "$285,000",
    created_at: "2024-01-16T13:20:00Z",
    type: "salon",
    category: "Eco Beauty",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Emma Thompson",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Eco-Friendly", "Vogue Featured", "Non-Toxic", "Modern Design"],
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
    square_feet: "1800",
    monthly_rent: "3900"
  },
  {
    id: "premium-salon-4",
    title: "Golden State Nail Lounge",
    company: "Golden State Nail Lounge",
    location: "San Francisco, CA",
    description: "Modern nail lounge in SOMA district. 2,100 sqft with industrial-chic design. Tech worker clientele, high-paying appointments. Apple Pay and app booking system.",
    price: "$395,000",
    created_at: "2024-01-15T12:10:00Z",
    type: "salon",
    category: "Nail Tech",
    pricing_tier: "premium",
    status: "active",
    contact_info: {
      owner_name: "Jennifer Kim",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Tech Clientele", "App Booking", "Industrial Design", "High Paying"],
    image_url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop",
    square_feet: "2100",
    monthly_rent: "6800"
  },
  {
    id: "featured-salon-3",
    title: "Radiance Skin & Nail Bar",
    company: "Radiance Skin & Nail Bar",
    location: "Nashville, TN",
    description: "Trendy skin and nail bar in Music City. 1,900 sqft with LED light therapy stations. Popular with musicians and country stars. Instagram-worthy interior design.",
    price: "$310,000",
    created_at: "2024-01-14T10:45:00Z",
    type: "salon",
    category: "Skin & Nails",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Ashley Davis",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Celebrity Clients", "LED Therapy", "Instagram Ready", "Music City"],
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    square_feet: "1900",
    monthly_rent: "4200"
  },
  {
    id: "diamond-salon-2",
    title: "Royal Crown Beauty Palace",
    company: "Royal Crown Beauty Palace",
    location: "Las Vegas, NV",
    description: "Ultra-luxe beauty palace on Las Vegas Strip. 5,000 sqft with gold-plated fixtures. 24/7 service for VIP clients. $3M+ annual revenue. International clientele.",
    price: "$1,850,000",
    created_at: "2024-01-22T09:30:00Z",
    type: "salon",
    category: "Luxury Spa",
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Sophia Alexandra",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["$3M+ Revenue", "24/7 Service", "Vegas Strip", "Gold Fixtures"],
    image_url: "https://images.unsplash.com/photo-1562322140-8d73dd88f5fa?w=800&h=600&fit=crop",
    square_feet: "5000",
    monthly_rent: "25000"
  },
  {
    id: "premium-salon-5",
    title: "Urban Chic Nail Studio",
    company: "Urban Chic Nail Studio",
    location: "Chicago, IL",
    description: "Sophisticated nail studio in trendy Lincoln Park. 1,750 sqft minimalist design. Specializes in nail art and gel extensions. Featured in Chicago Magazine.",
    price: "$295,000",
    created_at: "2024-01-13T15:20:00Z",
    type: "salon",
    category: "Nail Art",
    pricing_tier: "premium",
    status: "active",
    contact_info: {
      owner_name: "Madison Walsh",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Nail Art Focus", "Minimalist Design", "Magazine Featured", "Lincoln Park"],
    image_url: "https://images.unsplash.com/photo-1522338140262-f46f5913618e?w=800&h=600&fit=crop",
    square_feet: "1750",
    monthly_rent: "4100"
  },
  {
    id: "featured-salon-4",
    title: "Coastal Beauty Retreat",
    company: "Coastal Beauty Retreat",
    location: "Santa Monica, CA",
    description: "Beachside beauty retreat with ocean breeze. 2,200 sqft with outdoor patio area. Specializes in beach-ready looks. High-end Santa Monica clientele.",
    price: "$465,000",
    created_at: "2024-01-12T11:15:00Z",
    type: "salon",
    category: "Beach Beauty",
    pricing_tier: "featured",
    status: "active",
    contact_info: {
      owner_name: "Mia Rodriguez",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["Ocean Views", "Outdoor Patio", "Beach Theme", "Santa Monica"],
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    square_feet: "2200",
    monthly_rent: "8200"
  },
  {
    id: "diamond-salon-3",
    title: "Imperial Luxury Spa & Salon",
    company: "Imperial Luxury Spa & Salon",
    location: "Greenwich, CT",
    description: "Old-money luxury spa and salon in prestigious Greenwich. 6,200 sqft estate-style setting. Generational clients, $4M+ revenue. Private helicopter pad access.",
    price: "$2,750,000",
    created_at: "2024-01-23T14:00:00Z",
    type: "salon",
    category: "Ultra Luxury",
    pricing_tier: "diamond",
    status: "active",
    contact_info: {
      owner_name: "Penelope Whitmore",
      phone: "Request via EmviApp",
      email: "inquiries@emviapp.com"
    },
    salon_features: ["$4M+ Revenue", "Helicopter Access", "Estate Setting", "Generational Clients"],
    image_url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    square_feet: "6200",
    monthly_rent: "35000"
  }
];