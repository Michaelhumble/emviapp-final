
import { Job } from "@/types/job";

// Generate a realistic creation date within the last 60 days
const getRandomDate = (daysAgo = 60) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Helper to create job IDs
const createId = (prefix = 'job') => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

// Generate a set of Vietnamese Nail Salon jobs
export const vietnameseNailJobs: Job[] = [
  {
    id: createId('viet'),
    title: "Cần thợ nail / Nail Technician Needed",
    company: "Luxury Nails & Spa",
    location: "Houston, TX",
    employment_type: "Full-Time",
    salary_range: "$800-1200/week",
    vietnamese_description: "Tiệm đông khách, khu Mỹ trắng, cần nhiều thợ nail. Bao lương $800-$1200/tuần. Có chỗ ở cho thợ ở xa, chủ lo đón từ phi trường.",
    description: "Busy salon in upscale area seeking nail technicians. Guaranteed $800-$1200/week. Housing available for technicians from out of town. Airport pickup provided.",
    created_at: getRandomDate(20),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    status: "active",
    compensation_type: "weekly",
    compensation_details: "$800-1200/week + tips",
    weekly_pay: true,
    owner_will_train: true,
    has_housing: true,
    no_supply_deduction: true,
    specialties: ["Acrylic", "Gel", "Pedicure", "Nail Art"],
    tip_range: "$100-300/day",
    contact_info: {
      owner_name: "Jenny Nguyen",
      phone: "(713) 555-1234",
      email: "info@luxurynailshouston.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    }
  },
  {
    id: createId('viet'),
    title: "Tuyển thợ bột / Acrylic Specialist",
    company: "Diamond Nails",
    location: "Dallas, TX",
    employment_type: "Full-Time",
    salary_range: "$1000-1500/week",
    vietnamese_description: "Cần thợ bột giỏi, làm bột Acrylic và Dipping. Lương $1000-$1500/tuần tùy theo kinh nghiệm. Khách tip tốt, không khí làm việc vui vẻ.",
    description: "Seeking experienced acrylic and dipping powder specialists. Salary $1000-$1500/week depending on experience. Great tips and positive work environment.",
    created_at: getRandomDate(45),
    expires_at: new Date(Date.now() + 10 * 86400000).toISOString(),
    status: "active",
    compensation_type: "weekly",
    compensation_details: "$1000-1500/week + tips",
    weekly_pay: true,
    owner_will_train: false,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Acrylic", "Dipping Powder"],
    tip_range: "$150-350/day",
    contact_info: {
      owner_name: "Mike Tran",
      phone: "(214) 555-2345",
      email: "diamondnails@example.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    }
  },
  {
    id: createId('viet'),
    title: "Cần thợ Full-time hoặc Part-time",
    company: "Queen Nails",
    location: "San Jose, CA",
    employment_type: "Full-Time",
    salary_range: "Call for details",
    vietnamese_description: "Cần gấp thợ nail, làm được hết bột, gel, chân tay nước. Lương tùy theo khả năng. Tiệm đông khách, tips cao.",
    description: "Urgently seeking nail technicians skilled in acrylic, gel, and manicure/pedicure services. Pay based on experience. Busy salon with high tips.",
    created_at: getRandomDate(5),
    expires_at: new Date(Date.now() + 25 * 86400000).toISOString(),
    status: "active",
    compensation_type: "commission",
    compensation_details: "60-70% commission",
    weekly_pay: false,
    owner_will_train: false,
    has_housing: true,
    no_supply_deduction: false,
    specialties: ["Acrylic", "Gel", "Pedicure", "Manicure"],
    tip_range: "$80-200/day",
    contact_info: {
      owner_name: "Lisa Pham",
      phone: "(408) 555-3456",
      email: "queennails@example.com"
    },
    trust_indicators: {
      verified: false,
      activelyHiring: true,
      chatAvailable: true
    }
  },
  {
    id: createId('viet'),
    title: "Thợ nail có kinh nghiệm / Experienced Nail Tech",
    company: "Crystal Spa & Nails",
    location: "Atlanta, GA",
    employment_type: "Full-Time",
    salary_range: "$900-1400/week",
    vietnamese_description: "Cần thợ có kinh nghiệm làm đủ thứ. Income $900-$1400/tuần. Chủ sẽ training thêm nếu cần. Môi trường làm việc thân thiện.",
    description: "Seeking experienced nail technicians for all services. Income $900-$1400/week. Additional training provided if needed. Friendly work environment.",
    created_at: getRandomDate(15),
    expires_at: new Date(Date.now() + 15 * 86400000).toISOString(),
    status: "active",
    compensation_type: "weekly",
    compensation_details: "$900-1400/week",
    weekly_pay: true,
    owner_will_train: true,
    has_housing: false,
    no_supply_deduction: true,
    specialties: ["Full-Service", "Nail Art", "Gel-X"],
    tip_range: "$100-250/day",
    contact_info: {
      owner_name: "David Kim",
      phone: "(404) 555-4567",
      email: "david@crystalspa.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    }
  },
  {
    id: createId('viet'),
    title: "Cần thợ làm chân tay nước / Manicurist",
    company: "Beauty Nails Lounge",
    location: "Orlando, FL",
    employment_type: "Part-Time",
    salary_range: "60% commission",
    vietnamese_description: "Cần thợ chuyên làm chân tay nước, có kinh nghiệm waxing là một lợi thế. Hoa hồng 60%, khách tip hậu. Môi trường làm việc vui vẻ.",
    description: "Seeking manicurists/pedicurists, waxing experience is a plus. 60% commission with generous tips. Fun work environment.",
    created_at: getRandomDate(40),
    expires_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: "expired",
    compensation_type: "commission",
    compensation_details: "60% commission",
    weekly_pay: false,
    owner_will_train: true,
    has_housing: true,
    no_supply_deduction: false,
    specialties: ["Manicure", "Pedicure", "Waxing"],
    tip_range: "$70-150/day",
    contact_info: {
      owner_name: "Susan Tran",
      phone: "(407) 555-5678",
      email: "beautynailslounge@example.com"
    },
    trust_indicators: {
      verified: false,
      activelyHiring: false,
      chatAvailable: false
    }
  },
  {
    id: createId('viet'),
    title: "Tuyển dụng Nail Tech và thợ Waxing",
    company: "Luxury Miami Nails",
    location: "Miami, FL",
    employment_type: "Full-Time",
    salary_range: "$1200-1800/week",
    vietnamese_description: "Tiệm ở khu cao cấp, cần thợ nail và thợ waxing. Thu nhập $1200-$1800/tuần. Khách tip rất tốt. Có thể bao ăn ở.",
    description: "High-end salon seeking nail technicians and waxing specialists. Earnings $1200-$1800/week. Excellent tips. Housing and meals can be provided.",
    created_at: getRandomDate(10),
    expires_at: new Date(Date.now() + 20 * 86400000).toISOString(),
    status: "active",
    compensation_type: "weekly",
    compensation_details: "$1200-1800/week",
    weekly_pay: true,
    owner_will_train: false,
    has_housing: true,
    no_supply_deduction: true,
    specialties: ["Full-Service", "Acrylic", "Waxing", "Nail Art"],
    tip_range: "$200-400/day",
    contact_info: {
      owner_name: "Tony Nguyen",
      phone: "(305) 555-6789",
      email: "luxurynailsmiami@example.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    }
  }
];

// Generate Hair Salon jobs
export const hairSalonJobs: Job[] = [
  {
    id: createId('hair'),
    title: "Hair Stylist Position",
    company: "Chic Hair Studio",
    location: "Los Angeles, CA",
    employment_type: "Full-Time",
    salary_range: "60% commission",
    description: "Upscale salon seeking experienced hair stylists. Strong clientele base and walk-ins. Commission-based with product bonuses. Professional and creative environment.",
    created_at: getRandomDate(12),
    expires_at: new Date(Date.now() + 18 * 86400000).toISOString(),
    status: "active",
    compensation_type: "commission",
    compensation_details: "60% commission + product bonuses",
    specialties: ["Hair Cutting", "Coloring", "Balayage", "Extensions"],
    contact_info: {
      owner_name: "Maria Garcia",
      phone: "(213) 555-2345",
      email: "careers@chichairstudio.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    }
  },
  {
    id: createId('hair'),
    title: "Colorist & Stylist Needed",
    company: "Crown Salon",
    location: "New York, NY",
    employment_type: "Full-Time",
    salary_range: "$25-35/hour + tips",
    description: "Manhattan salon seeking professional colorist and stylist with at least 3 years experience. Competitive hourly pay plus tips. Collaborative team environment with ongoing education opportunities.",
    created_at: getRandomDate(30),
    expires_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: "expired",
    compensation_type: "hourly",
    compensation_details: "$25-35/hour + tips",
    specialties: ["Color Specialist", "Balayage", "Cutting", "Styling"],
    contact_info: {
      owner_name: "James Wilson",
      phone: "(212) 555-3456",
      email: "jobs@crownsalonnyc.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: false,
      chatAvailable: false
    }
  }
];

// Generate Barber shop jobs
export const barberJobs: Job[] = [
  {
    id: createId('barber'),
    title: "Master Barber Position",
    company: "Classic Cuts Barbershop",
    location: "Chicago, IL",
    employment_type: "Full-Time",
    salary_range: "65% commission",
    description: "Established barbershop seeking master barber with strong clientele. Commission-based with guaranteed minimum. Modern shop with traditional values.",
    created_at: getRandomDate(5),
    expires_at: new Date(Date.now() + 25 * 86400000).toISOString(),
    status: "active",
    compensation_type: "commission",
    compensation_details: "65% commission with $800/week minimum",
    specialties: ["Fades", "Beard Grooming", "Hot Towel Shaves"],
    contact_info: {
      owner_name: "Marcus Johnson",
      phone: "(312) 555-4567",
      email: "careers@classiccuts.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: false
    }
  },
  {
    id: createId('barber'),
    title: "Barber Chair Rental",
    company: "Elite Barbershop",
    location: "Philadelphia, PA",
    employment_type: "Independent Contractor",
    salary_range: "$250/week chair rental",
    description: "Premium barber chair for rent in high-traffic location. All utilities included. Great opportunity for barbers with existing clientele looking for a new space.",
    created_at: getRandomDate(22),
    expires_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    status: "active",
    compensation_type: "booth_rental",
    compensation_details: "$250/week chair rental",
    specialties: ["High-End Clientele", "Modern Equipment", "Prime Location"],
    contact_info: {
      owner_name: "Kevin Brown",
      phone: "(215) 555-5678",
      email: "info@elitebarbershop.com"
    },
    trust_indicators: {
      verified: false,
      activelyHiring: true,
      chatAvailable: true
    }
  }
];

// Generate Tattoo shop jobs
export const tattooJobs: Job[] = [
  {
    id: createId('tattoo'),
    title: "Experienced Tattoo Artist",
    company: "Ink Masters Studio",
    location: "Portland, OR",
    employment_type: "Full-Time",
    salary_range: "50% commission",
    description: "Award-winning tattoo studio seeking experienced artist with strong portfolio. Commission-based with booth rental option available. Must have 3+ years professional experience.",
    created_at: getRandomDate(8),
    expires_at: new Date(Date.now() + 22 * 86400000).toISOString(),
    status: "active",
    compensation_type: "commission",
    compensation_details: "50% commission",
    specialties: ["Traditional", "Japanese", "Black & Grey", "Color Realism"],
    contact_info: {
      owner_name: "Alex Turner",
      phone: "(503) 555-6789",
      email: "artists@inkmasters.com"
    },
    trust_indicators: {
      verified: true,
      activelyHiring: true,
      chatAvailable: true
    }
  }
];

// Generate Salons for Sale listings
export const salonsForSaleJobs: Job[] = [
  {
    id: createId('salon-sale'),
    title: "Nail Salon For Sale",
    company: "Golden Nails (For Sale)",
    location: "Denver, CO",
    employment_type: "For Sale",
    asking_price: "$180,000",
    monthly_rent: "$3,800/month",
    square_feet: "1,800",
    number_of_stations: 8,
    revenue: "$30,000/month",
    vietnamese_description: "Tiệm móng đẹp, vị trí đắc địa, có 8 bàn, 8 ghế. Đã hoạt động 7 năm, khách quen ổn định. Doanh thu $30,000/tháng. Có thể đào tạo chủ mới.",
    description: "Beautiful nail salon in premium location with 8 stations. Established for 7 years with loyal clientele. Monthly revenue $30,000. Owner willing to train new buyer.",
    created_at: getRandomDate(15),
    expires_at: new Date(Date.now() + 15 * 86400000).toISOString(),
    status: "active",
    compensation_type: "Sale",
    compensation_details: "$180,000",
    reason_for_selling: "Về hưu / Retirement",
    salon_features: ["7 Years Established", "High Traffic Area", "Parking Available", "All Equipment Included"],
    contact_info: {
      owner_name: "Kim Nguyen",
      phone: "(720) 555-7890",
      email: "kim.nguyen@example.com"
    },
    has_housing: false,
    has_wax_room: true,
    has_dining_room: true,
    has_laundry: true,
    owner_will_train: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: createId('salon-sale'),
    title: "Hair Salon For Sale",
    company: "Modern Hair Studio (For Sale)",
    location: "Seattle, WA",
    employment_type: "For Sale",
    asking_price: "$220,000",
    monthly_rent: "$4,500/month",
    square_feet: "2,200",
    number_of_stations: 6,
    revenue: "$25,000/month",
    description: "Modern hair salon with premium equipment and exceptional location. 6 styling stations with room to expand. Established clientele and strong social media presence.",
    created_at: getRandomDate(35),
    expires_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: "expired",
    compensation_type: "Sale",
    compensation_details: "$220,000",
    reason_for_selling: "Moving out of state",
    salon_features: ["Premium Equipment", "Social Media Following", "Recently Renovated", "Training Available"],
    contact_info: {
      owner_name: "Sarah Johnson",
      phone: "(206) 555-8901",
      email: "sarah@modernhairstudio.com"
    },
    has_wax_room: false,
    has_dining_room: true,
    has_laundry: true,
    owner_will_train: true,
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  }
];

// Combine all job types
export const mockJobs = [
  ...vietnameseNailJobs,
  ...hairSalonJobs,
  ...barberJobs,
  ...tattooJobs,
  ...salonsForSaleJobs
];
