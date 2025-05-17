
// Define industry types
export type IndustryType = 'nail' | 'hair' | 'lash_brow' | 'massage' | 'makeup';

// Template interface
export interface JobTemplate {
  id: string;
  title: string;
  industry: IndustryType;
  location: string;
  summary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
  salary_range: string;
  schedule: string;
  employment_type: string;
  popularity: 'most-hired' | 'fastest-applicants' | 'trusted' | 'trending';
  vietnamese_title?: string;
  skills?: string[];
}

// AI polish suggestions by industry
export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nail: [
    "Add high-end clientele details",
    "Highlight flexible scheduling",
    "Emphasize clean, modern salon environment",
    "Mention commission structure details"
  ],
  hair: [
    "Add continuing education benefits",
    "Highlight creative freedom",
    "Mention product line discounts",
    "Add clientele building support"
  ],
  lash_brow: [
    "Emphasize training opportunities",
    "Add client booking system details",
    "Mention product quality",
    "Highlight sanitary workspace"
  ],
  massage: [
    "Highlight relaxing environment",
    "Mention booking frequency",
    "Add details about equipment provided",
    "Emphasize work-life balance"
  ],
  makeup: [
    "Add details about makeup products provided",
    "Highlight event/wedding opportunities",
    "Mention portfolio building",
    "Emphasize creative freedom"
  ]
};

// Vietnamese versions of AI polish suggestions
export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nail: [
    "Thêm chi tiết về khách hàng cao cấp",
    "Nhấn mạnh lịch làm việc linh hoạt",
    "Đề cập đến môi trường tiệm sạch sẽ, hiện đại",
    "Mô tả cơ cấu hoa hồng chi tiết"
  ],
  hair: [
    "Thêm quyền lợi đào tạo nâng cao",
    "Nhấn mạnh sự tự do sáng tạo",
    "Đề cập đến giảm giá sản phẩm",
    "Thêm hỗ trợ xây dựng khách hàng"
  ],
  lash_brow: [
    "Nhấn mạnh cơ hội đào tạo",
    "Thêm chi tiết về hệ thống đặt lịch",
    "Đề cập đến chất lượng sản phẩm",
    "Nhấn mạnh không gian làm việc vệ sinh"
  ],
  massage: [
    "Nhấn mạnh môi trường thư giãn",
    "Đề cập đến tần suất đặt lịch",
    "Thêm chi tiết về trang thiết bị được cung cấp",
    "Nhấn mạnh cân bằng công việc-cuộc sống"
  ],
  makeup: [
    "Thêm chi tiết về sản phẩm trang điểm được cung cấp",
    "Nhấn mạnh cơ hội sự kiện/cưới hỏi",
    "Đề cập đến xây dựng portfolio",
    "Nhấn mạnh tự do sáng tạo"
  ]
};

// Job templates organized by industry
export const jobTemplatesByIndustry: Record<IndustryType, JobTemplate[]> = {
  nail: [
    {
      id: "nail-1",
      title: "Nail Technician - High Tips",
      vietnamese_title: "Thợ Nail - Tip Cao",
      industry: "nail",
      location: "Los Angeles, CA",
      summary: "Join our busy salon with high-end clientele. Earn $25-35/hr plus tips in a clean, modern environment.",
      description: [
        "We are seeking skilled nail technicians who can provide excellent manicures, pedicures, and nail enhancements.",
        "Our salon serves a loyal, high-tipping clientele in an upscale area.",
        "Full-time positions available with flexible scheduling."
      ],
      requirements: [
        "Valid nail technician license",
        "At least 1 year of experience",
        "Skills in manicures, pedicures, and gel applications",
        "Customer-oriented with good English communication"
      ],
      benefits: [
        "Competitive commission (up to 65%)",
        "Guaranteed minimum wage during slow hours",
        "Tips averaging $100-200 daily",
        "Flexible scheduling",
        "Paid vacation after 1 year"
      ],
      salary_range: "$25-35/hr + tips",
      schedule: "Full-time, part-time available",
      employment_type: "W-2 Employee",
      popularity: "most-hired"
    },
    {
      id: "nail-2",
      title: "Nail Artist - Booth Rental",
      vietnamese_title: "Nghệ Sĩ Nail - Cho Thuê Bàn",
      industry: "nail",
      location: "San Francisco, CA",
      summary: "Booth rental opportunity in trendy salon. Bring your clients or build new ones in our high-traffic location.",
      description: [
        "Perfect opportunity for experienced nail technicians looking for independence.",
        "Our modern salon is located in a busy shopping district with excellent foot traffic.",
        "Build your own schedule and keep 100% of your service income."
      ],
      requirements: [
        "Valid nail technician license",
        "2+ years experience",
        "Own client base preferred but not required",
        "Self-motivated with business mindset"
      ],
      benefits: [
        "Keep 100% of your service income",
        "High-end salon equipment provided",
        "Marketing support through salon's social media",
        "Retail products available for commission sales"
      ],
      salary_range: "Potential $4,000-6,000/month",
      schedule: "Flexible, set your own hours",
      employment_type: "Independent Contractor",
      popularity: "fastest-applicants"
    },
    {
      id: "nail-3",
      title: "Experienced Nail Tech - Bao Lương",
      vietnamese_title: "Thợ Nail Có Kinh Nghiệm - Bao Lương",
      industry: "nail",
      location: "Houston, TX",
      summary: "Cần thợ nail có kinh nghiệm, bao lương $4,500-5,500/tháng. Môi trường làm việc thân thiện, tip cao.",
      description: [
        "Tiệm nail sang trọng cần thợ có kinh nghiệm",
        "Lương bao từ $4,500-5,500 một tháng tùy theo kinh nghiệm",
        "Khách ổn định, khu Mỹ trắng, típ cao"
      ],
      requirements: [
        "Có bằng nail license",
        "Ít nhất 2 năm kinh nghiệm",
        "Biết làm đầy đủ các dịch vụ (bột, gel, chân tay nước)",
        "Giao tiếp tiếng Anh cơ bản"
      ],
      benefits: [
        "Bao lương $4,500-5,500/tháng",
        "Típ cao $100-150 mỗi ngày",
        "Chủ lo thuế",
        "Có thể bao ăn ở nếu ở xa",
        "Môi trường làm việc thân thiện"
      ],
      salary_range: "$4,500-5,500/month",
      schedule: "Thứ 2-Thứ 7, nghỉ Chủ Nhật",
      employment_type: "W-2 Employee",
      popularity: "trusted",
      skills: ["acrylic", "gel", "dipping powder", "pedicure"]
    },
    {
      id: "nail-4",
      title: "Entry-Level Nail Assistant",
      vietnamese_title: "Phụ Việc Nail - Học Nghề",
      industry: "nail",
      location: "Orlando, FL",
      summary: "Great opportunity for nail school graduates or beginners. Training provided while you assist senior technicians.",
      description: [
        "Perfect position for those just starting their nail career or still in nail school.",
        "Learn from experienced technicians while earning money.",
        "Path to full technician role within 3-6 months based on performance."
      ],
      requirements: [
        "Nail license or currently in nail school",
        "Reliable transportation",
        "Willingness to learn",
        "Basic English communication"
      ],
      benefits: [
        "Paid training program",
        "Guaranteed hourly wage plus shared tips",
        "Regular performance reviews with raise opportunities",
        "Employee discount on services and products"
      ],
      salary_range: "$14-18/hr + shared tips",
      schedule: "Full-time preferred, part-time available",
      employment_type: "W-2 Employee",
      popularity: "trending"
    }
  ],
  hair: [
    {
      id: "hair-1",
      title: "Hair Stylist - High-End Salon",
      industry: "hair",
      location: "New York, NY",
      summary: "Join our award-winning salon team. $25-40/hr plus commission and tips in our luxury Manhattan location.",
      description: [
        "We're seeking talented hair stylists to join our team at our luxury salon in Manhattan.",
        "Work with a diverse clientele and express your creativity with the latest techniques.",
        "Full-time position with a guaranteed client base."
      ],
      requirements: [
        "Valid cosmetology license",
        "2+ years salon experience",
        "Proficiency in cutting, coloring, and styling",
        "Portfolio demonstrating technical skills",
        "Excellent customer service skills"
      ],
      benefits: [
        "Base pay plus commission structure",
        "Health insurance benefits",
        "Paid continuing education",
        "Product discounts",
        "Paid vacation"
      ],
      salary_range: "$25-40/hr + commission",
      schedule: "Tuesday-Saturday, flexible shifts",
      employment_type: "W-2 Employee",
      popularity: "most-hired",
      skills: ["Hair coloring", "Cutting", "Styling", "Extensions"]
    },
    {
      id: "hair-2",
      title: "Barber - Chair Rental",
      industry: "hair",
      location: "Chicago, IL",
      summary: "Chair rental available in busy downtown barbershop. Bring your clients or build from our walk-in traffic.",
      description: [
        "Modern, well-established barbershop in downtown Chicago looking for professional barbers.",
        "Excellent opportunity for barbers with existing clientele who want more independence.",
        "Our shop has a steady stream of walk-in clients to help you build your business."
      ],
      requirements: [
        "Valid barber license",
        "Minimum 2 years experience",
        "Skills in modern cutting techniques and fades",
        "Professional appearance and attitude",
        "Social media presence preferred"
      ],
      benefits: [
        "Keep 100% of your service income",
        "Flexible schedule",
        "High-traffic location",
        "Modern shop with new equipment",
        "Products provided"
      ],
      salary_range: "$5,000-8,000/month potential",
      schedule: "Set your own hours within shop hours",
      employment_type: "Independent Contractor",
      popularity: "fastest-applicants"
    },
    {
      id: "hair-3",
      title: "Salon Assistant / Shampoo Tech",
      industry: "hair",
      location: "Miami, FL",
      summary: "Learn while you earn! Great opportunity for cosmetology students or recent graduates to train with top stylists.",
      description: [
        "Busy salon seeking a motivated assistant who wants to grow in the industry.",
        "Support our styling team while learning techniques hands-on.",
        "Opportunity for advancement to stylist position after demonstrating skills."
      ],
      requirements: [
        "Cosmetology student or recent graduate",
        "Excellent communication skills",
        "Reliable and punctual",
        "Willing to learn and take direction"
      ],
      benefits: [
        "Hourly wage plus tips",
        "On-the-job training from experienced stylists",
        "Clear path to stylist position",
        "Product and service discounts",
        "Flexible schedule for current students"
      ],
      salary_range: "$15-18/hr + tips",
      schedule: "Part-time and full-time options",
      employment_type: "W-2 Employee",
      popularity: "trending"
    }
  ],
  lash_brow: [
    {
      id: "lash-1",
      title: "Lash Artist - Commission",
      industry: "lash_brow",
      location: "Dallas, TX",
      summary: "Join our specialized lash studio. Earn 50% commission with guaranteed booking through our client management system.",
      description: [
        "Upscale lash studio seeking talented lash artists to join our growing team.",
        "Focus solely on your craft while we handle marketing, booking, and client retention.",
        "Work in private treatment rooms with high-quality products and equipment."
      ],
      requirements: [
        "Valid esthetician or cosmetology license",
        "Certified in eyelash extensions",
        "Minimum 1 year of professional lash experience",
        "Experience with classic and volume lash techniques",
        "Portfolio of your work"
      ],
      benefits: [
        "50% commission on all services",
        "Regular, pre-booked appointments",
        "All supplies and products provided",
        "Continued education opportunities",
        "Marketing and social media support"
      ],
      salary_range: "$4,000-6,000/month potential",
      schedule: "Flexible scheduling, 3-5 days per week",
      employment_type: "W-2 Employee or Independent Contractor",
      popularity: "most-hired"
    },
    {
      id: "lash-2",
      title: "Brow Specialist / Microblading Artist",
      industry: "lash_brow",
      location: "Seattle, WA",
      summary: "Microblading and brow specialist needed for busy beauty studio. $30-40/hr plus commission on retail sales.",
      description: [
        "Well-established beauty studio seeking a skilled microblading artist and brow specialist.",
        "Join our team of dedicated professionals in a supportive and collaborative environment.",
        "Steady stream of clients through our advanced booking system."
      ],
      requirements: [
        "Valid esthetician license and microblading certification",
        "Blood-borne pathogen certification",
        "2+ years experience in microblading and brow services",
        "Strong portfolio showing various techniques",
        "Knowledge of color theory and skin undertones"
      ],
      benefits: [
        "Competitive hourly rate plus commission",
        "Health benefits for full-time employees",
        "Continuing education allowance",
        "Retail commission opportunities",
        "Paid time off"
      ],
      salary_range: "$30-40/hr + commission",
      schedule: "Full-time, Tuesday-Saturday",
      employment_type: "W-2 Employee",
      popularity: "trusted"
    },
    {
      id: "lash-3",
      title: "Lash and Brow Specialist - Suite Rental",
      industry: "lash_brow",
      location: "Denver, CO",
      summary: "Ready for independence? Beautiful, fully-equipped lash suite available for rent in luxury salon studio complex.",
      description: [
        "Perfect opportunity for established lash and brow artists looking for business independence.",
        "Beautiful private suite in luxury salon studio complex with 24/7 access.",
        "Set your own schedule, prices, and choose your products while building your brand."
      ],
      requirements: [
        "Current esthetician or cosmetology license",
        "2+ years professional experience",
        "Established client base preferred",
        "Business license (or willing to obtain)",
        "Professional liability insurance"
      ],
      benefits: [
        "Keep 100% of your service income",
        "Private, fully-equipped treatment room",
        "Professional address with utilities included",
        "Building security and maintenance provided",
        "Common area amenities including laundry facilities"
      ],
      salary_range: "$5,000-8,000/month potential",
      schedule: "24/7 access, set your own hours",
      employment_type: "Business Owner / Independent Contractor",
      popularity: "trending"
    }
  ],
  massage: [
    {
      id: "massage-1",
      title: "Licensed Massage Therapist - Luxury Spa",
      industry: "massage",
      location: "Phoenix, AZ",
      summary: "Join our award-winning luxury spa team. $25-35/hr plus tips and benefits in relaxing, upscale environment.",
      description: [
        "Luxury day spa seeking licensed massage therapists to join our team of wellness professionals.",
        "Perform various modalities including Swedish, deep tissue, hot stone, and prenatal massage.",
        "Work in a peaceful, supportive environment with high-end clientele."
      ],
      requirements: [
        "Current massage therapy license",
        "500+ hours from accredited massage program",
        "Minimum 1 year experience in spa or clinical setting",
        "Proficiency in multiple massage modalities",
        "Excellent client communication skills"
      ],
      benefits: [
        "Competitive hourly rate plus generous tips",
        "Health, dental and vision insurance",
        "Paid time off",
        "Retirement plan with company match",
        "Complimentary spa services"
      ],
      salary_range: "$25-35/hr + tips",
      schedule: "Full-time and part-time available",
      employment_type: "W-2 Employee",
      popularity: "most-hired",
      skills: ["Swedish massage", "Deep tissue", "Hot stone", "Prenatal"]
    },
    {
      id: "massage-2",
      title: "Sports Massage Therapist - Athletic Club",
      industry: "massage",
      location: "Boston, MA",
      summary: "Specialized sports massage therapist needed for high-end athletic club. Work with athletes and fitness enthusiasts.",
      description: [
        "Prestigious athletic club seeking sports massage specialist to join our performance recovery team.",
        "Work with serious athletes and fitness enthusiasts in a dynamic, energetic environment.",
        "Contribute to our members' performance goals and recovery needs."
      ],
      requirements: [
        "Current massage therapy license",
        "Certification or specialized training in sports massage",
        "Understanding of anatomy and athletic injuries",
        "Experience working with athletes preferred",
        "Knowledge of rehabilitation techniques"
      ],
      benefits: [
        "Competitive compensation structure",
        "Free club membership with access to all facilities",
        "Continuing education allowance",
        "Flexible scheduling",
        "Professional development opportunities"
      ],
      salary_range: "$30-45/hr + tips",
      schedule: "Part-time or full-time options available",
      employment_type: "W-2 Employee or Independent Contractor",
      popularity: "fastest-applicants"
    },
    {
      id: "massage-3",
      title: "Massage Therapist - Booth Rental Opportunity",
      industry: "massage",
      location: "Portland, OR",
      summary: "Build your own practice within our established wellness center. Flexible rental terms with all amenities included.",
      description: [
        "Well-established wellness center offering booth rental opportunity for licensed massage therapists.",
        "Beautiful, fully-equipped treatment room available in peaceful, centrally-located facility.",
        "Opportunity to build your business while being part of a supportive wellness community."
      ],
      requirements: [
        "Current massage therapy license",
        "Professional liability insurance",
        "Business license (or willing to obtain)",
        "Self-motivated with business mindset",
        "Professional demeanor and reliability"
      ],
      benefits: [
        "Keep 100% of your service income",
        "Flexible rental terms (hourly, daily, or monthly)",
        "Online scheduling system available",
        "Reception services available",
        "Marketing support through center's website and social media"
      ],
      salary_range: "$4,000-7,000/month potential",
      schedule: "Flexible hours, set your own schedule",
      employment_type: "Independent Contractor",
      popularity: "trusted"
    }
  ],
  makeup: [
    {
      id: "makeup-1",
      title: "Makeup Artist - Bridal Specialist",
      industry: "makeup",
      location: "Atlanta, GA",
      summary: "Join our luxury bridal beauty team. $30-50/hr plus substantial tips for weekend events and photoshoots.",
      description: [
        "Established bridal beauty company seeking talented makeup artists to join our elite team.",
        "Specialize in creating flawless bridal looks for wedding parties and special events.",
        "Work with high-end clients in upscale venues and locations."
      ],
      requirements: [
        "Professional makeup artistry training or certification",
        "2+ years experience in bridal or event makeup",
        "Strong portfolio showcasing various makeup styles",
        "Excellent interpersonal skills and calm demeanor",
        "Willing to travel to venues throughout the metro area"
      ],
      benefits: [
        "Premium rates for weekend events",
        "Generous gratuities",
        "Ongoing training in latest techniques",
        "Networking opportunities within wedding industry",
        "Professional kit and product allowance"
      ],
      salary_range: "$30-50/hr + tips and travel fees",
      schedule: "Primarily weekends and evenings",
      employment_type: "Independent Contractor",
      popularity: "most-hired"
    },
    {
      id: "makeup-2",
      title: "Retail Makeup Artist - Luxury Cosmetics",
      industry: "makeup",
      location: "Los Angeles, CA",
      summary: "Represent a luxury makeup brand in high-end department store. Base salary plus commission and gratis products.",
      description: [
        "Luxury cosmetics brand seeking artistic and sales-driven makeup artists for our department store counter.",
        "Create beautiful looks while building client relationships and driving sales.",
        "Opportunity to participate in special events and trunk shows."
      ],
      requirements: [
        "Makeup artistry experience or certification",
        "Retail sales experience preferred",
        "Knowledge of current beauty trends",
        "Strong customer service orientation",
        "Ability to meet sales goals"
      ],
      benefits: [
        "Base salary plus commission structure",
        "Regular gratis products",
        "Paid training on all product lines",
        "Flexible retail schedule",
        "Career advancement opportunities within the company"
      ],
      salary_range: "$18-22/hr + commission",
      schedule: "Part-time and full-time positions",
      employment_type: "W-2 Employee",
      popularity: "trending",
      skills: ["Customer service", "Color matching", "Product knowledge", "Sales techniques"]
    },
    {
      id: "makeup-3",
      title: "Editorial Makeup Artist - Fashion Industry",
      industry: "makeup",
      location: "New York, NY",
      summary: "Creative makeup artist needed for fashion photoshoots, runway shows, and editorial work. Project-based compensation.",
      description: [
        "Creative agency seeking innovative makeup artists for high-fashion and editorial projects.",
        "Work alongside photographers, designers, and creative directors to create cutting-edge looks.",
        "Opportunity to build an impressive portfolio with published work."
      ],
      requirements: [
        "Professional makeup training or certification",
        "Editorial or fashion experience preferred",
        "Creative portfolio demonstrating range and artistry",
        "Knowledge of lighting and photography considerations",
        "Ability to work efficiently in fast-paced environments"
      ],
      benefits: [
        "Premium project rates",
        "Industry networking opportunities",
        "Published work for your portfolio",
        "Exposure to top industry professionals",
        "Creative freedom and artistic expression"
      ],
      salary_range: "$350-500 per project",
      schedule: "Project-based, variable schedule",
      employment_type: "Freelance",
      popularity: "trusted"
    }
  ]
};
