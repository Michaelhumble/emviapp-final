import { IndustryType } from './jobFormSchema';

export type JobTemplate = {
  id: string;
  industry: IndustryType;
  title: string;
  summary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
  location: string;
  salary_range: string;
  schedule: string;
  employment_type: string;
  popularity: 'most-hired' | 'fastest-applicants' | 'trusted' | 'trending';
};

// Export a dictionary of job templates by industry
export const jobTemplatesByIndustry: Record<IndustryType, JobTemplate[]> = {
  nails: [
    {
      id: "nails-1",
      industry: "nails",
      title: "Nail Technician Needed - High Tips in Upscale Area",
      summary: "Join our luxury nail salon with high-paying clients and great tips. We provide a comfortable work environment and flexible schedule.",
      description: [
        "Our upscale nail salon is looking for experienced nail technicians to join our team.",
        "We have a large client base of high-tipping customers and offer a comfortable, friendly work environment.",
        "Earn competitive commission plus excellent tips in our well-established location."
      ],
      requirements: [
        "At least 1 year experience as a nail technician",
        "Valid cosmetology or nail technician license",
        "Expertise in manicures, pedicures, and gel applications",
        "Excellent customer service skills"
      ],
      benefits: [
        "High-tipping client base",
        "Flexible scheduling options",
        "Weekly pay available",
        "Clean and modern work environment"
      ],
      location: "Atlanta, GA",
      salary_range: "$20-30/hr + tips",
      schedule: "Full-time",
      employment_type: "W-2 or 1099 available",
      popularity: "most-hired"
    },
    {
      id: "nails-2",
      industry: "nails",
      title: "Tuyển Thợ Nail Bao Lương - Khu Mỹ Trắng",
      summary: "Tiệm sang trọng trong khu mỹ trắng cần thợ bột, thợ bao lương từ $1,200-$1,500/tuần tùy theo kinh nghiệm.",
      description: [
        "Cần tuyển thợ nail có kinh nghiệm làm bột và chân tay nước.",
        "Tiệm nằm trong khu mỹ trắng, khách tip hậu, chỗ làm thoải mái.",
        "Bao lương tùy theo kinh nghiệm, có thể giúp chỗ ở."
      ],
      requirements: [
        "Có kinh nghiệm làm bột và chân tay nước",
        "Có bằng nail hoặc cosmetology hợp lệ",
        "Thái độ làm việc chuyên nghiệp",
        "Có thể giao tiếp cơ bản với khách"
      ],
      benefits: [
        "Khách tip hậu",
        "Bao lương $1,200-$1,500/tuần",
        "Giúp chỗ ở nếu cần",
        "Môi trường làm việc thân thiện"
      ],
      location: "Houston, TX",
      salary_range: "$1,200-$1,500/tuần",
      schedule: "Full-time",
      employment_type: "W-2 or 1099 available",
      popularity: "fastest-applicants"
    },
    {
      id: "nails-3",
      industry: "nails",
      title: "Experienced Nail Tech - Weekly Pay + Housing Available",
      summary: "Looking for reliable nail technicians with experience in acrylics, gel, and dipping powder. Housing can be arranged.",
      description: [
        "Well-established nail salon seeking talented nail technicians to join our friendly team.",
        "We offer weekly pay, housing assistance if needed, and a positive work environment.",
        "Our salon is in a busy shopping center with excellent walk-in traffic and regular clients."
      ],
      requirements: [
        "Experience with acrylic, gel, and dipping powder",
        "Valid nail technician license",
        "Reliable and professional attitude",
        "Willing to learn new techniques and provide excellent service"
      ],
      benefits: [
        "Weekly pay guaranteed",
        "Housing assistance available",
        "Busy location with regular clients",
        "Opportunity for growth"
      ],
      location: "Denver, CO",
      salary_range: "$3,500-5,000/month potential",
      schedule: "Full-time or Part-time",
      employment_type: "Booth rental or commission",
      popularity: "trusted"
    }
  ],
  hair: [
    {
      id: "hair-1",
      industry: "hair",
      title: "Senior Hair Stylist - High End Salon",
      summary: "Looking for a talented hair stylist with a strong existing clientele to join our upscale salon. Great commission structure.",
      description: [
        "Our high-end hair salon is seeking an experienced hair stylist to join our team.",
        "We offer a sophisticated salon environment with state-of-the-art equipment and premium products.",
        "Strong existing clientele preferred, with opportunities to build your book from our regular foot traffic."
      ],
      requirements: [
        "Minimum 3 years professional experience",
        "Valid cosmetology license",
        "Experience with color, cutting, and styling techniques",
        "Strong portfolio of work"
      ],
      benefits: [
        "Competitive commission structure",
        "Flexible scheduling",
        "Continued education opportunities",
        "Health insurance options for full-time stylists"
      ],
      location: "Miami, FL",
      salary_range: "$50,000-75,000/year potential",
      schedule: "Full-time",
      employment_type: "Commission-based",
      popularity: "most-hired"
    },
    {
      id: "hair-2",
      industry: "hair",
      title: "Barber/Stylist - Busy Urban Shop",
      summary: "Fast-paced barbershop seeking skilled barber with excellent fading skills. Great walk-in clientele and tips.",
      description: [
        "Join our popular barbershop with steady walk-in traffic and loyal clients.",
        "We focus on men's cuts, fades, beard trims, and traditional hot towel shaves.",
        "Fun team environment with music, great energy, and excellent earning potential."
      ],
      requirements: [
        "Expert fading skills and men's cutting techniques",
        "Valid barber license",
        "Customer-oriented with good communication",
        "Reliable and punctual"
      ],
      benefits: [
        "High-volume walk-in clientele",
        "Weekly pay + tips",
        "Fun, energetic work environment",
        "Flexibility for full-time or part-time"
      ],
      location: "Chicago, IL",
      salary_range: "$40,000-60,000/year potential",
      schedule: "Flexible shifts available",
      employment_type: "Commission or booth rental",
      popularity: "fastest-applicants"
    }
  ],
  lashes: [
    {
      id: "lashes-1",
      industry: "lashes",
      title: "Lash Artist - Premium Beauty Studio",
      summary: "Upscale beauty studio seeking certified lash technician. Experience with volume lashes required. High-paying clientele.",
      description: [
        "Our premium lash studio is looking for a talented and detail-oriented lash artist.",
        "We specialize in classic, hybrid, and volume lash extensions for a discerning clientele.",
        "Beautiful, modern studio with private lash rooms and all supplies provided."
      ],
      requirements: [
        "Certification in lash extensions",
        "Experience with classic, hybrid, and volume techniques",
        "Portfolio demonstrating your work",
        "Excellent attention to detail"
      ],
      benefits: [
        "Competitive pay structure",
        "Flexible scheduling",
        "All supplies provided",
        "Continuing education opportunities"
      ],
      location: "Los Angeles, CA",
      salary_range: "$50,000-70,000/year potential",
      schedule: "Full-time or Part-time",
      employment_type: "W-2 or 1099 available",
      popularity: "trending"
    }
  ],
  massage: [
    {
      id: "massage-1",
      industry: "massage",
      title: "Licensed Massage Therapist - Luxury Spa",
      summary: "Upscale day spa seeking licensed massage therapist skilled in various modalities. Great tips and benefits.",
      description: [
        "Join our team of skilled therapists at our luxury day spa and wellness center.",
        "We provide a tranquil environment focused on client relaxation and therapeutic treatment.",
        "Steady bookings with loyal clientele who appreciate and reward quality service."
      ],
      requirements: [
        "Valid massage therapy license",
        "Experience in Swedish, deep tissue, and hot stone massage",
        "Professional demeanor and excellent communication skills",
        "Ability to maintain a busy schedule"
      ],
      benefits: [
        "Competitive base pay plus generous tips",
        "Health insurance for full-time employees",
        "Continuing education allowance",
        "Employee wellness program"
      ],
      location: "Scottsdale, AZ",
      salary_range: "$60,000-80,000/year potential",
      schedule: "Full-time",
      employment_type: "W-2 with benefits",
      popularity: "most-hired"
    }
  ],
  tattoo: [
    {
      id: "tattoo-1",
      industry: "tattoo",
      title: "Experienced Tattoo Artist - Established Studio",
      summary: "Well-known tattoo studio looking for talented artists to join our team. Strong portfolio required.",
      description: [
        "Our reputable tattoo studio is seeking a skilled tattoo artist with a diverse style range.",
        "We have a loyal client base and excellent visibility in a prime downtown location.",
        "Clean, professional environment with private stations and top-quality equipment."
      ],
      requirements: [
        "Minimum 3 years professional tattooing experience",
        "Strong portfolio showing range and technical ability",
        "Blood-borne pathogen certification",
        "Excellent customer service skills"
      ],
      benefits: [
        "Competitive commission structure",
        "Flexibility to build your own client base",
        "Marketing support through our social media channels",
        "Professional, supportive team environment"
      ],
      location: "Portland, OR",
      salary_range: "70/30 commission split",
      schedule: "Flexible schedule",
      employment_type: "Independent contractor",
      popularity: "trusted"
    }
  ],
  brows: [
    {
      id: "brows-1",
      industry: "brows",
      title: "Brow Artist and Microblading Specialist",
      summary: "High-end brow studio seeking experienced microblading artist with a strong portfolio. Full client schedule available.",
      description: [
        "Join our specialized brow studio as a microblading and brow artist.",
        "We focus exclusively on brow services including microblading, powder brows, and brow lamination.",
        "Strong existing client base with bookings available immediately upon starting."
      ],
      requirements: [
        "Microblading certification and license",
        "Portfolio of healed microblading work",
        "Experience with powder brows and lamination a plus",
        "Detail-oriented with excellent hand-eye coordination"
      ],
      benefits: [
        "High-paying services ($200+ per session)",
        "Booking system and receptionist provided",
        "Marketing and client acquisition support",
        "Modern, clean workspace with all supplies"
      ],
      location: "Nashville, TN",
      salary_range: "$70,000-100,000/year potential",
      schedule: "Flexible days",
      employment_type: "Commission-based",
      popularity: "fastest-applicants"
    }
  ],
  skincare: [
    {
      id: "skincare-1",
      industry: "skincare",
      title: "Licensed Esthetician - Medical Spa",
      summary: "Busy medical spa seeking licensed esthetician experienced in medical-grade treatments and products.",
      description: [
        "Our growing medical spa is looking for a professional esthetician to perform advanced skincare treatments.",
        "Services include chemical peels, microdermabrasion, dermaplaning, and customized facials.",
        "Work alongside our medical director and nurse injectors in a clinical yet luxurious setting."
      ],
      requirements: [
        "Current esthetician license",
        "Experience with medical-grade skincare treatments",
        "Knowledge of product ingredients and skin physiology",
        "Excellent bedside manner and consultation skills"
      ],
      benefits: [
        "Competitive base salary plus commission",
        "Health benefits for full-time employees",
        "Paid continuing education",
        "Employee discounts on services and products"
      ],
      location: "Dallas, TX",
      salary_range: "$50,000-65,000/year",
      schedule: "Full-time",
      employment_type: "W-2 with benefits",
      popularity: "trending"
    }
  ]
};

export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nails: [
    "Enhance your job description with details about your salon's reputation and client base",
    "Add specific skills needed (acrylics, gel, dipping powder, etc.)",
    "Mention exact compensation structure and potential earnings with tips",
    "Describe your salon's atmosphere and team culture"
  ],
  hair: [
    "Specify the types of services your salon specializes in",
    "Mention the product lines you use (Aveda, Redken, Olaplex, etc.)",
    "Describe your salon's clientele and typical service prices",
    "Add details about continuing education opportunities"
  ],
  lashes: [
    "Specify the lash techniques your studio offers (classic, volume, hybrid)",
    "Mention the products and supplies you provide",
    "Include details about your booking system and client retention",
    "Describe your studio setup and work environment"
  ],
  massage: [
    "List the specific massage modalities you're looking for",
    "Mention your spa's client demographics and typical service duration",
    "Include details about room setup and supplies provided",
    "Describe your booking system and typical therapist schedule"
  ],
  tattoo: [
    "Specify what tattoo styles your studio specializes in",
    "Describe your studio's atmosphere and client base",
    "Mention details about equipment provided versus artist-supplied",
    "Include information about studio exposure and marketing support"
  ],
  brows: [
    "Detail the specific brow services you offer",
    "Mention your studio's specialization and client demographics",
    "Include information about supplies provided versus artist-supplied",
    "Describe booking procedures and client acquisition methods"
  ],
  skincare: [
    "List the specific treatments and services you offer",
    "Mention the skincare lines and products you use",
    "Describe your spa's approach to skincare and typical clientele",
    "Include details about treatment rooms and equipment"
  ]
};

export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nails: [
    "Thêm chi tiết về mức lương, hoa hồng và tiền tip trung bình",
    "Nêu rõ các kỹ năng cần thiết (bột, gel, dip, etc.)",
    "Mô tả môi trường làm việc và đồng nghiệp",
    "Giải thích về chỗ ở và hỗ trợ di chuyển nếu có"
  ],
  hair: [
    "Mô tả chi tiết về kiểu khách hàng của salon",
    "Nêu rõ các dịch vụ salon chuyên về",
    "Thêm thông tin về mức lương và hoa hồng",
    "Giải thích v�� lịch làm việc và giờ linh hoạt"
  ],
  lashes: [
    "Giải thích chi tiết về kỹ thuật nối mi bạn cần",
    "Mô tả không gian làm việc và dụng cụ được cung cấp",
    "Thêm thông tin về lương và hoa hồng",
    "Nêu rõ yêu cầu về giấy phép và chứng chỉ"
  ],
  massage: [
    "Liệt kê các kỹ thuật massage cần thiết",
    "Mô tả về khách hàng và môi trường spa",
    "Nêu rõ thông tin về lương và tiền boa",
    "Giải thích về lịch làm việc và số giờ"
  ],
  tattoo: [
    "Mô tả phong cách xăm của studio",
    "Giải thích về không gian làm việc và thiết bị",
    "Nêu rõ cơ cấu chia hoa hồng",
    "Thêm thông tin về khách hàng tiềm năng"
  ],
  brows: [
    "Giải thích chi tiết về các dịch vụ chân mày bạn cung cấp",
    "Nêu rõ yêu cầu về chứng chỉ điêu khắc",
    "Mô tả về không gian làm việc và vật liệu",
    "Thêm thông tin về mức thu nhập tiềm năng"
  ],
  skincare: [
    "Liệt kê các liệu trình và dịch vụ chăm sóc da",
    "Mô tả sản phẩm và thương hiệu sử dụng",
    "Giải thích về môi trường spa và khách hàng",
    "Nêu rõ yêu cầu về bằng cấp và kinh nghiệm"
  ]
};

export { IndustryType };
export { jobTemplatesByIndustry };
