
import { Job } from "@/types/job";

// Helper function to get Supabase image URL
const getSupabaseImageUrl = (filename: string) => {
  return `https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/${filename}`;
};

// Vietnamese salon for sale listings
export const vietnameseSalonSales: Job[] = [
  {
    id: "salon-sale-cumming-ga",
    title: "Sang Tiệm Nail – Cumming, GA",
    company: "Luxury Nail Spa",
    location: "Cumming, GA",
    created_at: new Date().toISOString(),
    description: "Diện tích: 1,200 sqft | 9 ghế, 7 bàn. Vị trí đẹp gần trường học, ngân hàng, nhà hàng & khu dân cư đông đúc.",
    asking_price: "Contact for price",
    sale_price: "Contact for price",
    contact_info: {
      phone: "Henry – 470-872-5779"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "9",
    station_count: "7",
    square_feet: "1,200",
    image: getSupabaseImageUrl("generated(01).png"),
    pricingTier: "premium"
  },
  {
    id: "salon-sale-maumelle-ar",
    title: "Sang Tiệm Nail – Maumelle, AR",
    company: "V Spa Nails",
    location: "Maumelle, AR",
    created_at: new Date().toISOString(),
    description: "Tiệm rộng 2.500 sqft, có 8 ghế, 9 bàn, đầy đủ tiện nghi. Khu khách sang, giá cao, típ cao. Địa chỉ: 11751 Blvd N, Maumelle, AR 72113.",
    asking_price: "Giá thương lượng",
    sale_price: "Giá thương lượng",
    contact_info: {
      phone: "(501) 508-5581 | (501) 590-7339"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "8",
    station_count: "9",
    square_feet: "2,500",
    image: getSupabaseImageUrl("generated(04).png"),
    pricingTier: "premium"
  },
  {
    id: "salon-sale-jacksonville-fl",
    title: "Sang Tiệm Nail – Jacksonville, FL",
    company: "Nail Lounge",
    location: "St. John, FL",
    created_at: new Date().toISOString(),
    description: "Tiệm 1,400 sqft | 8 bàn, 8 ghế, full supply, máy giặt + máy sấy. Khu shopping đối diện trường Elementary School. Income ổn định quanh năm.",
    asking_price: "$140,000",
    sale_price: "$140,000",
    contact_info: {
      phone: "(404) 543-8822 | 904-578-8620"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "8",
    station_count: "8",
    square_feet: "1,400",
    image: getSupabaseImageUrl("generated(08).png"),
    pricingTier: "premium"
  },
  {
    id: "salon-sale-austin-tx",
    title: "Sang Tiệm Nail – North Austin, TX",
    company: "North Austin Nail Spa",
    location: "Austin, TX",
    created_at: new Date().toISOString(),
    description: "Tiệm 8 bàn 8 ghế – vừa remodel. Gần Domain, Whole Foods, Costco. Top Google reviews. Income: $425K (1099 2024). Rent $5,7xx. Bao supply. Có thể train nếu cần.",
    asking_price: "Giá thương lượng",
    sale_price: "Giá thương lượng",
    monthly_revenue: "$425K (1099 2024)",
    monthly_rent: "$5,7xx",
    contact_info: {
      phone: "Dat – (720) 391-8939"
    },
    is_vietnamese_listing: true,
    for_sale: true,
    is_salon_for_sale: true,
    chair_count: "8",
    station_count: "8",
    image: getSupabaseImageUrl("generated(12).png"),
    pricingTier: "premium"
  }
];
