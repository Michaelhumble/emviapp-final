
import { Job } from "@/types/job";

// Single diamond job - Magic Nails (protected listing)
export const diamondJobs: Job[] = [
  {
    id: "magic-nails-diamond-1",
    title: "Tìm Thợ Nails – Magic Nails, Great Falls, MT",
    company: "Magic Nails",
    location: "Great Falls, MT",
    created_at: new Date().toISOString(),
    description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
    image: "/lovable-uploads/74b3ba02-2378-41d7-8cb5-023145e94700.png", 
    contact_info: {
      phone: "(406) 770-3070",
      owner_name: "Magic Nails Owner"
    },
    salary_range: "$1,200–$1,500/tuần",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    isPinned: true,
    featured: true,
    featured_text: "⭐ Featured by EmviApp"
  }
];
