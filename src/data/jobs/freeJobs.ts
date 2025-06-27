
import { Job } from "@/types/job";

export const freeJobs: Job[] = [
  {
    id: "free-1",
    title: "Cần Gấp Thợ Làm Chân Tay Nước – Houston, TX",
    company: "Houston Beauty Salon",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ làm chân tay nước, có thể làm part-time hoặc full-time.",
    contact_info: {
      owner_name: "Linda",
      phone: "(832) 444-2299"
    },
    salary_range: "Part/Full-time",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    category: "Nail Tech"
  },
  {
    id: "free-2",
    title: "Tuyển Thợ Nail – Seattle, WA",
    company: "Seattle Nails",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước, lương cao + tip hậu.",
    contact_info: {
      owner_name: "Marcus",
      phone: "(206) 888-1234"
    },
    salary_range: "$1,800–$2,400/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    category: "Nail Tech"
  },
  {
    id: "free-3",
    title: "Tuyển Thợ Làm Dip Powder – Orlando, FL",
    company: "Orlando Beauty",
    location: "Orlando, FL",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm dip powder, full set, và pedicure. Bao lương thợ giỏi.",
    contact_info: {
      owner_name: "Sarah",
      phone: "(407) 777-9898"
    },
    salary_range: "$1,400–$1,900/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    category: "Nail Tech"
  },
  {
    id: "free-4",
    title: "Cần Thợ Full Set – Los Angeles, CA",
    company: "LA Nail Studio",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở khu Mỹ trắng, cần thợ có kinh nghiệm làm full set và pedicure.",
    contact_info: {
      owner_name: "David",
      phone: "(323) 555-9012"
    },
    salary_range: "$1,800–$2,200/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    category: "Nail Tech"
  }
];
