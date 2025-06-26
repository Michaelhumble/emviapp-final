
import { Job } from "@/types/job";

// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

// Single diamond job - Magic Nails (protected listing)
export const diamondJobs: Job[] = [
  {
    id: "magic-nails-diamond-1",
    title: "Tìm Thợ Nails – Magic Nails, Great Falls, MT",
    company: "Magic Nails",
    location: "Great Falls, MT",
    created_at: new Date().toISOString(),
    description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png", 
    contact_info: {
      phone: "(406) 770-3070",
      owner_name: "Magic Nails Owner"
    },
    salary_range: "$1,200–$1,500/tuần",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    isPinned: true,
    is_featured: true,
    featured_text: "⭐ Featured by EmviApp"
  }
];
