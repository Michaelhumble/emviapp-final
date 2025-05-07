
import { Job } from "@/types/job";

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Senior Nail Technician",
    company: "Luxury Nail Spa",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for experienced nail technicians. Great pay and benefits. Join our team of professionals in a high-end salon environment.",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
    contact_info: {
      owner_name: "Salon Manager",
      phone: "(323) 555-1234"
    },
    salary_range: "$1,200 - $1,800/week",
    pricingTier: "premium"
  },
  {
    id: "premium-2",
    title: "Hair Stylist Needed",
    company: "Elite Salon",
    location: "Miami, FL",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Elite Salon is looking for talented hair stylists to join our growing team. Commission-based with guaranteed hourly minimum.",
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    contact_info: {
      owner_name: "Jessica",
      phone: "(305) 555-6789"
    },
    salary_range: "$60K - $90K annually",
    pricingTier: "premium"
  },
  {
    id: "premium-3",
    title: "Esthetician Position",
    company: "Glow Spa & Beauty",
    location: "New York, NY",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Join our upscale spa in Manhattan. Looking for licensed estheticians with facial and body treatment experience. Competitive pay plus benefits.",
    image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
    contact_info: {
      owner_name: "Michael",
      phone: "(212) 555-4321"
    },
    salary_range: "$25-35/hr + tips",
    pricingTier: "premium"
  }
];
