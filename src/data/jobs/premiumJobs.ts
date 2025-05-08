
import { Job } from "@/types/job";

// Define the Supabase URL for the images
const SUPABASE_URL = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails";

// Sort jobs by highest salary to lowest (creating FOMO effect)
// Helper function to extract numeric value from salary for sorting
const getSalaryValue = (salary: string): number => {
  if (salary.includes('>')) {
    // For ">$2,000/tuần" format, extract 2000
    return parseFloat(salary.replace(/[^0-9.]/g, ''));
  }
  if (salary.includes('–')) {
    // For range "$1,600–$2,500+/tuần", extract the higher value (2500)
    const parts = salary.split('–');
    const higherPart = parts[1] || parts[0];
    return parseFloat(higherPart.replace(/[^0-9.]/g, ''));
  }
  // Default case: just extract the number
  return parseFloat(salary.replace(/[^0-9.]/g, ''));
};

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Thợ Nail Design – Milano Nail Spa, Humble, TX",
    company: "Milano Nail Spa",
    location: "6947 FM 1960 Rd E, Humble, TX",
    created_at: new Date("2025-05-03").toISOString(),
    description: "Receptionist $150/ngày. 60 người đang làm chung.",
    image: `${SUPABASE_URL}/generated%20(01).png`,
    contact_info: {
      phone: "(346) 398-6868 (gặp Nhi)"
    },
    salary_range: ">$2,000/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-2",
    title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
    company: "Tahoe Nail Salon",
    location: "South Lake Tahoe, CA",
    created_at: new Date("2025-05-01").toISOString(),
    description: "Tiệm dễ thương, khách du lịch chịu chi.",
    image: `${SUPABASE_URL}/generated02.png`,
    contact_info: {
      phone: "(916) 802-1922"
    },
    salary_range: "$1,600–$2,500+/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-3",
    title: "Cần Thợ Nail – Killeen, TX",
    company: "Killeen Nail Salon",
    location: "Killeen, TX",
    created_at: new Date("2025-04-29").toISOString(),
    description: "Tiệm lớn, giá cao, tip tốt.",
    image: `${SUPABASE_URL}/generated%20(003).png`,
    contact_info: {
      phone: "(512) 540-6173 | (806) 777-0526"
    },
    salary_range: "$1,500+/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-4",
    title: "Tuyển Thợ Nail – Clawson, MI",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date("2025-05-05").toISOString(),
    description: "Tiệm nhỏ khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
    image: `${SUPABASE_URL}/_A%20long%2C%20luxurious%20nail%20salon-14.png`,
    contact_info: {
      phone: "(248) 403-6472 | (248) 525-9911"
    },
    salary_range: "$1,200–$1,800/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-5",
    title: "Cần thợ làm bột ombré, dip, chân tay nước",
    company: "Clinton Nail Spa",
    location: "Clinton, MD",
    created_at: new Date("2025-05-04").toISOString(),
    description: "Khách dễ chịu, tip cao.",
    image: `${SUPABASE_URL}/generated%20(4).png`,
    contact_info: {
      phone: "703-980-6551"
    },
    salary_range: "$1,200/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-6",
    title: "Tiệm Fort Worth TX cần thợ làm đủ thứ",
    company: "Nails Fort Worth",
    location: "Fort Worth, TX",
    created_at: new Date("2025-05-02").toISOString(),
    description: "Làm đủ thứ. Môi trường vui vẻ.",
    image: `${SUPABASE_URL}/_A%20long%2C%20luxurious%20nail%20salon-15.png`,
    contact_info: {
      phone: "817-841-5157"
    },
    salary_range: "$1,400/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-7",
    title: "Cần thợ dipping tại Chicago",
    company: "Chicago Nails",
    location: "Chicago, IL",
    created_at: new Date("2025-05-02").toISOString(),
    description: "Cần thợ bột, dipping tại Chicago.",
    image: `${SUPABASE_URL}/generated%20(5).png`,
    contact_info: {
      phone: "779-475-0679"
    },
    salary_range: "$1,400/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  },
  {
    id: "premium-8",
    title: "Tiệm ở Iowa cần thợ nữ",
    company: "Iowa Nail Lounge",
    location: "Iowa",
    created_at: new Date("2025-05-02").toISOString(),
    description: "Full set, chân tay nước.",
    image: `${SUPABASE_URL}/_A%20long%2C%20luxurious%20nail%20salon-16.png`,
    contact_info: {
      phone: "402-617-8806"
    },
    salary_range: "$1,300/tuần",
    pricingTier: "premium" as const,
    is_vietnamese_listing: true
  }
].sort((a, b) => {
  // Sort by extracted salary value (higher values first)
  const salaryA = getSalaryValue(a.salary_range || "0");
  const salaryB = getSalaryValue(b.salary_range || "0");
  return salaryB - salaryA;
});
