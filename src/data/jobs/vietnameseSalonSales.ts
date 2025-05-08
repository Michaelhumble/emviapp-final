
import { Job } from "@/types/job";

// Helper function to get Supabase image URL
const getSupabaseImageUrl = (filename: string) => {
  return `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/${filename}`;
};

// Vietnamese salon for sale listings
export const vietnameseSalonSales: Job[] = [
  {
    id: "salon-sale-greenwood-village",
    title: "Sang Tiệm Nail – Greenwood Village, CO",
    location: "Greenwood Village, CO",
    created_at: new Date().toISOString(),
    description: "9 ghế, 9 bàn, đầy đủ đồ, rent $4,800/tháng (bao gồm tất cả).",
    revenue: "$35k–$45k/tháng",
    monthly_rent: "$4,800",
    contact_info: {
      phone: "(720) 645-5531"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "9",
    station_count: "9",
    image: getSupabaseImageUrl("_A%20long%2C%20luxurious%20nail%20salon-17.png"),
    pricingTier: "premium"
  },
  {
    id: "salon-sale-beavercreek",
    title: "Sang Tiệm Nail – Beavercreek, OH",
    location: "Beavercreek, OH",
    created_at: new Date().toISOString(),
    description: "48 bàn, 45 ghế, 11,000 sqft, khu shopping.",
    revenue: "$1.8 triệu/năm",
    square_feet: "11,000",
    contact_info: {
      phone: "(404) 723-1170"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "45",
    station_count: "48",
    image: getSupabaseImageUrl("_A%20long%2C%20luxurious%20nail%20salon-18.png"),
    pricingTier: "premium"
  },
  {
    id: "salon-sale-garland",
    title: "Sang Tiệm Nail – Garland, TX",
    location: "Garland, TX",
    created_at: new Date().toISOString(),
    description: "Khu Việt Nam, khách ổn định.",
    sale_price: "$60,000",
    asking_price: "$60,000",
    contact_info: {
      phone: "(972) 555-8888"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    image: getSupabaseImageUrl("_A%20long%2C%20luxurious%20nail%20salon-19.png"),
    pricingTier: "standard"
  },
  {
    id: "salon-sale-phoenix",
    title: "Sang Tiệm Nail – Phoenix, AZ",
    location: "Phoenix, AZ",
    created_at: new Date().toISOString(),
    description: "6 bàn, 6 ghế, khu đông khách.",
    sale_price: "$75,000",
    asking_price: "$75,000",
    chair_count: "6",
    station_count: "6",
    contact_info: {
      phone: "(602) 888-9999"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    image: getSupabaseImageUrl("_A%20long%2C%20luxurious%20nail%20salon-20.png"),
    pricingTier: "standard"
  }
];
