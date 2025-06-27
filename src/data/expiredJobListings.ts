
import { Job } from "@/types/job";

// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

export const expiredJobListings: Job[] = [
  {
    id: "exp-1",
    title: "Nail Technician",
    company: "Beautiful Nails",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Seeking experienced nail technician for busy salon in downtown SF.",
    vietnamese_description: "Cần thợ nail có kinh nghiệm cho salon đông khách ở trung tâm SF.",
    employment_type: "full-time",
    compensation_type: "hourly",
    compensation_details: "$18-25/hour",
    expires_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Nail Tech",
    contact_info: {
      owner_name: "Jenny",
      phone: "(415) 555-0123"
    }
  },
  {
    id: "exp-2",
    title: "Hair Stylist",
    company: "Elite Hair Studio",
    location: "Los Angeles, CA",
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for creative hair stylist with color experience.",
    vietnamese_description: "Tìm thợ cắt tóc sáng tạo có kinh nghiệm nhuộm.",
    employment_type: "full-time",
    compensation_type: "commission",
    compensation_details: "60% commission + tips",
    expires_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Hair Stylist",
    contact_info: {
      owner_name: "Maria",
      phone: "(323) 555-0456"
    }
  },
  {
    id: "exp-3",
    title: "Lash Technician",
    company: "Lash Paradise",
    location: "Miami, FL",
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Expert lash technician needed for luxury lash studio.",
    vietnamese_description: "Cần chuyên viên nối mi chuyên nghiệp cho studio mi cao cấp.",
    employment_type: "part-time",
    compensation_type: "hourly",
    compensation_details: "$20-30/hour",
    expires_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Lash Tech",
    contact_info: {
      owner_name: "Sofia",
      phone: "(305) 555-0789"
    }
  },
  {
    id: "exp-4",
    title: "Barber",
    company: "Classic Cuts",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Traditional barber position available in established shop.",
    vietnamese_description: "Vị trí thợ cắt tóc nam truyền thống tại tiệm lâu năm.",
    employment_type: "full-time",
    compensation_type: "booth-rental",
    compensation_details: "$200/week booth rental",
    expires_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Barber",
    contact_info: {
      owner_name: "Tony",
      phone: "(312) 555-0234"
    }
  },
  {
    id: "exp-5",
    title: "Spa Therapist",
    company: "Serenity Spa",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Licensed massage therapist for upscale day spa.",
    vietnamese_description: "Chuyên viên massage có bằng cho spa cao cấp.",
    employment_type: "full-time",
    compensation_type: "hourly",
    compensation_details: "$25-35/hour + tips",
    expires_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Spa",
    contact_info: {
      owner_name: "Lisa",
      phone: "(206) 555-0567"
    }
  },
  {
    id: "exp-6",
    title: "Tattoo Artist",
    company: "Ink Masters",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Experienced tattoo artist for busy shop in downtown Austin.",
    vietnamese_description: "Thợ xăm có kinh nghiệm cho tiệm đông khách ở trung tâm Austin.",
    employment_type: "contract",
    compensation_type: "commission",
    compensation_details: "50% commission",
    expires_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Tattoo",
    contact_info: {
      owner_name: "Mike",
      phone: "(512) 555-0890"
    }
  },
  {
    id: "exp-7",
    title: "Esthetician",
    company: "Glow Skincare",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Licensed esthetician for facial and skincare treatments.",
    vietnamese_description: "Chuyên viên chăm sóc da có bằng cho điều trị da mặt và chăm sóc da.",
    employment_type: "full-time",
    compensation_type: "salary",
    compensation_details: "$45,000-55,000/year",
    expires_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Esthetician",
    contact_info: {
      owner_name: "Sarah",
      phone: "(303) 555-0123"
    }
  },
  {
    id: "exp-8",
    title: "Makeup Artist",
    company: "Glamour Beauty",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Professional makeup artist for weddings and special events.",
    vietnamese_description: "Chuyên viên trang điểm chuyên nghiệp cho đám cưới và sự kiện đặc biệt.",
    employment_type: "freelance",
    compensation_type: "per-service",
    compensation_details: "$75-150 per service",
    expires_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Makeup",
    contact_info: {
      owner_name: "Amanda",
      phone: "(702) 555-0456"
    }
  },
  {
    id: "exp-9",
    title: "Receptionist",
    company: "Beauty Central",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Front desk receptionist for busy beauty salon.",
    vietnamese_description: "Nhân viên lễ tân cho salon làm đẹp đông khách.",
    employment_type: "part-time",
    compensation_type: "hourly",
    compensation_details: "$15-18/hour",
    expires_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Other",
    contact_info: {
      owner_name: "Jessica",
      phone: "(602) 555-0789"
    }
  },
  {
    id: "exp-10",
    title: "Salon Manager",
    company: "Premier Beauty",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Experienced salon manager for multi-service beauty salon.",
    vietnamese_description: "Quản lý salon có kinh nghiệm cho salon làm đẹp đa dịch vụ.",
    employment_type: "full-time",
    compensation_type: "salary",
    compensation_details: "$50,000-65,000/year",
    expires_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Other",
    contact_info: {
      owner_name: "Robert",
      phone: "(404) 555-0234"
    }
  },
  {
    id: "exp-11",
    title: "Cần Thợ Nail Gấp",
    company: "Happy Nails",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Urgently need nail technician for busy Vietnamese salon.",
    vietnamese_description: "Cần gấp thợ nail cho tiệm Việt đông khách. Lương cao, tip tốt.",
    employment_type: "full-time",
    compensation_type: "weekly",
    compensation_details: "$1200-1500/tuần",
    expires_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Nail Tech",
    contact_info: {
      owner_name: "Lan",
      phone: "(713) 555-0567"
    }
  },
  {
    id: "exp-12",
    title: "Thợ Cắt Tóc Nam",
    company: "King Barbershop",
    location: "San Jose, CA",
    created_at: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Vietnamese barber needed for traditional barbershop.",
    vietnamese_description: "Cần thợ cắt tóc nam Việt cho tiệm cắt tóc truyền thống.",
    employment_type: "full-time",
    compensation_type: "commission",
    compensation_details: "70% hoa hồng",
    expires_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Barber",
    contact_info: {
      owner_name: "Tuan",
      phone: "(408) 555-0890"
    }
  },
  {
    id: "exp-13",
    title: "Thợ Làm Mi",
    company: "Lash Studio VN",
    location: "Orange County, CA",
    created_at: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Vietnamese lash technician for growing lash studio.",
    vietnamese_description: "Thợ làm mi Việt cho studio mi đang phát triển.",
    employment_type: "part-time",
    compensation_type: "hourly",
    compensation_details: "$22-28/giờ + tip",
    expires_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Lash Tech",
    contact_info: {
      owner_name: "Mai",
      phone: "(714) 555-0123"
    }
  },
  {
    id: "exp-14",
    title: "Massage Therapist",
    company: "Wellness Spa VN",
    location: "Westminster, CA",
    created_at: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Licensed massage therapist for Vietnamese community spa.",
    vietnamese_description: "Chuyên viên massage có bằng cho spa cộng đồng Việt.",
    employment_type: "full-time",
    compensation_type: "hourly",
    compensation_details: "$30-40/giờ",
    expires_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Spa",
    contact_info: {
      owner_name: "Huong",
      phone: "(714) 555-0456"
    }
  },
  {
    id: "exp-15",
    title: "Thợ Xăm Nghệ Thuật",
    company: "Dragon Ink",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Artistic tattoo artist for Vietnamese-owned shop.",
    vietnamese_description: "Thợ xăm nghệ thuật cho tiệm xăm của người Việt.",
    employment_type: "contract",
    compensation_type: "commission",
    compensation_details: "60% hoa hồng",
    expires_at: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Tattoo",
    contact_info: {
      owner_name: "Duc",
      phone: "(503) 555-0789"
    }
  },
  {
    id: "exp-16",
    title: "Chuyên Viên Chăm Sóc Da",
    company: "Beauty Vietnam",
    location: "San Diego, CA",
    created_at: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Vietnamese-speaking esthetician for skincare clinic.",
    vietnamese_description: "Chuyên viên chăm sóc da nói tiếng Việt cho phòng khám da.",
    employment_type: "full-time",
    compensation_type: "salary",
    compensation_details: "$48,000-58,000/năm",
    expires_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Esthetician",
    contact_info: {
      owner_name: "Linh",
      phone: "(619) 555-0234"
    }
  },
  {
    id: "exp-17",
    title: "Makeup Artist Weddings",
    company: "Bridal Beauty VN",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Wedding makeup artist for Vietnamese brides.",
    vietnamese_description: "Chuyên viên trang điểm cưới cho cô dâu Việt.",
    employment_type: "freelance",
    compensation_type: "per-service",
    compensation_details: "$120-200/dịch vụ",
    expires_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Makeup",
    contact_info: {
      owner_name: "Thuy",
      phone: "(415) 555-0567"
    }
  },
  {
    id: "exp-18",
    title: "Assistant Manager",
    company: "Golden Beauty Salon",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 54 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Assistant manager position at Vietnamese beauty salon.",
    vietnamese_description: "Vị trí phó quản lý tại salon làm đẹp Việt.",
    employment_type: "full-time",
    compensation_type: "salary",
    compensation_details: "$40,000-50,000/năm",
    expires_at: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Other",
    contact_info: {
      owner_name: "Kim",
      phone: "(702) 555-0890"
    }
  },
  {
    id: "exp-19",
    title: "Pedicurist",
    company: "Foot Spa Paradise",
    location: "Tampa, FL",
    created_at: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Specialist in pedicure services for foot spa.",
    vietnamese_description: "Chuyên viên làm chân cho spa chân.",
    employment_type: "part-time",
    compensation_type: "hourly",
    compensation_details: "$16-22/giờ + tip",
    expires_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Nail Tech",
    contact_info: {
      owner_name: "Vy",
      phone: "(813) 555-0123"
    }
  },
  {
    id: "exp-20",
    title: "Eyebrow Specialist",
    company: "Perfect Brows",
    location: "Dallas, TX",
    created_at: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Eyebrow threading and shaping specialist.",
    vietnamese_description: "Chuyên viên tỉa và định hình lông mày.",
    employment_type: "full-time",
    compensation_type: "commission",
    compensation_details: "65% hoa hồng",
    expires_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Esthetician",
    contact_info: {
      owner_name: "Nhu",
      phone: "(214) 555-0456"
    }
  },
  {
    id: "exp-21",
    title: "Booth Rental Available",
    company: "Elite Beauty Center",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Booth rental opportunity for beauty professionals.",
    vietnamese_description: "Cơ hội thuê booth cho chuyên gia làm đẹp.",
    employment_type: "booth-rental",
    compensation_type: "rental",
    compensation_details: "$250/tuần",
    expires_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Other",
    contact_info: {
      owner_name: "David",
      phone: "(602) 555-0789"
    }
  },
  {
    id: "exp-22",
    title: "Hair Colorist Specialist",
    company: "Color Lab Salon",
    location: "Nashville, TN",
    created_at: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Specialist in hair coloring and highlighting techniques.",
    vietnamese_description: "Chuyên gia nhuộm tóc và tạo highlights.",
    employment_type: "full-time",
    compensation_type: "commission",
    compensation_details: "55% hoa hồng + tip",
    expires_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Hair Stylist",
    contact_info: {
      owner_name: "Crystal",
      phone: "(615) 555-0234"
    }
  },
  {
    id: "exp-23",
    title: "Waxing Specialist",
    company: "Smooth Skin Studio",
    location: "Charlotte, NC",
    created_at: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Licensed esthetician specializing in waxing services.",
    vietnamese_description: "Chuyên viên có bằng chuyên về dịch vụ wax lông.",
    employment_type: "part-time",
    compensation_type: "hourly",
    compensation_details: "$20-28/giờ",
    expires_at: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Esthetician",
    contact_info: {
      owner_name: "Rachel",
      phone: "(704) 555-0567"
    }
  },
  {
    id: "exp-24",
    title: "Bridal Hair Stylist",
    company: "Wedding Beauty Co",
    location: "Scottsdale, AZ",
    created_at: new Date(Date.now() - 39 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Specialized hair stylist for weddings and special events.",
    vietnamese_description: "Thợ làm tóc chuyên cho đám cưới và sự kiện đặc biệt.",
    employment_type: "freelance",
    compensation_type: "per-service",
    compensation_details: "$150-300/dịch vụ",
    expires_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    status: "expired",
    pricingTier: "expired",
    is_vietnamese_listing: true,
    category: "Hair Stylist",
    contact_info: {
      owner_name: "Ashley",
      phone: "(480) 555-0890"
    }
  }
];
