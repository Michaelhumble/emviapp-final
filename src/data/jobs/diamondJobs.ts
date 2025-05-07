
import { Job } from "@/types/job";
import { featuredNailsAds } from "@/utils/featuredNailsAds";

// Convert featured nail ads to Job format
export const diamondJobs: Job[] = featuredNailsAds.map((ad, index) => ({
  id: ad.id || `diamond-job-${index}`,
  title: ad.title,
  company: ad.title,
  location: ad.location,
  created_at: new Date().toISOString(),
  description: ad.description,
  image: ad.photos?.[0] || "",
  contact_info: {
    phone: ad.contact,
    owner_name: ad.title
  },
  salary_range: ad.price,
  pricingTier: "diamond",
  is_vietnamese_listing: true,
  isPinned: index === 0, // Magic Nails (first item) is pinned
}));
