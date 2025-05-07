
import { Job } from "@/types/job";

export const freeJobs: Job[] = [
  {
    id: "free-1",
    title: "Part-time Nail Tech",
    company: "Simply Nails",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for part-time nail technicians for weekend shifts. Experience with acrylics and gel required.",
    contact_info: {
      owner_name: "Linda",
      phone: "(214) 555-8765"
    },
    salary_range: "$15-20/hr + tips",
    pricingTier: "free"
  },
  {
    id: "free-2",
    title: "Salon Assistant",
    company: "Cutting Edge Hair",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Salon assistant needed for busy downtown location. Duties include reception, cleaning, and assisting stylists. Perfect opportunity for beauty school students.",
    contact_info: {
      owner_name: "Marcus",
      phone: "(312) 555-9870"
    },
    salary_range: "$14/hr + tips",
    pricingTier: "free"
  },
  {
    id: "free-3",
    title: "Makeup Artist - Weddings",
    company: "Bridal Beauty",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Seeking talented makeup artists for weekend wedding gigs. Must be reliable, professional, and experienced with diverse skin tones and photography-ready makeup.",
    contact_info: {
      owner_name: "Sarah",
      phone: "(404) 555-3456"
    },
    salary_range: "$150-300 per event",
    pricingTier: "free"
  }
];
