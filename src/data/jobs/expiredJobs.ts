
import { Job } from "@/types/job";

export const expiredJobs: Job[] = [
  {
    id: "expired-1",
    title: "Barber Wanted",
    company: "Classic Cuts",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for licensed barbers with at least 2 years experience. Booth rental available.",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    contact_info: {
      owner_name: "Tony",
      phone: "(602) 555-5678"
    },
    status: "expired",
    pricingTier: "expired"
  },
  {
    id: "expired-2",
    title: "Receptionist",
    company: "Bella Spa",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Front desk position available for busy downtown spa. Must have excellent customer service skills and be able to manage online booking system.",
    contact_info: {
      owner_name: "Anna",
      phone: "(206) 555-2345"
    },
    status: "expired",
    pricingTier: "expired"
  },
  {
    id: "expired-3",
    title: "Lash Technician",
    company: "Lush Lashes",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Experienced lash technician needed for full-time position. Classic and volume sets. Great commission structure.",
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    contact_info: {
      owner_name: "Christine",
      phone: "(720) 555-8765"
    },
    status: "expired",
    pricingTier: "expired"
  }
];
