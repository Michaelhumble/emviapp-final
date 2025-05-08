
import { Job } from '@/types/job';

// Vietnamese job listings - PROTECTED DATA
// Magic Nails must always be first (Diamond Featured)
export const vietnameseJobs: Job[] = [
  // Diamond Featured Jobs (Magic Nails - protected listing)
  {
    id: "magic-nails-diamond-1",
    title: "Tìm Thợ Nails – Magic Nails, Great Falls, MT",
    company: "Magic Nails",
    location: "Great Falls, MT",
    created_at: new Date().toISOString(),
    description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
    image: "/lovable-uploads/74b3ba02-2378-41d7-8cb5-023145e94700.png", 
    contact_info: {
      phone: "(406) 770-3070",
      owner_name: "Magic Nails Owner"
    },
    salary_range: "$1,200–$1,500/tuần",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    isPinned: true,
    is_featured: true,
    featured_text: "⭐ Featured by EmviApp"
  },
  
  // Premium Featured Jobs
  {
    id: "premium-1",
    title: "Tuyển Thợ Nail – Clawson, MI",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần tuyển thợ nail có kinh nghiệm. Lương cao, tiệm đông khách.",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
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
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
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
    image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
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
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
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
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    contact_info: {
      phone: "(551) 333-5678"
    },
    salary_range: "$1,600/tuần + tip",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  {
    id: "premium-6",
    title: "Nhận Thợ Nail – Melbourne, FL",
    company: "Ocean Nails & Spa",
    location: "Melbourne, FL",
    created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm bột và chân tay nước. Bao lương $900-$1,300/tuần.",
    image: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
    contact_info: {
      phone: "(321) 987-6543"
    },
    salary_range: "$900-$1,300/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true
  },
  
  // Gold Featured Jobs
  {
    id: "gold-1",
    title: "Thợ Nail – San Diego, CA",
    company: "Pacific Nails",
    location: "San Diego, CA",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước. Khu tip cao.",
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
    contact_info: {
      phone: "(619) 567-8901"
    },
    salary_range: "$1,200-$1,700/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-2",
    title: "Tuyển Dụng Thợ Gel-X – Dallas, TX",
    company: "Luxury Nails",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên về Gel-X và nail art. Income cao.",
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
    contact_info: {
      phone: "(214) 234-5678"
    },
    salary_range: "$1,300-$1,900/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-3",
    title: "Thợ Nail Full-Time – Austin, TX",
    company: "Green Nails",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail full-time, biết làm đủ thứ. Khu khách Mỹ trắng.",
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
    contact_info: {
      phone: "(512) 345-6789"
    },
    salary_range: "$1,000-$1,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-4",
    title: "Thợ Bột & Dip – Colorado Springs, CO",
    company: "Rocky Nails",
    location: "Colorado Springs, CO",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và dip powder. Bao lương $1,200+/tuần.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    contact_info: {
      phone: "(719) 456-7890"
    },
    salary_range: "$1,200+/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-5",
    title: "Thợ Nail và Pedicure – Chicago, IL",
    company: "Windy City Nails",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm bột và pedicure, full-time or part-time.",
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    contact_info: {
      phone: "(312) 567-8901"
    },
    salary_range: "$1,100-$1,600/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-6",
    title: "Thợ Nail Design – Las Vegas, NV",
    company: "Lucky Star Nails",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có kinh nghiệm làm nail design. Tiệm khu casino.",
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    contact_info: {
      phone: "(702) 678-9012"
    },
    salary_range: "$1,400-$2,000/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-7",
    title: "Cần Gấp Thợ Nail – Miami, FL",
    company: "Ocean View Nails",
    location: "Miami, FL",
    created_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail biết làm đủ thứ. Khu du lịch, tip cao.",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    contact_info: {
      phone: "(305) 789-0123"
    },
    salary_range: "$1,300-$1,800/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "gold-8",
    title: "Thợ Nails & Wax – Atlanta, GA",
    company: "Peach Nails & Spa",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail và wax. Thu nhập ổn định, tiệm đông khách.",
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    contact_info: {
      phone: "(404) 890-1234"
    },
    salary_range: "$1,100-$1,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  
  // Free Listings
  {
    id: "free-1",
    title: "Cần Gấp Thợ Làm Chân Tay Nước – Houston, TX",
    company: "Houston Beauty Salon",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ làm chân tay nước, có thể làm part-time hoặc full-time.",
    contact_info: {
      owner_name: "Linda",
      phone: "(832) 444-2299"
    },
    salary_range: "Part/Full-time",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png"
  },
  {
    id: "free-2",
    title: "Tuyển Thợ Nail – Seattle, WA",
    company: "Seattle Nails",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước, lương cao + tip hậu.",
    contact_info: {
      owner_name: "Marcus",
      phone: "(206) 888-1234"
    },
    salary_range: "$1,800–$2,400/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png"
  },
  {
    id: "free-3",
    title: "Tuyển Thợ Làm Dip Powder – Orlando, FL",
    company: "Orlando Beauty",
    location: "Orlando, FL",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm dip powder, full set, và pedicure. Bao lương thợ giỏi.",
    contact_info: {
      owner_name: "Sarah",
      phone: "(407) 777-9898"
    },
    salary_range: "$1,400–$1,900/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png"
  },
  {
    id: "free-4",
    title: "Cần Thợ Full Set – Los Angeles, CA",
    company: "LA Nail Studio",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở khu Mỹ trắng, cần thợ có kinh nghiệm làm full set và pedicure.",
    contact_info: {
      owner_name: "David",
      phone: "(323) 555-9012"
    },
    salary_range: "$1,800–$2,200/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png"
  },
  {
    id: "free-5",
    title: "Thợ Làm Bột – Portland, OR",
    company: "Rose City Nails",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm bột, có kinh nghiệm ít nhất 2 năm.",
    contact_info: {
      owner_name: "Nancy",
      phone: "(503) 333-4567"
    },
    salary_range: "$1,500–$1,900/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png"
  },
  {
    id: "free-6",
    title: "Thợ Nail Có Kinh Nghiệm – Boston, MA",
    company: "New England Nails",
    location: "Boston, MA",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có kinh nghiệm làm đủ thứ. Thu nhập cao.",
    contact_info: {
      owner_name: "Thomas",
      phone: "(617) 222-3456"
    },
    salary_range: "$1,300–$1,800/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png"
  },
  {
    id: "free-7",
    title: "Thợ Wax & Làm Móng – Philadelphia, PA",
    company: "Liberty Nails",
    location: "Philadelphia, PA",
    created_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ wax và làm móng, part-time or full-time.",
    contact_info: {
      owner_name: "Jenny",
      phone: "(215) 444-5678"
    },
    salary_range: "Theo kinh nghiệm",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png"
  },
  {
    id: "free-8",
    title: "Cần Thợ Làm Gel – San Francisco, CA",
    company: "Golden Gate Nails",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm gel, có kinh nghiệm nail art.",
    contact_info: {
      owner_name: "Michael",
      phone: "(415) 555-6789"
    },
    salary_range: "$1,700–$2,200/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png"
  },
  {
    id: "free-9",
    title: "Thợ Làm Chân Tay Nước – Phoenix, AZ",
    company: "Desert Nails",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm chân tay nước, full-time. Bao lương.",
    contact_info: {
      owner_name: "Lisa",
      phone: "(602) 666-7890"
    },
    salary_range: "$1,000–$1,400/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png"
  },
  {
    id: "free-10",
    title: "Thợ Nail Có Bằng – Denver, CO",
    company: "Mountain View Nails",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có bằng tiểu bang Colorado. Làm full-time.",
    contact_info: {
      owner_name: "Robert",
      phone: "(720) 777-8901"
    },
    salary_range: "$1,400–$1,800/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true,
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png"
  },
  
  // Expired Jobs
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
    pricingTier: "expired",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png"
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
  },
  {
    id: "expired-4",
    title: "Cần Thợ Nails Gấp - Bao Lương",
    company: "Sunshine Nails",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm đông khách, cần thợ nails biết làm đủ thứ, bột, chân tay nước. Bao lương $1000-$1200/tuần.",
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    contact_info: {
      owner_name: "Hoa",
      phone: "(503) 555-1234"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-5",
    title: "Cần Thợ Nail - $1300/Tuần",
    company: "Lucky Nails & Spa",
    location: "San Jose, CA",
    created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm khu Mỹ trắng, đông khách tip cao. Cần thợ bột và thợ chân tay nước, kinh nghiệm trên 2 năm.",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    contact_info: {
      owner_name: "Tuấn",
      phone: "(408) 555-8765"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  
  // Add at least 25 more expired listings to meet the requirement
  {
    id: "expired-6",
    title: "Thợ Làm Móng - Hết Hạn",
    company: "Beauty Express",
    location: "Nashville, TN",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail làm full-time, biết làm đủ thứ.",
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
    contact_info: {
      owner_name: "Kim",
      phone: "(615) 555-1234"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-7",
    title: "Thợ Nail Có Kinh Nghiệm",
    company: "Elite Nails",
    location: "Orlando, FL",
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có kinh nghiệm từ 2 năm trở lên.",
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
    contact_info: {
      owner_name: "Tina",
      phone: "(407) 555-7890"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-8",
    title: "Cần Thợ Làm Bột",
    company: "Diamond Nails",
    location: "Charlotte, NC",
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm bột, full-time, income cao.",
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    contact_info: {
      owner_name: "David",
      phone: "(704) 555-3456"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-9",
    title: "Thợ Wax & Nail - Expired",
    company: "Glam Spa",
    location: "Tampa, FL",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ wax và nail, part-time hoặc full-time.",
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
    contact_info: {
      owner_name: "Lisa",
      phone: "(813) 555-6789"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-10",
    title: "Thợ Làm Gel & Dip - Expired",
    company: "Crystal Nails",
    location: "Raleigh, NC",
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm gel và dip powder, ít nhất 1 năm kinh nghiệm.",
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    contact_info: {
      owner_name: "Tony",
      phone: "(919) 555-9012"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-11",
    title: "Cần Thợ Full Set - Expired",
    company: "Perfect Nails",
    location: "Minneapolis, MN",
    created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm full set, có bằng tiểu bang Minnesota.",
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    contact_info: {
      owner_name: "Nancy",
      phone: "(612) 555-2345"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-12",
    title: "Thợ Làm Chân Tay Nước - Expired",
    company: "Ocean Nails",
    location: "Virginia Beach, VA",
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm chân tay nước, bao lương $800-$1000/tuần.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    contact_info: {
      owner_name: "Michael",
      phone: "(757) 555-5678"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-13",
    title: "Thợ Nail Full-Time - Expired",
    company: "Sunshine Spa",
    location: "Kansas City, MO",
    created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail full-time, thu nhập ổn định.",
    image: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
    contact_info: {
      owner_name: "Sarah",
      phone: "(816) 555-8901"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-14",
    title: "Cần Thợ Bột & Gel - Expired",
    company: "Elegant Nails",
    location: "Indianapolis, IN",
    created_at: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và gel, full-time hoặc part-time.",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
    contact_info: {
      owner_name: "John",
      phone: "(317) 555-1234"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-15",
    title: "Thợ Nail Design - Expired",
    company: "Art Nails",
    location: "Columbus, OH",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail design, biết làm nail art và 3D.",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    contact_info: {
      owner_name: "Linda",
      phone: "(614) 555-4567"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-16",
    title: "Cần Thợ Part-Time - Expired",
    company: "Bliss Nails",
    location: "Providence, RI",
    created_at: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ part-time, làm cuối tuần.",
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    contact_info: {
      owner_name: "Thomas",
      phone: "(401) 555-7890"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-17",
    title: "Thợ Nail Mới Ra Trường - Expired",
    company: "First Step Nails",
    location: "Buffalo, NY",
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Nhận đào tạo thợ mới ra trường, income theo năng lực.",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    contact_info: {
      owner_name: "Jenny",
      phone: "(716) 555-0123"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-18",
    title: "Cần Thợ Có Kinh Nghiệm - Expired",
    company: "Expert Nails",
    location: "Pittsburgh, PA",
    created_at: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ có ít nhất 3 năm kinh nghiệm, lương cao.",
    image: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png",
    contact_info: {
      owner_name: "Robert",
      phone: "(412) 555-3456"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-19",
    title: "Thợ Làm Tay Chân Nước - Expired",
    company: "Relax Spa",
    location: "Cincinnati, OH",
    created_at: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm tay chân nước, part-time.",
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
    contact_info: {
      owner_name: "David",
      phone: "(513) 555-6789"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-20",
    title: "Cần Receptionist - Expired",
    company: "Lavender Nails",
    location: "Sacramento, CA",
    created_at: new Date(Date.now() - 115 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần nhân viên tiếp tân, biết tiếng Anh và tiếng Việt.",
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
    contact_info: {
      owner_name: "Anna",
      phone: "(916) 555-9012"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-21",
    title: "Thợ Nail & Pedi - Expired",
    company: "Charming Nails",
    location: "Omaha, NE",
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail và pedicure, full-time.",
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    contact_info: {
      owner_name: "Michael",
      phone: "(402) 555-2345"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-22",
    title: "Cần Thợ Bột - Expired",
    company: "Golden Nails",
    location: "Memphis, TN",
    created_at: new Date(Date.now() - 125 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột có kinh nghiệm ít nhất 2 năm.",
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
    contact_info: {
      owner_name: "Lisa",
      phone: "(901) 555-5678"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-23",
    title: "Thợ Làm Gel-X - Expired",
    company: "Modern Nails",
    location: "Tulsa, OK",
    created_at: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm Gel-X và nail design.",
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    contact_info: {
      owner_name: "Tony",
      phone: "(918) 555-8901"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-24",
    title: "Cần Gấp Thợ Nail - Expired",
    company: "Fast Nails",
    location: "Louisville, KY",
    created_at: new Date(Date.now() - 135 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail biết làm đủ thứ, bao lương.",
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    contact_info: {
      owner_name: "Nancy",
      phone: "(502) 555-1234"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-25",
    title: "Thợ Làm Móng Part-Time - Expired",
    company: "Weekend Nails",
    location: "Birmingham, AL",
    created_at: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ làm móng part-time, chỉ làm cuối tuần.",
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    contact_info: {
      owner_name: "Sarah",
      phone: "(205) 555-4567"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-26",
    title: "Cần Thợ Full-Time - Expired",
    company: "City Nails",
    location: "Rochester, NY",
    created_at: new Date(Date.now() - 145 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail full-time, income $1000-$1500/tuần.",
    image: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
    contact_info: {
      owner_name: "John",
      phone: "(585) 555-7890"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-27",
    title: "Thợ Làm Dip Powder - Expired",
    company: "Powder Nails",
    location: "Salt Lake City, UT",
    created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chuyên làm dip powder và nail art.",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
    contact_info: {
      owner_name: "Linda",
      phone: "(801) 555-0123"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-28",
    title: "Cần Thợ Có Bằng - Expired",
    company: "Licensed Nails",
    location: "Richmond, VA",
    created_at: new Date(Date.now() - 155 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ có bằng tiểu bang Virginia, full-time.",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    contact_info: {
      owner_name: "Thomas",
      phone: "(804) 555-3456"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-29",
    title: "Thợ Nail Lương Cao - Expired",
    company: "Premium Nails",
    location: "Grand Rapids, MI",
    created_at: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có kinh nghiệm, lương cao + tip hậu.",
    image: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png",
    contact_info: {
      owner_name: "Jenny",
      phone: "(616) 555-6789"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "expired-30",
    title: "Cần Gấp Thợ Nail - Expired",
    company: "Urgent Nails",
    location: "Hartford, CT",
    created_at: new Date(Date.now() - 165 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ nail, bao lương $1000-$1400/tuần.",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    contact_info: {
      owner_name: "Robert",
      phone: "(860) 555-9012"
    },
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  
  // Salon for sale listings
  {
    id: "salon-sale-1",
    title: "Tiệm Nail Cần Sang – Vị Trí Đẹp",
    company: "Beauty Salon For Sale",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần sang tiệm nail vị trí đẹp, khu shopping center sầm uất. 10 ghế, 8 bàn, income $35,000/tháng.",
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
    contact_info: {
      owner_name: "Hải",
      phone: "(713) 555-1234"
    },
    is_salon_for_sale: true,
    sale_price: "$250,000",
    station_count: "10",
    monthly_revenue: "$35,000",
    is_vietnamese_listing: true
  },
  {
    id: "salon-sale-2",
    title: "Sang Tiệm Nail Mới Remodel",
    company: "Modern Salon Sale",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần sang tiệm nail mới remodel, 2,000 sqft, 12 ghế, 10 bàn. Giá sang hợp lý.",
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
    contact_info: {
      owner_name: "Linh",
      phone: "(404) 555-6789"
    },
    is_salon_for_sale: true,
    sale_price: "$320,000",
    station_count: "12",
    monthly_revenue: "$40,000",
    is_vietnamese_listing: true
  },
  {
    id: "salon-sale-3",
    title: "Cần Sang Gấp Tiệm Nail",
    company: "Quick Sale Salon",
    location: "San Diego, CA",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Vì lý do sức khỏe nên cần sang gấp tiệm nail. 8 ghế, 6 bàn, giá siêu rẻ, vị trí đẹp.",
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
    contact_info: {
      owner_name: "Tuấn",
      phone: "(619) 555-2345"
    },
    is_salon_for_sale: true,
    sale_price: "$180,000",
    station_count: "8",
    monthly_revenue: "$25,000",
    is_vietnamese_listing: true
  }
];
