
import { Job } from "@/types/job";

export const expiredListings: Job[] = [
  {
    id: "expired-1",
    title: "Expired Nail Tech Position",
    company: "Sample Nails",
    location: "Sample City, CA",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    description: "This listing has expired.",
    salary_range: "$800-1000/week",
    status: "expired",
    category: "Nail Tech"
  }
];

export default expiredListings;
