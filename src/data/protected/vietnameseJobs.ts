
import { Job } from "@/types/job";

// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

export const vietnameseJobs: Job[] = [
  {
    id: "vn-1",
    title: "Tuyển Thợ Nail Gấp – Garden Grove, CA",
    company: "Rose Nails & Spa",
    location: "Garden Grove, CA",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail biết làm bột và chân tay nước. Lương $1,500-$1,800/tuần.",
    vietnamese_description: "Tiệm đông khách, môi trường làm việc thân thiện. Cần thợ có kinh nghiệm 2+ năm.",
    contact_info: {
      phone: "(714) 555-1234",
      owner_name: "Chị Lan"
    },
    salary_range: "$1,500–$1,800/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    category: "Nail Tech"
  },
  {
    id: "vn-2",
    title: "Tìm Thợ Làm Chân Tay – San Jose, CA",
    company: "Golden Nails",
    location: "San Jose, CA",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm cần thợ làm chân tay nước và dip powder. Bao lương thợ giỏi.",
    vietnamese_description: "Khu khách tốt, tip cao. Làm việc 6 ngày/tuần.",
    contact_info: {
      phone: "(408) 555-5678",
      owner_name: "Anh Tuấn"
    },
    salary_range: "$1,400–$1,700/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    category: "Nail Tech"
  },
  {
    id: "vn-3",
    title: "Cần Thợ Nail – Westminster, CA",
    company: "Little Saigon Nails",
    location: "Westminster, CA",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tuyển thợ nail full-time, biết làm gel và acrylic.",
    vietnamese_description: "Tiệm ở trung tâm Little Saigon, khách đông, lương ổn định.",
    contact_info: {
      phone: "(714) 555-9012",
      owner_name: "Chị Mai"
    },
    salary_range: "$1,200–$1,500/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    category: "Nail Tech"
  },
  {
    id: "vn-4",
    title: "Tuyển Thợ Bột – Houston, TX",
    company: "Houston Beauty Nails",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột có kinh nghiệm, full-time hoặc part-time.",
    vietnamese_description: "Tiệm mới mở, cần thợ giỏi để build clientele.",
    contact_info: {
      phone: "(713) 555-3456",
      owner_name: "Anh Minh"
    },
    salary_range: "$1,300–$1,600/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    category: "Nail Tech"
  },
  {
    id: "vn-5",
    title: "Tìm Thợ Nails – Dallas, TX",
    company: "Diamond Nails Dallas",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tuyển thợ nail biết làm đủ thứ, môi trường làm việc tốt.",
    vietnamese_description: "Tiệm ở khu shopping center, parking free, khách mixed.",
    contact_info: {
      phone: "(214) 555-7890",
      owner_name: "Chị Hoa"
    },
    salary_range: "$1,400–$1,800/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    category: "Nail Tech"
  },
  {
    id: "vn-6",
    title: "Cần Thợ Nail Gấp – Phoenix, AZ",
    company: "Arizona Nails Spa",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm busy, cần thợ nail có experience làm acrylic và gel.",
    vietnamese_description: "Lương theo tuần, có benefit, environment tốt.",
    contact_info: {
      phone: "(602) 555-2468"
    },
    salary_range: "$1,200–$1,500/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    category: "Nail Tech"
  },
  // Gold tier listings
  {
    id: "vn-gold-1",
    title: "Tuyển Thợ Nail – Orange County, CA",
    company: "OC Premium Nails",
    location: "Irvine, CA",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "High-end salon tuyển thợ nail có kinh nghiệm với clientele cao cấp.",
    contact_info: {
      phone: "(949) 555-1111"
    },
    salary_range: "$2,000–$2,500/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-2",
    title: "Cần Thợ Nails – Beverly Hills, CA",
    company: "Beverly Hills Nail Lounge",
    location: "Beverly Hills, CA",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Luxury nail salon cần thợ giỏi, khách celebrity, lương cao.",
    contact_info: {
      phone: "(310) 555-9999"
    },
    salary_range: "$2,500–$3,000/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-3",
    title: "Tuyển Master Nail Artist – San Francisco, CA",
    company: "SF Elite Nails",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tìm master nail artist, chuyên nail art và design cao cấp.",
    contact_info: {
      phone: "(415) 555-7777"
    },
    salary_range: "$2,200–$2,800/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-4",
    title: "Cần Thợ Nails – Las Vegas, NV",
    company: "Vegas Luxury Nails",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Casino area salon, tip cao, cần thợ nail experienced.",
    contact_info: {
      phone: "(702) 555-8888"
    },
    salary_range: "$1,800–$2,300/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-5",
    title: "Tuyển Thợ Nail – Seattle, WA",
    company: "Seattle Premium Spa",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Full service spa cần nail technician, benefits tốt.",
    contact_info: {
      phone: "(206) 555-6666"
    },
    salary_range: "$1,900–$2,400/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-6",
    title: "Cần Thợ Nail – Atlanta, GA",
    company: "Atlanta Nail Studio",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Upscale salon tuyển thợ nail, relocation assistance available.",
    contact_info: {
      phone: "(404) 555-5555"
    },
    salary_range: "$1,700–$2,200/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-7",
    title: "Tuyển Thợ Nails – Miami, FL",
    company: "Miami Beach Nails",
    location: "Miami Beach, FL",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Beach location salon, tourist clientele, seasonal bonuses.",
    contact_info: {
      phone: "(305) 555-4444"
    },
    salary_range: "$1,800–$2,300/tuần",
    has_housing: true,
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Nail Tech"
  },
  {
    id: "vn-gold-8",
    title: "Cần Master Thợ Nail – Chicago, IL",
    company: "Chicago Elite Nails",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Downtown location, high-end clientele, competitive salary.",
    contact_info: {
      phone: "(312) 555-3333"
    },
    salary_range: "$1,900–$2,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    category: "Nail Tech"
  }
];
