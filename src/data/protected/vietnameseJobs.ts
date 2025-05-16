
import { Job } from "@/types/job";

// Vietnamese job listings that should be preserved exactly as they are
export const vietnameseJobs: Job[] = [
  {
    id: "vn-job-1",
    title: "Thợ Nails ở Westminster",
    company: "Luxury Nails",
    location: "Westminster, CA",
    created_at: new Date().toISOString(),
    description: "Cần thợ nails có kinh nghiệm, full-time hoặc part-time. Bao lương từ $1,200/tuần trở lên tùy theo khả năng.",
    image: "/lovable-uploads/nail-salon-1.jpg",
    salary_range: "$1,200-1,500/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(714) 555-1234",
      owner_name: "Hoa Nguyen"
    },
    specialties: ["Bột", "Chân tay nước"]
  },
  {
    id: "vn-job-2",
    title: "Cần Thợ Nails - Houston, TX",
    company: "VIP Nails & Spa",
    location: "Houston, TX",
    created_at: new Date().toISOString(),
    description: "Tiệm ở khu Mỹ trắng, tip cao, cần thợ bột, thợ chân tay nước. Bao lương $1,300-1,700/tuần. Có phòng cho thợ ở xa.",
    image: "/lovable-uploads/nail-salon-2.jpg",
    salary_range: "$1,300-1,700/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(281) 555-9876",
      owner_name: "John Tran"
    },
    has_housing: true,
    specialties: ["Bột", "Chân tay nước", "Waxing"]
  },
  {
    id: "vn-job-3",
    title: "Thợ Nails - San Jose (Bao Lương $1,500+)",
    company: "Golden Nails",
    location: "San Jose, CA",
    created_at: new Date().toISOString(),
    description: "Cần thợ nail kinh nghiệm, bao lương $1,500+ và hơn tùy theo khả năng. Chỗ làm vui vẻ, giờ giấc thoải mái.",
    image: "/lovable-uploads/nail-salon-3.jpg",
    salary_range: "$1,500+/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(408) 555-5678",
      owner_name: "Lisa Pham"
    },
    specialties: ["Bột", "Chân tay nước", "Dip Powder"]
  },
  {
    id: "vn-job-4",
    title: "Thợ Nail và Chân Tay Nước - New York",
    company: "Manhattan Luxury Nails",
    location: "New York, NY",
    created_at: new Date().toISOString(),
    description: "Tiệm nail ở Manhattan, khu khách sang, cần thợ nail và thợ chân tay nước, kinh nghiệm ít nhất 2 năm. Lương $1,800-2,200/tuần, hoa hồng 60%.",
    image: "/lovable-uploads/nail-salon-4.jpg",
    salary_range: "$1,800-2,200/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(212) 555-3456",
      owner_name: "Michael Le"
    },
    specialties: ["Bột", "Chân tay nước", "Gel-X"]
  },
  {
    id: "vn-job-5",
    title: "Cần Nhiều Thợ Nails - Orlando, FL",
    company: "Sunshine Nails & Spa",
    location: "Orlando, FL",
    created_at: new Date().toISOString(),
    description: "Cần gấp thợ bột, thợ chân tay nước, full-time hoặc part-time. Bao lương $1,200-1,600/tuần. Có chỗ ở cho thợ ở xa, đón phi trường.",
    image: "/lovable-uploads/nail-salon-5.jpg",
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(407) 555-8901",
      owner_name: "Tina Vo"
    },
    has_housing: true,
    specialties: ["Bột", "Chân tay nước", "Waxing"]
  },
  {
    id: "vn-job-6",
    title: "Thợ Nail Kinh Nghiệm - Seattle",
    company: "Emerald Nails",
    location: "Seattle, WA",
    created_at: new Date().toISOString(),
    description: "Tiệm vị trí đẹp, khách sang, cần thợ nail có kinh nghiệm làm bột, gel, và dip powder. Lương $1,400-1,900/tuần tùy theo khả năng.",
    image: "/lovable-uploads/nail-salon-6.jpg",
    salary_range: "$1,400-1,900/tuần",
    pricingTier: "featured",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(206) 555-4567",
      owner_name: "Nancy Tran"
    },
    specialties: ["Bột", "Gel", "Dip Powder", "Chân tay nước"]
  }
];
