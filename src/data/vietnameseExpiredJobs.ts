
import { Job } from "@/types/job";

export const vietnameseExpiredJobs: Job[] = [
  {
    id: "vietnamese-expired-1",
    title: "Expired Vietnamese Nail Job",
    company: "Expired Nails",
    location: "Garden Grove, CA",
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Listing đã hết hạn",
    salary_range: "$700-900/tuần",
    status: "expired",
    is_vietnamese_listing: true,
    category: "Nail Tech"
  }
];

export default vietnameseExpiredJobs;
