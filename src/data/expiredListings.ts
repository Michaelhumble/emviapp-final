
import { Job } from "@/types/job";

// Define the Supabase URL for the images
const SUPABASE_URL = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails";

// Helper function to create dates in the past (expired)
const getPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const expiredListings: Job[] = [
  // Vietnamese Nail Listings
  {
    id: "expired-nail-1",
    title: "Thợ Nail Bột và Dipping - Thợ Chính",
    company: "Queen Nails Spa",
    location: "Seattle, WA",
    created_at: getPastDate(30),
    description: "Cần thợ bột và dipping có kinh nghiệm. Bao lương $1,000/tuần.",
    image: `${SUPABASE_URL}/generated%20(01).png`,
    salary_range: "$1,000/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-2",
    title: "Cần Thợ Nail Full-time/Part-time",
    company: "California Nails",
    location: "Portland, OR",
    created_at: getPastDate(45),
    description: "Cần thợ làm bột, gel, chân tay nước. Tip cao, chủ dễ.",
    image: `${SUPABASE_URL}/generated02.png`,
    salary_range: "$900-1,100/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-3",
    title: "Tiệm Khu Sang Cần Thợ Nail",
    company: "Luxury Nail Bar",
    location: "Austin, TX",
    created_at: getPastDate(60),
    description: "Khu Mỹ trắng, tip hậu. Cần thợ biết làm đủ thứ.",
    image: `${SUPABASE_URL}/generated%20(003).png`,
    salary_range: "$1,200+/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-4",
    title: "Tuyển Thợ Nails Gấp",
    company: "Glamour Nails",
    location: "Phoenix, AZ",
    created_at: getPastDate(15),
    description: "Cần thợ nails gấp, bao lương $900-1,200/tuần, nhà ở miễn phí.",
    image: `${SUPABASE_URL}/generated-26.png`,
    salary_range: "$900-1,200/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-5",
    title: "Cần Thợ Có Kinh Nghiệm",
    company: "Elegant Nails",
    location: "Denver, CO",
    created_at: getPastDate(20),
    description: "Tiệm đông khách, cần thợ bột và gel. Bao lương $1,100/tuần.",
    image: `${SUPABASE_URL}/generated%20(04).png`,
    salary_range: "$1,100/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-6",
    title: "Cần Thợ Bột và Pink & White",
    company: "Perfect 10 Nails",
    location: "Chicago, IL",
    created_at: getPastDate(25),
    description: "Tiệm ở khu Mỹ trắng, giá dịch vụ cao. Cần thợ bột và pink & white.",
    image: `${SUPABASE_URL}/generated%20(1)0.png`,
    salary_range: "$1,300+/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-7",
    title: "Cần Thợ Biết Làm Đủ Thứ",
    company: "Diamond Nails & Spa",
    location: "Atlanta, GA",
    created_at: getPastDate(35),
    description: "Tiệm đông khách cần thợ biết làm đủ thứ. Chủ không làm trong tiệm.",
    image: `${SUPABASE_URL}/generated%20(2).png`,
    salary_range: "$1,000-1,400/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-8",
    title: "Thợ Nail Có Kinh Nghiệm - Income Cao",
    company: "Elite Nails & Spa",
    location: "Miami, FL",
    created_at: getPastDate(28),
    description: "Cần thợ nail có kinh nghiệm, income cao $1,500-2,000/tuần.",
    image: `${SUPABASE_URL}/generated%20(5).png`,
    salary_range: "$1,500-2,000/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-9",
    title: "Tuyển Thợ Nail - Bao Lương",
    company: "Serenity Nail Lounge",
    location: "San Diego, CA",
    created_at: getPastDate(40),
    description: "Bao lương $800-1,000/tuần tùy theo kinh nghiệm. Môi trường làm việc thoải mái.",
    image: `${SUPABASE_URL}/generated%20(7).png`,
    salary_range: "$800-1,000/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-10",
    title: "Cần Thợ Nails Full Time - Có Chỗ Ở",
    company: "Orchid Nail Spa",
    location: "Las Vegas, NV",
    created_at: getPastDate(50),
    description: "Tiệm khu sang, cần thợ nail full time, có chỗ ở cho thợ từ xa.",
    image: `${SUPABASE_URL}/generated-18.png`,
    salary_range: "$1,100-1,400/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-11",
    title: "Cần Thợ Bột Và Chân Tay Nước",
    company: "Crystal Nails",
    location: "Dallas, TX",
    created_at: getPastDate(21),
    description: "Tiệm đông khách cần thợ bột và chân tay nước, thu nhập $1,200+/tuần.",
    image: `${SUPABASE_URL}/generated-25.png`,
    salary_range: "$1,200+/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-12",
    title: "Cần Thợ Dip Powder & Gel-X",
    company: "Luxury Nail Bar",
    location: "Minneapolis, MN",
    created_at: getPastDate(32),
    description: "Cần thợ nail biết làm dip powder và Gel-X. Thu nhập $900-1,300/tuần.",
    image: `${SUPABASE_URL}/generated%20(9).png`,
    salary_range: "$900-1,300/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  
  // English Barber Listings
  {
    id: "expired-barber-1",
    title: "Master Barber - High Volume Shop",
    company: "Classic Cuts",
    location: "Nashville, TN",
    created_at: getPastDate(40),
    description: "Seeking experienced barber for high-volume shop. Excellent fade skills required.",
    image: `${SUPABASE_URL}/generated02.png`,
    salary_range: "$1,200-1,600/week",
    pricingTier: "expired" as const,
    industry: "💈 Barber"
  },
  {
    id: "expired-barber-2",
    title: "Barber Needed - Premium Men's Salon",
    company: "The Gentleman's Club",
    location: "Charlotte, NC",
    created_at: getPastDate(22),
    description: "Upscale men's salon seeking licensed barber. Commission or booth rental.",
    image: `${SUPABASE_URL}/generated%20(5).png`,
    salary_range: "$1,000-1,400/week",
    pricingTier: "expired" as const,
    industry: "💈 Barber"
  },
  
  // English Lash Listings
  {
    id: "expired-lash-1",
    title: "Lash Artist - Volume Specialist",
    company: "Lash Lounge",
    location: "Boston, MA",
    created_at: getPastDate(15),
    description: "Experienced lash artist needed for upscale salon. Volume and classic sets.",
    image: `${SUPABASE_URL}/generated%20(7).png`,
    salary_range: "$1,100-1,500/week",
    pricingTier: "expired" as const,
    industry: "👁️ Lash"
  },
  {
    id: "expired-lash-2",
    title: "Eyelash Extension Technician",
    company: "Beauty Bar",
    location: "Tampa, FL",
    created_at: getPastDate(18),
    description: "Licensed lash tech needed for growing salon. Experience with volume sets required.",
    image: `${SUPABASE_URL}/generated-26.png`,
    salary_range: "$900-1,200/week",
    pricingTier: "expired" as const,
    industry: "👁️ Lash"
  },
  
  // English PMU Listings
  {
    id: "expired-pmu-1",
    title: "Microblading Artist - High End Salon",
    company: "Brow Studio",
    location: "San Francisco, CA",
    created_at: getPastDate(25),
    description: "Experienced microblading artist for luxury salon. Portfolio required.",
    image: `${SUPABASE_URL}/generated%20(1)0.png`,
    salary_range: "$1,400-1,800/week",
    pricingTier: "expired" as const,
    industry: "🧿 PMU"
  },
  {
    id: "expired-pmu-2",
    title: "Permanent Makeup Artist",
    company: "Forever Beauty",
    location: "New York, NY",
    created_at: getPastDate(30),
    description: "Full-time PMU artist needed for established studio. Brows, lips, and eyeliner.",
    image: `${SUPABASE_URL}/generated%20(003).png`,
    salary_range: "$1,600-2,200/week",
    pricingTier: "expired" as const,
    industry: "🧿 PMU"
  },
  
  // English Reception Listings
  {
    id: "expired-reception-1",
    title: "Salon Receptionist - Full Time",
    company: "Luxe Salon & Spa",
    location: "Seattle, WA",
    created_at: getPastDate(12),
    description: "Front desk professional for busy salon. Customer service experience required.",
    image: `${SUPABASE_URL}/generated%20(04).png`,
    salary_range: "$600-800/week",
    pricingTier: "expired" as const,
    industry: "📞 Reception"
  },
  
  // English Esthetician Listings
  {
    id: "expired-esthetician-1",
    title: "Licensed Esthetician - Med Spa",
    company: "Renewal Med Spa",
    location: "Denver, CO",
    created_at: getPastDate(35),
    description: "Licensed esthetician for high-end med spa. Experience with chemical peels required.",
    image: `${SUPABASE_URL}/generated%20(2).png`,
    salary_range: "$1,000-1,400/week",
    pricingTier: "expired" as const,
    industry: "✨ Esthetician"
  },
  {
    id: "expired-esthetician-2",
    title: "Skin Care Specialist",
    company: "Glow Skin Studio",
    location: "Austin, TX",
    created_at: getPastDate(28),
    description: "Licensed esthetician with facial experience needed. Product knowledge a plus.",
    image: `${SUPABASE_URL}/generated-18.png`,
    salary_range: "$900-1,200/week",
    pricingTier: "expired" as const,
    industry: "✨ Esthetician"
  },
  
  // English Massage Listings
  {
    id: "expired-massage-1",
    title: "Licensed Massage Therapist - Full Time",
    company: "Relaxation Spa",
    location: "Portland, OR",
    created_at: getPastDate(21),
    description: "LMT needed for busy spa. Deep tissue and Swedish massage experience required.",
    image: `${SUPABASE_URL}/generated-25.png`,
    salary_range: "$1,000-1,500/week",
    pricingTier: "expired" as const,
    industry: "💆 Massage"
  },
  {
    id: "expired-massage-2",
    title: "Massage Therapist - Luxury Hotel Spa",
    company: "Grand Hotel & Spa",
    location: "Miami, FL",
    created_at: getPastDate(18),
    description: "Licensed MT for 5-star hotel spa. Experience with hot stone and deep tissue.",
    image: `${SUPABASE_URL}/generated%20(01).png`,
    salary_range: "$1,200-1,800/week",
    pricingTier: "expired" as const,
    industry: "💆 Massage"
  },
  
  // More Vietnamese Nail Listings to reach the required 31 total
  {
    id: "expired-nail-13",
    title: "Thợ Nail Có Kinh Nghiệm - Income Cao",
    company: "Paris Nails & Spa",
    location: "Boston, MA",
    created_at: getPastDate(23),
    description: "Cần thợ nail full-time, part-time đều được. Thu nhập $900-1,200/tuần.",
    image: `${SUPABASE_URL}/generated%20(9).png`,
    salary_range: "$900-1,200/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-14",
    title: "Thợ Nail Bao Lương - Khu Mỹ Trắng",
    company: "Prestige Nails",
    location: "Philadelphia, PA",
    created_at: getPastDate(27),
    description: "Tiệm khu Mỹ trắng cần thợ nail bao lương $1,000/tuần trở lên.",
    image: `${SUPABASE_URL}/generated%20(01).png`,
    salary_range: "$1,000+/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-15",
    title: "Thợ Nails Có Kinh Nghiệm - Bao Lương",
    company: "Sunshine Nails",
    location: "Raleigh, NC",
    created_at: getPastDate(29),
    description: "Cần thợ nails có kinh nghiệm, bao lương $900-1,000/tuần. Có chỗ ở.",
    image: `${SUPABASE_URL}/generated02.png`,
    salary_range: "$900-1,000/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-16",
    title: "Cần Thợ Nails Làm Xa - Có Chỗ Ở",
    company: "Five Star Nails",
    location: "Columbus, OH",
    created_at: getPastDate(33),
    description: "Cần thợ nails làm xa, có chỗ ở, bao lương $800-1,200/tuần.",
    image: `${SUPABASE_URL}/generated%20(003).png`,
    salary_range: "$800-1,200/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-17",
    title: "Thợ Bột Có Kinh Nghiệm - Làm Gấp",
    company: "VIP Nails",
    location: "Indianapolis, IN",
    created_at: getPastDate(19),
    description: "Cần thợ bột làm gấp, thu nhập $1,100-1,400/tuần, môi trường làm việc thoải mái.",
    image: `${SUPABASE_URL}/generated%20(04).png`,
    salary_range: "$1,100-1,400/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-18",
    title: "Cần Thợ Chân Tay Nước và Wax",
    company: "Luxury Nails & Day Spa",
    location: "Houston, TX",
    created_at: getPastDate(24),
    description: "Tiệm khu Mỹ trắng cần thợ chân tay nước và wax, thu nhập $900/tuần.",
    image: `${SUPABASE_URL}/generated-25.png`,
    salary_range: "$900/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  },
  {
    id: "expired-nail-19",
    title: "Thợ Nails Mới Ra Trường Có Bằng",
    company: "Glamour Nails",
    location: "Orlando, FL",
    created_at: getPastDate(26),
    description: "Nhận thợ nails mới ra trường có bằng, đảm bảo thu nhập $800/tuần.",
    image: `${SUPABASE_URL}/generated%20(1)0.png`,
    salary_range: "$800/tuần",
    pricingTier: "expired" as const,
    industry: "💅 Nail",
    is_vietnamese_listing: true
  }
];
