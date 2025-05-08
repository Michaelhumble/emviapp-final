
import { Job } from "@/types/job";

// Build direct Supabase URLs for the images
const SUPABASE_URL = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails";

// Use exact filenames as specified, properly encoded
const IMAGE_FILENAMES = [
  "_A%20long%2C%20luxurious%20nail%20salon-21.png",
  "_A%20long%2C%20luxurious%20nail%20salon-22.png",
  "_A%20long%2C%20luxurious%20nail%20salon-23.png",
  "_A%20long%2C%20luxurious%20nail%20salon-24.png",
  "_A%20long%2C%20luxurious%20nail%20salon-25.png",
  "_A%20long%2C%20luxurious%20nail%20salon-26.png",
  "_A%20long%2C%20luxurious%20nail%20salon-27.png",
  "_A%20long%2C%20luxurious%20nail%20salon-28.png"
];

// Helper function to get direct Supabase image URL with encoding
const getDirectSupabaseUrl = (encodedFilename: string) => {
  return `${SUPABASE_URL}/${encodedFilename}`;
};

export const premiumJobs: Job[] = [
  {
    id: "premium-1",
    title: "Tuyển Thợ Nail – Clawson, MI",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần tuyển thợ nail có kinh nghiệm. Lương cao, tiệm đông khách.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[0]),
    contact_info: {
      phone: "(248) 403-6472"
    },
    salary_range: "$1,200–$1,800/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-2",
    title: "Thợ Nail Design – Milano Nail Spa, Humble, TX",
    company: "Milano Nail Spa",
    location: "Humble, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail design chuyên nghiệp, thợ bột, và thợ chân tay nước.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[1]),
    contact_info: {
      phone: "(346) 398-6868"
    },
    salary_range: ">$2,000/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-3",
    title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
    company: "Tahoe Nail Salon",
    location: "South Lake Tahoe, CA",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm bột, chân tay nước, và wax.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[2]),
    contact_info: {
      phone: "(916) 802-1922"
    },
    salary_range: "$1,600–$2,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-4",
    title: "Cần Thợ Nail – Killeen, TX",
    company: "Killeen Nail Salon",
    location: "Killeen, TX",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước, full-time hoặc part-time.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[3]),
    contact_info: {
      phone: "(512) 540-6173"
    },
    salary_range: "$1,500+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-5",
    title: "Tìm Người Làm Nail – New Jersey",
    company: "NJ Nails",
    location: "New Jersey",
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tìm thợ làm bột và gel. Bao lương nếu thợ có kinh nghiệm.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[4]),
    contact_info: {
      phone: "(551) 333-5678"
    },
    salary_range: "$1,600/tuần + tip",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-6",
    title: "Cần Thợ Nail Có Kinh Nghiệm – Boston, MA",
    company: "Boston Luxury Nails",
    location: "Boston, MA",
    created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tuyển thợ làm full-time, kinh nghiệm 2+ năm, có bằng tiểu bang.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[5]),
    contact_info: {
      phone: "(617) 555-1234"
    },
    salary_range: "$1,700-$2,200/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-7",
    title: "Tuyển Thợ Nail – Seattle, WA",
    company: "Seattle Nail Lounge",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ có kinh nghiệm làm bột và chân tay nước. Lương cao, tip hậu.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[6]),
    contact_info: {
      phone: "(206) 987-6543"
    },
    salary_range: "$1,800-$2,400/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-8",
    title: "Cần Thợ Bột – Portland, OR",
    company: "Portland Nail Arts",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tìm thợ bột chuyên nghiệp. Môi trường làm việc thoải mái, thu nhập ổn định.",
    image: getDirectSupabaseUrl(IMAGE_FILENAMES[7]),
    contact_info: {
      phone: "(503) 222-3333"
    },
    salary_range: "$1,700-$2,300/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  }
];
