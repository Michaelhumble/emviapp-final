
import { Job } from "@/types/job";

// Define the Supabase URL for the images
const SUPABASE_URL = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails";

// Function to get a random image from our valid images array
const getRandomImage = () => {
  const validImages = [
    "generated (01).png",
    "generated02.png",
    "generated (003).png",
    "generated-26.png",
    "generated (04).png",
    "generated (1)0.png",
    "generated (2).png",
    "generated (5).png",
    "generated (7).png",
    "generated-18.png",
    "generated-25.png",
    "generated (9).png"
  ];
  return `${SUPABASE_URL}/${validImages[Math.floor(Math.random() * validImages.length)]}`;
};

// Combined expired listings (Vietnamese nail jobs + English industry jobs)
export const expiredListings: Job[] = [
  // Vietnamese nail jobs (31)
  {
    id: "exp-nail-1",
    title: "Thợ Nail – Pearland, TX",
    company: "Pearland Nail Spa",
    location: "Pearland, TX",
    created_at: new Date("2025-03-15").toISOString(),
    description: "Cần thợ nail làm full-time/part-time, bao lương.",
    image: getRandomImage(),
    contact_info: {
      phone: "(832) 555-1234"
    },
    salary_range: "$800-1,200/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-2",
    title: "Cần thợ bột – San Jose, CA",
    company: "Elegant Nails",
    location: "San Jose, CA",
    created_at: new Date("2025-03-10").toISOString(),
    description: "Cần nhiều thợ bột, bao lương $1,200-1,500/tuần.",
    image: getRandomImage(),
    contact_info: {
      phone: "(408) 555-2345"
    },
    salary_range: "$1,200-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-3",
    title: "Thợ Nail tại Plano, TX",
    company: "Luxury Nail Bar",
    location: "Plano, TX",
    created_at: new Date("2025-02-25").toISOString(),
    description: "Tiệm khu Mỹ trắng, típ cao, cần thợ nail biết làm đủ thứ.",
    image: getRandomImage(),
    contact_info: {
      phone: "(972) 555-3456"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-4",
    title: "Cần thợ nail gấp – Orlando, FL",
    company: "Magic Nails Orlando",
    location: "Orlando, FL",
    created_at: new Date("2025-02-20").toISOString(),
    description: "Khu du lịch, khách tip hậu, cần thợ nail gấp.",
    image: getRandomImage(),
    contact_info: {
      phone: "(407) 555-4567"
    },
    salary_range: "$1,300-1,700/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-5",
    title: "Cần thợ biết làm chân tay nước – Seattle, WA",
    company: "Seattle Nail Lounge",
    location: "Seattle, WA",
    created_at: new Date("2025-02-15").toISOString(),
    description: "Tiệm mới khai trương, cần thợ biết làm chân tay nước, full-time hoặc part-time.",
    image: getRandomImage(),
    contact_info: {
      phone: "(206) 555-5678"
    },
    salary_range: "$900-1,300/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-6",
    title: "Thợ Nail tại Chicago, IL",
    company: "Windy City Nails",
    location: "Chicago, IL",
    created_at: new Date("2025-02-10").toISOString(),
    description: "Tiệm đông khách, cần thợ nail làm full-time, ưu tiên người có kinh nghiệm.",
    image: getRandomImage(),
    contact_info: {
      phone: "(312) 555-6789"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-7",
    title: "Thợ dipping và Gel-X – Miami, FL",
    company: "South Beach Nails",
    location: "Miami, FL",
    created_at: new Date("2025-02-05").toISOString(),
    description: "Khu du lịch đông khách, típ cao. Cần thợ có kinh nghiệm làm dipping và Gel-X.",
    image: getRandomImage(),
    contact_info: {
      phone: "(305) 555-7890"
    },
    salary_range: "$1,400-1,900/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-8",
    title: "Thợ Nail tại Austin, TX",
    company: "Capital City Nails",
    location: "Austin, TX",
    created_at: new Date("2025-01-30").toISOString(),
    description: "Tiệm khu North Austin, khách sang, típ hậu, giờ giấc thoải mái.",
    image: getRandomImage(),
    contact_info: {
      phone: "(512) 555-8901"
    },
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-9",
    title: "Cần thợ nail – Denver, CO",
    company: "Mile High Nails",
    location: "Denver, CO",
    created_at: new Date("2025-01-25").toISOString(),
    description: "Tiệm ở khu thương mại đông đúc. Cần thợ nail, bao lương hoặc chia phần trăm.",
    image: getRandomImage(),
    contact_info: {
      phone: "(303) 555-9012"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-10",
    title: "Thợ Nail tại Boston, MA",
    company: "Boston Beauty Nails",
    location: "Boston, MA",
    created_at: new Date("2025-01-20").toISOString(),
    description: "Cần thợ nail có kinh nghiệm, full-time hoặc part-time, tiệm đóng cửa ngày Chủ Nhật.",
    image: getRandomImage(),
    contact_info: {
      phone: "(617) 555-0123"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-11",
    title: "Cần thợ nước – Las Vegas, NV",
    company: "Vegas Luxury Nails",
    location: "Las Vegas, NV",
    created_at: new Date("2025-01-15").toISOString(),
    description: "Tiệm khu khách sạn, cần thợ nước, típ rất tốt.",
    image: getRandomImage(),
    contact_info: {
      phone: "(702) 555-1234"
    },
    salary_range: "$1,300-1,800/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-12",
    title: "Thợ Nail tại Portland, OR",
    company: "Rose City Nails",
    location: "Portland, OR",
    created_at: new Date("2025-01-10").toISOString(),
    description: "Tiệm khu thượng lưu, cần thợ nail có kinh nghiệm, môi trường làm việc thân thiện.",
    image: getRandomImage(),
    contact_info: {
      phone: "(503) 555-2345"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-13",
    title: "Cần thợ nail full-time – Nashville, TN",
    company: "Music City Nails",
    location: "Nashville, TN",
    created_at: new Date("2025-01-05").toISOString(),
    description: "Tiệm khu du lịch, khách đông, cần thợ nail làm full-time.",
    image: getRandomImage(),
    contact_info: {
      phone: "(615) 555-3456"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-14",
    title: "Thợ Nail tại Atlanta, GA",
    company: "Peachtree Nails",
    location: "Atlanta, GA",
    created_at: new Date("2024-12-30").toISOString(),
    description: "Cần thợ nail biết làm đủ thứ, bao lương hoặc chia 6/4.",
    image: getRandomImage(),
    contact_info: {
      phone: "(404) 555-4567"
    },
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-15",
    title: "Cần thợ biết làm bột – Philadelphia, PA",
    company: "Liberty Nails",
    location: "Philadelphia, PA",
    created_at: new Date("2024-12-25").toISOString(),
    description: "Tiệm đông khách, cần thợ biết làm bột, lương cao.",
    image: getRandomImage(),
    contact_info: {
      phone: "(215) 555-5678"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-16",
    title: "Thợ Nail tại Phoenix, AZ",
    company: "Desert Bloom Nails",
    location: "Phoenix, AZ",
    created_at: new Date("2024-12-20").toISOString(),
    description: "Tiệm trong mall, khách đông, típ tốt, cần thợ nail làm full-time.",
    image: getRandomImage(),
    contact_info: {
      phone: "(602) 555-6789"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-17",
    title: "Cần thợ nail – San Diego, CA",
    company: "Pacific Nails",
    location: "San Diego, CA",
    created_at: new Date("2024-12-15").toISOString(),
    description: "Tiệm khu La Jolla, khách tip hậu, cần thợ nail biết làm đủ thứ.",
    image: getRandomImage(),
    contact_info: {
      phone: "(619) 555-7890"
    },
    salary_range: "$1,300-1,700/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-18",
    title: "Thợ Nail tại Dallas, TX",
    company: "Lone Star Nails",
    location: "Dallas, TX",
    created_at: new Date("2024-12-10").toISOString(),
    description: "Tiệm vùng Plano, cần thợ nail có kinh nghiệm, bao lương cao.",
    image: getRandomImage(),
    contact_info: {
      phone: "(214) 555-8901"
    },
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-19",
    title: "Cần thợ tay chân nước – Minneapolis, MN",
    company: "Twin Cities Nails",
    location: "Minneapolis, MN",
    created_at: new Date("2024-12-05").toISOString(),
    description: "Tiệm mới mở, cần thợ tay chân nước, có thể đào tạo người mới.",
    image: getRandomImage(),
    contact_info: {
      phone: "(612) 555-9012"
    },
    salary_range: "$900-1,300/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-20",
    title: "Thợ Nail tại Charlotte, NC",
    company: "Queen City Nails",
    location: "Charlotte, NC",
    created_at: new Date("2024-12-01").toISOString(),
    description: "Tiệm khu thương mại sầm uất, cần thợ nail làm full-time hoặc part-time.",
    image: getRandomImage(),
    contact_info: {
      phone: "(704) 555-0123"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-21",
    title: "Cần thợ nail – Albuquerque, NM",
    company: "Desert Rose Nails",
    location: "Albuquerque, NM",
    created_at: new Date("2024-11-25").toISOString(),
    description: "Tiệm đông khách, cần thợ nail biết làm đủ thứ, lương thưởng hấp dẫn.",
    image: getRandomImage(),
    contact_info: {
      phone: "(505) 555-1234"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-22",
    title: "Thợ Nail tại Pittsburgh, PA",
    company: "Steel City Nails",
    location: "Pittsburgh, PA",
    created_at: new Date("2024-11-20").toISOString(),
    description: "Cần thợ nail có kinh nghiệm, tiệm đông khách, môi trường làm việc thoải mái.",
    image: getRandomImage(),
    contact_info: {
      phone: "(412) 555-2345"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-23",
    title: "Cần thợ dipping – Sacramento, CA",
    company: "Capital Nails",
    location: "Sacramento, CA",
    created_at: new Date("2024-11-15").toISOString(),
    description: "Tiệm khu Arden Arcade, cần thợ biết làm dipping, khách sang, típ tốt.",
    image: getRandomImage(),
    contact_info: {
      phone: "(916) 555-3456"
    },
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-24",
    title: "Thợ Nail tại Kansas City, MO",
    company: "Fountain City Nails",
    location: "Kansas City, MO",
    created_at: new Date("2024-11-10").toISOString(),
    description: "Cần thợ nail full-time hoặc part-time, bao lương hoặc ăn chia.",
    image: getRandomImage(),
    contact_info: {
      phone: "(816) 555-4567"
    },
    salary_range: "$900-1,300/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-25",
    title: "Cần thợ nail – Cleveland, OH",
    company: "Lake Erie Nails",
    location: "Cleveland, OH",
    created_at: new Date("2024-11-05").toISOString(),
    description: "Tiệm vùng ngoại ô, khách tip hậu, cần thợ biết làm đủ thứ.",
    image: getRandomImage(),
    contact_info: {
      phone: "(216) 555-5678"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-26",
    title: "Thợ Nail tại Tampa, FL",
    company: "Bay Nails",
    location: "Tampa, FL",
    created_at: new Date("2024-10-31").toISOString(),
    description: "Tiệm khu du lịch, khách đông, cần nhiều thợ nail có kinh nghiệm.",
    image: getRandomImage(),
    contact_info: {
      phone: "(813) 555-6789"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-27",
    title: "Cần thợ biết làm Gel-X – Cincinnati, OH",
    company: "Queen City Beauty",
    location: "Cincinnati, OH",
    created_at: new Date("2024-10-25").toISOString(),
    description: "Tiệm khu downtown, cần thợ biết làm Gel-X, lương thưởng hấp dẫn.",
    image: getRandomImage(),
    contact_info: {
      phone: "(513) 555-7890"
    },
    salary_range: "$1,200-1,600/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-28",
    title: "Thợ Nail tại Raleigh, NC",
    company: "Oak City Nails",
    location: "Raleigh, NC",
    created_at: new Date("2024-10-20").toISOString(),
    description: "Cần thợ nail có kinh nghiệm, tiệm khu văn phòng, khách sang, típ cao.",
    image: getRandomImage(),
    contact_info: {
      phone: "(919) 555-8901"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-29",
    title: "Cần thợ nail – Indianapolis, IN",
    company: "Circle City Nails",
    location: "Indianapolis, IN",
    created_at: new Date("2024-10-15").toISOString(),
    description: "Tiệm đông khách, cần thợ nail biết làm đủ thứ, bao lương hoặc ăn chia.",
    image: getRandomImage(),
    contact_info: {
      phone: "(317) 555-9012"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-30",
    title: "Thợ Nail tại St. Louis, MO",
    company: "Gateway Nails",
    location: "St. Louis, MO",
    created_at: new Date("2024-10-10").toISOString(),
    description: "Tiệm trong trung tâm thương mại, cần thợ nail có kinh nghiệm.",
    image: getRandomImage(),
    contact_info: {
      phone: "(314) 555-0123"
    },
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  {
    id: "exp-nail-31",
    title: "Cần thợ làm móng – Salt Lake City, UT",
    company: "Mountain View Nails",
    location: "Salt Lake City, UT",
    created_at: new Date("2024-10-05").toISOString(),
    description: "Tiệm khu downtown, khách tip hậu, cần thợ biết làm đủ thứ.",
    image: getRandomImage(),
    contact_info: {
      phone: "(801) 555-1234"
    },
    salary_range: "$1,100-1,500/tuần",
    pricingTier: "expired" as const,
    is_vietnamese_listing: true,
    industry: "💅 Nail Tech"
  },
  
  // English industry jobs (12)
  {
    id: "exp-beauty-1",
    title: "Barber – Legends Cut Studio",
    company: "Legends Cut Studio",
    location: "Charlotte, NC",
    created_at: new Date("2025-05-01").toISOString(),
    description: "Busy men's barbershop looking for a detail-oriented fade expert. Booth or commission.",
    image: getRandomImage(),
    contact_info: {
      phone: "(704) 555-2468"
    },
    salary_range: "$1,200-1,600/week",
    pricingTier: "expired" as const,
    industry: "💈 Barber"
  },
  {
    id: "exp-beauty-2",
    title: "Hair Stylist – Luxe Salon",
    company: "Luxe Salon",
    location: "Miami, FL",
    created_at: new Date("2025-04-28").toISOString(),
    description: "Upscale salon seeking experienced stylist with color expertise and client following.",
    image: getRandomImage(),
    contact_info: {
      phone: "(305) 555-1357"
    },
    salary_range: "$1,400-2,200/week",
    pricingTier: "expired" as const,
    industry: "💇 Hair Stylist"
  },
  {
    id: "exp-beauty-3",
    title: "Massage Therapist – Wellness Retreat",
    company: "Wellness Retreat Spa",
    location: "Denver, CO",
    created_at: new Date("2025-04-25").toISOString(),
    description: "Full-service spa seeking licensed massage therapist for Swedish and deep tissue modalities.",
    image: getRandomImage(),
    contact_info: {
      phone: "(303) 555-9753"
    },
    salary_range: "$1,100-1,800/week",
    pricingTier: "expired" as const,
    industry: "💆 Massage"
  },
  {
    id: "exp-beauty-4",
    title: "Esthetician – Pure Skin Studio",
    company: "Pure Skin Studio",
    location: "Seattle, WA",
    created_at: new Date("2025-04-22").toISOString(),
    description: "Medical spa seeking licensed esthetician experienced in chemical peels and microdermabrasion.",
    image: getRandomImage(),
    contact_info: {
      phone: "(206) 555-7531"
    },
    salary_range: "$1,200-1,700/week",
    pricingTier: "expired" as const,
    industry: "✨ Esthetician"
  },
  {
    id: "exp-beauty-5",
    title: "Makeup Artist – Glam Squad",
    company: "Glam Squad",
    location: "Los Angeles, CA",
    created_at: new Date("2025-04-20").toISOString(),
    description: "High-end makeup artist needed for celebrity clientele and special events.",
    image: getRandomImage(),
    contact_info: {
      phone: "(310) 555-8642"
    },
    salary_range: "$1,500-2,500/week",
    pricingTier: "expired" as const,
    industry: "💄 Makeup Artist"
  },
  {
    id: "exp-beauty-6",
    title: "Lash Technician – Flutter Beauty Bar",
    company: "Flutter Beauty Bar",
    location: "Chicago, IL",
    created_at: new Date("2025-04-18").toISOString(),
    description: "Certified lash artist needed for extensions and lifts. High-volume boutique setting.",
    image: getRandomImage(),
    contact_info: {
      phone: "(312) 555-2468"
    },
    salary_range: "$1,100-1,600/week",
    pricingTier: "expired" as const,
    industry: "👁️ Lash Tech"
  },
  {
    id: "exp-beauty-7",
    title: "Salon Manager – Prestige Hair Studio",
    company: "Prestige Hair Studio",
    location: "Atlanta, GA",
    created_at: new Date("2025-04-15").toISOString(),
    description: "Experienced salon manager needed to oversee staff of 15 and daily operations.",
    image: getRandomImage(),
    contact_info: {
      phone: "(404) 555-3691"
    },
    salary_range: "$1,600-2,200/week",
    pricingTier: "expired" as const,
    industry: "👔 Management"
  },
  {
    id: "exp-beauty-8",
    title: "Permanent Makeup Artist – Brow & Beauty",
    company: "Brow & Beauty",
    location: "Dallas, TX",
    created_at: new Date("2025-04-12").toISOString(),
    description: "Certified PMU artist needed for microblading, powder brows, and lip blush services.",
    image: getRandomImage(),
    contact_info: {
      phone: "(214) 555-7539"
    },
    salary_range: "$1,400-2,000/week",
    pricingTier: "expired" as const,
    industry: "🖌️ PMU Artist"
  },
  {
    id: "exp-beauty-9",
    title: "Waxing Specialist – Smooth & Sleek",
    company: "Smooth & Sleek",
    location: "Phoenix, AZ",
    created_at: new Date("2025-04-10").toISOString(),
    description: "Experienced waxing specialist needed for full body services in high-end spa.",
    image: getRandomImage(),
    contact_info: {
      phone: "(602) 555-1597"
    },
    salary_range: "$1,000-1,500/week",
    pricingTier: "expired" as const,
    industry: "✂️ Waxing"
  },
  {
    id: "exp-beauty-10",
    title: "Nail Educator – Beauty Academy",
    company: "Beauty Academy",
    location: "Houston, TX",
    created_at: new Date("2025-04-08").toISOString(),
    description: "Experienced nail technician needed to teach advanced techniques to students.",
    image: getRandomImage(),
    contact_info: {
      phone: "(713) 555-9753"
    },
    salary_range: "$1,300-1,800/week",
    pricingTier: "expired" as const,
    industry: "🎓 Education"
  },
  {
    id: "exp-beauty-11",
    title: "Spa Receptionist – Tranquility Day Spa",
    company: "Tranquility Day Spa",
    location: "Boston, MA",
    created_at: new Date("2025-04-05").toISOString(),
    description: "Front desk professional needed to manage appointments and client relations.",
    image: getRandomImage(),
    contact_info: {
      phone: "(617) 555-3579"
    },
    salary_range: "$800-1,100/week",
    pricingTier: "expired" as const,
    industry: "📋 Reception"
  },
  {
    id: "exp-beauty-12",
    title: "Salon Assistant – Elite Hair",
    company: "Elite Hair",
    location: "Nashville, TN",
    created_at: new Date("2025-04-02").toISOString(),
    description: "Entry-level position assisting stylists with shampooing, cleaning, and inventory.",
    image: getRandomImage(),
    contact_info: {
      phone: "(615) 555-2468"
    },
    salary_range: "$700-900/week",
    pricingTier: "expired" as const,
    industry: "🧹 Assistant"
  }
];
