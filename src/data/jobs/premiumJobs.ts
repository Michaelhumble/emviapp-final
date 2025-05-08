
import { Job } from "@/types/job";

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Tuyển Thợ Nail – Clawson, MI",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần tuyển thợ nail có kinh nghiệm. Lương cao, tiệm đông khách.",
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-5.jpg",
    contact_info: {
      phone: "(248) 403-6472"
    },
    salary_range: "$1,200–$1,800/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-2",
    title: "Thợ Nail Design – Milano Nail Spa, Humble, TX",
    company: "Milano Nail Spa",
    location: "Humble, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail design chuyên nghiệp, thợ bột, và thợ chân tay nước.",
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-6.jpg",
    contact_info: {
      phone: "(346) 398-6868"
    },
    salary_range: ">$2,000/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-3",
    title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
    company: "Tahoe Nail Salon",
    location: "South Lake Tahoe, CA",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm bột, chân tay nước, và wax.",
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-7.jpg",
    contact_info: {
      phone: "(916) 802-1922"
    },
    salary_range: "$1,600–$2,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-4",
    title: "Cần Thợ Nail – Killeen, TX",
    company: "Killeen Nail Salon",
    location: "Killeen, TX",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước, full-time hoặc part-time.",
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-8.jpg",
    contact_info: {
      phone: "(512) 540-6173"
    },
    salary_range: "$1,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-5",
    title: "Tìm Người Làm Nail – New Jersey",
    company: "NJ Nails",
    location: "New Jersey",
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tìm thợ làm bột và gel. Bao lương nếu thợ có kinh nghiệm.",
    image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-salon-9.jpg",
    contact_info: {
      phone: "(551) 333-5678"
    },
    salary_range: "$1,600/tuần + tip",
    pricingTier: "premium",
    is_vietnamese_listing: true
  }
];
