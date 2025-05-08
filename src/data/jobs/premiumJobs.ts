
import { Job } from "@/types/job";

// Build direct Supabase URLs for the images
const SUPABASE_URL = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails";

// Use exact filenames as specified, properly encoded
const IMAGE_FILENAMES = [
  "_A%20long%2C%20luxurious%20nail%20salon-10.png",
  "_A%20long%2C%20luxurious%20nail%20salon-11.png",
  "_A%20long%2C%20luxurious%20nail%20salon-12.png",
  "_A%20long%2C%20luxurious%20nail%20salon-13.png",
  "_A%20long%2C%20luxurious%20nail%20salon-14.png",
  "_A%20long%2C%20luxurious%20nail%20salon-15.png",
  "_A%20long%2C%20luxurious%20nail%20salon-16.png",
  "_A%20long%2C%20luxurious%20nail%20salon-17.png"
];

// Helper function to get direct Supabase image URL with encoding
const getDirectSupabaseUrl = (encodedFilename: string) => {
  return `${SUPABASE_URL}/${encodedFilename}`;
};

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Thợ Nail Design – Milano Nail Spa, Humble, TX",
    company: "Milano Nail Spa",
    location: "Humble, TX",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Receptionist $150/ngày. 60 người đang làm chung.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[0]),
    contact_info: {
      phone: "(346) 398-6868 (gặp Nhi)"
    },
    salary_range: ">$2,000/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-2",
    title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
    company: "Tahoe Nail Salon",
    location: "South Lake Tahoe, CA",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm dễ thương, khách du lịch chịu chi.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[1]),
    contact_info: {
      phone: "(916) 802-1922"
    },
    salary_range: "$1,600–$2,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-3",
    title: "Cần Thợ Nail – Killeen, TX",
    company: "Killeen Nail Salon",
    location: "Killeen, TX",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm lớn, giá cao, tip tốt.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[2]),
    contact_info: {
      phone: "(512) 540-6173 | (806) 777-0526"
    },
    salary_range: "$1,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-4",
    title: "Tiệm vùng Fort Worth TX cần thợ biết làm đủ thứ",
    company: "Fort Worth Nail Salon",
    location: "Fort Worth, TX",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm vùng Fort Worth TX cần thợ biết làm đủ thứ.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[3]),
    contact_info: {
      phone: "817-841-5157"
    },
    salary_range: "$1,400/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-5",
    title: "Cần thợ bột, dipping tại Chicago",
    company: "Chicago Nail Spa",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột, dipping tại Chicago.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[4]),
    contact_info: {
      phone: "779-475-0679"
    },
    salary_range: "$1,400/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-6",
    title: "Tiệm ở Iowa cần thợ nữ làm full set, chân tay nước",
    company: "Iowa Nail Salon",
    location: "Iowa",
    created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở Iowa cần thợ nữ làm full set, chân tay nước.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[5]),
    contact_info: {
      phone: "402-617-8806"
    },
    salary_range: "$1,300/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-7",
    title: "Tuyển Thợ Nail – Clawson, MI",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm nhỏ khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[6]),
    contact_info: {
      phone: "(248) 403-6472 | (248) 525-9911"
    },
    salary_range: "$1,200–$1,800/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-8",
    title: "Cần thợ có kinh nghiệm làm bột ombré, dip, chân tay nước",
    company: "Clinton Nail Studio",
    location: "Clinton, Maryland",
    created_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Khách dễ chịu, tip cao.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[7]),
    contact_info: {
      phone: "703-980-6551"
    },
    salary_range: "$1,200/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  }
];
