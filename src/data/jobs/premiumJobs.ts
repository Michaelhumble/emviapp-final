
import { Job } from "@/types/job";

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Tuyển Thợ Nail Gấp – Austin, TX",
    company: "Austin Nail Studio",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail biết làm bột và chân tay nước. Tiệm đông khách, lương cao.",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    contact_info: {
      phone: "(512) 555-0123"
    },
    salary_range: "$1,800–$2,200/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    category: "Nail Tech"
  },
  {
    id: "premium-2",
    title: "Nail Technician Wanted – Dallas, TX",
    company: "Elite Nails Dallas",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for experienced nail technician. Great pay and benefits package.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    contact_info: {
      phone: "(214) 555-0456"
    },
    salary_range: "$2,000–$2,500/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: false,
    category: "Nail Tech"
  },
  {
    id: "premium-3",
    title: "Cần Thợ Làm Móng – Phoenix, AZ",
    company: "Desert Nails Spa",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở khu cao cấp, cần thợ có kinh nghiệm làm gel và nail art.",
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    contact_info: {
      phone: "(602) 555-0789"
    },
    salary_range: "$1,600–$2,000/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    category: "Nail Tech"
  }
];
